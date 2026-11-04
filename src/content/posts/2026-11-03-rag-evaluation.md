---
title: RAG 应用评估技能和工具
published: 2026-11-03T13:12:00+08:00
description: RAG 的输出不确定、知识库还在变，所以得先有评估依据：检索测上下文相关性与召回率，生成测忠实度与答案相关性。工具用 Ragas 和 TruLens，然后拿医疗问答、知识块大小、智能汽车挑战赛三个实战，把指标怎么指导优化走一遍。
quote: 四个指标不是孤立的，检索器是生成器的地基。
image: /assets/library/notes/rag-evaluation/cover.webp
category: 拾遗/学习笔记
tags:
  - 大模型
  - RAG
  - 评估
  - 课程笔记
draft: false
comment: false
documentPages: 39
---

<div class="document-page-stream" aria-label="RAG 应用评估技能和工具在线预览">
  <img src="/assets/library/notes/rag-evaluation/pages/page-01.webp" alt="RAG 应用评估技能和工具第 1 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-02.webp" alt="RAG 应用评估技能和工具第 2 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-03.webp" alt="RAG 应用评估技能和工具第 3 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-04.webp" alt="RAG 应用评估技能和工具第 4 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-05.webp" alt="RAG 应用评估技能和工具第 5 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-06.webp" alt="RAG 应用评估技能和工具第 6 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-07.webp" alt="RAG 应用评估技能和工具第 7 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-08.webp" alt="RAG 应用评估技能和工具第 8 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-09.webp" alt="RAG 应用评估技能和工具第 9 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-10.webp" alt="RAG 应用评估技能和工具第 10 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-11.webp" alt="RAG 应用评估技能和工具第 11 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-12.webp" alt="RAG 应用评估技能和工具第 12 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-13.webp" alt="RAG 应用评估技能和工具第 13 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-14.webp" alt="RAG 应用评估技能和工具第 14 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-15.webp" alt="RAG 应用评估技能和工具第 15 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-16.webp" alt="RAG 应用评估技能和工具第 16 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-17.webp" alt="RAG 应用评估技能和工具第 17 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-18.webp" alt="RAG 应用评估技能和工具第 18 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-19.webp" alt="RAG 应用评估技能和工具第 19 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-20.webp" alt="RAG 应用评估技能和工具第 20 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-21.webp" alt="RAG 应用评估技能和工具第 21 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-22.webp" alt="RAG 应用评估技能和工具第 22 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-23.webp" alt="RAG 应用评估技能和工具第 23 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-24.webp" alt="RAG 应用评估技能和工具第 24 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-25.webp" alt="RAG 应用评估技能和工具第 25 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-26.webp" alt="RAG 应用评估技能和工具第 26 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-27.webp" alt="RAG 应用评估技能和工具第 27 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-28.webp" alt="RAG 应用评估技能和工具第 28 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-29.webp" alt="RAG 应用评估技能和工具第 29 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-30.webp" alt="RAG 应用评估技能和工具第 30 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-31.webp" alt="RAG 应用评估技能和工具第 31 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-32.webp" alt="RAG 应用评估技能和工具第 32 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-33.webp" alt="RAG 应用评估技能和工具第 33 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-34.webp" alt="RAG 应用评估技能和工具第 34 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-35.webp" alt="RAG 应用评估技能和工具第 35 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-36.webp" alt="RAG 应用评估技能和工具第 36 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-37.webp" alt="RAG 应用评估技能和工具第 37 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-38.webp" alt="RAG 应用评估技能和工具第 38 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/rag-evaluation/pages/page-39.webp" alt="RAG 应用评估技能和工具第 39 页" loading="lazy" decoding="async" draggable="false" />
</div>
