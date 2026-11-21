import { ArrowRightIcon } from "@/components/brand";
import { TinyMoreButton } from "@/components/tiny-more";
import { announcements } from "@/content/home";
import { placeholderHref } from "@/lib/links";

const homeAnnouncements = announcements.map((announcement) => ({
  ...announcement,
  href: placeholderHref(announcement.href),
  categoryHref: placeholderHref(announcement.categoryHref),
  rows: announcement.rows.map((row) => ({
    ...row,
    href: placeholderHref(row.href),
  })),
}));

export function Announcements() {
  return (
    <section className="ZSMdoa_root ZSMdoa_flushTop" data-theme="ivory">
      <div className="Bo9kyq_container" data-component="CSSGrid.Container">
        <div className="fUM8lW_cards">
          {homeAnnouncements.map((announcement) => (
            <article className="fUM8lW_card" key={announcement.title}>
              <header className="nUeDbq_header fUM8lW_header">
                <div className="nUeDbq_headerButton">
                  <TinyMoreButton title={announcement.title} />
                </div>
                <p>
                  <a className="wN10Da_link" href={announcement.categoryHref}>
                    {announcement.category}
                  </a>
                </p>
                <time>{announcement.date}</time>
              </header>

              <div className="fUM8lW_titleBlock">
                <h3
                  className="tOQyXa_headline-5 fUM8lW_title"
                  data-component="Headline"
                >
                  <a className="fUM8lW_titleLink" href={announcement.href}>
                    {announcement.title}
                  </a>
                </h3>
                <p
                  className="tOQyXa_body-4 fUM8lW_description"
                  data-component="Body"
                >
                  {announcement.description}
                </p>
              </div>

              <dl className="fUM8lW_details">
                <div
                  className="fUM8lW_row fUM8lW_rowReserved"
                  aria-hidden="true"
                >
                  <span className="tOQyXa_body-4" data-component="Body">
                    &nbsp;
                  </span>
                </div>
                {announcement.rows.map((row) => (
                  <div className="fUM8lW_row" key={row.label}>
                    <dt>
                      <span className="tOQyXa_body-4" data-component="Body">
                        {row.label}
                      </span>
                    </dt>
                    <dd className="fUM8lW_links">
                      <a className="fUM8lW_link" href={row.href}>
                        <span className="tOQyXa_body-4" data-component="Body">
                          {row.linkLabel}
                        </span>
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <ArrowRightIcon width={16} height={16} />
                        </div>
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                data-component="AnchorButton"
                data-variant="secondary"
                className="f9ZZrG_button f9ZZrG_corner-small f9ZZrG_variant-secondary f9ZZrG_size-medium f9ZZrG_icon-format-trailing fUM8lW_cta"
                href={announcement.href}
              >
                Read announcement
                <span className="f9ZZrG_icon">
                  <ArrowRightIcon />
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
