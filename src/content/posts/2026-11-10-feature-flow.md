---
title: 功能与流程设计
published: 2026-11-10T18:30:00+08:00
description: 功能设计不是画原型，是把「用户要做的事」拆成能实现的模块，再把模块串成走得通的流程。37 页讲的是这件事的完整干法，后面的脑图是逐层的判断依据。
quote: 功能是名词，流程是动词——只画界面不跑流程，做出来的东西用不起来。
category: 方法沉淀
tags:
  - 功能设计
  - 流程
  - 方法论
# 方法合集第十篇（排在《BRD 与 MRD》之后）
order: 10
deckPages: 37
image: /assets/library/notes/feature-flow/cover.webp
banner: /assets/library/notes/feature-flow/banner.webp
draft: false
comment: false
---

## 一、功能与流程设计

<div class="deck-viewer" data-deck-viewer tabindex="0"
     data-deck-base="/assets/library/notes/feature-flow/decks/main"
     data-deck-pages='["01.webp","02.webp","03.webp","04.webp","05.webp","06.webp","07.webp","08.webp","09.webp","10.webp","11.webp","12.webp","13.webp","14.webp","15.webp","16.webp","17.webp","18.webp","19.webp","20.webp","21.webp","22.webp","23.webp","24.webp","25.webp","26.webp","27.webp","28.webp","29.webp","30.webp","31.webp","32.webp","33.webp","34.webp","35.webp","36.webp","37.webp"]'
     aria-label="功能与流程设计 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/feature-flow/decks/main/01.webp" alt="功能与流程设计 第 1 页" loading="lazy" decoding="async" />
  </div>
  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 37</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
    <span class="deck-title">功能与流程设计 · 37 页</span>
  </div>
  <p class="deck-hint">点画面左右两侧、或用下面箭头 / 键盘 ← → 翻页</p>
</div>

<div class="block-divider"></div>

## 二、脑图：功能和流程设计

<div class="map-viewer">
  <div class="map-stage">
    <img src="/assets/library/notes/feature-flow/maps/feature-flow.webp" alt="功能和流程设计脑图" loading="lazy" decoding="async" />
  </div>
  <p class="map-hint">点图片看原尺寸</p>
</div>

<style>
  /* 一、PPT 逐页切换 */
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

  /* 二、脑图 */
  .map-viewer { border: 1px solid #e3ebe6; border-radius: 12px; background: #fff; padding: 14px; margin: 10px 0 22px; }
  .map-stage { max-height: 74vh; overflow: auto; }
  .map-stage img { display: block; width: 100%; height: auto; margin: 0; border: 0; border-radius: 8px; }
  .map-hint { margin: 8px 2px 0; font-size: 12px; color: #93a29a; }

  @media (max-width: 767px) {
    .deck-viewer { padding: 10px 10px 8px; }
    .deck-title { display: none; }
  }
</style>

<script>
  (function () {
    if (window.__ffInit) return;
    window.__ffInit = true;

    function setupDeck(viewer) {
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
      [].forEach.call(document.querySelectorAll("[data-deck-viewer]"), function (v) {
        if (v.dataset.ready) return;
        v.dataset.ready = "1";
        setupDeck(v);
      });
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
