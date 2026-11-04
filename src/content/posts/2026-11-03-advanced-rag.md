---
title: RAG 商业化痛点与 Advanced RAG
published: 2026-11-03T12:45:00+08:00
description: Naive RAG 上线容易、商用难：七个失效点逐一归位（索引构建四个、检索增强三个），再给出 Pre-Retrieval、检索、Post-Retrieval 的三段式优化框架。
image: /assets/library/notes/advanced-rag/cover.webp
category: 拾遗/学习笔记
tags:
  - 大模型
  - RAG
  - 检索优化
  - 课程笔记
draft: false
comment: false
documentPages: 34
---

<div class="document-page-stream" aria-label="RAG 商业化痛点与 Advanced RAG在线预览">
  <img src="/assets/library/notes/advanced-rag/pages/page-01.webp" alt="RAG 商业化痛点与 Advanced RAG第 1 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-02.webp" alt="RAG 商业化痛点与 Advanced RAG第 2 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-03.webp" alt="RAG 商业化痛点与 Advanced RAG第 3 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-04.webp" alt="RAG 商业化痛点与 Advanced RAG第 4 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-05.webp" alt="RAG 商业化痛点与 Advanced RAG第 5 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-06.webp" alt="RAG 商业化痛点与 Advanced RAG第 6 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-07.webp" alt="RAG 商业化痛点与 Advanced RAG第 7 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-08.webp" alt="RAG 商业化痛点与 Advanced RAG第 8 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-09.webp" alt="RAG 商业化痛点与 Advanced RAG第 9 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-10.webp" alt="RAG 商业化痛点与 Advanced RAG第 10 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-11.webp" alt="RAG 商业化痛点与 Advanced RAG第 11 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-12.webp" alt="RAG 商业化痛点与 Advanced RAG第 12 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-13.webp" alt="RAG 商业化痛点与 Advanced RAG第 13 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-14.webp" alt="RAG 商业化痛点与 Advanced RAG第 14 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-15.webp" alt="RAG 商业化痛点与 Advanced RAG第 15 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-16.webp" alt="RAG 商业化痛点与 Advanced RAG第 16 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-17.webp" alt="RAG 商业化痛点与 Advanced RAG第 17 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-18.webp" alt="RAG 商业化痛点与 Advanced RAG第 18 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-19.webp" alt="RAG 商业化痛点与 Advanced RAG第 19 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-20.webp" alt="RAG 商业化痛点与 Advanced RAG第 20 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-21.webp" alt="RAG 商业化痛点与 Advanced RAG第 21 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-22.webp" alt="RAG 商业化痛点与 Advanced RAG第 22 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-23.webp" alt="RAG 商业化痛点与 Advanced RAG第 23 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-24.webp" alt="RAG 商业化痛点与 Advanced RAG第 24 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-25.webp" alt="RAG 商业化痛点与 Advanced RAG第 25 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-26.webp" alt="RAG 商业化痛点与 Advanced RAG第 26 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-27.webp" alt="RAG 商业化痛点与 Advanced RAG第 27 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-28.webp" alt="RAG 商业化痛点与 Advanced RAG第 28 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-29.webp" alt="RAG 商业化痛点与 Advanced RAG第 29 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-30.webp" alt="RAG 商业化痛点与 Advanced RAG第 30 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-31.webp" alt="RAG 商业化痛点与 Advanced RAG第 31 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-32.webp" alt="RAG 商业化痛点与 Advanced RAG第 32 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-33.webp" alt="RAG 商业化痛点与 Advanced RAG第 33 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/advanced-rag/pages/page-34.webp" alt="RAG 商业化痛点与 Advanced RAG第 34 页" loading="lazy" decoding="async" draggable="false" />
</div>
