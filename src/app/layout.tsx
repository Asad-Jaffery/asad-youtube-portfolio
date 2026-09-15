import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asad Jaffery — AsadTube",
  description:
    "Asad Jaffery's work, projects, and career. A portfolio, with a familiar play button.",
  icons: { icon: "/assets/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#0f0f0f" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
