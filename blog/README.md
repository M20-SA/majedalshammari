# Blog folder

Copy this entire `blog` folder into the root of your website repository.

## Add an article

1. Create a Markdown file inside `blog/posts/`, for example `my-article.md`.
2. Add an object to the `posts` array in `blog/posts.json`:

```json
{
  "slug": "my-article",
  "file": "my-article.md",
  "title": "My Article Title",
  "description": "A short summary.",
  "date": "2026-11-17",
  "category": "Cybersecurity",
  "published": true,
  "tags": ["CTI", "OSINT"]
}
```

3. Push the changes to GitHub Pages.

Supported categories: `Technology`, `Cybersecurity`, `Intelligence`, `Perspectives`.

Markdown is rendered in the browser using Marked and sanitized with DOMPurify (both loaded from public CDNs).
