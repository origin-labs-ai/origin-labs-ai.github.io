import Link from "next/link";

import { LogoA } from "@/components/brand";
import type { ComingSoonNote } from "@/types/content";

type ComingSoonProps = {
  label: string;
  note: ComingSoonNote;
};

export function ComingSoon({ label, note }: ComingSoonProps) {
  return (
    <section className="origin-coming">
      <LogoA aria-hidden="true" className="origin-coming-watermark" />

      <div className="origin-coming-inner">
        <p className="origin-coming-eyebrow">
          <span className="origin-coming-dot" aria-hidden="true" />
          Coming soon
        </p>

        <h1 className="origin-coming-title">{label}</h1>

        <p className="origin-coming-body">{note.body}</p>

        {note.contact ? (
          <p className="origin-coming-contact">
            Press inquiries:{" "}
            <a href={note.contact.href}>{note.contact.label}</a>
          </p>
        ) : null}

        <div className="origin-coming-actions">
          <Link href="/" className="origin-coming-button">
            Back to home
          </Link>
        </div>

        <div className="origin-coming-meta">
          <span>Origin</span>
          <span className="origin-coming-rule" aria-hidden="true" />
          <span>Independent AI research and product studio</span>
        </div>
      </div>
    </section>
  );
}
