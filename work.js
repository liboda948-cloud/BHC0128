(() => {
  if (!window.__spaModules) window.__spaModules = Object.create(null);

  const encodePath = (path) => {
    try {
      return encodeURI(path);
    } catch {
      return path;
    }
  };

  const works = [
    {
      title: "纳殷古城IP形象设计",
      tag: "IP / 角色设定",
      desc: "以统一形体语言与配色体系，完成IP角色与延展。",
      images: [
        "./纳殷古城IP形象设计/1.jpg",
        "./纳殷古城IP形象设计/2.jpg",
        "./纳殷古城IP形象设计/3.jpg",
        "./纳殷古城IP形象设计/4.jpg",
      ],
    },
    {
      title: "桃渚古城IP形象设计",
      tag: "IP / 角色设定",
      desc: "围绕场景与故事线，建立IP识别与视觉延展。",
      images: ["./桃渚古城IP形象设计/1.jpg", "./桃渚古城IP形象设计/2.jpg", "./桃渚古城IP形象设计/3.jpg"],
    },
    {
      title: "针对于盲人的智能调味瓶设计",
      tag: "Product / 工业设计",
      desc: "以可触知信息与交互反馈为核心，提升无障碍使用体验。",
      images: [
        "./针对于盲人的智能调味瓶设计/1.jpg",
        "./针对于盲人的智能调味瓶设计/2.jpg",
        "./针对于盲人的智能调味瓶设计/3.jpg",
        "./针对于盲人的智能调味瓶设计/4.jpg",
        "./针对于盲人的智能调味瓶设计/5.jpg",
        "./针对于盲人的智能调味瓶设计/6.jpg",
      ],
    },
    {
      title: "“稻野原香”大米包装设计",
      tag: "Packaging / 包装",
      desc: "以主视觉与信息层级统一包装体系，强化货架识别。",
      images: [
        "./“稻野原香”大米包装设计/1.jpg",
        "./“稻野原香”大米包装设计/2.jpg",
        "./“稻野原香”大米包装设计/3.jpg",
        "./“稻野原香”大米包装设计/4.jpg",
        "./“稻野原香”大米包装设计/5.jpg",
      ],
    },
    {
      title: "松辞白酒包装设计",
      tag: "Packaging / 白酒",
      desc: "以材质与版式秩序建立高级克制的品牌气质。",
      images: [
        "./松辞白酒包装设计/1.jpg",
        "./松辞白酒包装设计/2.jpg",
        "./松辞白酒包装设计/3.jpg",
        "./松辞白酒包装设计/4.jpg",
        "./松辞白酒包装设计/5.jpg",
      ],
    },
    {
      title: "瓷韵新译",
      tag: "Visual / 视觉叙事",
      desc: "以视觉语言重构文化意象，建立统一的呈现体系。",
      images: ["./瓷韵新译/1.jpg", "./瓷韵新译/2.jpg", "./瓷韵新译/3.jpg"],
    },
    {
      title: "仙玉叶茶叶包装设计",
      tag: "Packaging / 茶叶",
      desc: "在低饱和中建立质感对比，突出品牌识别与信息层级。",
      images: [
        "./仙玉叶茶叶包装设计/1.png",
        "./仙玉叶茶叶包装设计/2.png",
        "./仙玉叶茶叶包装设计/3.png",
        "./仙玉叶茶叶包装设计/4.png",
      ],
    },
    {
      title: "悠悠酸奶包装设计",
      tag: "Packaging / 食品",
      desc: "以简洁信息架构与主视觉统一系列包装表达。",
      images: [
        "./悠悠酸奶包装设计/悠悠酸奶.118.jpg",
        "./悠悠酸奶包装设计/悠悠酸奶.122.jpg",
        "./悠悠酸奶包装设计/ee9c7ae773ac745de886ab045fe839c.png",
      ],
    },
  ];

  window.__spaModules["/work"] = ({ mount }) => {
    mount.innerHTML = `
      <section class="section works view" aria-label="作品展示">
        <div class="container">
          <div class="section-head">
            <h2 class="section-title">WORK</h2>
          </div>
          <div class="works-grid" role="list">
            ${works
              .map((w, idx) => {
                const cover = w.images[0] ? encodePath(w.images[0]) : "";
                const title = w.title.replaceAll('"', "&quot;");
                const tag = w.tag.replaceAll('"', "&quot;");
                return `
                  <article class="work" role="listitem" tabindex="0" aria-label="打开作品：${title}" data-index="${idx}">
                    <figure class="work-media" aria-hidden="true">
                      <img alt="${title} 封面" loading="lazy" src="${cover}" />
                    </figure>
                    <div class="work-overlay">
                      <p class="work-tag">${tag}</p>
                      <h3 class="work-title">${title}</h3>
                      <p class="work-desc">点击查看</p>
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>

      <div class="lightbox" id="lightbox" hidden>
        <div class="lightbox-backdrop" data-lightbox-close></div>
        <div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="作品预览">
          <button class="lightbox-close" type="button" data-lightbox-close aria-label="关闭">关闭</button>
          <div class="lightbox-meta">
            <p class="lightbox-tag" id="lightboxTag"></p>
            <h2 class="lightbox-title" id="lightboxTitle"></h2>
            <p class="lightbox-desc" id="lightboxDesc"></p>
            <p class="lightbox-count" id="lightboxCount"></p>
          </div>
          <div class="lightbox-stage">
            <button class="lightbox-nav" type="button" data-lightbox-prev aria-label="上一张">←</button>
            <img class="lightbox-image" id="lightboxImage" alt="" />
            <button class="lightbox-nav" type="button" data-lightbox-next aria-label="下一张">→</button>
          </div>
        </div>
      </div>
    `;

    const lightbox = mount.querySelector("#lightbox");
    const imgEl = mount.querySelector("#lightboxImage");
    const titleEl = mount.querySelector("#lightboxTitle");
    const tagEl = mount.querySelector("#lightboxTag");
    const descEl = mount.querySelector("#lightboxDesc");
    const countEl = mount.querySelector("#lightboxCount");

    if (!lightbox || !imgEl || !titleEl || !tagEl || !descEl || !countEl) return null;

    const closeTargets = Array.from(lightbox.querySelectorAll("[data-lightbox-close]"));
    const prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    const nextBtn = lightbox.querySelector("[data-lightbox-next]");
    const dialog = lightbox.querySelector(".lightbox-dialog");

    let images = [];
    let index = 0;
    let lastFocused = null;

    const setStage = () => {
      const total = images.length;
      if (total === 0) return;
      const safeIndex = ((index % total) + total) % total;
      index = safeIndex;

      imgEl.src = encodePath(images[index]);
      countEl.textContent = total > 1 ? `${index + 1} / ${total}` : "";

      const disableNav = total <= 1;
      if (prevBtn) prevBtn.disabled = disableNav;
      if (nextBtn) nextBtn.disabled = disableNav;
    };

    const open = (work, startIndex = 0) => {
      const list = Array.isArray(work?.images) ? work.images : [];
      if (list.length === 0) return;
      images = list;
      index = startIndex;

      titleEl.textContent = work?.title || "";
      tagEl.textContent = work?.tag || "";
      descEl.textContent = work?.desc || "";

      lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      document.body.style.overflow = "hidden";
      lightbox.hidden = false;
      setStage();

      const focusEl = lightbox.querySelector(".lightbox-close");
      if (focusEl instanceof HTMLElement) focusEl.focus();
    };

    const close = () => {
      lightbox.hidden = true;
      imgEl.removeAttribute("src");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
      lastFocused = null;
      images = [];
      index = 0;
    };

    const go = (dir) => {
      if (images.length <= 1) return;
      index += dir;
      setStage();
    };

    const onPrev = () => go(-1);
    const onNext = () => go(1);

    const onKeydown = (event) => {
      if (lightbox.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
        return;
      }

      if (event.key === "Tab" && dialog) {
        const focusable = Array.from(
          dialog.querySelectorAll(
            'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el instanceof HTMLElement);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        }
      }
    };

    const onClickWork = (event) => {
      const card = event.target instanceof Element ? event.target.closest(".work") : null;
      if (!card) return;
      const idx = Number(card.getAttribute("data-index"));
      if (!Number.isFinite(idx) || !works[idx]) return;
      open(works[idx], 0);
    };

    const onKeyOpen = (event) => {
      if (!(event.target instanceof Element)) return;
      const card = event.target.closest(".work");
      if (!card) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const idx = Number(card.getAttribute("data-index"));
      if (!Number.isFinite(idx) || !works[idx]) return;
      open(works[idx], 0);
    };

    closeTargets.forEach((el) => el.addEventListener("click", close));
    if (prevBtn) prevBtn.addEventListener("click", onPrev);
    if (nextBtn) nextBtn.addEventListener("click", onNext);
    mount.addEventListener("click", onClickWork);
    mount.addEventListener("keydown", onKeyOpen);
    document.addEventListener("keydown", onKeydown);

    return () => {
      closeTargets.forEach((el) => el.removeEventListener("click", close));
      if (prevBtn) prevBtn.removeEventListener("click", onPrev);
      if (nextBtn) nextBtn.removeEventListener("click", onNext);
      mount.removeEventListener("click", onClickWork);
      mount.removeEventListener("keydown", onKeyOpen);
      document.removeEventListener("keydown", onKeydown);
      close();
    };
  };
})();
