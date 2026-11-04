#!/bin/bash
#
# 把 PPTX / PDF 逐页转成无损 WebP，供课件类文章内嵌。
#
# 用法：
#   ./scripts/pptx-to-pages.sh <源文件.pptx|pdf> <文章 slug> [宽度]
#
# 例：
#   ./scripts/pptx-to-pages.sh ~/Downloads/AI大模型初识.pptx ai-llm-intro
#
# 产物写到 public/assets/library/notes/<slug>/pages/page-NN.webp，
# 并把旧页图清掉（页数可能变多或变少）。
#
# 为什么用「原生宽度 + 无损」而不是缩一半再压：
#   实测同一份 20 页课件，6400 宽无损 4.16 MB，3200 宽无损 4.99 MB ——
#   先缩放再无损反而更大。缩放会引入大量抗锯齿过渡像素，纯色区域被切成
#   上千种色阶，无损编码就没有压缩空间了。课件本来就是大面积纯色 + 文字，
#   直接按渲染分辨率无损编码，既清晰又更小。
#
# 依赖（macOS）：Keynote（pptx 转 PDF）、系统 swift（PDF 渲染）。不需要 LibreOffice。

set -euo pipefail

SRC="${1:?用法: pptx-to-pages.sh <源文件.pptx|pdf> <slug> [宽度]}"
SLUG="${2:?缺少文章 slug，例如 ai-llm-intro}"
WIDTH="${3:-6400}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/public/assets/library/notes/$SLUG/pages"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

case "$SRC" in
*.pptx | *.ppt | *.key)
	echo "→ 用 Keynote 导出 PDF…"
	# Keynote 打开大文件时经常超过 AppleEvent 默认 2 分钟，超时就直接失败
	osascript <<EOF
with timeout of 600 seconds
  tell application "Keynote"
  set d to open POSIX file "$(cd "$(dirname "$SRC")" && pwd)/$(basename "$SRC")"
  export d to file (POSIX file "$TMP/source.pdf") as PDF
    close d saving no
  end tell
end timeout
EOF
	PDF="$TMP/source.pdf"
	;;
*.pdf)
	PDF="$SRC"
	;;
*)
	echo "不支持的格式：$SRC" >&2
	exit 1
	;;
esac

[ -f "$PDF" ] || {
	echo "PDF 导出失败" >&2
	exit 1
}

echo "→ 渲染 PDF 每页（目标宽度 ${WIDTH}px）…"
cat >"$TMP/render.swift" <<'SWIFT'
import Foundation
import PDFKit
import AppKit

let args = CommandLine.arguments
let pdfPath = args[1], outDir = args[2]
let targetW = CGFloat(Double(args[3]) ?? 6400)
try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)
guard let doc = PDFDocument(url: URL(fileURLWithPath: pdfPath)) else { exit(1) }
for i in 0..<doc.pageCount {
    guard let page = doc.page(at: i) else { continue }
    let b = page.bounds(for: .mediaBox)
    let scale = targetW / b.width
    let w = Int(targetW)
    let h = Int((b.height * scale).rounded())

    // 用 CGContext 直接建位图，尺寸就是输出像素数。
    // 绕开 NSImage.lockFocus()：它会按显示器后备比例放大，
    // Retina 上会得到 2 倍尺寸（12800 而不是 6400），体积翻几倍。
    guard let cg = CGContext(data: nil, width: w, height: h,
                             bitsPerComponent: 8, bytesPerRow: 0,
                             space: CGColorSpaceCreateDeviceRGB(),
                             bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else { continue }
    cg.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
    cg.fill(CGRect(x: 0, y: 0, width: w, height: h))
    cg.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: cg)
    guard let cgImage = cg.makeImage() else { continue }
    let rep = NSBitmapImageRep(cgImage: cgImage)
    if let png = rep.representation(using: .png, properties: [:]) {
        try? png.write(to: URL(fileURLWithPath: String(format: "%@/page-%02d.png", outDir, i + 1)))
    }
}
print("rendered \(doc.pageCount) pages")
SWIFT
swift "$TMP/render.swift" "$PDF" "$TMP/pages" "$WIDTH"

echo "→ 编码为无损 WebP…"
mkdir -p "$OUT_DIR"
find "$OUT_DIR" -name '*.webp' -delete
python3 - "$TMP/pages" "$OUT_DIR" <<'PY'
import glob, os, sys
from PIL import Image

src_dir, out_dir = sys.argv[1], sys.argv[2]
files = sorted(glob.glob(os.path.join(src_dir, 'page-*.png')))
total = 0
for i, f in enumerate(files, 1):
    im = Image.open(f).convert('RGB')
    out = os.path.join(out_dir, f'page-{i:02d}.webp')
    # lossless=True + method=6：课件是纯色 + 文字，无损编码效率高且零质量损失
    im.save(out, 'WEBP', lossless=True, method=6)
    total += os.path.getsize(out)
print(f'   {len(files)} 页，合计 {total / 1024 / 1024:.2f} MB')
PY

echo "✅ 完成：$OUT_DIR"
echo "   记得把文章 frontmatter 的 documentPages 改成实际页数。"
