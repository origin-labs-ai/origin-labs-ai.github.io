import { heroCopy } from "@/content/home";

export function Hero() {
  return (
    <section
      className="ZSMdoa_root ZSMdoa_flushBottom ZSMdoa_flushTop"
      data-theme="ivory"
    >
      <div
        className="Bo9kyq_container LOCOdG_onHomepage"
        data-component="CSSGrid.Container"
      >
        <h1 className="LOCOdG_text">
          <span className="LOCOdG_lead">{heroCopy.lead}</span>{" "}
          <span className="LOCOdG_statement">{heroCopy.statement}</span>
        </h1>
      </div>
    </section>
  );
}
