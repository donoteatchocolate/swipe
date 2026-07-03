const games = [
  {
    id: "business-clicker",
    title: "Business Clicker",
    description: "Build a corporate empire one tap at a time and automate your way to billions.",
    category: "Strategy",
    featured: true,
    trending: true,
    thumbnail: "💼",
    accent: "linear-gradient(135deg, #2dd4bf, #2563eb)",
    path: "./games/businessclicker/index.html"
  },
  {
    id: "tiny-royale",
    title: "Tiny Royale",
    description: "Jump into fast-paced battles, loot smart, and survive the chaos in a tiny arena.",
    category: "Action",
    featured: true,
    trending: true,
    thumbnail: "⚔️",
    accent: "linear-gradient(135deg, #fb923c, #ef4444)",
    path: "./games/tinyroyale/index.html"
  },
  {
    id: "neon-drift",
    title: "Neon Drift",
    description: "Race through glowing city grids and master tight turns in a slick arcade sprint.",
    category: "Arcade",
    featured: false,
    trending: true,
    thumbnail: "🏎️",
    accent: "linear-gradient(135deg, #818cf8, #ec4899)",
    path: "./games/neon-drift/index.html"
  },
  {
    id: "sky-hopper",
    title: "Sky Hopper",
    description: "Bounce between floating platforms and chase the highest score in the clouds.",
    category: "Puzzle",
    featured: false,
    trending: false,
    thumbnail: "☁️",
    accent: "linear-gradient(135deg, #38bdf8, #14b8a6)",
    path: "./games/sky-hopper/index.html"
  }
];

const featuredRoot = document.getElementById("featured-games");
const trendingRoot = document.getElementById("trending-games");
const categoryRoot = document.getElementById("category-filters");
const searchInput = document.getElementById("search-input");
const loadingScreen = document.getElementById("loading-screen");

let activeCategory = "All";

function renderCategoryFilters() {
  const categories = ["All", ...new Set(games.map((game) => game.category))];

  categoryRoot.innerHTML = categories
    .map((category) => {
      const isActive = category === activeCategory;
      return `<button class="filter-chip ${isActive ? "active" : ""}" data-category="${category}">${category}</button>`;
    })
    .join("");

  categoryRoot.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderGames();
      renderCategoryFilters();
    });
  });
}

function createCardMarkup(game) {
  return `
    <article class="game-card">
      <span class="status-pill">${game.featured ? "Featured" : "New"}</span>
      <div class="thumb" style="background: ${game.accent}">${game.thumbnail}</div>
      <div class="card-meta">
        <span>${game.category}</span>
        <span>${game.trending ? "Trending" : "Classic"}</span>
      </div>
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <a class="play-btn" href="${game.path}">Play</a>
    </article>
  `;
}

function renderGames() {
  const search = searchInput.value.trim().toLowerCase();

  const featuredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(search) || game.description.toLowerCase().includes(search);
    const matchesCategory = activeCategory === "All" || game.category === activeCategory;
    return game.featured && matchesSearch && matchesCategory;
  });

  const trendingGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(search) || game.description.toLowerCase().includes(search);
    const matchesCategory = activeCategory === "All" || game.category === activeCategory;
    return game.trending && matchesSearch && matchesCategory;
  });

  featuredRoot.innerHTML = featuredGames.length
    ? featuredGames.map(createCardMarkup).join("")
    : '<div class="empty-state">No featured games match that search yet.</div>';

  trendingRoot.innerHTML = trendingGames.length
    ? trendingGames.map(createCardMarkup).join("")
    : '<div class="empty-state">No trending games match that search yet.</div>';
}

searchInput.addEventListener("input", renderGames);

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 700);
});

renderCategoryFilters();
renderGames();
