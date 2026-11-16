const $ = (selector) => document.querySelector(selector);
let posts = [];

const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

const formatDate = (value) => {
  const date = new Date((value || "") + "T12:00:00");
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
};

function renderPosts() {
  const query = $("#search").value.toLowerCase().trim();
  const visiblePosts = posts.filter((post) =>
    `${post.title} ${post.description} ${post.category} ${(post.tags || []).join(" ")}`
      .toLowerCase().includes(query)
  );

  $("#count").textContent = `${posts.length} ${posts.length === 1 ? "POST" : "POSTS"}`;
  $("#posts").innerHTML = visiblePosts.map((post) => `
    <article class="post">
      <time class="post-date" datetime="${escapeHTML(post.date || "")}">${escapeHTML(formatDate(post.date))}</time>
      <div class="post-main">
        <span class="post-category">${escapeHTML(post.category || "Perspective")}</span>
        <a class="post-title-link" href="article.html?slug=${encodeURIComponent(post.slug)}">
          <h3>${escapeHTML(post.title)}</h3>
        </a>
        <p>${escapeHTML(post.description || "")}</p>
        <a class="read" href="article.html?slug=${encodeURIComponent(post.slug)}">READ ARTICLE <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  `).join("");

  $("#empty").hidden = visiblePosts.length > 0;
  $("#empty").textContent = posts.length
    ? "No articles match your search."
    : "The first article is on its way.";
}

async function init() {
  $("#year").textContent = new Date().getFullYear();

  try {
    const response = await fetch("posts.json");
    if (!response.ok) throw new Error("Could not load articles.");
    const data = await response.json();
    posts = (data.posts || [])
      .filter((post) => post.published !== false)
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    renderPosts();
  } catch (error) {
    $("#count").textContent = "";
    $("#posts").innerHTML = "";
    $("#empty").textContent = "Articles could not be loaded. Please try again later.";
  }

  $("#search").addEventListener("input", renderPosts);
}

init();
