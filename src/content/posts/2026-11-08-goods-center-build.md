---
title: 商品中心建设
published: 2026-11-08T12:30:00+08:00
description: 商品中心的产品架构：商品库（唯一 ID 与多端商品打通、商品标准建立）、五块核心能力（类目管理、品牌管理、属性管理、商品档案、售卖管理）、价格体系（定价调价 / 价格计算 / 金融方案），再加上商品标签、精准商品，以及和供应商中心、数据中心的接口关系。
quote: 商品中心不是一张商品表，是把「同一个商品在哪个渠道、按什么价格卖」讲清楚。
category: 案例
tags:
  - 商品中心
  - 架构
  - 类目
image: /assets/library/notes/goods-center-build/cover.webp
banner: /assets/library/notes/goods-center-build/banner.webp
draft: false
comment: false
hideSidebar: true
# 合集里第 3 篇
order: 3
# 内嵌两个原型：商品中心（非零售）21 页 + 商品中心（非标）23 页
prototypePages: 44
deckPages: 9
---
## 一、产品架构

![青年优品·商品中心：建设思路、产品架构、能力边界与关键指标](/assets/library/notes/goods-center-build/arch.webp)

<div class="block-divider"></div>

## 二、思路与设计（标品）

<div class="proto-embed">
<iframe src="/proto/goods-center-nonretail/entry.html" title="商品中心（非零售）原型：类目管理 / 属性管理 / 模板管理 / 档案管理 / 售卖管理 / 价格中心" loading="lazy" allowfullscreen></iframe>
</div>

<div class="block-divider"></div>

## 三、建设方案

<div class="deck-viewer" data-deck-viewer tabindex="0" aria-label="商品中心 KO 方案 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/shangpin-ko/pages/page-01.webp" alt="商品中心 KO 方案 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 9</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
    <span class="deck-title">商品中心 KO 方案 · 9 页</span>
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
    if (window.__goodsDeckInit) return;
    window.__goodsDeckInit = true;

    // 页图不是连号（09/10 两页内部资料已删），所以显式列出来
    var BASE = "/assets/library/notes/shangpin-ko/pages";
    var PAGES = ["page-01.webp", "page-02.webp", "page-03.webp", "page-04.webp", "page-05.webp", "page-06.webp", "page-07.webp", "page-08.webp", "page-11.webp"];
    var TOTAL = PAGES.length;

    function setup(viewer) {
      var img = viewer.querySelector("[data-deck-img]");
      var countEl = viewer.querySelector("[data-deck-count]");
      var prev = viewer.querySelector("[data-deck-prev]");
      var next = viewer.querySelector("[data-deck-next]");
      var page = 0;

      function render() {
        img.src = BASE + "/" + PAGES[page];
        img.alt = "商品中心 KO 方案 第 " + (page + 1) + " 页";
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

## 四、思路与设计（非标品）

<div class="proto-embed">
<iframe src="/proto/goods-center-nonstd/entry.html" title="商品中心（非标品）原型：类目管理 / 属性管理 / 商品与货品 / 售卖管理 / 价格调整" loading="lazy" allowfullscreen></iframe>
</div>
