interface FooterProps {
  backToTopHref?: string;
  className?: string;
}

export function Footer({
  backToTopHref = "#",
  className = "",
}: FooterProps) {
  return (
    <footer
      className={`pt-8 pb-16 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-subtle-foreground ${className}`}
    >
      <div>
        <span>Shravani Sutar Portfolio </span>
        <span className="mx-2">&bull;</span>
        <span>2026</span>
      </div>
      <div className="flex items-center gap-4">
        <a href={backToTopHref} className="hover:text-foreground transition-colors">
          Back to top &uarr;
        </a>
      </div>
    </footer>
  );
}

export default Footer;
