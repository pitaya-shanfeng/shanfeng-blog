---
title: RAG 重排序底层原理解析
published: 2026-11-03T13:08:00+08:00
description: 初步检索能召回，却不一定排得准。重排序是第二道过滤：Cross-Encoder 把问题和文档成对送进模型打分，再按分数重排，文末还算了一笔延迟成本。
quote: 初步检索「召得回」，但不一定「排得好」。
image: /assets/library/notes/rerank-principles/cover.webp
category: 学习思考
tags:
  - RAG
  - 原理
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
