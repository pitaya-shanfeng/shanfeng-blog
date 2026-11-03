---
title: 提示工程与 Prompt 调优技巧
published: 2026-11-03T16:00:00+08:00
description: 提示词只解决两件事，把背景信息给足，把复杂任务拆成步骤。六种技巧按代价排开：零样本最省，少样本改格式，思维链拆推理，自我一致性靠多次投票，思维树在分支里搜，反思机制让模型自己回看一遍。后半段转向防守与搭建，注入、泄露、越狱三类攻击怎么防，Coze 零代码怎么搭，百炼 API 怎么跑通第一个 Hello World。
image: /assets/library/notes/prompt-engineering-tuning/cover.webp
category: 拾遗/学习笔记
tags:
  - 提示词
  - 提示工程
  - Coze
  - 课程笔记
draft: false
comment: false
documentPages: 40
---

<div class="document-page-stream" aria-label="提示工程与 Prompt 调优技巧在线预览">
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-01.webp" alt="提示工程与 Prompt 调优技巧第 1 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-02.webp" alt="提示工程与 Prompt 调优技巧第 2 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-03.webp" alt="提示工程与 Prompt 调优技巧第 3 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-04.webp" alt="提示工程与 Prompt 调优技巧第 4 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-05.webp" alt="提示工程与 Prompt 调优技巧第 5 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-06.webp" alt="提示工程与 Prompt 调优技巧第 6 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-07.webp" alt="提示工程与 Prompt 调优技巧第 7 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-08.webp" alt="提示工程与 Prompt 调优技巧第 8 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-09.webp" alt="提示工程与 Prompt 调优技巧第 9 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-10.webp" alt="提示工程与 Prompt 调优技巧第 10 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-11.webp" alt="提示工程与 Prompt 调优技巧第 11 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-12.webp" alt="提示工程与 Prompt 调优技巧第 12 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-13.webp" alt="提示工程与 Prompt 调优技巧第 13 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-14.webp" alt="提示工程与 Prompt 调优技巧第 14 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-15.webp" alt="提示工程与 Prompt 调优技巧第 15 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-16.webp" alt="提示工程与 Prompt 调优技巧第 16 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-17.webp" alt="提示工程与 Prompt 调优技巧第 17 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-18.webp" alt="提示工程与 Prompt 调优技巧第 18 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-19.webp" alt="提示工程与 Prompt 调优技巧第 19 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-20.webp" alt="提示工程与 Prompt 调优技巧第 20 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-21.webp" alt="提示工程与 Prompt 调优技巧第 21 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-22.webp" alt="提示工程与 Prompt 调优技巧第 22 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-23.webp" alt="提示工程与 Prompt 调优技巧第 23 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-24.webp" alt="提示工程与 Prompt 调优技巧第 24 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-25.webp" alt="提示工程与 Prompt 调优技巧第 25 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-26.webp" alt="提示工程与 Prompt 调优技巧第 26 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-27.webp" alt="提示工程与 Prompt 调优技巧第 27 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-28.webp" alt="提示工程与 Prompt 调优技巧第 28 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-29.webp" alt="提示工程与 Prompt 调优技巧第 29 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-30.webp" alt="提示工程与 Prompt 调优技巧第 30 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-31.webp" alt="提示工程与 Prompt 调优技巧第 31 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-32.webp" alt="提示工程与 Prompt 调优技巧第 32 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-33.webp" alt="提示工程与 Prompt 调优技巧第 33 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-34.webp" alt="提示工程与 Prompt 调优技巧第 34 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-35.webp" alt="提示工程与 Prompt 调优技巧第 35 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-36.webp" alt="提示工程与 Prompt 调优技巧第 36 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-37.webp" alt="提示工程与 Prompt 调优技巧第 37 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-38.webp" alt="提示工程与 Prompt 调优技巧第 38 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-39.webp" alt="提示工程与 Prompt 调优技巧第 39 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/prompt-engineering-tuning/pages/page-40.webp" alt="提示工程与 Prompt 调优技巧第 40 页" loading="lazy" decoding="async" draggable="false" />
</div>
