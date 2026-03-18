const app = document.getElementById("app");

const registry = (() => {
  if (!window.__spaModules) window.__spaModules = Object.create(null);
  return window.__spaModules;
})();

const getRoute = () => {
  const raw = window.location.hash || "#/";
  if (!raw.startsWith("#/")) return "/";
  const path = raw.slice(1);
  return path || "/";
};

const setRoute = (path) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  window.location.hash = `#${normalized}`;
};

const isInternalNav = (href) => typeof href === "string" && href.startsWith("#/");

const renderLoading = () => {
  if (!app) return;
  app.innerHTML = `<section class="view view-loading" aria-label="加载中"><div class="container"><p class="loading">加载中…</p></div></section>`;
};

const renderError = (message, retry) => {
  if (!app) return;
  const safe = message || "模块加载失败";
  app.innerHTML = `
    <section class="view view-error" aria-label="加载失败">
      <div class="container">
        <h1 class="error-title">加载失败</h1>
        <p class="error-desc">${safe}</p>
        <button class="button button-primary" type="button" id="retryBtn">重试</button>
        <a class="button" href="#/">返回封面</a>
      </div>
    </section>
  `;
  const btn = document.getElementById("retryBtn");
  if (btn) btn.addEventListener("click", retry);
};

const scriptPromises = Object.create(null);

const loadScriptOnce = (src) => {
  if (scriptPromises[src]) return scriptPromises[src];

  scriptPromises[src] = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`脚本加载失败：${src}`));
    document.head.appendChild(s);
  });

  return scriptPromises[src];
};

const moduleSrcByRoute = {
  "/": null,
  "/work": "./modules/work.js",
  "/about": "./modules/about.js",
  "/contact": "./modules/contact.js",
  "/notfound": "./modules/notfound.js",
};

const ensureModule = async (route) => {
  if (registry[route]) return;

  const src = moduleSrcByRoute[route] || moduleSrcByRoute["/notfound"];
  if (!src) return;

  await loadScriptOnce(src);
  if (registry[route]) return;
  if (route !== "/notfound" && registry["/notfound"]) return;
  throw new Error("模块入口缺失");
};

const renderHome = ({ mount }) => {
  mount.innerHTML = `
    <section class="landing view" aria-label="主页面">
      <div class="landing-inner">
        <p class="landing-kicker">VISUAL COMMUNICATION DESIGN</p>
        <nav class="landing-nav" aria-label="模块导航">
          <a class="landing-link" href="#/work">WORK</a>
          <a class="landing-link" href="#/about">ABOUT</a>
          <a class="landing-link" href="#/contact">CONTACT</a>
        </nav>
        <p class="landing-caption">留白即内容 · Minimal, but precise.</p>
      </div>
    </section>
  `;
  return null;
};

let cleanup = null;
let currentRoute = null;

const renderRoute = async () => {
  if (!app) return;

  const route = getRoute();
  currentRoute = route;

  if (cleanup) {
    try {
      cleanup();
    } catch {}
    cleanup = null;
  }

  if (route === "/") {
    cleanup = renderHome({ mount: app, route, navigate: setRoute }) || null;
    app.focus();
    return;
  }

  renderLoading();

  try {
    await ensureModule(route);
    if (currentRoute !== route) return;

    const mod = registry[route] || registry["/notfound"];
    if (typeof mod !== "function") throw new Error("模块入口缺失");

    cleanup = mod({ mount: app, route, navigate: setRoute }) || null;
    app.focus();
  } catch (e) {
    if (currentRoute !== route) return;
    const msg = e instanceof Error ? e.message : String(e);
    renderError(msg, () => renderRoute());
  }
};

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const link = target?.closest("a");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!isInternalNav(href)) return;
  event.preventDefault();
  setRoute(href.slice(1));
});

window.addEventListener("hashchange", renderRoute);

if (!window.location.hash) setRoute("/");
renderRoute();
