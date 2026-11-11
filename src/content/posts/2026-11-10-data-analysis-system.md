---
title: 数据分析体系
published: 2026-11-10T20:45:00+08:00
description: 数据分析不是会写 SQL 就行：先有一套指标体系，再有一套分析方法（漏斗、公式拆解、用户分层…），最后落到能用的数据产品上。59 页把这三层串起来，附一张完整脑图。
quote: 数据零散地看只是数字，串成体系才能回答问题。
category: 思路
tags:
  - 数据分析
  - 指标体系
  - 方法论
# 方法合集第十六篇（排在《Python 入门到掌握》之后）
order: 16
deckPages: 59
deckWords: 13140
image: /assets/library/notes/data-analysis-system/cover.webp
banner: /assets/library/notes/data-analysis-system/banner.webp
draft: false
comment: false
---

<style>
  /* 本文专用：幻灯片逐页平铺 + 脑图切换 */
  .deck-flat { margin: 6px 0 26px; }
  .deck-flat img {
    display: block; width: 100%; height: auto;
    margin: 0 0 14px; border-radius: 10px;
    border: 1px solid #e9efeb; background: #fff;
  }
  .deck-flat img:last-child { margin-bottom: 0; }
  .map-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
  .map-tab {
    border: 1px solid #d7e2db; background: #fff; color: #2f4a3e;
    font-size: 13px; line-height: 1; padding: 9px 13px;
    border-radius: 999px; cursor: pointer;
  }
  .map-tab:hover { border-color: #9ec3b1; }
  .map-tab.is-active { background: #2e7d53; border-color: #2e7d53; color: #fff; }
  .map-stage {
    max-height: 74vh; overflow: auto; background: #fff;
    border: 1px solid #e3ebe6; border-radius: 12px; padding: 10px;
  }
  .map-panel { display: none; }
  .map-panel.is-active { display: block; }
  .map-panel img { display: block; width: 100%; height: auto; margin: 0; border-radius: 8px; }
  .map-hint { margin: 8px 2px 0; font-size: 12px; color: #93a29a; }
  @media (max-width: 767px) {
    .deck-flat img { margin-bottom: 10px; border-radius: 8px; }
  }
</style>

## 一、数据分析体系

<div class="deck-flat">
<img src="/assets/library/notes/data-analysis-system/slides/01.webp" alt="数据分析体系 第 1 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/02.webp" alt="数据分析体系 第 2 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/03.webp" alt="数据分析体系 第 3 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/04.webp" alt="数据分析体系 第 4 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/05.webp" alt="数据分析体系 第 5 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/06.webp" alt="数据分析体系 第 6 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/07.webp" alt="数据分析体系 第 7 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/08.webp" alt="数据分析体系 第 8 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/09.webp" alt="数据分析体系 第 9 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/10.webp" alt="数据分析体系 第 10 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/11.webp" alt="数据分析体系 第 11 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/12.webp" alt="数据分析体系 第 12 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/13.webp" alt="数据分析体系 第 13 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/14.webp" alt="数据分析体系 第 14 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/15.webp" alt="数据分析体系 第 15 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/16.webp" alt="数据分析体系 第 16 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/17.webp" alt="数据分析体系 第 17 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/18.webp" alt="数据分析体系 第 18 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/19.webp" alt="数据分析体系 第 19 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/20.webp" alt="数据分析体系 第 20 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/21.webp" alt="数据分析体系 第 21 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/22.webp" alt="数据分析体系 第 22 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/23.webp" alt="数据分析体系 第 23 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/24.webp" alt="数据分析体系 第 24 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/25.webp" alt="数据分析体系 第 25 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/26.webp" alt="数据分析体系 第 26 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/27.webp" alt="数据分析体系 第 27 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/28.webp" alt="数据分析体系 第 28 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/29.webp" alt="数据分析体系 第 29 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/30.webp" alt="数据分析体系 第 30 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/31.webp" alt="数据分析体系 第 31 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/32.webp" alt="数据分析体系 第 32 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/33.webp" alt="数据分析体系 第 33 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/34.webp" alt="数据分析体系 第 34 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/35.webp" alt="数据分析体系 第 35 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/36.webp" alt="数据分析体系 第 36 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/37.webp" alt="数据分析体系 第 37 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/38.webp" alt="数据分析体系 第 38 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/39.webp" alt="数据分析体系 第 39 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/40.webp" alt="数据分析体系 第 40 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/41.webp" alt="数据分析体系 第 41 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/42.webp" alt="数据分析体系 第 42 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/43.webp" alt="数据分析体系 第 43 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/44.webp" alt="数据分析体系 第 44 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/45.webp" alt="数据分析体系 第 45 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/46.webp" alt="数据分析体系 第 46 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/47.webp" alt="数据分析体系 第 47 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/48.webp" alt="数据分析体系 第 48 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/49.webp" alt="数据分析体系 第 49 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/50.webp" alt="数据分析体系 第 50 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/51.webp" alt="数据分析体系 第 51 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/52.webp" alt="数据分析体系 第 52 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/53.webp" alt="数据分析体系 第 53 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/54.webp" alt="数据分析体系 第 54 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/55.webp" alt="数据分析体系 第 55 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/56.webp" alt="数据分析体系 第 56 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/57.webp" alt="数据分析体系 第 57 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/58.webp" alt="数据分析体系 第 58 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/data-analysis-system/slides/59.webp" alt="数据分析体系 第 59 页" loading="lazy" decoding="async" />
</div>

<div class="block-divider"></div>

## 二、脑图：数据分析体系

<div class="map-viewer" data-map-viewer>
  <div class="map-tabs">
    <button type="button" class="map-tab is-active" data-map="sheet0">数据分析体系</button>
    <button type="button" class="map-tab" data-map="sheet1">指标建模</button>
    <button type="button" class="map-tab" data-map="sheet2">数据分析方法</button>
    <button type="button" class="map-tab" data-map="sheet3">数据展现（可视化）</button>
  </div>
  <div class="map-stage">
    <div class="map-panel is-active" data-panel="sheet0"><img src="/assets/library/notes/data-analysis-system/maps/sheet0.webp" alt="数据分析体系脑图" loading="lazy" decoding="async" /></div>
    <div class="map-panel" data-panel="sheet1"><img src="/assets/library/notes/data-analysis-system/maps/sheet1.webp" alt="指标建模脑图" loading="lazy" decoding="async" /></div>
    <div class="map-panel" data-panel="sheet2"><img src="/assets/library/notes/data-analysis-system/maps/sheet2.webp" alt="数据分析方法脑图" loading="lazy" decoding="async" /></div>
    <div class="map-panel" data-panel="sheet3"><img src="/assets/library/notes/data-analysis-system/maps/sheet3.webp" alt="数据展现（可视化）脑图" loading="lazy" decoding="async" /></div>
  </div>
  <p class="map-hint">四张画布对应原脑图的四个 sheet，点标签切换；点图片看原尺寸</p>
</div>

<script>
  (function () {
    if (window.__dasMapInit) return;
    window.__dasMapInit = true;
    function setup(viewer) {
      var tabs = [].slice.call(viewer.querySelectorAll("[data-map]"));
      var stage = viewer.querySelector(".map-stage");
      tabs.forEach(function (t) {
        t.addEventListener("click", function () {
          tabs.forEach(function (x) { x.classList.toggle("is-active", x === t); });
          [].forEach.call(viewer.querySelectorAll("[data-panel]"), function (pnl) {
            pnl.classList.toggle("is-active", pnl.dataset.panel === t.dataset.map);
          });
          stage.scrollTop = 0;
        });
      });
    }
    function boot() {
      [].forEach.call(document.querySelectorAll("[data-map-viewer]"), function (v) {
        if (v.dataset.ready) return;
        v.dataset.ready = "1";
        setup(v);
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
