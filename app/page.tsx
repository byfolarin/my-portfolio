import Clock from "./clock";
import { books } from "./books";

export default function Home() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <h1>Folarin Folarin</h1>
          <time>Updated Jul 4, 2026</time>
        </header>
        <p>I&rsquo;m a product designer based in Lagos, Nigeria.</p>
        <p>
          I currently lead design at{" "}
          <a
            className="basic-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://kredete.com"
          >
            Kredete
          </a>
          , where we help Africans build credit and move money across
          borders. Along the way I&rsquo;ve designed brands, design systems,
          and products for teams across fintech and beyond.
        </p>
        <p>
          I care deeply about craft — type, spacing, and the small details
          that make software feel considered. Lately I&rsquo;ve been turning
          that obsession into books.
        </p>
        <p>
          You can find me on{" "}
          <a
            className="basic-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/byfolarin"
          >
            GitHub
          </a>
          , or reach me via{" "}
          <a className="basic-link" href="mailto:folarin@kredete.com">
            email
          </a>
          .
        </p>
      </article>

      <section className="books">
        <h3>Books</h3>
        <div className="books-grid">
          {books.map((book) => {
            const cover = (
              <div
                className="book-cover"
                style={
                  {
                    "--cover-bg": book.bg,
                    "--cover-fg": book.fg,
                  } as React.CSSProperties
                }
              >
                {book.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.cover} alt={`Cover of ${book.title}`} />
                ) : (
                  <div className="book-cover-text">
                    <span className="book-cover-title">{book.title}</span>
                    <span className="book-cover-author">Folarin</span>
                  </div>
                )}
              </div>
            );

            const meta = (
              <div className="book-meta">
                <h2>{book.title}</h2>
                <time>{book.year}</time>
              </div>
            );

            return book.href ? (
              <a
                key={book.title}
                className="book"
                href={book.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cover}
                {meta}
              </a>
            ) : (
              <div key={book.title} className="book">
                {cover}
                {meta}
              </div>
            );
          })}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
