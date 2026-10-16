# HER NEXT — Her Next Ascent + HER NEXT 2.0 app

Live domain: https://hernextschool.com/

Artifact (static preview) build steps: see `artifact-build/HANDOFF.md`.

AI business school for Korean women in America (bilingual Korean/English).

## Run it
~~~
bun install
bun run dev
~~~
Then open http://localhost:8080

## Notes
- .env holds only public backend values (publishable key + project URL). No secret keys are included.
- The backend (auth, database, storage) is a hosted Lovable Cloud project, so sign-up and the app work as-is.
- AI features call the hosted AI gateway from server functions in src/lib.
- Public marketing pages: /, /about, /story, /program, /curriculum, /programs, /planner, /notes, /contact
- The signed-in app lives under /start and /app (Discover Me, My Business, Find My Next, Action Studio, Coach, Vault, My Week, Progress).
