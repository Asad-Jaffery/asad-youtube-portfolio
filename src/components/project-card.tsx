import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <article className="video-card">
      <button
        className={`thumbnail ${project.id}`}
        onClick={onOpen}
        aria-label={`View ${project.company}: ${project.title}`}
      >
        {project.photo ? (
          <>
            <Image
              className="photo"
              src={project.photo}
              alt="Asad and the Recognize capstone team"
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 760px) 50vw, 33vw"
            />
          </>
        ) : (
          <>
            {project.kind === "career" && (
              <Image
                className="company-watermark"
                src={project.logo}
                alt=""
                width={160}
                height={160}
              />
            )}
            <span className="thumb-kicker">{project.kicker}</span>
          </>
        )}
        <span className="duration">{project.duration}</span>
      </button>
      <div className="video-info">
        <Image
          className="company-avatar"
          src={project.logo}
          alt=""
          width={34}
          height={34}
        />
        <div>
          <button
            className="video-title"
            onClick={onOpen}
            aria-label={`${project.title} at ${project.company}`}
          >
            {project.title}
          </button>
          <p>{project.team ?? project.company}</p>
          <p>{project.period}</p>
        </div>
      </div>
    </article>
  );
}
