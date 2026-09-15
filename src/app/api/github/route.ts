import { NextResponse } from "next/server";
import type { ContributionDay, GithubCalendar } from "@/lib/github";

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type GitHubResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              color: string;
              contributionLevel: ContributionDay["level"];
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GitHub activity is not configured." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: "Asad-Jaffery" },
      }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error("GitHub request failed.");
    const json: GitHubResponse = await res.json();
    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;
    if (json.errors?.length || !calendar)
      throw new Error("GitHub calendar unavailable.");

    const payload: GithubCalendar = {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          color: day.color,
          level: day.contributionLevel,
        })),
      })),
    };
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { error: "GitHub activity is temporarily unavailable." },
      { status: 502 },
    );
  }
}
