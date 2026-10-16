import { createFileRoute, redirect } from "@tanstack/react-router";

// Merged into the single 프로그램 page — keep the old address working.
export const Route = createFileRoute("/program")({
  beforeLoad: () => {
    throw redirect({ to: "/programs", search: { s: "cohort" } });
  },
});
