"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { ContributionDay, GithubCalendar } from "@/lib/github";
import styles from "./contribution-graph.module.css";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const levelClasses: Record<ContributionDay["level"], string> = {
  NONE: styles.level0,
  FIRST_QUARTILE: styles.level1,
  SECOND_QUARTILE: styles.level2,
  THIRD_QUARTILE: styles.level3,
  FOURTH_QUARTILE: styles.level4,
};
type Tooltip = { day: ContributionDay; x: number; y: number };

export default function ContributionGraph() {
  const [data, setData] = useState<GithubCalendar | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [entered, setEntered] = useState(false);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load GitHub.");
        setData(await res.json());
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (!data || !graphRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(graphRef.current);
    return () => observer.disconnect();
  }, [data]);

  useEffect(() => {
    const dismissTooltip = () => setTooltip(null);
    window.addEventListener("scroll", dismissTooltip, { passive: true });
    return () => window.removeEventListener("scroll", dismissTooltip);
  }, []);

  if (error)
    return (
      <div className={styles.status} role="status">
        <p>The contribution calendar is taking a break.</p>
        <button
          onClick={() => {
            setError(false);
            setAttempt((value) => value + 1);
          }}
        >
          Try again ↻
        </button>
      </div>
    );
  if (!data)
    return (
      <div className={styles.status} role="status">
        <p>Loading GitHub contributions…</p>
        <div className={styles.skeleton} aria-hidden="true" />
      </div>
    );

  // Stagger individual days by contribution count, with overlapping fades
  // instead of revealing entire color tiers in separate steps.
  const activeDays = data.weeks
    .flatMap((week) => week.days)
    .filter((day) => day.count > 0)
    .sort((a, b) => b.count - a.count);
  const revealDelays = new Map(
    activeDays.map((day, index) => [
      day.date,
      (index / Math.max(activeDays.length - 1, 1)) * 1600,
    ]),
  );

  return (
    <div
      className={`${styles.graph} ${entered ? styles.entered : ""}`}
      ref={graphRef}
      onMouseLeave={() => setTooltip(null)}
    >
      <div className={styles.art}>
        <div
          className={styles.grid}
          role="img"
          aria-label={`${data.total} GitHub contributions in the last year. Brighter red squares indicate more active days.`}
        >
          {data.weeks.map((week, i) => (
            <div className={styles.week} key={i}>
              {week.days.map((day, j) => (
                <span
                  key={day.date}
                  className={`${styles.day} ${levelClasses[day.level]}`}
                  data-active={day.count > 0}
                  style={
                    {
                      "--delay": `${revealDelays.get(day.date) ?? 2200 + ((i * 7 + j) / Math.max(data.weeks.length * 7 - 1, 1)) * 300}ms`,
                    } as CSSProperties
                  }
                  onMouseEnter={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    setTooltip({
                      day,
                      x: Math.max(
                        145,
                        Math.min(
                          window.innerWidth - 145,
                          rect.left + rect.width / 2,
                        ),
                      ),
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.caption}>
        <span className={styles.label}>GitHub contributions</span>
        <span className={styles.total}>
          <strong>{data.total.toLocaleString("en-US")}</strong> in the last year
        </span>
      </div>
      {tooltip && (
        <div
          className={styles.tooltip}
          role="tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <strong>
            {tooltip.day.count}{" "}
            {tooltip.day.count === 1 ? "contribution" : "contributions"}
          </strong>{" "}
          on {dateFormatter.format(new Date(`${tooltip.day.date}T00:00:00Z`))}
        </div>
      )}
    </div>
  );
}
