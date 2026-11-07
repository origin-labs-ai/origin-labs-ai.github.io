import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events \\ Anthropic",
};

export default function EventsPage() {
  return (
    <iframe
      src="/sites/anthropic/webflow/events.html"
      title="Events"
      className="webflow-frame"
    />
  );
}
