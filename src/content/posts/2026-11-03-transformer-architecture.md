---
title: Transformer 架构解析
published: 2025-12-02T20:00:00+08:00
description: 拿「国王他有个女儿」走一遍全链路。分词、词嵌入叠位置编码凑成 4×512 矩阵，QKV 和八头注意力各看一个视角，编码器稳住梯度，解码器逐词生成。
image: /assets/library/notes/transformer-architecture/cover.webp
category: 拾遗/学习笔记
tags:
  - Transformer
  - 注意力机制
  - 自回归
  - 课程笔记
draft: false
comment: false
documentPages: 24
---

<div class="document-page-stream" aria-label="Transformer 架构解析在线预览">
  <img src="/assets/library/notes/transformer-architecture/pages/page-01.webp" alt="Transformer 架构解析第 1 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-02.webp" alt="Transformer 架构解析第 2 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-03.webp" alt="Transformer 架构解析第 3 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-04.webp" alt="Transformer 架构解析第 4 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-05.webp" alt="Transformer 架构解析第 5 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-06.webp" alt="Transformer 架构解析第 6 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-07.webp" alt="Transformer 架构解析第 7 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-08.webp" alt="Transformer 架构解析第 8 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-09.webp" alt="Transformer 架构解析第 9 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-10.webp" alt="Transformer 架构解析第 10 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-11.webp" alt="Transformer 架构解析第 11 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-12.webp" alt="Transformer 架构解析第 12 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-13.webp" alt="Transformer 架构解析第 13 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-14.webp" alt="Transformer 架构解析第 14 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-15.webp" alt="Transformer 架构解析第 15 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-16.webp" alt="Transformer 架构解析第 16 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-17.webp" alt="Transformer 架构解析第 17 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-18.webp" alt="Transformer 架构解析第 18 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-19.webp" alt="Transformer 架构解析第 19 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-20.webp" alt="Transformer 架构解析第 20 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-21.webp" alt="Transformer 架构解析第 21 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-22.webp" alt="Transformer 架构解析第 22 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-23.webp" alt="Transformer 架构解析第 23 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/transformer-architecture/pages/page-24.webp" alt="Transformer 架构解析第 24 页" loading="lazy" decoding="async" draggable="false" />
</div>
