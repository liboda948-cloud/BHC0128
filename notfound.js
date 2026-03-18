(() => {
  if (!window.__spaModules) window.__spaModules = Object.create(null);

  window.__spaModules["/notfound"] = ({ mount }) => {
    mount.innerHTML = `
      <section class="view view-error" aria-label="页面不存在">
        <div class="container">
          <h1 class="error-title">404</h1>
          <p class="error-desc">页面不存在</p>
          <a class="button button-primary" href="#/">返回封面</a>
        </div>
      </section>
    `;
    return null;
  };
})();
