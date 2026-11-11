---
title: 增长黑客实践
published: 2026-11-10T09:30:00+08:00
description: 增长不是一招鲜：先把漏斗拆开找到最漏的那一段，再用小成本实验去撬，验证一次再放大一次。这篇记录实践里跑通过的做法、踩过的坑，以及「什么时候不该做增长」。
quote: 增长是放大器：它能让已经成立的事来得更快，却不会让不成立的事情变成立。
category: 案例
tags:
  - 增长
  - 增长黑客
  - 方法论
image: /assets/library/notes/growth-hacking/cover.webp
banner: /assets/library/notes/growth-hacking/banner.webp
draft: false
comment: false
hideSidebar: true
order: 16
# 内嵌 PPT：必买增长实战 38 页
deckPages: 108
---

## 一、从增长模型到增长实验


<div class="deck-viewer" data-deck-viewer tabindex="0"
     data-deck-base="/assets/library/notes/growth-hacking/decks/bimai"
     data-deck-pages='["01.webp","02.webp","03.webp","04.webp","05.webp","06.webp","07.webp","08.webp","09.webp","10.webp","11.webp","12.webp","13.webp","14.webp","15.webp","16.webp","17.webp","18.webp","19.webp","20.webp","21.webp","22.webp","23.webp","24.webp","25.webp","26.webp","27.webp","28.webp","29.webp","30.webp","31.webp","32.webp","33.webp","34.webp","35.webp","36.webp","37.webp","38.webp"]'
     aria-label="必买增长实战：从增长模型到增长实验 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/growth-hacking/decks/bimai/01.webp" alt="必买增长实战：从增长模型到增长实验 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 38</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
  </div>
</div>

