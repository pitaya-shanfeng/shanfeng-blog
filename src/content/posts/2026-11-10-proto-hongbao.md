---
title: 社群玩法：瓜分红包
published: 2026-11-10T09:10:00+08:00
description: 红包从 1.0 到 2.0 的两次版本：1.0 只做福袋的发放、开启、领取、过期；2.0 补齐发放、开启、领取、派完、过期、退回的状态机与皮肤切换。另附一次活动复盘。两个可交互原型 + 15 页复盘。
quote: 红包难的不是发出去，是发出去之后那些没人愿意看的状态。
category: 实战
tags:
  - 原型
  - 红包
  - 活动运营
image: /assets/library/notes/proto-hongbao/cover.webp
banner: /assets/library/notes/proto-hongbao/banner.webp
draft: false
comment: false
hideSidebar: true
# 两个原型合计 18 + 25 页
prototypePages: 43
# 活动类文章固定在建设系列（1–10）之后
order: 13
---

## 一、1.0 原型

最简单的瓜分玩法：福袋的发放、开启、领取、过期，配活动管理、模板中心与参与规则。

<div class="proto-embed">
<iframe src="/proto/hongbao-1/entry.html" title="瓜分红包 1.0：福袋发放、开启、领取、过期，活动管理与参与规则" loading="lazy" allowfullscreen></iframe>
</div>

<div class="block-divider"></div>

## 二、2.0 原型

红包的状态机版本：发放、开启、领取、派完、过期、退回，每种状态都有对应页面与文案，另加皮肤切换。

<div class="proto-embed">
<iframe src="/proto/hongbao-2/entry.html" title="瓜分红包 2.0：发放、开启、领取、派完、过期、退回的完整状态机与皮肤切换" loading="lazy" allowfullscreen></iframe>
</div>

<div class="block-divider"></div>

## 三、活动复盘

<div class="deck-viewer" data-deck-viewer tabindex="0"
     data-deck-base="/assets/library/notes/proto-hongbao/decks/review"
     data-deck-pages='["01.webp","02.webp","03.webp","04.webp","05.webp","06.webp","07.webp","08.webp","09.webp","10.webp","11.webp","12.webp","13.webp","14.webp","15.webp"]'
     aria-label="瓜分红包复盘 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/proto-hongbao/decks/review/01.webp" alt="瓜分红包复盘 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 15</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
    <span class="deck-title">瓜分红包复盘 · 15 页</span>
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
    if (window.__hongbaoDeckInit) return;
    window.__hongbaoDeckInit = true;

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
