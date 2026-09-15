import Image from "next/image";
import { highlights } from "@/data/highlights";

export function Highlights() {
  return (
    <section aria-labelledby="highlights-title">
      <div className="section-heading">
        <h2 id="highlights-title">Highlights</h2>
        <span>A few moments worth sharing</span>
      </div>
      <div className="video-grid">
        {highlights.map((highlight) => (
          <article className="video-card" key={highlight.id}>
            <a
              className="thumbnail recognize"
              href={highlight.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Read ${highlight.title}`}
            >
              <Image
                className="photo"
                src={highlight.image}
                alt={highlight.imageAlt}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 760px) 50vw, 33vw"
              />
              <span className="duration">Article</span>
            </a>
            <div className="video-info">
              <Image
                className="company-avatar"
                src={highlight.logo}
                alt=""
                width={34}
                height={34}
              />
              <div>
                <a
                  className="video-title"
                  href={highlight.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {highlight.title}
                </a>
                <p>{highlight.publisher}</p>
                <p>
                  <time dateTime={highlight.publishedAt}>{highlight.date}</time>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
