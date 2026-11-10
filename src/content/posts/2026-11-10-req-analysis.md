---
title: 需求分析方法
published: 2026-11-10T17:55:00+08:00
description: 需求从一堆抱怨到能进版本，中间要过六道关：记录、筛选、挖掘、分类、排序、管理。这篇把 39 页方法课件和六张脑图放在一起——前面是怎么判断，后面是判断的依据。
quote: 需求分析不是把需求砍掉，是把「值得做的那几个」从噪音里挑出来。
category: 方法沉淀
tags:
  - 需求
  - 方法论
  - 产品
# 方法合集第八篇（排在《如何做体验调研》之后）
order: 8
deckPages: 39
image: /assets/library/notes/req-analysis/cover.webp
banner: /assets/library/notes/req-analysis/banner.webp
draft: false
comment: false
---

## 一、需求分析方法

<div class="deck-viewer" data-deck-viewer tabindex="0"
     data-deck-base="/assets/library/notes/req-analysis/decks/main"
     data-deck-pages='["01.webp","02.webp","03.webp","04.webp","05.webp","06.webp","07.webp","08.webp","09.webp","10.webp","11.webp","12.webp","13.webp","14.webp","15.webp","16.webp","17.webp","18.webp","19.webp","20.webp","21.webp","22.webp","23.webp","24.webp","25.webp","26.webp","27.webp","28.webp","29.webp","30.webp","31.webp","32.webp","33.webp","34.webp","35.webp","36.webp","37.webp","38.webp","39.webp"]'
     aria-label="需求分析方法 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/req-analysis/decks/main/01.webp" alt="需求分析方法 第 1 页" loading="lazy" decoding="async" />
  </div>
  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 39</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
    <span class="deck-title">需求分析方法 · 39 页</span>
  </div>
  <p class="deck-hint">点画面左右两侧、或用下面箭头 / 键盘 ← → 翻页</p>
</div>

<div class="block-divider"></div>

## 二、六张脑图

<div class="map-viewer" data-map-viewer>
  <div class="map-tabs">
    <button type="button" class="map-tab is-active" data-map="need-manage">用户需求管理</button>
    <button type="button" class="map-tab" data-map="need-filter">用户需求筛选</button>
    <button type="button" class="map-tab" data-map="need-dig">用户需求挖掘</button>
    <button type="button" class="map-tab" data-map="prod-class">产品需求分类</button>
    <button type="button" class="map-tab" data-map="prod-order">产品需求排序</button>
    <button type="button" class="map-tab" data-map="prod-manage">产品需求管理</button>
  </div>
  <div class="map-stage">
    <div class="map-panel is-active" data-panel="need-manage"><img src="/assets/library/notes/req-analysis/maps/need-manage.webp" alt="用户需求管理脑图" loading="lazy" decoding="async" /></div>
    <div class="map-panel" data-panel="need-filter"><img src="/assets/library/notes/req-analysis/maps/need-filter.webp" alt="用户需求筛选脑图" loading="lazy" decoding="async" /></div>
    <div class="map-panel" data-panel="need-dig"><img src="/assets/library/notes/req-analysis/maps/need-dig.webp" alt="用户需求挖掘脑图" loading="lazy" decoding="async" /></div>
    <div class="map-panel" data-panel="prod-class"><img src="/assets/library/notes/req-analysis/maps/prod-class.webp" alt="产品需求分类脑图" loading="lazy" decoding="async" /></div>
    <div class="map-panel" data-panel="prod-order"><img src="/assets/library/notes/req-analysis/maps/prod-order.webp" alt="产品需求排序脑图" loading="lazy" decoding="async" /></div>
    <div class="map-panel" data-panel="prod-manage"><img src="/assets/library/notes/req-analysis/maps/prod-manage.webp" alt="产品需求管理脑图" loading="lazy" decoding="async" /></div>
  </div>
  <p class="map-hint">点标签切换脑图；点图片看原尺寸</p>
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

  /* 二、脑图切换 */
  .map-viewer {
    border: 1px solid #e3ebe6; border-radius: 12px; background: #fff;
    padding: 14px; margin: 10px 0 22px;
  }
  .map-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
  .map-tab {
    border: 1px solid #d7e2db; background: #fff; color: #2f4a3e;
    font-size: 13px; line-height: 1; padding: 9px 13px;
    border-radius: 999px; cursor: pointer;
  }
  .map-tab:hover { border-color: #9ec3b1; }
  .map-tab.is-active { background: #2e7d53; border-color: #2e7d53; color: #fff; }
  .map-stage { max-height: 74vh; overflow: auto; }
  .map-panel { display: none; }
  .map-panel.is-active { display: block; }
  .map-panel img { display: block; width: 100%; height: auto; margin: 0; border: 0; border-radius: 8px; }
  .map-hint { margin: 8px 2px 0; font-size: 12px; color: #93a29a; }

  @media (max-width: 767px) {
    .deck-viewer { padding: 10px 10px 8px; }
    .deck-title { display: none; }
  }
</style>

<script>
  (function () {
    // PPT 翻页
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

    // 脑图切换
    function setupMap(viewer) {
      var tabs = [].slice.call(viewer.querySelectorAll("[data-map]"));
      var stage = viewer.querySelector(".map-stage");
      tabs.forEach(function (t) {
        t.addEventListener("click", function () {
          tabs.forEach(function (x) { x.classList.toggle("is-active", x === t); });
          [].forEach.call(viewer.querySelectorAll("[data-panel]"), function (p) {
            p.classList.toggle("is-active", p.dataset.panel === t.dataset.map);
          });
          stage.scrollTop = 0;
        });
      });
    }

    function boot() {
      [].forEach.call(document.querySelectorAll("[data-deck-viewer]"), function (v) {
        if (v.dataset.ready) return;
        v.dataset.ready = "1";
        setupDeck(v);
      });
      [].forEach.call(document.querySelectorAll("[data-map-viewer]"), function (v) {
        if (v.dataset.ready) return;
        v.dataset.ready = "1";
        setupMap(v);
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
