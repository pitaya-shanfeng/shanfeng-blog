---
title: 供应链开放平台建设
published: 2026-11-09T16:35:00+08:00
description: 把仓、运、货、结算做成一套对外开放的能力：供应商与商家怎么接进来、库存与运力怎么复用、履约与对账怎么跑通，以及开放平台上「谁能看什么、谁该结算给谁」的边界。
quote: 开放平台不是把接口放出去，是把责任和成本一起分清楚。
category: 实战
tags:
  - 供应链
  - 开放平台
  - 中台
image: /assets/library/notes/supply-chain-build/cover.webp
banner: /assets/library/notes/supply-chain-build/banner.webp
draft: false
comment: false
hideSidebar: true
# 合集里第 9 篇
order: 9
---

## 一、产品架构

![供应链开放平台：开放平台业务架构、开放平台矩阵、鲜果业务与底层服务能力、能力封装、Open API，以及客户经营全流程](/assets/library/notes/supply-chain-build/arch.webp)

<div class="block-divider"></div>

## 二、商务样例

<p class="deck-lead">四份对外方案：从合作汇报、合作方案到报价，按需切换查看，不展开成整页长图。</p>

<div class="deck-viewer" data-deck-viewer tabindex="0" aria-label="商务方案幻灯片切换器">
  <div class="deck-tabs">
    <button type="button" class="deck-tab is-active" data-deck-tab="xicha">喜茶 × 鲜沐<span class="deck-tab-sub">合作汇报 · 34 页</span></button>
    <button type="button" class="deck-tab" data-deck-tab="naixue">奈雪的茶 × 鲜沐<span class="deck-tab-sub">合作方案 · 20 页</span></button>
    <button type="button" class="deck-tab" data-deck-tab="chayan">茶颜悦色 × 鲜沐<span class="deck-tab-sub">合作方案 · 15 页</span></button>
    <button type="button" class="deck-tab" data-deck-tab="leyecha">乐乐茶 × 鲜沐<span class="deck-tab-sub">合作报价 · 6 页</span></button>
  </div>

  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/supply-chain-build/decks/xicha/01.webp?v=2" alt="喜茶 × 鲜沐 合作汇报 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 34</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
    <span class="deck-title" data-deck-title>喜茶 × 鲜沐 · 合作汇报</span>
  </div>

  <p class="deck-hint">点标签切换方案；点画面左右两侧、或用下面箭头 / 键盘 ← → 翻页</p>
</div>

<style>
  /* 本节专用：.deck-viewer 内的幻灯片切换器，不涉及站内其它页面 */
  .deck-lead {
    margin: 4px 0 10px;
    font-size: 14px;
    color: #6b7a72;
  }
  .deck-viewer {
    background: #f4f6f4;
    border: 1px solid #e0e8e2;
    border-radius: 12px;
    padding: 16px 16px 12px;
    margin: 10px 0 22px;
    outline: none;
  }
  .deck-viewer:focus-visible {
    border-color: #9ec3b1;
  }
  .deck-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  .deck-tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid #d7e2db;
    background: #fff;
    color: #2f4a3e;
    font-size: 13px;
    line-height: 1;
    padding: 9px 14px;
    border-radius: 999px;
    cursor: pointer;
    transition: background .15s, border-color .15s, color .15s;
  }
  .deck-tab:hover {
    border-color: #9ec3b1;
  }
  .deck-tab-sub {
    font-size: 11px;
    color: #92a39a;
  }
  .deck-tab.is-active {
    background: #2e7d53;
    border-color: #2e7d53;
    color: #fff;
  }
  .deck-tab.is-active .deck-tab-sub {
    color: rgba(255, 255, 255, .75);
  }
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
    box-shadow: none;
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
  .deck-nav:hover:not(:disabled) {
    background: #eef6f1;
  }
  .deck-nav:disabled {
    opacity: .35;
    cursor: default;
  }
  .deck-count {
    font-variant-numeric: tabular-nums;
    font-size: 13px;
    color: #456052;
    min-width: 62px;
  }
  .deck-title {
    font-size: 13px;
    color: #6b7a72;
  }
  .deck-hint {
    margin: 6px 2px 0;
    font-size: 12px;
    color: #93a29a;
  }
  @media (max-width: 767px) {
    .deck-viewer { padding: 10px 10px 8px; }
    .deck-tab { font-size: 12px; padding: 8px 11px; }
    .deck-title { display: none; }
  }
</style>

<script>
  (function () {
    if (window.__deckViewerInit) return;
    window.__deckViewerInit = true;

    var DECKS = [{"id": "xicha", "title": "喜茶 × 鲜沐", "sub": "合作汇报", "n": 34}, {"id": "naixue", "title": "奈雪的茶 × 鲜沐", "sub": "合作方案", "n": 20}, {"id": "chayan", "title": "茶颜悦色 × 鲜沐", "sub": "合作方案", "n": 15}, {"id": "leyecha", "title": "乐乐茶 × 鲜沐", "sub": "合作报价", "n": 6}];
    var BASE = "/assets/library/notes/supply-chain-build/decks";

    function slideSrc(deckId, i) {
      // ?v=2 让浏览器把旧的低清图当新地址重新拉（否则 7 天缓存里还是模糊那版）
      return BASE + "/" + deckId + "/" + String(i + 1).padStart(2, "0") + ".webp?v=2";
    }

    function setup(viewer) {
      var img = viewer.querySelector("[data-deck-img]");
      var countEl = viewer.querySelector("[data-deck-count]");
      var titleEl = viewer.querySelector("[data-deck-title]");
      var prev = viewer.querySelector("[data-deck-prev]");
      var next = viewer.querySelector("[data-deck-next]");
      var tabs = [].slice.call(viewer.querySelectorAll("[data-deck-tab]"));
      var cur = 0;
      var page = 0;

      function render() {
        var d = DECKS[cur];
        img.src = slideSrc(d.id, page);
        img.alt = d.title + d.sub + " 第 " + (page + 1) + " 页";
        countEl.textContent = (page + 1) + " / " + d.n;
        titleEl.textContent = d.title + " · " + d.sub;
        prev.disabled = page === 0;
        next.disabled = page === d.n - 1;
        for (var i = 0; i < tabs.length; i++) {
          tabs[i].classList.toggle("is-active", i === cur);
        }
        if (page + 1 < d.n) {
          var pre = new Image();
          pre.src = slideSrc(d.id, page + 1);
        }
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () {
          cur = i;
          page = 0;
          render();
        });
      });
      prev.addEventListener("click", function () {
        if (page > 0) { page--; render(); }
      });
      next.addEventListener("click", function () {
        if (page < DECKS[cur].n - 1) { page++; render(); }
      });
      img.addEventListener("click", function (e) {
        var rect = img.getBoundingClientRect();
        var right = e.clientX - rect.left > rect.width / 2;
        if (right && page < DECKS[cur].n - 1) { page++; render(); }
        else if (!right && page > 0) { page--; render(); }
      });
      viewer.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" && page > 0) { page--; render(); e.preventDefault(); }
        if (e.key === "ArrowRight" && page < DECKS[cur].n - 1) { page++; render(); e.preventDefault(); }
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
