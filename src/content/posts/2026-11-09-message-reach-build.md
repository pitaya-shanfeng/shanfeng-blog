---
title: 消息触达建设
published: 2026-11-09T15:20:00+08:00
description: 消息触达的中台化建设：把推送、短信、企微、订阅消息、站内信、弹窗等通道统一编排，按人群与场景选择通道、做频控与去重，并回收每一路的到达与转化。
quote: 触达的本事不是把消息发出去，是让该收到的人收到、不该打扰的人不被打扰。
category: 案例
tags:
  - 消息触达
  - 营销
  - 增长
image: /assets/library/notes/message-reach-build/cover.webp
banner: /assets/library/notes/message-reach-build/banner.webp
draft: false
comment: false
hideSidebar: true
# 合集里第 8 篇
order: 8
# 内嵌三个原型：触达管理 17 页 + 订阅短信 9 页 + 外呼 10 页
prototypePages: 36
deckPages: 9
---

## 一、产品架构

![消息中台 · 消息触达产品架构：触发来源、消息中台内核、通道层、用户触达、支撑能力、回流报表，以及建设三阶段](/assets/library/notes/message-reach-build/arch.webp)

<div class="block-divider"></div>

## 二、建设方案

<div class="deck-viewer" data-deck-viewer tabindex="0"
     data-deck-base="/assets/library/notes/message-touch/pages"
     data-deck-pages='["page-01.webp","page-02.webp","page-03.webp","page-04.webp","page-05.webp","page-06.webp","page-07.webp","page-08.webp","page-09.webp"]'
     aria-label="智能消息中台战役 幻灯片切换器">
  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/message-touch/pages/page-01.webp" alt="智能消息中台战役 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 9</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
  </div>
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
    display: flex; align-items: center; gap: 10px; padding: 10px 2px 2px;
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
  @media (max-width: 767px) {
    .deck-viewer { padding: 10px 10px 8px; }
  }
</style>

<script>
  (function () {
    if (window.__deckInit_MsgTouch) return;
    window.__deckInit_MsgTouch = true;

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

## 三、相关原型

<div class="proto-embed">
<iframe src="/proto/reach-manage-v1/entry.html" title="触达管理 v1.0：背景介绍、订阅管理、触达任务、模板与消息调度台" loading="lazy" allowfullscreen></iframe>
</div>

<div class="proto-embed">
<iframe src="/proto/reach-channel/entry.html" title="触达（订阅、短信）：订阅消息与短信的模板、发送与回收" loading="lazy" allowfullscreen></iframe>
</div>

<div class="proto-embed">
<iframe src="/proto/reach-outbound/entry.html" title="触发（外呼）：外呼任务、名单与触达结果回流" loading="lazy" allowfullscreen></iframe>
</div>
