---
title: Agent Skill 从使用到原理
published: 2026-11-04T17:00:00+08:00
description: Agent「能聊不能干」，缺的是手和脚。Skill 用一个文件夹封装能力：SKILL.md 写元数据与步骤、脚本负责执行，靠渐进式披露省 token；再讲两种调用模式、三条编写铁律与工程化落地。
quote: 渐进式披露：先给元数据，再按需加载正文。
image: /assets/library/notes/agent-skill/cover.webp
category: 拾遗/学习笔记
tags:
  - Agent
  - Skill
  - 工程化
  - 课程笔记
draft: false
comment: false
documentPages: 26
---

<div class="document-page-stream" aria-label="Agent Skill 从使用到原理在线预览">
  <img src="/assets/library/notes/agent-skill/pages/page-01.webp" alt="Agent Skill 从使用到原理第 1 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-02.webp" alt="Agent Skill 从使用到原理第 2 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-03.webp" alt="Agent Skill 从使用到原理第 3 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-04.webp" alt="Agent Skill 从使用到原理第 4 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-05.webp" alt="Agent Skill 从使用到原理第 5 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-06.webp" alt="Agent Skill 从使用到原理第 6 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-07.webp" alt="Agent Skill 从使用到原理第 7 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-08.webp" alt="Agent Skill 从使用到原理第 8 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-09.webp" alt="Agent Skill 从使用到原理第 9 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-10.webp" alt="Agent Skill 从使用到原理第 10 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-11.webp" alt="Agent Skill 从使用到原理第 11 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-12.webp" alt="Agent Skill 从使用到原理第 12 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-13.webp" alt="Agent Skill 从使用到原理第 13 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-14.webp" alt="Agent Skill 从使用到原理第 14 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-15.webp" alt="Agent Skill 从使用到原理第 15 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-16.webp" alt="Agent Skill 从使用到原理第 16 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-17.webp" alt="Agent Skill 从使用到原理第 17 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-18.webp" alt="Agent Skill 从使用到原理第 18 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-19.webp" alt="Agent Skill 从使用到原理第 19 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-20.webp" alt="Agent Skill 从使用到原理第 20 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-21.webp" alt="Agent Skill 从使用到原理第 21 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-22.webp" alt="Agent Skill 从使用到原理第 22 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-23.webp" alt="Agent Skill 从使用到原理第 23 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-24.webp" alt="Agent Skill 从使用到原理第 24 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-25.webp" alt="Agent Skill 从使用到原理第 25 页" loading="lazy" decoding="async" draggable="false" />
  <img src="/assets/library/notes/agent-skill/pages/page-26.webp" alt="Agent Skill 从使用到原理第 26 页" loading="lazy" decoding="async" draggable="false" />
</div>
