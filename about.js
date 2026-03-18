(() => {
  if (!window.__spaModules) window.__spaModules = Object.create(null);

  window.__spaModules["/about"] = ({ mount }) => {
    mount.innerHTML = `
      <section class="section about view" aria-label="关于我">
        <div class="container about-inner">
          <div class="about-left">
            <p class="about-kicker">ABOUT ME</p>
            <h2 class="about-title">关于我</h2>
            <p class="about-text">
              我是一名视觉传达方向的设计学生，偏好克制的视觉表达与清晰的信息层级。擅长以系统化方法组织版式与视觉规范，在品牌、包装、IP与数字界面等方向保持一致性与可延展性。
            </p>
            <p class="about-text">
              我重视“留白即内容”的节奏控制，也关注细节的可读性与落地性。希望通过作品呈现审美、逻辑与执行的统一。
            </p>
            <div class="about-pills" role="list" aria-label="能力标签">
              <div class="pill" role="listitem">品牌视觉</div>
              <div class="pill" role="listitem">包装设计</div>
              <div class="pill" role="listitem">IP形象</div>
              <div class="pill" role="listitem">版式系统</div>
            </div>
          </div>
        </div>
      </section>
    `;

    return null;
  };
})();
