(() => {
  if (!window.__spaModules) window.__spaModules = Object.create(null);

  window.__spaModules["/"] = ({ mount }) => {
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
})();
