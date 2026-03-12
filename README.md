# RL Field Notes

A bilingual new-dad knowledge hub with guides, reading notes, and lessons learned in the first year of parenting.

The name is a nod to **Reinforcement Learning**: parenting is trial, error, and reward signals. Every day is a new episode.

**Live site:** [rl-field-notes.vercel.app](https://rl-field-notes.vercel.app)

## Languages

- English lives at the root routes, for example `/guides/first-week`
- Simplified Chinese lives under `/zh`, for example `/zh/guides/first-week`
- Both locales are statically generated and deploy cleanly on Vercel free tier
- English and Chinese versions of the same article share one Giscus discussion thread

## Content

| Section | Description |
|---------|-------------|
| **Guides** | Original write-ups on topics like the first week home |
| **Reading Notes** | Summaries of parenting books with actionable takeaways |

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, statically generated routes)
- [MDX](https://mdxjs.com/) for content pages
- [Tailwind CSS 4](https://tailwindcss.com/) + `@tailwindcss/typography`
- [Giscus](https://giscus.app/) for GitHub-Discussions-backed comments
- Deployed on [Vercel](https://vercel.com/)

## Project structure

- `app/(en)/` — English routes and layouts
- `app/zh/` — Simplified Chinese routes and layouts
- `content/` — interactive long-form client content used by thin route wrappers
- `components/` — shared React components
- `lib/i18n.ts` — locale helpers and path mapping
- `lib/site-copy.ts` — shared translated UI copy
- `lib/content.ts` — content card metadata and public route list used by the sitemap

## Adding or updating content

1. Create or update the English source under `app/(en)/...` or `content/...` for interactive pages.
2. Create or update the matching Chinese source under `app/zh/...` with the same slug.
3. Add page metadata with `createPageMetadata(...)` and, for new public routes, add the pathname to `publicPagePaths` in `lib/content.ts`.
4. If the page should appear in cards or listings, add its localized card data in `lib/content.ts` and surface it from the relevant index/home page.
5. Include `GiscusComments` on both locales using the same English canonical `term`, for example `term="/guides/first-week"`.

## Translation workflow

- English is the editorial source of truth
- Chinese pages are authored as separate committed content, not runtime-translated
- Use AI to draft translations if helpful, but review them manually before publishing
- Do not publish a Chinese page that silently reuses an English article body

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs and sitemap entries point at the correct domain.

## Contributing

Leave a comment via Giscus on any page, or [open an issue](https://github.com/Roger-Li/rl-field-notes/issues).

## License

Content is shared for educational purposes. Please attribute if you republish.
