const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

const formatDate = (value) => {
  const date = new Date((value || "") + "T12:00:00");
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(date);
};

async function init() {
  document.querySelector("#year").textContent = new Date().getFullYear();
  const root = document.querySelector("#article");
  const slug = new URLSearchParams(location.search).get("slug");

  try {
    if (!slug || !/^[a-z0-9-]+$/i.test(slug)) throw new Error("Article not found.");

    const response = await fetch("posts.json");
    if (!response.ok) throw new Error("Could not load the article list.");
    const data = await response.json();
    const post = (data.posts || []).find((item) => item.slug === slug && item.published !== false);
    if (!post) throw new Error("Article not found.");

    const articleResponse = await fetch("posts/" + encodeURIComponent(post.file || slug + ".md"));
    if (!articleResponse.ok) throw new Error("Article content is unavailable.");
    const markdown = await articleResponse.text();

    marked.setOptions({ gfm: true, breaks: false });
    document.title = `${post.title} — Majed's Journal`;
    document.querySelector('meta[name="description"]')
      ?.setAttribute("content", post.description || "");

    const readingTime = Math.max(1, Math.ceil(markdown.trim().split(/\s+/).length / 220));
    root.innerHTML = `
      <header class="article-head">
        <a class="back" href="./">← ALL ARTICLES</a>
        <div class="article-meta">${escapeHTML(post.category || "Perspective")} · ${escapeHTML(formatDate(post.date))} · ${readingTime} MIN READ</div>
        <h1>${escapeHTML(post.title)}</h1>
        <p class="deck">${escapeHTML(post.description || "")}</p>
        <div class="byline">WORDS BY MAJED AL-SHAMMARI</div>
      </header>
      <article class="prose">${DOMPurify.sanitize(marked.parse(markdown))}</article>
    `;
  } catch (error) {
    root.innerHTML = `<p class="empty">${escapeHTML(error.message)}<br><a class="read" href="./">BACK TO JOURNAL</a></p>`;
  }
}

init();
