---
title: 营销中心建设
published: 2026-11-09T09:20:00+08:00
description: 营销中心的产品架构：建设思路（终端 / 用户商户 / 三方 → 营销数据层 → 自动化营销引擎 → 营销执行层 → 数据应用）、六块核心能力（标签工厂、触达引擎、旅程编排、策略与频控、权益与内容、通道与玩法），以及能力边界和该盯的关键指标。
quote: 营销自动化不是把人群找出来就完事，关键在于把「何时、走哪条通道、发什么」交给规则。
category: 案例
tags:
  - 营销中心
  - 架构
  - 增长
image: /assets/library/notes/marketing-center-build/cover.webp
banner: /assets/library/notes/marketing-center-build/banner.webp
draft: false
comment: false
hideSidebar: true
# 合集里第 6 篇
order: 6
# 内嵌三个原型：CMS组件集合 22 页 + CMS/RMS 35 页 + 优惠券 13 页
prototypePages: 70
deckPages: 24
---

## 一、产品架构

![青年优品·营销中心：建设思路、产品架构、能力边界与关键指标](/assets/library/notes/marketing-center-build/arch.webp)

<div class="block-divider"></div>

## 二、建设方案

<div class="deck-viewer" data-deck-viewer tabindex="0" aria-label="营销中台规划方案 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/marketing-mid/pages/page-01.webp" alt="营销中台规划方案 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 24</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
  </div>
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
    display: flex; align-items: center; gap: 10px; padding: 10px 2px 2px;
  }
  /* 翻页按钮 + 页码居中，全屏按钮靠右 */
  .deck-bar::before { content: ""; flex: none; width: 74px; }
  .deck-bar .deck-nav:first-of-type { margin-left: auto; }
  .deck-bar .deck-nav[data-deck-next] { margin-right: auto; }
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
  @media (max-width: 767px) {
    .deck-viewer { padding: 10px 10px 8px; }
  }
</style>

<script>
  (function () {
    if (window.__mkDeckInit) return;
    window.__mkDeckInit = true;

    var BASE = "/assets/library/notes/marketing-mid/pages";
    var TOTAL = 24;

    function slideSrc(i) {
      return BASE + "/page-" + String(i + 1).padStart(2, "0") + ".webp";
    }

    function setup(viewer) {
      var img = viewer.querySelector("[data-deck-img]");
      var countEl = viewer.querySelector("[data-deck-count]");
      var prev = viewer.querySelector("[data-deck-prev]");
      var next = viewer.querySelector("[data-deck-next]");
      var page = 0;

      function render() {
        img.src = slideSrc(page);
        img.alt = "营销中台规划方案 第 " + (page + 1) + " 页";
        countEl.textContent = (page + 1) + " / " + TOTAL;
        prev.disabled = page === 0;
        next.disabled = page === TOTAL - 1;
        if (page + 1 < TOTAL) {
          var pre = new Image();
          pre.src = slideSrc(page + 1);
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

## 三、相关原型

<div class="proto-embed">
<iframe src="/proto/lego/entry.html" title="CMS 组件集合：图片 / 富文本 / 媒体 / 导航 / tab / 魔方 / 弹窗 / 专题 / 种草九类组件" loading="lazy" allowfullscreen></iframe>
</div>

<div class="proto-embed">
<iframe src="/proto/cms-rms/entry.html" title="CMS/RMS：专题管理、频道管理，以及各类组件的配置项与投放规则" loading="lazy" allowfullscreen></iframe>
</div>

<div class="proto-embed">
<iframe src="/proto/coupon/entry.html" title="优惠券：平台券与三方券的发放、领取、核销，以及短信与订阅触达" loading="lazy" allowfullscreen></iframe>
</div>
