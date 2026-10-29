#!/usr/bin/env python3
"""从 PDF 课件提取两级目录，写入 src/constants/pdf-tocs.json。

用法:
    python3 scripts/gen_pdf_toc.py <pdf路径> <文章slug>

为什么不用 MinerU / OCR:
    本项目处理的 PDF 都是矢量课件（带文本层、无书签 outline），标题层级由字号和
    坐标决定，直接提取即可，零误判且比跑模型快三个数量级。若哪天遇到扫描件
    （无文本层），再考虑 MinerU 这类 OCR 方案。

提取规则（按本系列课件的排版约定，改版式时同步调整这里）:
    章节页  页面最大字号 >= 70pt（74.6pt 的大数字「01」），取 23pt 的章节名 + 7.2pt 副标题
    内容页  标题固定在 y < 20 且字号 ≈ 8.6pt；正文同等字号只在 y >= 69 出现，
            所以坐标阈值能把正文里的强调数字（「1750亿」「30颗」）排除掉
"""
import io
import json
import os
import re
import sys

import pymupdf
from PIL import Image

CHAPTER_NUM_SIZE = 70.0   # 章节页大数字
CHAPTER_NAME_SIZE = 23.0  # 章节名
CHAPTER_SUB_SIZE = 7.18   # 章节副标题
PAGE_TITLE_SIZE = 8.6     # 内容页标题专用字号
PAGE_TITLE_MAX_Y = 20.0   # 标题区上边界（页眉在 y=10，标题在 y≈10.7）

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "src", "constants", "pdf-tocs.json")


def extract(pdf_path):
    doc = pymupdf.open(pdf_path)
    items = []
    for pno in range(doc.page_count):
        lines = []  # (y, x, size, text)
        for block in doc[pno].get_text("dict")["blocks"]:
            if block.get("type") != 0:
                continue
            for line in block["lines"]:
                text = "".join(s["text"] for s in line["spans"]).strip()
                if not text:
                    continue
                size = max(s["size"] for s in line["spans"])
                lines.append((line["bbox"][1], line["bbox"][0], size, text))
        if not lines:
            continue
        if max(l[2] for l in lines) >= CHAPTER_NUM_SIZE:
            items.append({
                "depth": 1,
                "slug": f"page-{pno + 1:02d}",
                "text": next((l[3] for l in lines
                              if abs(l[2] - CHAPTER_NAME_SIZE) < 1.5), ""),
            })
        else:
            head = [l for l in lines
                    if l[0] < PAGE_TITLE_MAX_Y and abs(l[2] - PAGE_TITLE_SIZE) < 0.4]
            if head:
                head.sort(key=lambda l: (round(l[0]), l[1]))
                items.append({
                    "depth": 2,
                    "slug": f"page-{pno + 1:02d}",
                    "text": re.sub(r"\s+", "", "".join(l[3] for l in head)),
                })
    return items


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    pdf_path, slug = sys.argv[1], sys.argv[2]
    items = extract(pdf_path)

    data = {}
    if os.path.exists(OUT):
        with open(OUT, encoding="utf-8") as f:
            data = json.load(f)
    data[slug] = items
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write("\n")

    chapters = sum(1 for i in items if i["depth"] == 1)
    print(f"{slug}: {len(items)} 项（{chapters} 章 + {len(items) - chapters} 页标题）")
    for i in items:
        mark = "■" if i["depth"] == 1 else " "
        print(f"  {mark} p{i['slug'][5:]}  {i['text']}")


if __name__ == "__main__":
    main()
