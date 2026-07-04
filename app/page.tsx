import Link from "next/link";
import Clock from "./clock";

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
          that make software feel considered. When I&rsquo;m not pushing
          pixels, I&rsquo;m usually{" "}
          <Link className="basic-link" href="/reading">
            reading
          </Link>
          .
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

      <footer className="footer">
        <div className="footer-inner">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
