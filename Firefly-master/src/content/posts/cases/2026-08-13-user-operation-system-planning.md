---
title: 用户运营体系建设规划
published: 2026-08-13
description: 用户运营体系建设规划，围绕用户分层、生命周期运营、增长转化、数据指标与组织协同展开。
category: 案例库
tags:
  - 案例研究
  - 增长运营
draft: false
---

<div class="html-report-frame">
  <iframe
    data-auto-height
    src="/assets/library/cases/user-operation-system-planning/index.html"
    title="用户运营体系建设规划"
    loading="lazy"
    scrolling="no"
  ></iframe>
</div>

<p class="html-report-link">
  如果页面显示不完整，也可以
  <a href="/assets/library/cases/user-operation-system-planning/index.html" target="_blank" rel="noreferrer">
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
