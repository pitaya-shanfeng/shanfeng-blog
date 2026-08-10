---
title: 手机租赁行业市场分析
published: 2026-08-06
description: 中国手机 3C 信用租赁行业市场分析报告，梳理行业盘面、机会窗口与 MVP 验证路径。
image: /assets/library/cases/phone-3c-credit-rental-market-report/cover.png
category: 案例库
tags:
  - 案例研究
  - 商业分析
draft: false
---

<div class="html-report-frame">
  <iframe
    data-auto-height
    src="/assets/library/cases/phone-3c-credit-rental-market-report/index.html"
    title="手机 3C 信用租赁行业市场分析报告"
    loading="lazy"
    scrolling="no"
  ></iframe>
</div>

<p class="html-report-link">
  如果页面显示不完整，也可以
  <a href="/assets/library/cases/phone-3c-credit-rental-market-report/index.html" target="_blank" rel="noreferrer">
    在新窗口打开完整报告
  </a>
  。
</p>

<style>
  .html-report-frame {
    width: 100%;
    overflow: visible;
    border-radius: 18px;
    border: 1px solid var(--line-divider);
    background: var(--card-bg);
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.08);
  }

  .html-report-frame iframe {
    display: block;
    width: 100%;
    height: 1px;
    min-height: 1px;
    border: 0;
    background: #fff;
  }

  .html-report-link {
    margin-top: 0.9rem;
    font-size: 0.92rem;
    color: var(--text-50);
  }

  .html-report-link a {
    color: var(--primary);
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .html-report-frame {
      border-radius: 14px;
    }
  }
</style>

<script>
  (() => {
    const resizeIframe = (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        const body = doc.body;
        const html = doc.documentElement;
        const height = Math.max(
          body?.scrollHeight || 0,
          body?.offsetHeight || 0,
          html?.clientHeight || 0,
          html?.scrollHeight || 0,
          html?.offsetHeight || 0,
        );

        if (height > 0) {
          iframe.style.height = `${height}px`;
        }
      } catch {
        // 跨域 iframe 无法自动测高；当前报告在同站 public 目录下，可正常读取。
      }
    };

    const initAutoHeightIframes = () => {
      document.querySelectorAll("iframe[data-auto-height]").forEach((iframe) => {
        if (iframe.dataset.autoHeightReady === "true") {
          resizeIframe(iframe);
          return;
        }

        iframe.dataset.autoHeightReady = "true";

        const setup = () => {
          resizeIframe(iframe);
          requestAnimationFrame(() => resizeIframe(iframe));
          setTimeout(() => resizeIframe(iframe), 250);
          setTimeout(() => resizeIframe(iframe), 1000);

          try {
            const doc = iframe.contentDocument || iframe.contentWindow?.document;
            if (!doc || !("ResizeObserver" in window)) return;

            const observer = new ResizeObserver(() => resizeIframe(iframe));
            observer.observe(doc.documentElement);
            if (doc.body) observer.observe(doc.body);
          } catch {}
        };

        iframe.addEventListener("load", setup);
        if (iframe.contentDocument?.readyState === "complete") setup();
      });
    };

    initAutoHeightIframes();
    window.addEventListener("resize", initAutoHeightIframes);
    document.addEventListener("swup:contentReplaced", initAutoHeightIframes);
  })();
</script>
