---
title: RAG 重排序底层原理解析
published: 2026-11-03T13:08:00+08:00
description: 初步检索「召得回」不等于「排得好」，重排序是 RAG 的第二阶段过滤器。先看它在全流程中的位置与初检的局限，再拆 Cross-Encoder：成对文本一起进 Transformer、输出一个相关性分数，以及它和 Bi-Encoder 嵌入模型的本质区别；最后把优势与延迟成本算成一笔账。
image: /assets/library/notes/rerank-principles/cover.webp
category: 拾遗/学习笔记
tags:
  - 大模型
  - RAG
  - 重排序
  - 课程笔记
draft: false
comment: false
documentPages: 14
---

<div class="document-page-stream" aria-label="RAG 重排序底层原理解析在线预览">
  <img src="/assets/library/notes/rerank-principles/pages/page-01.webp" alt="RAG 重排序底层原理解析第 1 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-02.webp" alt="RAG 重排序底层原理解析第 2 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-03.webp" alt="RAG 重排序底层原理解析第 3 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-04.webp" alt="RAG 重排序底层原理解析第 4 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-05.webp" alt="RAG 重排序底层原理解析第 5 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-06.webp" alt="RAG 重排序底层原理解析第 6 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-07.webp" alt="RAG 重排序底层原理解析第 7 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-08.webp" alt="RAG 重排序底层原理解析第 8 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-09.webp" alt="RAG 重排序底层原理解析第 9 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-10.webp" alt="RAG 重排序底层原理解析第 10 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-11.webp" alt="RAG 重排序底层原理解析第 11 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-12.webp" alt="RAG 重排序底层原理解析第 12 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-13.webp" alt="RAG 重排序底层原理解析第 13 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rerank-principles/pages/page-14.webp" alt="RAG 重排序底层原理解析第 14 页" loading="lazy" decoding="async" draggable="false" />
</div>
