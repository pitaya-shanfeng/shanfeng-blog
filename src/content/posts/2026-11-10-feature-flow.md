---
title: 功能与流程设计
published: 2026-11-10T18:30:00+08:00
description: 功能设计不是画原型，是把「用户要做的事」拆成能实现的模块，再把模块串成走得通的流程。37 页讲的是这件事的完整干法，后面的脑图是逐层的判断依据。
quote: 功能是名词，流程是动词——只画界面不跑流程，做出来的东西用不起来。
category: 思路
tags:
  - 功能设计
  - 流程
  - 方法论
# 方法合集第十篇（排在《BRD 与 MRD》之后）
order: 11
deckPages: 37
deckWords: 8850
image: /assets/library/notes/feature-flow/cover.webp
banner: /assets/images/idea-banner-11.webp
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

## 一、功能与流程设计

<div class="deck-flat">
<img src="/assets/library/notes/feature-flow/decks/main-v2/01.webp" alt="第 1 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/02.webp" alt="第 2 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/03.webp" alt="第 3 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/04.webp" alt="第 4 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/05.webp" alt="第 5 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/06.webp" alt="第 6 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/07.webp" alt="第 7 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/08.webp" alt="第 8 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/09.webp" alt="第 9 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/10.webp" alt="第 10 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/11.webp" alt="第 11 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/12.webp" alt="第 12 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/13.webp" alt="第 13 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/14.webp" alt="第 14 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/15.webp" alt="第 15 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/16.webp" alt="第 16 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/17.webp" alt="第 17 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/18.webp" alt="第 18 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/19.webp" alt="第 19 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/20.webp" alt="第 20 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/21.webp" alt="第 21 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/22.webp" alt="第 22 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/23.webp" alt="第 23 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/24.webp" alt="第 24 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/25.webp" alt="第 25 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/26.webp" alt="第 26 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/27.webp" alt="第 27 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/28.webp" alt="第 28 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/29.webp" alt="第 29 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/30.webp" alt="第 30 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/31.webp" alt="第 31 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/32.webp" alt="第 32 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/33.webp" alt="第 33 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/34.webp" alt="第 34 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/35.webp" alt="第 35 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/36.webp" alt="第 36 页" loading="lazy" decoding="async" />
<img src="/assets/library/notes/feature-flow/decks/main-v2/37.webp" alt="第 37 页" loading="lazy" decoding="async" />
</div>

<div class="block-divider"></div>

## 二、脑图：功能和流程设计

<div class="map-viewer">
  <div class="map-stage">
    <img src="/assets/library/notes/feature-flow/maps/feature-flow.webp" alt="功能和流程设计脑图" loading="lazy" decoding="async" />
  </div>
  <p class="map-hint">点图片看原尺寸</p>
</div>

