---
title: 向量检索算法
published: 2026-11-03T12:41:00+08:00
description: 暴力搜索精度 100%，复杂度却是 O(N)，数据一多就慢到不能用。IVF 先聚类分簇、查询只比质心，HNSW 用分层图逐层下探，末尾附选型对比表。
image: /assets/library/notes/vector-search-ann/cover.webp
category: 拾遗/学习笔记
tags:
  - 向量检索
  - ANN
  - HNSW
  - 课程笔记
draft: false
comment: false
documentPages: 14
---

<div class="document-page-stream" aria-label="向量检索算法：从暴力搜索到 IVF 与 HNSW在线预览">
  <img src="/assets/library/notes/vector-search-ann/pages/page-01.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 1 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-02.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 2 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-03.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 3 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-04.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 4 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-05.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 5 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-06.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 6 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-07.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 7 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-08.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 8 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-09.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 9 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-10.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 10 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-11.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 11 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-12.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 12 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-13.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 13 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/vector-search-ann/pages/page-14.webp" alt="向量检索算法：从暴力搜索到 IVF 与 HNSW第 14 页" loading="lazy" decoding="async" draggable="false" />
</div>
