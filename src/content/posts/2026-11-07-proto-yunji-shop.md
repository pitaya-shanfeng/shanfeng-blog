---
title: 内容导购探索
published: 2026-11-07T20:30:00+08:00
description: 团长的个人店：C 端主页、个人/他人/达人/团长四种店铺页、精选与跟卖频道，以及图文、视频、店铺三种分享落地页。20 页可交互原型。
quote: 小店不是缩小版的商城，是让人把货放进自己的关系链里。
category: 实战
tags:
  - 原型
  - 小店
  - 分销
image: /assets/library/notes/proto-yunji-shop/cover.webp
banner: /assets/library/notes/proto-yunji-shop/banner.webp
draft: false
comment: false
hideSidebar: true
prototypePages: 20
order: 17
# 内嵌「内容方向研究」56 页
deckPages: 56
---

## 一、内容方向研究

<div class="deck-viewer" data-deck-viewer tabindex="0"
     data-deck-base="/assets/library/notes/content-direction/pages"
     data-deck-pages='["page-01.webp","page-02.webp","page-03.webp","page-04.webp","page-05.webp","page-06.webp","page-07.webp","page-08.webp","page-09.webp","page-10.webp","page-11.webp","page-12.webp","page-13.webp","page-14.webp","page-15.webp","page-16.webp","page-17.webp","page-18.webp","page-19.webp","page-20.webp","page-21.webp","page-22.webp","page-23.webp","page-24.webp","page-25.webp","page-26.webp","page-27.webp","page-28.webp","page-29.webp","page-30.webp","page-31.webp","page-32.webp","page-33.webp","page-34.webp","page-35.webp","page-36.webp","page-37.webp","page-38.webp","page-39.webp","page-40.webp","page-41.webp","page-42.webp","page-43.webp","page-44.webp","page-45.webp","page-46.webp","page-47.webp","page-48.webp","page-49.webp","page-50.webp","page-51.webp","page-52.webp","page-53.webp","page-54.webp","page-55.webp","page-56.webp"]'
     aria-label="内容方向研究 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/content-direction/pages/page-01.webp" alt="内容方向研究 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 56</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
    <span class="deck-title">内容方向研究 · 56 页</span>
  </div>

  <p class="deck-hint">点画面左右两侧、或用下面箭头 / 键盘 ← → 翻页</p>
</div>

<style>
  /* 本文专用：PPT 逐页切换 */
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
  .deck-bar { display: flex; align-items: center; gap: 10px; padding: 10px 2px 2px; }
  .deck-nav {
    width: 32px; height: 32px; border-radius: 8px;
    border: 1px solid #d7e2db; background: #fff; color: #2e7d53;
    font-size: 18px; line-height: 1; cursor: pointer;
  }
  .deck-nav:hover:not(:disabled) { background: #eef6f1; }
  .deck-nav:disabled { opacity: .35; cursor: default; }
  .deck-count {
    font-variant-numeric: tabular-nums; font-size: 13px; color: #456052; min-width: 62px;
  }
  .deck-title { font-size: 13px; color: #6b7a72; }
  .deck-hint { margin: 6px 2px 0; font-size: 12px; color: #93a29a; }
  @media (max-width: 767px) {
    .deck-viewer { padding: 10px 10px 8px; }
    .deck-title { display: none; }
  }
</style>

<script>
  (function () {
    if (window.__shopDeckInit) return;
    window.__shopDeckInit = true;

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

## 二、可交互原型

<div class="proto-embed">
<iframe src="/proto/yunji-shop/entry.html" title="内容导购探索 · 20 页可交互原型：C 端主页、四种店铺页、精选与跟卖、三种分享落地页" loading="lazy" allowfullscreen></iframe>
</div>
