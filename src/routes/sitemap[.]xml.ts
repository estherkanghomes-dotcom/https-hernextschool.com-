import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://hernextschool.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          { loc: "/", priority: "1.0" },
          { loc: "/about", priority: "0.8" },
          { loc: "/programs", priority: "0.9" },
          { loc: "/program", priority: "0.9" },
          { loc: "/curriculum", priority: "0.8" },
          { loc: "/picks", priority: "0.8" },
          { loc: "/stories", priority: "0.7" },
          { loc: "/story", priority: "0.7" },
          { loc: "/resources", priority: "0.7" },
          { loc: "/contact", priority: "0.8" },
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map(
            (p) =>
              `  <url>\n    <loc>${BASE_URL}${p.loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});