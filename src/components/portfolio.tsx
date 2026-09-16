"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { ProjectCard } from "./project-card";
import ContributionGraph from "./contribution-graph";
import { Music } from "./music";
import { Highlights } from "./highlights";

export function Portfolio() {
  const [activeSection, setActiveSection] = useState<
    "career" | "highlights" | "about" | "music"
  >("career");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);
  function openProject(project: Project) {
    setActiveProject(project);
    dialogRef.current?.showModal();
  }
  async function shareChannel() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("Channel link copied");
    } catch {
      setMessage("Copy this page’s URL to share the channel.");
    }
  }
  return (
    <div className={menuOpen ? "portfolio navigation-open" : "portfolio"}>
      <svg
        className="icon-library"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <symbol id="menu" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </symbol>
          <symbol id="search" viewBox="0 0 24 24">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
          </symbol>
          <symbol id="home" viewBox="0 0 24 24">
            <path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z" />
          </symbol>
          <symbol id="play" viewBox="0 0 24 24">
            <path d="m9 5 11 7-11 7Z" />
          </symbol>
          <symbol id="videos" viewBox="0 0 24 24">
            <rect x="3" y="6" width="18" height="15" rx="2" />
            <path d="M6 3h12m-8 7 6 4-6 4Z" />
          </symbol>
          <symbol id="arrow" viewBox="0 0 24 24">
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </symbol>
          <symbol id="external" viewBox="0 0 24 24">
            <path d="M14 3h7v7m0-7L10 14m0-10H4v16h16v-6" />
          </symbol>
          <symbol id="github" viewBox="0 0 24 24">
            <path d="M9 21v-4c-4 1-4-2-5-2m11 6v-4c0-1-.3-2-1-2 4-.5 7-2 7-6 0-2-1-3-2-4 0-1 0-2-1-3-2 0-3 1-4 1h-4C9 2 8 1 6 2 5 3 5 4 5 5 4 6 3 7 3 9c0 4 3 5.5 7 6-.7 0-1 1-1 2" />
          </symbol>
          <symbol id="info" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v6m0-10v1" />
          </symbol>
          <symbol id="share" viewBox="0 0 24 24">
            <path d="m14 3 8 7-8 7v-5C8 12 4 14 2 19c0-9 5-12 12-12Z" />
          </symbol>
          <symbol id="close" viewBox="0 0 24 24">
            <path d="m6 6 12 12M18 6 6 18" />
          </symbol>
          <symbol id="check" viewBox="0 0 24 24">
            <path d="m5 12 4 4L19 6" />
          </symbol>
          <symbol id="chevron" viewBox="0 0 24 24">
            <path d="m9 5 7 7-7 7" />
          </symbol>
        </defs>
      </svg>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <div className="brand-group">
          <button
            className="icon-button"
            id="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="sidebar"
          >
            <svg>
              <use href="#menu" />
            </svg>
          </button>
          <Link className="brand" href="/">
            <span className="brand-play">
              <svg>
                <use href="#play" />
              </svg>
            </span>
            AsadTube<sup>PORTFOLIO</sup>
          </Link>
        </div>
        <div className="search">
          <input
            type="search"
            placeholder="Search this channel"
            aria-label="Search this channel"
            aria-disabled="true"
            readOnly
            autoComplete="off"
          />
          <button type="button" aria-label="Search" aria-disabled="true">
            <svg>
              <use href="#search" />
            </svg>
          </button>
        </div>
        <div className="header-actions">
          <a
            className="social-link"
            href="https://github.com/Asad-Jaffery"
            target="_blank"
            rel="noreferrer"
          >
            <svg>
              <use href="#github" />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            className="social-link"
            href="https://www.linkedin.com/in/asad-jaffery/"
            target="_blank"
            rel="noreferrer"
            aria-label="Asad on LinkedIn"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ fill: "currentColor", stroke: "none" }}
            >
              <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.4-.75 1.36-1.55 2.8-1.55 3 0 3.57 1.98 3.57 4.55v5.25Z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <button
            className="avatar small"
            type="button"
            onClick={() => setActiveSection("about")}
            aria-label="About Asad"
          >
            <Image
              src="/assets/asad-jaffery-avatar.jpeg"
              alt=""
              width={34}
              height={34}
              quality={90}
            />
          </button>
        </div>
      </header>
      <aside
        className={`sidebar ${menuOpen ? "mobile-open" : ""}`}
        id="sidebar"
        aria-label="Sidebar navigation"
      >
        <nav>
          <button
            className={`side-item ${activeSection === "career" ? "active" : ""}`}
            type="button"
            onClick={() => {
              setActiveSection("career");
            }}
            aria-label="Career"
          >
            <svg>
              <use href="#home" />
            </svg>
            <span>Career</span>
          </button>
          <button
            className={`side-item ${activeSection === "highlights" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveSection("highlights")}
            aria-label="Highlights"
          >
            <svg>
              <use href="#videos" />
            </svg>
            <span>Highlights</span>
          </button>
          <button
            className={`side-item ${activeSection === "about" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveSection("about")}
            aria-label="About"
          >
            <svg>
              <use href="#info" />
            </svg>
            <span>About</span>
          </button>
          <button
            className={`side-item ${activeSection === "music" ? "active" : ""}`}
            type="button"
            onClick={() => {
              setActiveSection("music");
            }}
            aria-label="Music"
          >
            <svg viewBox="0 0 24 24">
              <path d="M9 18V5l12-3v13M9 8l12-3" />
              <ellipse cx="6" cy="18" rx="3" ry="2" />
              <ellipse cx="18" cy="15" rx="3" ry="2" />
            </svg>
            <span>Music</span>
          </button>
          <div className="side-divider"></div>
          <p className="side-heading">Featured in my career</p>
          <button
            className="side-item"
            data-company="Shopify"
            aria-disabled="true"
          >
            <Image src="/assets/shopify.svg" alt="" width={22} height={22} />
            <span>Shopify</span>
          </button>
          <button
            className="side-item"
            data-company="Tesla"
            aria-disabled="true"
          >
            <Image
              src="/assets/tesla-channel.png"
              alt=""
              width={22}
              height={22}
            />
            <span>Tesla</span>
          </button>
          <button
            className="side-item"
            data-company="Recognize"
            aria-disabled="true"
          >
            <Image src="/assets/recognize.png" alt="" width={22} height={22} />
            <span>Recognize</span>
          </button>
          <button
            className="side-item"
            data-company="USAFacts"
            aria-disabled="true"
          >
            <Image src="/assets/usafacts.svg" alt="" width={22} height={22} />
            <span>USAFacts</span>
          </button>
        </nav>
        <div className="sidebar-foot">
          <span>
            A personal portfolio.
            <br />
            Not affiliated with YouTube.
          </span>
        </div>
      </aside>
      <main id="main">
        <section aria-label="GitHub contributions">
          <ContributionGraph />
        </section>
        <section className="channel-info" aria-label="Channel information">
          <div className="avatar channel-avatar">
            <Image
              src="/assets/asad-jaffery-avatar.jpeg"
              alt="Asad Jaffery"
              width={138}
              height={138}
              quality={90}
              priority
            />
          </div>
          <div className="channel-description">
            <h1>
              Asad Jaffery{" "}
              <span
                className="verified"
                title="Personal portfolio"
                aria-label="Personal portfolio"
              >
                <svg>
                  <use href="#check" />
                </svg>
              </span>
            </h1>
            <p className="channel-meta">
              <strong>@asadjaffery</strong>
              <span>3 companies</span>
            </p>
            <button
              className="bio-link"
              type="button"
              onClick={() => setActiveSection("about")}
            >
              A curious individual whos into tech.{" "}
              <svg>
                <use href="#chevron" />
              </svg>
            </button>
            <a
              className="channel-link"
              href="https://github.com/Asad-Jaffery"
              target="_blank"
              rel="noreferrer"
            >
              github.com/Asad-Jaffery <span>and 1 more link</span>
            </a>
            <div className="channel-actions">
              <a
                className="subscribe"
                href="https://www.linkedin.com/in/asad-jaffery/"
                target="_blank"
                rel="noreferrer"
              >
                Let&apos;s connect
              </a>
              <button className="pill-button" onClick={shareChannel}>
                <svg>
                  <use href="#share" />
                </svg>
                Share channel
              </button>
            </div>
          </div>
        </section>
        <nav className="channel-tabs" aria-label="Channel sections">
          <button
            className={activeSection === "career" ? "selected" : ""}
            type="button"
            onClick={() => setActiveSection("career")}
            aria-pressed={activeSection === "career"}
          >
            Career
          </button>
          <button
            className={activeSection === "highlights" ? "selected" : ""}
            type="button"
            onClick={() => setActiveSection("highlights")}
            aria-pressed={activeSection === "highlights"}
          >
            Highlights
          </button>
          <button
            className={activeSection === "about" ? "selected" : ""}
            type="button"
            onClick={() => setActiveSection("about")}
            aria-pressed={activeSection === "about"}
          >
            About
          </button>
          <button
            className={activeSection === "music" ? "selected" : ""}
            type="button"
            onClick={() => setActiveSection("music")}
            aria-pressed={activeSection === "music"}
          >
            Music
          </button>
        </nav>

        <section className="content" aria-labelledby={`${activeSection}-title`}>
          <div className="section-transition" key={activeSection}>
            {activeSection === "music" ? (
              <Music />
            ) : activeSection === "highlights" ? (
              <Highlights />
            ) : activeSection === "about" ? (
              <section aria-labelledby="about-title">
                <div className="section-heading">
                  <h2 id="about-title">About</h2>
                </div>
                <div className="about-bio" aria-label="Bio">
                  <p>
                    I’m an ambitious and hungry individual who’s interested in
                    software and data engineering. I enjoy taking on challenging
                    problems, learning through the process, and building simple,
                    elegant solutions to complex systems. My goal is to build
                    software that brings value, and does good for the world!
                  </p>
                </div>
                <div className="about-section">
                  <h3>Education</h3>
                  <p>B.S. Informatics, Concentration in Data Science</p>
                  <p>University of Washington · June 2026</p>
                </div>
                <div className="about-section">
                  <h3>Links</h3>
                  <div className="about-links">
                    <a
                      href="https://github.com/Asad-Jaffery"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg>
                        <use href="#github" />
                      </svg>
                      GitHub
                      <svg>
                        <use href="#external" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/asad-jaffery/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        style={{ fill: "currentColor", stroke: "none" }}
                      >
                        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.4-.75 1.36-1.55 2.8-1.55 3 0 3.57 1.98 3.57 4.55v5.25Z" />
                      </svg>
                      LinkedIn
                      <svg>
                        <use href="#external" />
                      </svg>
                    </a>
                  </div>
                </div>
              </section>
            ) : (
              <>
                <div className="section-heading">
                  <h2 id="career-title">Career</h2>
                  <span>The teams I’ve been part of</span>
                </div>
                <div className="video-grid">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onOpen={() => openProject(project)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <footer className="content-footer">
          <span>You&apos;re all caught up.</span>
          <span>More to build. More to share.</span>
        </footer>
      </main>
      <dialog
        ref={dialogRef}
        aria-labelledby="dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        {activeProject && (
          <div className="project-detail">
            <p>
              {activeProject.company} · {activeProject.period}
            </p>
            <h2 id="dialog-title">{activeProject.title}</h2>
            <p>{activeProject.team}</p>
            <p>{activeProject.category}</p>
            <ul className="project-highlights">
              {activeProject.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="icon-button dialog-close"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close project"
        >
          <svg>
            <use href="#close" />
          </svg>
        </button>
      </dialog>
      <div className={`toast ${message ? "visible" : ""}`} role="status">
        {message}
      </div>
    </div>
  );
}
