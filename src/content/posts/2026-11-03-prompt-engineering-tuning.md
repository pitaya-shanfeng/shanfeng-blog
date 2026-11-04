---
title: Prompt工程与调优技巧
published: 2026-10-20T10:00:00+08:00
description: 提示词其实只解决两件事：把背景给足，把任务拆开。六种技巧按代价排开，后半段转到防守，讲注入、泄露、越狱怎么防，也讲 Coze 和百炼怎么跑通。
quote: 提示词只解决两件事：把背景信息给足，把复杂任务拆成步骤。
image: /assets/library/notes/prompt-engineering-tuning/cover.webp
category: 拾遗/学习笔记
tags:
  - 提示词
  - 工程化
  - Agent
draft: false
comment: false
documentPages: 41
---

<div class="document-page-stream" aria-label="Prompt工程与调优技巧在线预览">
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-01.webp" alt="Prompt工程与调优技巧第 1 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-02.webp" alt="Prompt工程与调优技巧第 2 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-03.webp" alt="Prompt工程与调优技巧第 3 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-04.webp" alt="Prompt工程与调优技巧第 4 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-05.webp" alt="Prompt工程与调优技巧第 5 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-06.webp" alt="Prompt工程与调优技巧第 6 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-07.webp" alt="Prompt工程与调优技巧第 7 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-08.webp" alt="Prompt工程与调优技巧第 8 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-09.webp" alt="Prompt工程与调优技巧第 9 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-10.webp" alt="Prompt工程与调优技巧第 10 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-11.webp" alt="Prompt工程与调优技巧第 11 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-12.webp" alt="Prompt工程与调优技巧第 12 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-13.webp" alt="Prompt工程与调优技巧第 13 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-14.webp" alt="Prompt工程与调优技巧第 14 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-15.webp" alt="Prompt工程与调优技巧第 15 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-16.webp" alt="Prompt工程与调优技巧第 16 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-17.webp" alt="Prompt工程与调优技巧第 17 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-18.webp" alt="Prompt工程与调优技巧第 18 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-19.webp" alt="Prompt工程与调优技巧第 19 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-20.webp" alt="Prompt工程与调优技巧第 20 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-21.webp" alt="Prompt工程与调优技巧第 21 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-22.webp" alt="Prompt工程与调优技巧第 22 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-23.webp" alt="Prompt工程与调优技巧第 23 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-24.webp" alt="Prompt工程与调优技巧第 24 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-25.webp" alt="Prompt工程与调优技巧第 25 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-26.webp" alt="Prompt工程与调优技巧第 26 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-27.webp" alt="Prompt工程与调优技巧第 27 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-28.webp" alt="Prompt工程与调优技巧第 28 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-29.webp" alt="Prompt工程与调优技巧第 29 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-30.webp" alt="Prompt工程与调优技巧第 30 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-31.webp" alt="Prompt工程与调优技巧第 31 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-32.webp" alt="Prompt工程与调优技巧第 32 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-33.webp" alt="Prompt工程与调优技巧第 33 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-34.webp" alt="Prompt工程与调优技巧第 34 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-35.webp" alt="Prompt工程与调优技巧第 35 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-36.webp" alt="Prompt工程与调优技巧第 36 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-37.webp" alt="Prompt工程与调优技巧第 37 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-38.webp" alt="Prompt工程与调优技巧第 38 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-39.webp" alt="Prompt工程与调优技巧第 39 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-40.webp" alt="Prompt工程与调优技巧第 40 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-41.webp" alt="Prompt工程与调优技巧第 41 页" loading="lazy" decoding="async" draggable="false" />
</div>
