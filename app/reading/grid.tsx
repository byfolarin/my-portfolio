"use client";

import { useEffect, useRef, useState } from "react";
import { books, palettes, type Book } from "./books";

const PAGE_SIZE = 10;

function BookCard({ book, index }: { book: Book; index: number }) {
  const palette = palettes[index % palettes.length];

  const cover = (
    <div
      className="book-cover"
      style={
        {
          "--cover-bg": palette.bg,
          "--cover-fg": palette.fg,
        } as React.CSSProperties
      }
    >
      {book.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={book.cover} alt={`Cover of ${book.title}`} />
      ) : (
        <div className="book-cover-text">
          <span className="book-cover-title">{book.title}</span>
          <span className="book-cover-author">{book.author}</span>
        </div>
      )}
    </div>
  );

  const meta = (
    <div className="book-meta">
      <h2>{book.title}</h2>
      <p>{book.author}</p>
    </div>
  );

  const style = {
    animationDelay: `${(index % PAGE_SIZE) * 0.04}s`,
  } as React.CSSProperties;

  return book.href ? (
    <a
      className="book"
      style={style}
      href={book.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {cover}
      {meta}
    </a>
  ) : (
    <div className="book" style={style}>
      {cover}
      {meta}
    </div>
  );
}

export default function ReadingGrid() {
  const [count, setCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const done = count >= books.length;

  useEffect(() => {
    if (done) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount((c) => Math.min(c + PAGE_SIZE, books.length));
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [count, done]);

  return (
    <>
      <div className="books-grid">
        {books.slice(0, count).map((book, i) => (
          <BookCard key={`${book.title}-${i}`} book={book} index={i} />
        ))}
      </div>
      {!done && (
        <div ref={sentinelRef} className="reading-more">
          <button
            type="button"
            onClick={() =>
              setCount((c) => Math.min(c + PAGE_SIZE, books.length))
            }
          >
            Load more
          </button>
        </div>
      )}
      <p className="reading-count">
        {Math.min(count, books.length)} of {books.length}
      </p>
    </>
  );
}
