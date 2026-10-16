<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- The member app lives under `/app` inside the `_authenticated` layout (client-only gate); public marketing pages stay outside it so they remain SSR/SEO friendly.
- Coach workflows, onboarding questions, memory sections and vault folders are data definitions in `src/lib/workflows.ts`; add new workflows there rather than new screens.
- AI calls go through authenticated server functions in `src/lib/hn.functions.ts` with a per-user daily usage cap stored in `ai_usage`, to bound credit spend.
