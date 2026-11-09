---
title: 埋点体系建设
description: 把「想看的数」翻译成可维护的埋点：先定问题与指标，再定事件模型与命名规范，最后用校验、回收与看板把数据跑通，避免埋了一堆没人用的事件。
quote: 埋点的价值不在埋了多少个点，而在能不能回答当初那个问题。
category: 实战
tags:
  - 埋点
  - 数据
  - 中台
image: /assets/library/notes/tracking-build/cover.webp
banner: /assets/library/notes/tracking-build/banner.webp
draft: false
comment: false
hideSidebar: true
# 合集里第 10 篇
order: 10
# 内嵌埋点系统 1.0 原型（8 页）
prototypePages: 8
published: 2026-11-09T19:40:00+08:00
---

<div class="block-divider"></div>

## 一、埋点规范

<div class="deck-viewer" data-deck-viewer tabindex="0" aria-label="埋点体系规范 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/tracking-ko/pages/page-01.webp" alt="埋点体系规范 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 11</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
    <span class="deck-title">埋点体系规范 · 11 页</span>
  </div>

  <p class="deck-hint">点画面左右两侧、或用下面箭头 / 键盘 ← → 翻页</p>
</div>

<style>
  /* 本节专用：PPT 逐页切换，不涉及站内其它页面 */
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
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 2px 2px;
  }
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
  .deck-title { font-size: 13px; color: #6b7a72; }
  .deck-hint { margin: 6px 2px 0; font-size: 12px; color: #93a29a; }
  @media (max-width: 767px) {
    .deck-viewer { padding: 10px 10px 8px; }
    .deck-title { display: none; }
  }
</style>

<script>
  (function () {
    if (window.__trackingDeckInit) return;
    window.__trackingDeckInit = true;

    var BASE = "/assets/library/notes/tracking-ko/pages";
    var PAGES = ["page-01.webp", "page-02.webp", "page-03.webp", "page-04.webp", "page-05.webp", "page-06.webp", "page-07.webp", "page-08.webp", "page-09.webp", "page-10.webp", "page-11.webp"];
    var TOTAL = PAGES.length;

    function setup(viewer) {
      var img = viewer.querySelector("[data-deck-img]");
      var countEl = viewer.querySelector("[data-deck-count]");
      var prev = viewer.querySelector("[data-deck-prev]");
      var next = viewer.querySelector("[data-deck-next]");
      var page = 0;

      function render() {
        img.src = BASE + "/" + PAGES[page];
        img.alt = "埋点体系规范 第 " + (page + 1) + " 页";
        countEl.textContent = (page + 1) + " / " + TOTAL;
        prev.disabled = page === 0;
        next.disabled = page === TOTAL - 1;
        if (page + 1 < TOTAL) {
          var pre = new Image();
          pre.src = BASE + "/" + PAGES[page + 1];
        }
      }

      prev.addEventListener("click", function () {
        if (page > 0) { page--; render(); }
      });
      next.addEventListener("click", function () {
        if (page < TOTAL - 1) { page++; render(); }
      });
      img.addEventListener("click", function (e) {
        var rect = img.getBoundingClientRect();
        var right = e.clientX - rect.left > rect.width / 2;
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

## 二、相关原型

<div class="proto-embed">
<iframe src="/proto/tracking-system/entry.html" title="埋点系统 1.0：埋点需求、事件与属性、埋点校验与报表" loading="lazy" allowfullscreen></iframe>
</div>
