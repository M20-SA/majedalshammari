# Majed Al-Shammari — Journal

A lightweight, static journal that matches the visual identity of the main portfolio.

## Installation

Upload the complete `blog` folder to the root of the website repository, next to `index.html`.

The journal will be available at:

`https://your-domain.com/blog/`

## Add an article

1. Create a Markdown file inside `blog/posts/`, for example `my-article.md`.
2. Add an object to the `posts` array in `blog/posts.json`:

```json
{
  "slug": "my-article",
  "file": "my-article.md",
  "title": "My Article Title",
  "description": "A short summary of the article.",
  "date": "2026-11-17",
  "category": "Cybersecurity",
  "published": true,
  "tags": ["CTI", "OSINT"]
}
```

3. Commit and push the changes to GitHub Pages.

The journal displays every published article in one continuous list. Categories are labels only; there are no category tabs or separate sections. The search field searches titles, descriptions, categories, and tags.

## Notes

- No backend or database is required.
- Markdown is rendered using Marked and sanitized with DOMPurify, both loaded from public CDNs.
- Keep `posts.json` valid JSON.
