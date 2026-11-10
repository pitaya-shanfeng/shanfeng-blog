---
title: 市场分析方法
published: 2026-11-07T14:30:00+08:00
# 方法合集第一篇
order: 1
description: 市场分析要回答的其实只有两个问题：这个盘子值不值得进，进去之后凭什么赢。36 页课件从「市场」和「行业」的区别讲起，走过五大推算方法与六大经典模型，最后落到七步实操流程、三张成本表和六类风险对策。
quote: 市场 = 人口 + 购买力 + 购买欲望。先算清盘子，再谈要不要进。
image: /assets/library/notes/market-analysis/cover.webp
banner: /assets/library/notes/market-analysis/banner.webp
category: 方法沉淀
tags:
  - 产品
  - 方法论
  - 市场分析
draft: false
comment: false
documentPages: 36
deckPages: 36
---

## 一、市场分析方法

<div class="deck-viewer" data-deck-viewer tabindex="0"
     data-deck-base="/assets/library/notes/market-analysis/pages"
     data-deck-pages='["page-01.webp","page-02.webp","page-03.webp","page-04.webp","page-05.webp","page-06.webp","page-07.webp","page-08.webp","page-09.webp","page-10.webp","page-11.webp","page-12.webp","page-13.webp","page-14.webp","page-15.webp","page-16.webp","page-17.webp","page-18.webp","page-19.webp","page-20.webp","page-21.webp","page-22.webp","page-23.webp","page-24.webp","page-25.webp","page-26.webp","page-27.webp","page-28.webp","page-29.webp","page-30.webp","page-31.webp","page-32.webp","page-33.webp","page-34.webp","page-35.webp","page-36.webp"]'
     aria-label="市场分析方法 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/market-analysis/pages/page-01.webp" alt="市场分析方法 第 1 页" loading="lazy" decoding="async" />
  </div>
  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 36</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
    <span class="deck-title">市场分析方法 · 36 页</span>
  </div>
  <p class="deck-hint">点画面左右两侧、或用下面箭头 / 键盘 ← → 翻页</p>
</div>

<style>
  /* 本文专用：PPT 逐页切换 */
  .deck-viewer {
    background: #f4f6f4; border: 1px solid #e0e8e2; border-radius: 12px;
    padding: 16px 16px 12px; margin: 10px 0 22px; outline: none;
  }
  .deck-viewer:focus-visible { border-color: #9ec3b1; }
  .deck-stage {
    background: #fff; border: 1px solid #e3ebe6; border-radius: 10px;
    overflow: hidden; line-height: 0; max-height: 72vh;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
  }
  .deck-stage .deck-slide { display: block; width: 100%; max-height: 72vh; object-fit: contain; height: auto; margin: 0; border: 0; border-radius: 0; }
  .deck-bar { display: flex; align-items: center; gap: 10px; padding: 10px 2px 2px; }
  .deck-nav {
    width: 32px; height: 32px; border-radius: 8px;
    border: 1px solid #d7e2db; background: #fff; color: #2e7d53;
    font-size: 18px; line-height: 1; cursor: pointer;
  }
  .deck-nav:hover:not(:disabled) { background: #eef6f1; }
  .deck-nav:disabled { opacity: .35; cursor: default; }
  .deck-count { font-variant-numeric: tabular-nums; font-size: 13px; color: #456052; min-width: 62px; }
  .deck-title { font-size: 13px; color: #6b7a72; }
  .deck-hint { margin: 6px 2px 0; font-size: 12px; color: #93a29a; }
  @media (max-width: 767px) {
    .deck-viewer { padding: 10px 10px 8px; }
    .deck-title { display: none; }
  }
</style>

<script>
  (function () {
    if (window.__mktDeckInit) return;
    window.__mktDeckInit = true;

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

