#!/usr/bin/env python3
"""PDF → Markdown 粗转：按行重排、识别标题/列表/表格，稀疏页留图。

用法：pdf-to-md.py <in.pdf> <out.md> [--images-dir DIR --slug SLUG]
"""
import re, sys, unicodedata, pathlib, argparse

PUA = "\ue000-\uf8ff"          # PDF 里常见的私有区项目符号
BULLET_RE = re.compile(rf"^\s*[{PUA}\u2022\u25cf\u25a0\u00b7]\s*")
H1_RE = re.compile(r"^[一二三四五六七八九十]+、")
H2_RE = re.compile(r"^\d+、")
H3_RE = re.compile(r"^[（(]\d+[）)]")
END_PUNCT = "。！？；：:;.!?」』…、,，）)】]"

def norm(s):
    return unicodedata.normalize("NFKC", s)

def read_pages(path):
    from pypdf import PdfReader
    r = PdfReader(path)
    out = []
    for p in r.pages:
        t = p.extract_text(extraction_mode="layout") or ""
        out.append(norm(t))
    return out

def split_columns(line):
    """按连续 2 个以上空格切列，返回非空单元。"""
    cells = [c.strip() for c in re.split(r"\s{2,}", line.strip()) if c.strip()]
    return cells

def parse_page(text):
    """把一页文本解析成块：heading / table / bullet / para。"""
    lines = [l.rstrip() for l in text.split("\n")]
    blocks, table, para = [], [], []

    def flush_para():
        nonlocal para
        if para:
            blocks.append(("p", "".join(para)))
            para = []

    def flush_table():
        nonlocal table
        if table:
            blocks.append(("table", table))
            table = []

    for raw in lines:
        line = raw.strip()
        if not line:
            flush_para()
            continue
        cells = split_columns(line)
        if len(cells) >= 2:
            flush_para()
            table.append(cells)
            continue
        flush_table()
        if BULLET_RE.match(line):
            flush_para()
            blocks.append(("li", BULLET_RE.sub("", line)))
        elif H1_RE.match(line):
            flush_para(); blocks.append(("h1", line))
        elif H2_RE.match(line):
            flush_para(); blocks.append(("h2", line))
        elif H3_RE.match(line):
            flush_para(); blocks.append(("h3", line))
        else:
            # 上一行没结束 → 续行
            if para and not para[-1].rstrip().endswith(tuple(END_PUNCT)):
                para.append(line)
            else:
                flush_para(); para.append(line)
    flush_para(); flush_table()
    return blocks

def to_md(blocks, page_no=None, page_img=None, sparse=False):
    out = []
    if sparse and page_img:
        out.append(f"![第 {page_no} 页原图]({page_img})")
        out.append("")
    for kind, val in blocks:
        if kind == "h1": out += [f"## {val}", ""]
        elif kind == "h2": out += [f"### {val}", ""]
        elif kind == "h3": out += [f"#### {val}", ""]
        elif kind == "li": out += [f"- {val}"]
        elif kind == "p":
            txt = re.sub(r"\s+", " ", val).strip()
            if len(txt) <= 2: continue
            out += [txt, ""]
        elif kind == "table":
            rows = [r for r in val if len(r) >= 2]
            if not rows: continue
            width = max(len(r) for r in rows)
            norm_rows = [r + [""] * (width - len(r)) for r in rows]
            head = norm_rows[0]
            sep = ["---"] * width
            out.append("| " + " | ".join(head) + " |")
            out.append("| " + " | ".join(sep) + " |")
            for r in norm_rows[1:]:
                out.append("| " + " | ".join(r) + " |")
            out.append("")
    return "\n".join(out)

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf"); ap.add_argument("out")
    ap.add_argument("--slug")
    ap.add_argument("--pages", default=None, help="如 1-20 / 21-32")
    a = ap.parse_args()

    pages = read_pages(a.pdf)
    rng = None
    if a.pages:
        s, e = a.pages.split("-"); rng = (int(s), int(e))
    sel = list(enumerate(pages, 1))
    if rng: sel = [(i, t) for i, t in sel if rng[0] <= i <= rng[1]]

    parts = []
    for i, text in sel:
        sparse = len(re.sub(r"\s", "", text)) < 220
        img = None
        if sparse and a.slug:
            img = f"/assets/library/notes/{a.slug}/pages/page-{i:02d}.webp"
        parts.append(to_md(parse_page(text), i, img, sparse))
    pathlib.Path(a.out).write_text("\n\n".join(parts), encoding="utf-8")
    print("wrote", a.out, len(parts), "pages")
