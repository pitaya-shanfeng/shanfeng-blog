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
order: 9
deckPages: 39
deckWords: 9347
image: /assets/library/notes/req-analysis/cover.webp
banner: /assets/library/notes/req-analysis/banner.webp
draft: false
comment: false
---

<style>
  /* 本文专用：幻灯片逐页平铺 */
  .deck-flat { margin: 6px 0 26px; }
  .deck-flat img {
    display: block; width: 100%; height: auto;
    margin: 0 0 14px; border-radius: 10px;
    border: 1px solid #e9efeb; background: #fff;
  }
  .deck-flat img:last-child { margin-bottom: 0; }
  @media (max-width: 767px) {
    .deck-flat img { margin-bottom: 10px; border-radius: 8px; }
  }
</style>

## 一、需求分析方法

<div class="deck-flat">
<img src="/assets/library/notes/req-analysis/decks/main/01.webp" alt="第 1 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/02.webp" alt="第 2 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/03.webp" alt="第 3 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/04.webp" alt="第 4 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/05.webp" alt="第 5 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/06.webp" alt="第 6 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/07.webp" alt="第 7 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/08.webp" alt="第 8 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/09.webp" alt="第 9 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/10.webp" alt="第 10 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/11.webp" alt="第 11 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/12.webp" alt="第 12 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/13.webp" alt="第 13 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/14.webp" alt="第 14 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/15.webp" alt="第 15 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/16.webp" alt="第 16 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/17.webp" alt="第 17 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/18.webp" alt="第 18 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/19.webp" alt="第 19 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/20.webp" alt="第 20 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/21.webp" alt="第 21 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/22.webp" alt="第 22 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/23.webp" alt="第 23 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/24.webp" alt="第 24 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/25.webp" alt="第 25 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/26.webp" alt="第 26 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/27.webp" alt="第 27 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/28.webp" alt="第 28 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/29.webp" alt="第 29 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/30.webp" alt="第 30 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/31.webp" alt="第 31 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/32.webp" alt="第 32 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/33.webp" alt="第 33 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/34.webp" alt="第 34 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/35.webp" alt="第 35 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/36.webp" alt="第 36 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/37.webp" alt="第 37 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/38.webp" alt="第 38 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/req-analysis/decks/main/39.webp" alt="第 39 页" loading="lazy" decoding="async" />
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