<style>
  /* 本文专用：PPT 逐页切换 */
  .deck-lead { margin: 4px 0 10px; font-size: 14px; color: #6b7a72; }
  .deck-viewer {
    background: #f4f6f4;
    border: 1px solid #e0e8e2;
    border-radius: 12px;
    padding: 16px 16px 12px;
    margin: 10px 0 22px;
    outline: none;
  }
  .deck-viewer:focus-visible { border-color: #9ec3b1; }
  .deck-stage {
    background: #fff;
    border: 1px solid #e3ebe6;
    border-radius: 10px;
    overflow: hidden;
    line-height: 0;
    max-height: 72vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .deck-stage .deck-slide {
    display: block;
    width: 100%;
    max-height: 72vh;
    object-fit: contain;
    height: auto;
    margin: 0;
    border: 0;
    border-radius: 0;
  }
  .deck-bar {
    display: flex; align-items: center; gap: 10px; padding: 10px 2px 2px;
  }
  /* 翻页按钮 + 页码居中，全屏按钮靠右 */
  .deck-bar::before { content: ""; flex: none; width: 74px; }
  .deck-bar .deck-nav:first-of-type { margin-left: auto; }
  .deck-bar .deck-nav[data-deck-next] { margin-right: auto; }
  .deck-nav {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid #d7e2db;
    background: #fff;
    color: #2e7d53;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
  }
  .deck-nav:hover:not(:disabled) { background: #eef6f1; }
  .deck-nav:disabled { opacity: .35; cursor: default; }
  .deck-count {
    font-variant-numeric: tabular-nums;
    font-size: 13px;
    color: #456052;
    min-width: 62px;
  }
  @media (max-width: 767px) {
    .deck-viewer { padding: 10px 10px 8px; }
  }
</style>

<script>
  (function () {
    if (window.__growthDeckInit) return;
    window.__growthDeckInit = true;

    function setup(viewer) {
      var base = viewer.dataset.deckBase;
      var pages = JSON.parse(viewer.dataset.deckPages);
      var total = pages.length;
      var img = viewer.querySelector("[data-deck-img]");
      var countEl = viewer.querySelector("[data-deck-count]");
      var prev = viewer.querySelector("[data-deck-prev]");
      var next = viewer.querySelector("[data-deck-next]");
      var page = 0;

      function src(i) { return base + "/" + pages[i]; }

      function render() {
        img.src = src(page);
        countEl.textContent = (page + 1) + " / " + total;
        prev.disabled = page === 0;
        next.disabled = page === total - 1;
        if (page + 1 < total) { var pre = new Image(); pre.src = src(page + 1); }
      }

      prev.addEventListener("click", function () { if (page > 0) { page--; render(); } });
      next.addEventListener("click", function () { if (page < total - 1) { page++; render(); } });
      img.addEventListener("click", function (e) {
        var r = img.getBoundingClientRect();
        var right = e.clientX - r.left > r.width / 2;
        if (right && page < total - 1) { page++; render(); }
        else if (!right && page > 0) { page--; render(); }
      });
      viewer.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" && page > 0) { page--; render(); e.preventDefault(); }
        if (e.key === "ArrowRight" && page < total - 1) { page++; render(); e.preventDefault(); }
      });

      render();
    }

    function boot() {
      var all = document.querySelectorAll("[data-deck-viewer]");
      for (var i = 0; i < all.length; i++) {
        if (all[i].dataset.deckReady) continue;
        all[i].dataset.deckReady = "1";
        setup(all[i]);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
    document.addEventListener("swup:contentReplaced", boot);
    document.addEventListener("astro:page-load", boot);
  })();
</script>

<div class="block-divider"></div>

## 二、增长模型与实验报告


<div class="pv-viewer" data-pv-viewer tabindex="0" aria-label="增长材料阅读器">
  <div class="pv-tabs">
    <button type="button" class="pv-tab is-active" data-pv-tab="0">增长模型<span class="pv-tab-sub">12 页</span></button>
    <button type="button" class="pv-tab" data-pv-tab="1">实验 Q2-1<span class="pv-tab-sub">10 页</span></button>
    <button type="button" class="pv-tab" data-pv-tab="2">实验 Q2-2<span class="pv-tab-sub">7 页</span></button>
    <button type="button" class="pv-tab" data-pv-tab="3">实验 Q2-3<span class="pv-tab-sub">7 页</span></button>
    <button type="button" class="pv-tab" data-pv-tab="4">实验 Q2-4<span class="pv-tab-sub">7 页</span></button>
    <button type="button" class="pv-tab" data-pv-tab="5">实验 Q2-5<span class="pv-tab-sub">6 页</span></button>
    <button type="button" class="pv-tab" data-pv-tab="6">实验 Q2-6<span class="pv-tab-sub">4 页</span></button>
    <button type="button" class="pv-tab" data-pv-tab="7">种草方案<span class="pv-tab-sub">1 页</span></button>
  </div>

  <div class="pv-stage">
    <img class="pv-page" data-pv-img src="/assets/library/notes/growth-hacking/decks/pdf/model/01.webp" alt="增长模型 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="pv-bar">
    <button type="button" class="pv-nav" data-pv-prev aria-label="上一页">‹</button>
    <span class="pv-count" data-pv-count>1 / 12</span>
    <button type="button" class="pv-nav" data-pv-next aria-label="下一页">›</button>
    <span class="pv-title" data-pv-title">增长模型 · 必买增长模型</span>
  </div>

  <p class="pv-hint">点画面左右两侧、或用下面箭头 / 键盘 ← → 翻页</p>
</div>

<script type="application/json" data-pv-docs>[{"id":"model","title":"增长模型","sub":"必买增长模型","n":12},{"id":"exp1","title":"实验 Q2-1","sub":"增长实验报告","n":10},{"id":"exp2","title":"实验 Q2-2","sub":"增长实验报告","n":7},{"id":"exp3","title":"实验 Q2-3","sub":"增长实验报告","n":7},{"id":"exp4","title":"实验 Q2-4","sub":"增长实验报告","n":7},{"id":"exp5","title":"实验 Q2-5","sub":"增长实验报告","n":6},{"id":"exp6","title":"实验 Q2-6","sub":"增长实验报告","n":4},{"id":"seeding","title":"种草方案","sub":"内容种草","n":1}]</script>

<style>
  /* 本文专用：PDF / 多文档切换器 */
  .pv-lead { margin: 4px 0 10px; font-size: 14px; color: #6b7a72; }
  .pv-viewer {
    background: #f4f6f4;
    border: 1px solid #e0e8e2;
    border-radius: 12px;
    padding: 16px 16px 12px;
    margin: 10px 0 22px;
    outline: none;
  }
  .pv-viewer:focus-visible { border-color: #9ec3b1; }
  .pv-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
  .pv-tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid #d7e2db;
    background: #fff;
    color: #2f4a3e;
    font-size: 13px;
    line-height: 1;
    padding: 9px 13px;
    border-radius: 999px;
    cursor: pointer;
    transition: background .15s, border-color .15s, color .15s;
  }
  .pv-tab:hover { border-color: #9ec3b1; }
  .pv-tab-sub { font-size: 11px; color: #92a39a; }
  .pv-tab.is-active { background: #2e7d53; border-color: #2e7d53; color: #fff; }
  .pv-tab.is-active .pv-tab-sub { color: rgba(255,255,255,.75); }
  .pv-stage {
    background: #fff;
    border: 1px solid #e3ebe6;
    border-radius: 10px;
    overflow: hidden;
    line-height: 0;
    max-height: 72vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .pv-stage .pv-page {
    display: block;
    width: 100%;
    max-height: 72vh;
    object-fit: contain;
    height: auto;
    margin: 0;
    border: 0;
    border-radius: 0;
  }
  .pv-bar { display: flex; align-items: center; gap: 10px; padding: 10px 2px 2px; }
  .pv-nav {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid #d7e2db;
    background: #fff;
    color: #2e7d53;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
  }
  .pv-nav:hover:not(:disabled) { background: #eef6f1; }
  .pv-nav:disabled { opacity: .35; cursor: default; }
  .pv-count {
    font-variant-numeric: tabular-nums;
    font-size: 13px;
    color: #456052;
    min-width: 58px;
  }
  .pv-title { font-size: 13px; color: #6b7a72; }
  .pv-hint { margin: 6px 2px 0; font-size: 12px; color: #93a29a; }
  @media (max-width: 767px) {
    .pv-viewer { padding: 10px 10px 8px; }
    .pv-tab { font-size: 12px; padding: 8px 11px; }
    .pv-title { display: none; }
  }
</style>

<script>
  (function () {
    if (window.__growthPdfInit) return;
    window.__growthPdfInit = true;

    var BASE = "/assets/library/notes/growth-hacking/decks/pdf";

    function setup(viewer) {
      var holder = viewer.parentNode.querySelector("[data-pv-docs]");
      if (!holder) return;
      var docs = JSON.parse(holder.textContent);

      var img = viewer.querySelector("[data-pv-img]");
      var countEl = viewer.querySelector("[data-pv-count]");
      var titleEl = viewer.querySelector(".pv-title");
      var prev = viewer.querySelector("[data-pv-prev]");
      var next = viewer.querySelector("[data-pv-next]");
      var tabs = [].slice.call(viewer.querySelectorAll("[data-pv-tab]"));
      var cur = 0;
      var page = 0;

      function src(doc, i) {
        return BASE + "/" + doc.id + "/" + String(i + 1).padStart(2, "0") + ".webp";
      }

      function render() {
        var d = docs[cur];
        img.src = src(d, page);
        img.alt = d.title + " 第 " + (page + 1) + " 页";
        countEl.textContent = (page + 1) + " / " + d.n;
        if (titleEl) titleEl.textContent = d.title + " · " + d.sub;
        prev.disabled = page === 0;
        next.disabled = page === d.n - 1;
        for (var i = 0; i < tabs.length; i++) {
          tabs[i].classList.toggle("is-active", i === cur);
        }
        if (page + 1 < d.n) { var pre = new Image(); pre.src = src(d, page + 1); }
      }

      tabs.forEach(function (t, i) {
        t.addEventListener("click", function () { cur = i; page = 0; render(); });
      });
      prev.addEventListener("click", function () { if (page > 0) { page--; render(); } });
      next.addEventListener("click", function () { if (page < docs[cur].n - 1) { page++; render(); } });
      img.addEventListener("click", function (e) {
        var r = img.getBoundingClientRect();
        var right = e.clientX - r.left > r.width / 2;
        if (right && page < docs[cur].n - 1) { page++; render(); }
        else if (!right && page > 0) { page--; render(); }
      });
      viewer.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" && page > 0) { page--; render(); e.preventDefault(); }
        if (e.key === "ArrowRight" && page < docs[cur].n - 1) { page++; render(); e.preventDefault(); }
      });

      render();
    }

    function boot() {
      var all = document.querySelectorAll("[data-pv-viewer]");
      for (var i = 0; i < all.length; i++) {
        if (all[i].dataset.pvReady) continue;
        all[i].dataset.pvReady = "1";
        setup(all[i]);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
    document.addEventListener("swup:contentReplaced", boot);
    document.addEventListener("astro:page-load", boot);
  })();
</script>

<div class="block-divider"></div>

## 三、项目汇报

<div class="pv-viewer" data-pv2-viewer tabindex="0" aria-label="必买项目汇报 幻灯片切换器">
  <div class="pv-stage">
    <img class="pv-page" data-pv2-img src="/assets/library/notes/growth-hacking/decks/report/01.webp" alt="必买项目汇报 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="pv-bar">
    <button type="button" class="pv-nav" data-pv2-prev aria-label="上一页">‹</button>
    <span class="pv-count" data-pv2-count>1 / 16</span>
    <button type="button" class="pv-nav" data-pv2-next aria-label="下一页">›</button>
    <span class="pv-title">必买项目汇报 · 16 页</span>
  </div>

  <p class="pv-hint">点画面左右两侧、或用下面箭头 / 键盘 ← → 翻页</p>
</div>

<script>
  (function () {
    if (window.__growthReportInit) return;
    window.__growthReportInit = true;

    var BASE = "/assets/library/notes/growth-hacking/decks/report";
    var TOTAL = 16;

    function setup(viewer) {
      var img = viewer.querySelector("[data-pv2-img]");
      var countEl = viewer.querySelector("[data-pv2-count]");
      var prev = viewer.querySelector("[data-pv2-prev]");
      var next = viewer.querySelector("[data-pv2-next]");
      var page = 0;

      function src(i) { return BASE + "/" + String(i + 1).padStart(2, "0") + ".webp"; }

      function render() {
        img.src = src(page);
        countEl.textContent = (page + 1) + " / " + TOTAL;
        prev.disabled = page === 0;
        next.disabled = page === TOTAL - 1;
        if (page + 1 < TOTAL) { var pre = new Image(); pre.src = src(page + 1); }
      }

      prev.addEventListener("click", function () { if (page > 0) { page--; render(); } });
      next.addEventListener("click", function () { if (page < TOTAL - 1) { page++; render(); } });
      img.addEventListener("click", function (e) {
        var r = img.getBoundingClientRect();
        var right = e.clientX - r.left > r.width / 2;
        if (right && page < TOTAL - 1) { page++; render(); }
        else if (!right && page > 0) { page--; render(); }
      });
      viewer.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" && page > 0) { page--; render(); e.preventDefault(); }
        if (e.key === "ArrowRight" && page < TOTAL - 1) { page++; render(); e.preventDefault(); }
      });

      render();
    }

    function boot() {
      var all = document.querySelectorAll("[data-pv2-viewer]");
      for (var i = 0; i < all.length; i++) {
        if (all[i].dataset.pv2Ready) continue;
        all[i].dataset.pv2Ready = "1";
        setup(all[i]);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
    document.addEventListener("swup:contentReplaced", boot);
    document.addEventListener("astro:page-load", boot);
  })();
</script>
