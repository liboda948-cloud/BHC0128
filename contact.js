(() => {
  if (!window.__spaModules) window.__spaModules = Object.create(null);

  window.__spaModules["/contact"] = ({ mount }) => {
    const year = String(new Date().getFullYear());

    mount.innerHTML = `
      <footer class="footer view" aria-label="联系方式">
        <div class="container footer-inner">
          <div class="footer-head">
            <h2 class="section-title">CONTACT</h2>
            <p class="section-desc">保持简洁的联系路径：邮箱优先，其次社交链接与PDF。</p>
          </div>
          <div class="footer-body">
            <a class="footer-link" href="mailto:3341366511@qq.com">3341366511@qq.com</a>
            <a class="footer-link" href="https://www.xiaohongshu.com/user/profile/4273133583" target="_blank" rel="noreferrer">
              小红书：4273133583
            </a>
            <a class="footer-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a class="button button-primary" href="./portfolio.pdf" download>下载 PDF</a>
          </div>
        </div>
        <div class="container footer-bottom">
          <p class="fineprint">© ${year}</p>
          <p class="fineprint">Built with restraint.</p>
        </div>
      </footer>
    `;

    return null;
  };
})();
