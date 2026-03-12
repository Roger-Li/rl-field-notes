# RL Field Notes

A new dad's knowledge hub — guides, reading notes, and lessons learned in the first year of parenting.

The name is a nod to **Reinforcement Learning**: parenting is trial, error, and reward signals. Every day is a new episode.

**Live site:** [rl-field-notes.vercel.app](https://rl-field-notes.vercel.app)

## Content

| Section | Description |
|---------|-------------|
| **Guides** | Original write-ups on topics like the first week home |
| **Reading Notes** | Summaries of parenting books with actionable takeaways |

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, static export)
- [MDX](https://mdxjs.com/) for content pages
- [Tailwind CSS 4](https://tailwindcss.com/) + `@tailwindcss/typography`
- [Giscus](https://giscus.app/) for GitHub-Discussions-backed comments
- Deployed on [Vercel](https://vercel.com/)

## Adding new content

1. **New guide** — create `app/guides/<slug>/page.mdx` (or `.tsx`)
2. **New reading notes** — create `app/reading-notes/<slug>/page.mdx`
3. Add a `ContentCard` entry to the relevant index page (`app/guides/page.tsx` or `app/reading-notes/page.tsx`) and optionally to the home page (`app/page.tsx`)
4. Push — Vercel auto-deploys

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint
```

## Contributing

Leave a comment via Giscus on any page, or [open an issue](https://github.com/Roger-Li/rl-field-notes/issues).

## License

Content is shared for educational purposes. Please attribute if you republish.
