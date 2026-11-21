import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/page/coming-soon-page";

export const metadata: Metadata = {
  title: "Events \\ Origin",
  description:
    "Origin events are coming soon. Summits, gatherings, and recordings will be listed here.",
};

export default function EventsPage() {
  return (
    <ComingSoonPage
      label="Events"
      note={{
        body: "Our events calendar is being rebuilt. Upcoming gatherings, summits, and recordings will be listed here soon.",
      }}
    />
  );
}
