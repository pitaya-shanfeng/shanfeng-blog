---
title: 大模型核心原理
published: 2025-12-02T18:00:00+08:00
description: 模型只做一件事：根据上文猜下一个词。分词、词嵌入、注意力、生成四步拆开讲，用「国王有个女儿」走一遍；训练三阶段是预训练、SFT、RLHF。
quote: 模型只做一件事：根据上文猜下一个词。
image: /assets/library/notes/llm-core-principles/cover.webp
category: 拾遗/学习笔记
tags:
  - 大模型
  - 原理
draft: false
comment: false
documentPages: 34
---

<div class="document-page-stream" aria-label="大模型核心原理在线预览">
  <img src="/assets/library/notes/llm-core-principles/pages/page-01.webp" alt="大模型核心原理第 1 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-02.webp" alt="大模型核心原理第 2 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-03.webp" alt="大模型核心原理第 3 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-04.webp" alt="大模型核心原理第 4 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-05.webp" alt="大模型核心原理第 5 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-06.webp" alt="大模型核心原理第 6 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-07.webp" alt="大模型核心原理第 7 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-08.webp" alt="大模型核心原理第 8 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-09.webp" alt="大模型核心原理第 9 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-10.webp" alt="大模型核心原理第 10 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-11.webp" alt="大模型核心原理第 11 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-12.webp" alt="大模型核心原理第 12 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-13.webp" alt="大模型核心原理第 13 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-14.webp" alt="大模型核心原理第 14 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-15.webp" alt="大模型核心原理第 15 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-16.webp" alt="大模型核心原理第 16 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-17.webp" alt="大模型核心原理第 17 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-18.webp" alt="大模型核心原理第 18 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-19.webp" alt="大模型核心原理第 19 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-20.webp" alt="大模型核心原理第 20 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-21.webp" alt="大模型核心原理第 21 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-22.webp" alt="大模型核心原理第 22 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-23.webp" alt="大模型核心原理第 23 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-24.webp" alt="大模型核心原理第 24 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-25.webp" alt="大模型核心原理第 25 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-26.webp" alt="大模型核心原理第 26 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-27.webp" alt="大模型核心原理第 27 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-28.webp" alt="大模型核心原理第 28 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-29.webp" alt="大模型核心原理第 29 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-30.webp" alt="大模型核心原理第 30 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-31.webp" alt="大模型核心原理第 31 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-32.webp" alt="大模型核心原理第 32 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-33.webp" alt="大模型核心原理第 33 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/llm-core-principles/pages/page-34.webp" alt="大模型核心原理第 34 页" loading="lazy" decoding="async" draggable="false" />
</div>
