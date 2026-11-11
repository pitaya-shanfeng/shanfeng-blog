---
title: 交易链路建设
published: 2026-11-10T11:36:00+08:00
description: 内容把人带到商品页只是开头：从导购内容、商品与价格、下单支付，到履约与售后，这条链路上每一段断裂都会把成交吞掉。这篇记录把一段段接起来的过程。
quote: 链路不是你画出来的那条直线，是用户真正走的那条折线——每一处折返都在漏钱。
category: 案例
tags:
  - 交易
  - 导购
  - 链路
image: /assets/library/notes/guide-trade/cover.webp
banner: /assets/library/notes/guide-trade/banner.webp
draft: false
comment: false
hideSidebar: true
prototypePages: 78
deckPages: 32
---

## 一、交易链路建设（行业通用方法论）

<div class="deck-viewer" data-deck-viewer tabindex="0"
     data-deck-base="/assets/library/notes/guide-trade/decks/methodology"
     data-deck-pages='["01.webp","02.webp","03.webp","04.webp","05.webp","06.webp","07.webp","08.webp","09.webp","10.webp","11.webp","12.webp","13.webp","14.webp","15.webp","16.webp","17.webp","18.webp","19.webp","20.webp","21.webp","22.webp","23.webp","24.webp","25.webp","26.webp","27.webp","28.webp","29.webp","30.webp","31.webp","32.webp"]'
     aria-label="C 端交易链路建设 · 行业通用方法论 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/guide-trade/decks/methodology/01.webp" alt="C 端交易链路建设 · 行业通用方法论 第 1 页" loading="lazy" decoding="async" />
  </div>
  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 32</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
    <span class="deck-title">行业通用方法论 · 32 页</span>
  </div>
  <p class="deck-hint">点画面左右两侧、或用下面箭头 / 键盘 ← → 翻页</p>
</div>

<div class="block-divider"></div>

## 二、C 端小程序（导购）

<p class="proto-lead">从内容导购到下单的第一版小程序：专题、严选、个人信息等 35 页。</p>

<div class="proto-embed">
<iframe src="/proto/mini-guide/entry.html" title="C 端小程序（导购） · 可交互原型" loading="lazy" allowfullscreen></iframe>
</div>

<div class="block-divider"></div>

## 三、C 端小程序（正向）

<p class="proto-lead">正向梳理的完整链路：创单、下单、支付与版本说明，10 页。</p>

<div class="proto-embed">
<iframe src="/proto/mini-forward/entry.html" title="C 端小程序（正向） · 可交互原型" loading="lazy" allowfullscreen></iframe>
</div>

<div class="block-divider"></div>

## 四、C 端小程序（逆向）

<p class="proto-lead">从售后与逆向流程反推链路断点：功能说明、售后列表等 13 页。</p>

<div class="proto-embed">
<iframe src="/proto/mini-reverse/entry.html" title="C 端小程序（逆向） · 可交互原型" loading="lazy" allowfullscreen></iframe>
</div>

<div class="block-divider"></div>

## 五、交易链路体验优化

<p class="proto-lead">针对断点做的体验优化稿：优化说明、分类与交易各环节，20 页。</p>

<div class="proto-embed">
<iframe src="/proto/trade-optimize/entry.html" title="交易链路体验优化 · 可交互原型" loading="lazy" allowfullscreen></iframe>
</div>

<style>
  .proto-lead { margin: 4px 0 10px; font-size: 14px; color: #6b7a72; }
</style>

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
    if (window.__gtDeckInit) return;
    window.__gtDeckInit = true;

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
