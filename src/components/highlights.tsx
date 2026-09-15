'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { highlights, type Highlight } from '@/data/highlights';

export function Highlights() {
  const [activeHighlight, setActiveHighlight] = useState<Highlight | null>(
    null,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  function openHighlight(highlight: Highlight) {
    setActiveHighlight(highlight);
    dialogRef.current?.showModal();
  }

  function scrollHighlights(direction: -1 | 1) {
    listRef.current?.scrollBy({
      left: direction * listRef.current.clientWidth * 0.8,
      behavior: 'smooth',
    });
  }

  return (
    <section aria-labelledby='highlights-title'>
      <div className='section-heading highlights-heading'>
        <h2 id='highlights-title'>Highlights</h2>
        <span>Some moments worth sharing</span>
        <div
          className='highlight-scroll-controls'
          aria-label='Highlight carousel controls'
        >
          <button
            className='highlight-scroll-previous'
            type='button'
            onClick={() => scrollHighlights(-1)}
            aria-label='Scroll highlights left'
          >
            <svg>
              <use href='#arrow' />
            </svg>
          </button>
          <button
            type='button'
            onClick={() => scrollHighlights(1)}
            aria-label='Scroll highlights right'
          >
            <svg>
              <use href='#arrow' />
            </svg>
          </button>
        </div>
      </div>
      <div className='highlight-scroll' ref={listRef}>
        {highlights.map((highlight) => {
          const thumbnail = (
            <>
              <Image
                className='photo'
                src={highlight.image}
                alt={highlight.imageAlt}
                fill
                sizes='(max-width: 480px) 100vw, (max-width: 760px) 50vw, 33vw'
              />
              <span className='duration'>{highlight.badge}</span>
            </>
          );

          return (
            <article className='video-card' key={highlight.id}>
              {highlight.url ? (
                <a
                  className='thumbnail recognize'
                  href={highlight.url}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={`Read ${highlight.title}`}
                >
                  {thumbnail}
                </a>
              ) : (
                <button
                  className='thumbnail recognize'
                  type='button'
                  onClick={() => openHighlight(highlight)}
                  aria-label={`View details about ${highlight.title}`}
                >
                  {thumbnail}
                </button>
              )}
              <div className='video-info'>
                <Image
                  className='company-avatar'
                  src={highlight.logo}
                  alt=''
                  width={34}
                  height={34}
                />
                <div>
                  {highlight.url ? (
                    <a
                      className='video-title'
                      href={highlight.url}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {highlight.title}
                    </a>
                  ) : (
                    <button
                      className='video-title'
                      type='button'
                      onClick={() => openHighlight(highlight)}
                    >
                      {highlight.title}
                    </button>
                  )}
                  <p>{highlight.publisher}</p>
                  <p>
                    <time dateTime={highlight.publishedAt}>
                      {highlight.date}
                    </time>
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <dialog
        ref={dialogRef}
        aria-labelledby='highlight-dialog-title'
        onClose={() => setActiveHighlight(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        {activeHighlight && (
          <div className='project-detail'>
            <p>
              {activeHighlight.publisher} · {activeHighlight.date}
            </p>
            <h2 id='highlight-dialog-title'>{activeHighlight.title}</h2>
            {activeHighlight.description && (
              <p>{activeHighlight.description}</p>
            )}
          </div>
        )}
        <button
          className='icon-button dialog-close'
          type='button'
          onClick={() => dialogRef.current?.close()}
          aria-label='Close highlight'
        >
          <svg>
            <use href='#close' />
          </svg>
        </button>
      </dialog>
    </section>
  );
}
