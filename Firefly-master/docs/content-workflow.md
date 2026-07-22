# 山风blog 内容维护说明

## 文章目录

正式文章统一放在：

```text
src/content/posts/
```

栏目和目录对应关系：

| 栏目 | 文章目录 | 附件目录 |
|---|---|---|
| 见山 | `src/content/posts/jianshan/` | `public/assets/library/jianshan/` |
| 笔记 | `src/content/posts/notes/` | `public/assets/library/notes/` |
| 随笔 | `src/content/posts/essays/` | `public/assets/library/essays/` |
| 方法库 | `src/content/posts/methods/` | `public/assets/library/methods/` |
| 案例库 | `src/content/posts/cases/` | `public/assets/library/cases/` |

## 新增文章

1. 从 `docs/article-templates/` 复制对应栏目模板
2. 粘贴到对应文章目录，例如 `src/content/posts/essays/`
3. 改成新的文件名，例如 `2026-07-22-why-this-blog.md`
4. 修改顶部 frontmatter
5. 写正文
6. 准备发布时，把 `draft: true` 改成 `draft: false`

模板不要直接放在 `src/content/posts/` 里长期保留，否则本地预览时会被当成文章显示。

## 文章字段

```md
---
title: 文章标题
published: 2026-07-22
description: 文章摘要
category: 随笔
tags:
  - 产品思考
  - 复盘
draft: true
---
```

`category` 必须使用下面之一：

- `见山`
- `笔记`
- `随笔`
- `方法库`
- `案例库`

## 附件引用

附件放在 `public/assets/library/栏目/文章目录/`。

文章里引用时，不写 `public`：

```md
- [下载 PPT](/assets/library/cases/project-review/review.pptx)
- [下载 PDF](/assets/library/cases/project-review/research.pdf)

![脑图](/assets/library/cases/project-review/mindmap.png)
```
