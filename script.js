const games = [
  {
    id: "business-clicker",
    title: "Business Clicker",
    description: "Build a corporate empire one tap at a time and automate your way to billions.",
    category: "Strategy",
    featured: true,
    thumbnail: "💼",
    icon: "icons/business-clicker.svg",
    accent: "linear-gradient(135deg, #2dd4bf, #2563eb)",
    path: "./games/businessclicker/index.html"
  },
  {
    id: "tiny-royale",
    title: "Tiny Royale",
    description: "Jump into fast-paced battles, loot smart, and survive the chaos in a tiny arena.",
    category: "Action",
    featured: true,
    thumbnail: "⚔️",
    icon: "icons/tiny-royale.svg",
    accent: "linear-gradient(135deg, #fb923c, #ef4444)",
    path: "./games/tinyroyale/index.html"
  },
  {
    id: "racer",
    title: "Racer",
    description: "Race through glowing city grids and master tight turns in a slick arcade sprint.",
    category: "Arcade",
    featured: false,
    thumbnail: "🏎️",
    icon: "icons/racer.svg",
    accent: "linear-gradient(135deg, #818cf8, #ec4899)",
    path: "./games/racer/index.html"
  },
  {
    id: "campfire-and-crown",
    title: "Campfire and Crown",
    description: "A cozy yet competitive adventure — gather, craft, and claim your crown.",
    category: "Arcade",
    featured: true,
    thumbnail: "🔥👑",
    icon: "icons/campfire-and-crown.svg",
    accent: "linear-gradient(135deg, #f97316, #f43f5e)",
    path: "./games/campfire-and-crown/index.html"
  },
  {
    id: "pizza-monster",
    title: "Pizza Monster",
    description: "Chomp pizzas, dodge oven hazards, and grow into the ultimate pizza monster.",
    category: "Arcade",
    featured: true,
    thumbnail: "🍕",
    icon: "icons/pizza-monster.svg",
    accent: "linear-gradient(135deg, #f97316, #f59e0b)",
    path: "./games/pizza-monster/index.html"
  }
];

const featuredRoot = document.getElementById("featured-games");
const allGamesRoot = document.getElementById("all-games");
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
  const thumb = game.icon
    ? `<img src="${game.icon}" alt="${game.title} icon" loading="lazy">`
    : game.thumbnail;

  return `
    <article class="game-card">
      <span class="status-pill">${game.featured ? "Featured" : "New"}</span>
      <div class="thumb" style="background: ${game.accent}">${thumb}</div>
      <div class="card-meta">
        <span>${game.category}</span>
        <span>${game.featured ? "Featured" : "Classic"}</span>
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

  const allGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(search) || game.description.toLowerCase().includes(search);
    const matchesCategory = activeCategory === "All" || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  featuredRoot.innerHTML = featuredGames.length
    ? featuredGames.map(createCardMarkup).join("")
    : '<div class="empty-state">No featured games match that search yet.</div>';

  allGamesRoot.innerHTML = allGames.length
    ? allGames.map(createCardMarkup).join("")
    : '<div class="empty-state">No games match that search yet.</div>';
}

searchInput.addEventListener("input", renderGames);

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 700);
});

renderCategoryFilters();
renderGames();
