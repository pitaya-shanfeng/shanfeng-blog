---
title: 供应链开放平台建设
published: 2026-11-09T16:35:00+08:00
description: 把仓、运、货、结算做成一套对外开放的能力：供应商与商家怎么接进来、库存与运力怎么复用、履约与对账怎么跑通，以及开放平台上「谁能看什么、谁该结算给谁」的边界。
quote: 开放平台不是把接口放出去，是把责任和成本一起分清楚。
category: 案例
tags:
  - 供应链
  - 开放平台
  - 中台
image: /assets/library/notes/supply-chain-build/cover.webp
banner: /assets/library/notes/supply-chain-build/banner.webp
draft: false
comment: false
hideSidebar: true
# 合集里第 9 篇
order: 9
deckPages: 75
---

## 一、产品架构

![供应链开放平台：开放平台业务架构、开放平台矩阵、鲜果业务与底层服务能力、能力封装、Open API，以及客户经营全流程](/assets/library/notes/supply-chain-build/arch.webp)

<div class="block-divider"></div>

## 二、商务样例

<p class="deck-lead">四份对外方案：从合作汇报、合作方案到报价，按需切换查看，不展开成整页长图。</p>

<div class="deck-viewer" data-deck-viewer tabindex="0" aria-label="商务方案幻灯片切换器">
  <div class="deck-tabs">
    <button type="button" class="deck-tab is-active" data-deck-tab="xicha">喜茶 × 鲜沐<span class="deck-tab-sub">合作汇报 · 34 页</span></button>
    <button type="button" class="deck-tab" data-deck-tab="naixue">奈雪的茶 × 鲜沐<span class="deck-tab-sub">合作方案 · 20 页</span></button>
    <button type="button" class="deck-tab" data-deck-tab="chayan">茶颜悦色 × 鲜沐<span class="deck-tab-sub">合作方案 · 15 页</span></button>
    <button type="button" class="deck-tab" data-deck-tab="leyecha">乐乐茶 × 鲜沐<span class="deck-tab-sub">合作报价 · 6 页</span></button>
  </div>

  <div class="deck-stage">
    <img class="deck-slide" data-deck-img src="/assets/library/notes/supply-chain-build/decks/xicha/01.webp?v=2" alt="喜茶 × 鲜沐 合作汇报 第 1 页" loading="lazy" decoding="async" />
  </div>

  <div class="deck-bar">
    <button type="button" class="deck-nav" data-deck-prev aria-label="上一页">‹</button>
    <span class="deck-count" data-deck-count>1 / 34</span>
    <button type="button" class="deck-nav" data-deck-next aria-label="下一页">›</button>
    <span class="deck-title" data-deck-title>喜茶 × 鲜沐 · 合作汇报</span>
  </div>

  <p class="deck-hint">点标签切换方案；点画面左右两侧、或用下面箭头 / 键盘 ← → 翻页</p>
</div>

<style>
  /* 本节专用：.deck-viewer 内的幻灯片切换器，不涉及站内其它页面 */
  .deck-lead {
    margin: 4px 0 10px;
    font-size: 14px;
    color: #6b7a72;
  }
  .deck-viewer {
    background: #f4f6f4;
    border: 1px solid #e0e8e2;
    border-radius: 12px;
    padding: 16px 16px 12px;
    margin: 10px 0 22px;
    outline: none;
  }
  .deck-viewer:focus-visible {
    border-color: #9ec3b1;
  }
  .deck-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  .deck-tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid #d7e2db;
    background: #fff;
    color: #2f4a3e;
    font-size: 13px;
    line-height: 1;
    padding: 9px 14px;
    border-radius: 999px;
    cursor: pointer;
    transition: background .15s, border-color .15s, color .15s;
  }
  .deck-tab:hover {
    border-color: #9ec3b1;
  }
  .deck-tab-sub {
    font-size: 11px;
    color: #92a39a;
  }
  .deck-tab.is-active {
    background: #2e7d53;
    border-color: #2e7d53;
    color: #fff;
  }
  .deck-tab.is-active .deck-tab-sub {
    color: rgba(255, 255, 255, .75);
  }
  .deck-stage {
    background: #fff;
    border: 1px solid #e3ebe6;
    border-radius: 10px;
    overflow: hidden;
    line-height: 0;
    max-height: 72vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .deck-stage .deck-slide {
    display: block;
    width: 100%;
    max-height: 72vh;
    object-fit: contain;
    height: auto;
    margin: 0;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }
  .deck-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 2px 2px;
  }
  .deck-nav {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid #d7e2db;
    background: #fff;
    color: #2e7d53;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
  }
  .deck-nav:hover:not(:disabled) {
    background: #eef6f1;
  }
  .deck-nav:disabled {
    opacity: .35;
    cursor: default;
  }
  .deck-count {
    font-variant-numeric: tabular-nums;
    font-size: 13px;
    color: #456052;
    min-width: 62px;
  }
  .deck-title {
    font-size: 13px;
    color: #6b7a72;
  }
  .deck-hint {
    margin: 6px 2px 0;
    font-size: 12px;
    color: #93a29a;
  }
  @media (max-width: 767px) {
    .deck-viewer { padding: 10px 10px 8px; }
    .deck-tab { font-size: 12px; padding: 8px 11px; }
    .deck-title { display: none; }
  }
</style>

<script>
  (function () {
    if (window.__deckViewerInit) return;
    window.__deckViewerInit = true;

    var DECKS = [{"id": "xicha", "title": "喜茶 × 鲜沐", "sub": "合作汇报", "n": 34}, {"id": "naixue", "title": "奈雪的茶 × 鲜沐", "sub": "合作方案", "n": 20}, {"id": "chayan", "title": "茶颜悦色 × 鲜沐", "sub": "合作方案", "n": 15}, {"id": "leyecha", "title": "乐乐茶 × 鲜沐", "sub": "合作报价", "n": 6}];
    var BASE = "/assets/library/notes/supply-chain-build/decks";

    function slideSrc(deckId, i) {
      // ?v=2 让浏览器把旧的低清图当新地址重新拉（否则 7 天缓存里还是模糊那版）
      return BASE + "/" + deckId + "/" + String(i + 1).padStart(2, "0") + ".webp?v=2";
    }

    function setup(viewer) {
      var img = viewer.querySelector("[data-deck-img]");
      var countEl = viewer.querySelector("[data-deck-count]");
      var titleEl = viewer.querySelector("[data-deck-title]");
      var prev = viewer.querySelector("[data-deck-prev]");
      var next = viewer.querySelector("[data-deck-next]");
      var tabs = [].slice.call(viewer.querySelectorAll("[data-deck-tab]"));
      var cur = 0;
      var page = 0;

      function render() {
        var d = DECKS[cur];
        img.src = slideSrc(d.id, page);
        img.alt = d.title + d.sub + " 第 " + (page + 1) + " 页";
        countEl.textContent = (page + 1) + " / " + d.n;
        titleEl.textContent = d.title + " · " + d.sub;
        prev.disabled = page === 0;
        next.disabled = page === d.n - 1;
        for (var i = 0; i < tabs.length; i++) {
          tabs[i].classList.toggle("is-active", i === cur);
        }
        if (page + 1 < d.n) {
          var pre = new Image();
          pre.src = slideSrc(d.id, page + 1);
        }
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () {
          cur = i;
          page = 0;
          render();
        });
      });
      prev.addEventListener("click", function () {
        if (page > 0) { page--; render(); }
      });
      next.addEventListener("click", function () {
        if (page < DECKS[cur].n - 1) { page++; render(); }
      });
      img.addEventListener("click", function (e) {
        var rect = img.getBoundingClientRect();
        var right = e.clientX - rect.left > rect.width / 2;
        if (right && page < DECKS[cur].n - 1) { page++; render(); }
        else if (!right && page > 0) { page--; render(); }
      });
      viewer.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" && page > 0) { page--; render(); e.preventDefault(); }
        if (e.key === "ArrowRight" && page < DECKS[cur].n - 1) { page++; render(); e.preventDefault(); }
      });

      render();
    }

    function boot() {
      var all = document.querySelectorAll("[data-deck-viewer]");
      for (var i = 0; i < all.length; i++) {
        if (all[i].dataset.deckReady) continue;
        all[i].dataset.deckReady = "1";
        setup(all[i]);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
    document.addEventListener("swup:contentReplaced", boot);
    document.addEventListener("astro:page-load", boot);
  })();
</script>

<div class="block-divider"></div>


## 三、对接方案

<div class="leyecha-doc not-prose">
<div class="doc">
<!-- ═══════════ 页头 ═══════════ -->
<div class="hero">
<h1>乐乐茶 × 鲜沐 对接方案</h1>
</div>
<!-- ═══════════ 方案总览 ═══════════ -->
<div class="card">
<div class="sec-head"><span class="no">总览</span><h2>方案总览：两大阶段</h2><span class="en">OVERVIEW</span></div>
<div class="stages">
<div class="stage">
<div class="st">短期 · 人工代下单</div>
<div class="sd">乐乐茶 → <b>鲜沐大客户系统</b>，采用<b>人工代下单</b>完成直供、代仓服务</div>
</div>
<div class="stage-link"><span class="lbl">演进</span><span class="ar">→</span></div>
<div class="stage">
<div class="st">长期 · 接口对接</div>
<div class="sd">乐乐茶 ↔ <b>SaaS &amp; 开放平台</b>，采用<b>接口对接</b>形式完成直供、代仓服务</div>
</div>
</div>
<div style="height:14px;"></div>
<div class="dataline">
<div class="dnode"><div class="dn">基础数据</div><div class="dd">商品 / 门店 / 供应商</div></div>
<div class="dlink">→</div>
<div class="dnode"><div class="dn">采购数据</div><div class="dd">入库 / 退货</div></div>
<div class="dlink">→</div>
<div class="dnode"><div class="dn">销售数据</div><div class="dd">出库 / 退货</div></div>
<div class="dlink">→</div>
<div class="dnode"><div class="dn">调拨数据</div><div class="dd">入库 / 出库</div></div>
<div class="dlink">→</div>
<div class="dnode"><div class="dn">库存数据</div><div class="dd">盘点 / 报损</div></div>
</div>
</div>
<!-- ═══════════ 一、品牌接入 ═══════════ -->
<div class="card" id="s1">
<div class="sec-head"><span class="no">一</span><h2>品牌接入</h2><span class="en">BRAND ONBOARDING</span></div>
<h3>1.1 业务背景</h3>
<table>
<tr><th style="width:110px;">合作要素</th><th>内容</th></tr>
<tr><td><span class="k">合作业务</span></td><td>货品：<b>直供 + 代仓</b>；门店：<b>直营 + 加盟</b></td></tr>
<tr><td><span class="k">合作区域</span></td><td>浙江外区 + 杭州送仓；江苏外区（不含南通、苏州等苏南区域）+ 南京送仓；重庆外区（年后暂定华东代仓业务及其他外区门店）</td></tr>
<tr><td><span class="k">合作仓库</span></td><td>嘉兴总仓、南京总仓、华西总仓、重庆总仓、长沙总仓（1月7日暂时终止合作），附件：《乐乐茶合作门店对应仓库信息0108.xlsx》</td></tr>
<tr><td><span class="k">合作品类</span></td><td>直供：目前仅鲜果（未来可能会有标品）；代仓：鲜果、标品均有可能</td></tr>
<tr><td><span class="k">交易履约</span></td><td>门店下单后随平台配送周期履约；日配区域日期双号下单，非日配区域在配送日前下单，附件：《乐乐茶合作门店-配送周期.xlsx》</td></tr>
</table>
<h3>1.2 租户入驻</h3>
<div class="callout info">系统对接前，需先完成<b>品牌租户入驻</b>，才能支撑直供、代仓两大业务场景。</div>
<div class="figure tall">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-01.png" alt="租户入驻流程">
<div class="cap">租户入驻流程（鲜沐 / BOSS / 前台）</div>
</div>
<table>
<tr><th style="width:150px;">入驻环节</th><th>动作</th><th style="width:110px;" class="c">货权归属</th></tr>
<tr><td><b>新建品牌</b></td><td>人工在 SaaS 线下建立，获取租户 ID、appKey、appSecret</td><td class="c">—</td></tr>
<tr><td><b>商品报价（直供）</b></td><td>商品在 SaaS 进行报价，实现乐乐茶采购</td><td class="c">鲜沐</td></tr>
<tr><td><b>商品代仓</b></td><td>货品在 SaaS 进行代仓申请/管理，实现乐乐茶采购/管理</td><td class="c">乐乐茶</td></tr>
</table>
</div>
<!-- ═══════════ 二、数据对接 ═══════════ -->
<div class="card" id="s2">
<div class="sec-head"><span class="no">二</span><h2>数据对接</h2><span class="en">DATA INTEGRATION</span></div>
<div class="callout info">共 <b>5 类数据</b>：基础数据、采购数据、销售数据、调拨数据、库存数据。除直供商品档案走线下映射外，其余均通过<b>接口方案</b>实现。</div>
<!-- 2.1 基础数据 -->
<h3>2.1 基础数据</h3>
<p class="desc">基础数据包含：<b>商品档案、门店档案、供应商档案</b>。</p>
<table>
<tr><th style="width:110px;">档案</th><th>覆盖范围</th><th style="width:220px;">实现方式</th></tr>
<tr><td>商品档案</td><td>按直供/代仓分两类</td><td>直供：<b>线下商品映射</b>；代仓：<b>接口对接</b></td></tr>
<tr><td>门店档案</td><td>与鲜沐合作的乐乐茶门店</td><td>接口对接</td></tr>
<tr><td>供应商档案</td><td>代仓商品的供应商信息</td><td>接口对接</td></tr>
</table>
<h4>1.1 商品映射（直供）</h4>
<p class="desc">直供商品<b>货权在鲜沐</b>，仓储、库存管理及定价权均在鲜沐，需满足乐乐茶线上采购。该类商品档案<b>不需要接口创建/修改</b>，由人工线下维护三方编码。</p>
<div class="figure">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-02.png" alt="商品映射流程">
<div class="cap">商品映射流程（美团（乐乐茶）/ 鲜沐）</div>
</div>
<div class="callout note"><b>备注</b>（余涛）：根据实际情况，目前是否只需要<b>新增/修改</b>场景——删除场景可以通过线下完成，发生概率不高。</div>
<h4>1.2 商品同步（代仓）</h4>
<p class="desc">代仓商品<b>货权在乐乐茶</b>，仓储、库存管理及定价权均在乐乐茶，需满足乐乐茶线下管理仓储、库存及线上采购。该类商品档案<b>通过接口创建/修改</b>，系统维护三方编码。</p>
<div class="figure">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-03.png" alt="商品下发流程">
<div class="cap">商品下发流程（美团（乐乐茶）/ 鲜沐）</div>
</div>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准，不关注鲜沐商品编码</td></tr>
<tr><td class="c">2</td><td>规格单位</td><td>满足美团<b>多级规格</b>及转换比例下发，即规格单位、换算比例支持多级；库存单位、售后单位均以<b>最小规格单位</b>为准</td></tr>
</table>
<h4>1.3 门店同步</h4>
<p class="desc">直供/代仓商品均需支持乐乐茶合作门店下单，该类合作门店档案通过接口形式创建/修改，<b>需要人工审核</b>。</p>
<div class="figure">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-04.png" alt="门店下发流程">
<div class="cap">门店下发流程（美团（乐乐茶）/ 鲜沐）</div>
</div>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>门店编码</td><td>需要以<b>外部门店编码</b>为准，不关注鲜沐门店编码</td></tr>
</table>
<h4>1.4 供应商同步</h4>
<p class="desc">代仓商品需要在鲜沐进行仓储、库存管理动作，需提供供应商信息，该类供应商档案通过接口形式创建/修改。</p>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>供应商编码</td><td>需要以<b>外部供应商编码</b>为准，不关注鲜沐供应商编码</td></tr>
</table>
<!-- 2.2 采购数据 -->
<h3>2.2 采购数据</h3>
<p class="desc">采购数据包含：<b>采购入库单据、采购出库（退货）单据</b>，均含「下发 / 取消 / 回传」三类场景，通过接口方案实现。</p>
<h4>2.2.1 采购入库</h4>
<p class="desc">代仓商品<b>货权在乐乐茶</b>，乐乐茶完全把控采购入库环节，<b>指定鲜沐某仓库</b>完成相关动作，鲜沐跟随乐乐茶线上指令配合，并将收货入库结果进行<b>部分回传</b>。</p>
<div class="figure">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-05.png" alt="采购入库流程">
<div class="cap">采购入库下发流程（美团（乐乐茶）/ 鲜沐）</div>
</div>
<h4 class="c" style="color:var(--blue-dark);">采购入库下发</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>采购单号</td><td>需要以<b>外部采购单号</b>为准，不关注鲜沐采购单号</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>所有合作仓库编码和名称，线下梳理后提供给美团</td></tr>
<tr><td class="c">3</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准，不关注鲜沐商品编码</td></tr>
<tr><td class="c">4</td><td>规格单位</td><td>需要对方按照<b>最小规格单位</b>进行</td></tr>
<tr><td class="c">5</td><td>供应商编码</td><td>需要以<b>外部供应商编码</b>为准，不关注鲜沐供应商编码</td></tr>
</table>
<h4>采购入库回传</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>采购单号</td><td>需要以<b>外部采购单号</b>为准</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
<tr><td class="c">3</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">4</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
<tr><td class="c">5</td><td>批次信息</td><td>回传时要求回传<b>批次（生产日期）、数量</b></td></tr>
<tr><td class="c">6</td><td>入库时间</td><td>需要有明确的<b>入库时间</b>回传</td></tr>
</table>
<h4>采购入库取消</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>采购单号</td><td>需要以<b>外部采购单号</b>为准</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
</table>
<h4>2.2.2 采购出库（退货）</h4>
<p class="desc">代仓商品<b>货权在乐乐茶</b>，乐乐茶完全把控采购出库环节，指定鲜沐某仓库完成相关动作，鲜沐跟随乐乐茶线上指令配合，并将退货出库结果进行回传。</p>
<h4>采购退货下发</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>采购单号</td><td>需要以<b>外部采购单号</b>为准，不关注鲜沐采购单号</td></tr>
<tr><td class="c">2</td><td>退货单号</td><td>需要以<b>外部采购退货单号</b>为准，不关注鲜沐采购退货单号</td></tr>
<tr><td class="c">3</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团，<b>接口调用时需传参</b></td></tr>
<tr><td class="c">4</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">5</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
</table>
<h4>采购退货回传</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>采购单号</td><td>需要以<b>外部采购单号</b>为准</td></tr>
<tr><td class="c">2</td><td>退货单号</td><td>需要以<b>外部采购退货单号</b>为准</td></tr>
<tr><td class="c">3</td><td>仓库编号</td><td>合作仓库编码/名称，接口调用时需传参</td></tr>
<tr><td class="c">4</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">5</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
<tr><td class="c">6</td><td>批次信息</td><td>回传时要求回传<b>批次（生产日期）、数量</b></td></tr>
<tr><td class="c">7</td><td>出库时间</td><td>需要有明确的<b>出库时间</b>回传</td></tr>
</table>
<h4>采购退货取消</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>退货单号</td><td>需要以<b>外部采购退货单号</b>为准</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，接口调用时需传参</td></tr>
</table>
<!-- 2.3 销售数据 -->
<h3>2.3 销售数据</h3>
<p class="desc">销售数据包含：<b>销售出库单据、销售入库（退货）单据</b>，均含「下发 / 取消 / 回传」三类场景，通过接口方案实现。</p>
<h4>2.3.1 销售出库</h4>
<p class="desc">乐乐茶门店线上生成直供/代仓商品<b>进货单</b>，鲜沐负责接收（需进行<b>库存、履约范围</b>等校验，返回成功失败结果，美团同步进行订单响应）后进行履约反馈出库结果。整体履约周期遵循<b>鲜沐规则、计划</b>。</p>
<div class="figure">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-06.png" alt="销售出库流程">
<div class="cap">销售出库下发 / 回传 / 取消流程（美团（乐乐茶）/ 鲜沐）</div>
</div>
<h4>销售出库下发（进货单下发）</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>进货单号</td><td>需要以<b>外部进货单号</b>为准，不关注鲜沐进货单号</td></tr>
<tr><td class="c">2</td><td>门店编码</td><td>需要以<b>外部门店编码</b>为准，不关注鲜沐门店编码</td></tr>
<tr><td class="c">3</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">4</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
</table>
<h4>销售出库回传（进货单发货回传）</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>进货单号</td><td>需要以<b>外部进货单号</b>为准</td></tr>
<tr><td class="c">2</td><td>门店编码</td><td>需要以<b>外部门店编码</b>为准</td></tr>
<tr><td class="c">3</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
<tr><td class="c">4</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">5</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
<tr><td class="c">6</td><td>批次信息</td><td>回传时要求回传<b>批次（生产日期）、数量</b></td></tr>
<tr><td class="c">7</td><td>出库时间</td><td>需要有明确的<b>出库时间</b>回传</td></tr>
</table>
<h4>销售出库取消（进货单取消）</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>进货单号</td><td>需要以<b>外部进货单号</b>为准</td></tr>
<tr><td class="c">2</td><td>门店编码</td><td>需要以<b>外部门店编码</b>为准</td></tr>
</table>
<div class="callout note">
<b>备注</b>（余涛，2月2日讨论）：
<ul>
<li>销售出入库回传需要有<b>批次信息</b> —— 已补充；</li>
<li>需要<b>指定仓库发货</b>，否则会导致发货仓库不一致 —— 使用鲜沐规则，回传时告知仓库；</li>
<li>销售出库（进货单）会包含<b>多个商品</b>，可能同时存在直供/代仓商品；</li>
<li>乐乐茶期望：可以有销售出库的<b>预计出库时间</b> —— 暂不支持。</li>
</ul>
</div>
<h4>2.3.2 销售入库（退货）</h4>
<p class="desc">乐乐茶门店线上生成直供/代仓商品<b>售后单</b>，鲜沐负责接收（需进行<b>售后审核</b>，返回成功失败结果，美团同步进行订单响应）后进行回收反馈入库结果。整体售后规则遵循<b>鲜沐规则、计划</b>。</p>
<div class="figure">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-07.png" alt="销售退货流程">
<div class="cap">销售退货下发 / 审核回传 / 退货回传 / 取消流程（美团（乐乐茶）/ 鲜沐）</div>
</div>
<h4>销售退货下发（售后单下发）</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>进货单号</td><td>需要以<b>外部进货单号</b>为准，不关注鲜沐进货单号</td></tr>
<tr><td class="c">2</td><td>售后单号</td><td>需要以<b>外部售后单号</b>为准，不关注鲜沐售后单号</td></tr>
<tr><td class="c">3</td><td>门店编码</td><td>需要以<b>外部门店编码</b>为准</td></tr>
<tr><td class="c">4</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">5</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
</table>
<h4>销售退货审核回传（售后单结果回传）</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>售后单号</td><td>需要以<b>外部售后单号</b>为准</td></tr>
<tr><td class="c">2</td><td>门店编码</td><td>需要以<b>外部门店编码</b>为准</td></tr>
<tr><td class="c">3</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">4</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
</table>
<h4>销售退货回传（售后退货回传）—— 仅代仓商品回传</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>进货单号</td><td>需要以<b>外部进货单号</b>为准</td></tr>
<tr><td class="c">2</td><td>售后单号</td><td>需要以<b>外部售后单号</b>为准</td></tr>
<tr><td class="c">3</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
<tr><td class="c">4</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">5</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
<tr><td class="c">6</td><td>批次信息</td><td>回传时要求回传<b>批次（生产日期）、数量</b></td></tr>
<tr><td class="c">7</td><td>入库时间</td><td>需要有明确的<b>入库时间</b>回传</td></tr>
</table>
<h4>销售退货取消（售后单取消）</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>售后单号</td><td>需要以<b>外部售后单号</b>为准</td></tr>
<tr><td class="c">2</td><td>门店编码</td><td>需要以<b>外部门店编码</b>为准</td></tr>
</table>
<!-- 2.4 调拨数据 -->
<h3>2.4 调拨数据</h3>
<p class="desc">调拨数据包含：<b>调拨入库单据、调拨出库单据</b>，均含「下发 / 取消 / 回传」三类场景，通过接口方案实现。</p>
<h4>2.4.1 调拨入库</h4>
<p class="desc">代仓商品<b>货权在乐乐茶</b>，乐乐茶完全把控<b>调拨（移库）入库</b>环节，指定鲜沐某仓库完成相关动作，鲜沐跟随乐乐茶线上指令配合，并将收货入库结果进行<b>部分回传</b>。</p>
<div class="figure">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-08.png" alt="调拨入库流程">
<div class="cap">调拨入库下发 / 回传 / 取消流程（美团（乐乐茶）/ 鲜沐）</div>
</div>
<h4>调拨入库下发</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>调拨单号</td><td>需要以<b>外部调拨单号</b>为准，不关注鲜沐调拨单号</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
<tr><td class="c">3</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">4</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
</table>
<h4>调拨入库回传</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>调拨单号</td><td>需要以<b>外部调拨单号</b>为准</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
<tr><td class="c">3</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">4</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
<tr><td class="c">5</td><td>批次信息</td><td>回传时要求回传<b>批次（生产日期）、数量</b></td></tr>
<tr><td class="c">6</td><td>入库时间</td><td>需要有明确的<b>入库时间</b>回传</td></tr>
</table>
<h4>调拨入库取消</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>调拨单号</td><td>需要以<b>外部调拨单号</b>为准</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
</table>
<h4>2.4.2 调拨出库</h4>
<div class="figure">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-09.png" alt="调拨出库流程">
<div class="cap">调拨出库下发 / 回传 / 取消流程（美团（乐乐茶）/ 鲜沐）</div>
</div>
<h4>调拨出库下发</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>调拨单号</td><td>需要以<b>外部调拨单号</b>为准，不关注鲜沐调拨单号</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团，<b>接口调用时需传参</b></td></tr>
<tr><td class="c">3</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">4</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
</table>
<h4>调拨出库回传</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>调拨单号</td><td>需要以<b>外部调拨单号</b>为准</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
<tr><td class="c">3</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">4</td><td>规格单位</td><td>按最小规格单位进行</td></tr>
<tr><td class="c">5</td><td>批次信息</td><td>回传时要求回传<b>批次（生产日期）、数量</b></td></tr>
<tr><td class="c">6</td><td>出库时间</td><td>需要有明确的<b>出库时间</b>回传</td></tr>
</table>
<h4>调拨出库取消</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>调拨单号</td><td>需要以<b>外部调拨单号</b>为准</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
</table>
<!-- 2.5 库存数据 -->
<h3>2.5 库存数据</h3>
<p class="desc">库存数据包含：<b>盘点单据、报损单据</b>，通过接口方案实现。</p>
<h4>2.5.1 盘点</h4>
<p class="desc">代仓商品<b>货权在乐乐茶</b>。鲜沐仓内盘点有两类场景：① 乐乐茶<b>线下告知</b>鲜沐进行盘点；② 鲜沐<b>日常盘点</b>——均需将盘点结果回传至美团（区分<b>盘盈、盘亏</b>）。</p>
<div class="figure">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-10.png" alt="盘点流程">
<div class="cap">盘点执行 / 结果回传流程（美团（乐乐茶）/ 鲜沐）</div>
</div>
<h4>盘点结果回传</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>盘点单号</td><td>以<b>鲜沐盘点单号</b>为准</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
<tr><td class="c">3</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">4</td><td>规格单位</td><td>需要按照最小规格单位进行</td></tr>
<tr><td class="c">5</td><td>系统库存</td><td>即当前系统<b>盘点前</b>的库存</td></tr>
<tr><td class="c">6</td><td>盘点库存</td><td>即当前系统<b>盘点后</b>的库存</td></tr>
<tr><td class="c">7</td><td>批次信息</td><td>回传时要求回传<b>批次（生产日期）、数量</b></td></tr>
<tr><td class="c">8</td><td>时间字段</td><td>需要有明确的时间回传（原文写「出库时间」）</td></tr>
</table>
<h4>2.5.2 货损（报损）</h4>
<p class="desc">代仓商品<b>货权在乐乐茶</b>，乐乐茶有要求鲜沐可<b>主动发起报损单</b>，需鲜沐将报损结果回传至美团。</p>
<div class="figure">
<img src="/assets/library/notes/supply-chain-build/leyecha-plan/fig-11.png" alt="货损流程">
<div class="cap">货损出库执行 / 结果回传流程（美团（乐乐茶）/ 鲜沐）</div>
</div>
<h4>货损结果回传</h4>
<table>
<tr><th class="c" style="width:60px;">序号</th><th style="width:110px;">字段</th><th>规则</th></tr>
<tr><td class="c">1</td><td>报损单号</td><td>以<b>鲜沐报损单号</b>为准</td></tr>
<tr><td class="c">2</td><td>仓库编号</td><td>合作仓库编码/名称，线下梳理后提供给美团</td></tr>
<tr><td class="c">3</td><td>商品编码</td><td>需要以<b>外部商品编码</b>为准</td></tr>
<tr><td class="c">4</td><td>规格单位</td><td>需要按照最小规格单位进行</td></tr>
<tr><td class="c">5</td><td>批次信息</td><td>回传时要求回传<b>批次（生产日期）、数量</b></td></tr>
<tr><td class="c">6</td><td>出库时间</td><td>需要有明确的<b>出库时间</b>回传</td></tr>
</table>
</div>
<!-- ═══════════ 三、接口目录 ═══════════ -->
<div class="card" id="s3">
<div class="sec-head"><span class="no">三</span><h2>接口目录（共 24 个）</h2><span class="en">API LIST</span></div>
<div class="callout info"><b>注：所有下发的单据，均支持撤销后，以同样的业务单据号进行推送。</b></div>
<table>
<tr><th class="c" style="width:50px;">序号</th><th style="width:90px;">模块</th><th style="width:150px;">具体接口</th><th class="c" style="width:120px;">接口方向</th><th>备注</th></tr>
<tr><td class="c">1</td><td>基础数据</td><td>商品下发</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td></td></tr>
<tr><td class="c">2</td><td>基础数据</td><td>门店下发</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td></td></tr>
<tr><td class="c">3</td><td>基础数据</td><td>供应商下发</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td></td></tr>
<tr><td class="c">4</td><td>采购数据</td><td>采购入库下发</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td></td></tr>
<tr><td class="c">5</td><td>采购数据</td><td>采购入库回传</td><td class="c"><span class="tag up">鲜沐→美团</span></td><td><b>部分结果</b>回传接口</td></tr>
<tr><td class="c">6</td><td>采购数据</td><td>采购入库取消</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td></td></tr>
<tr><td class="c">7</td><td>采购数据</td><td>采购退货下发</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td></td></tr>
<tr><td class="c">8</td><td>采购数据</td><td>采购退货回传</td><td class="c"><span class="tag up">鲜沐→美团</span></td><td><b>最终结果</b>回传接口</td></tr>
<tr><td class="c">9</td><td>采购数据</td><td>采购退货取消</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td></td></tr>
<tr><td class="c">10</td><td>销售数据</td><td>销售出库下发</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td>即「进货单下发」接口</td></tr>
<tr><td class="c">11</td><td>销售数据</td><td>销售出库回传</td><td class="c"><span class="tag up">鲜沐→美团</span></td><td>即「进货单发货回传」接口</td></tr>
<tr><td class="c">12</td><td>销售数据</td><td>销售出库取消</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td>即「进货单取消」接口</td></tr>
<tr><td class="c">13</td><td>销售数据</td><td>销售退货下发</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td>即「售后下发」接口；售后类型只有「配送后售后」，售后服务类型只有「退款录入账单」「退货退款录入账单」</td></tr>
<tr><td class="c">14</td><td>销售数据</td><td>销售退货审核回传</td><td class="c"><span class="tag up">鲜沐→美团</span></td><td>即「售后结果回传」接口</td></tr>
<tr><td class="c">15</td><td>销售数据</td><td>销售退货回传</td><td class="c"><span class="tag up">鲜沐→美团</span></td><td><span class="tag new">新增接口</span></td></tr>
<tr><td class="c">16</td><td>销售数据</td><td>销售退货取消</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td><span class="tag new">新增接口</span></td></tr>
<tr><td class="c">17</td><td>调拨数据</td><td>调拨入库下发</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td><span class="tag new">新增接口</span></td></tr>
<tr><td class="c">18</td><td>调拨数据</td><td>调拨入库回传</td><td class="c"><span class="tag up">鲜沐→美团</span></td><td><span class="tag new">新增接口</span></td></tr>
<tr><td class="c">19</td><td>调拨数据</td><td>调拨入库取消</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td><span class="tag new">新增接口</span></td></tr>
<tr><td class="c">20</td><td>调拨数据</td><td>调拨出库下发</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td><span class="tag new">新增接口</span></td></tr>
<tr><td class="c">21</td><td>调拨数据</td><td>调拨出库回传</td><td class="c"><span class="tag up">鲜沐→美团</span></td><td><span class="tag new">新增接口</span></td></tr>
<tr><td class="c">22</td><td>调拨数据</td><td>调拨出库取消</td><td class="c"><span class="tag down">美团→鲜沐</span></td><td><span class="tag new">新增接口</span></td></tr>
<tr><td class="c">23</td><td>库存数据</td><td>盘点结果回传</td><td class="c"><span class="tag up">鲜沐→美团</span></td><td><span class="tag new">新增接口</span></td></tr>
<tr><td class="c">24</td><td>库存数据</td><td>货损结果回传</td><td class="c"><span class="tag up">鲜沐→美团</span></td><td><span class="tag new">新增接口</span></td></tr>
</table>
<div class="callout note">接口方向汇总：<b>下发 12 个</b>（美团→鲜沐）+ <b>回传 7 个</b> + 取消随下发；其中 15~24 号共 <b>10 个为新增接口</b>。</div>
</div>
<!-- ═══════════ 统一规则 ═══════════ -->
<div class="card" id="s5">
<div class="sec-head"><span class="no">附</span><h2>统一接口规则速查</h2><span class="en">RULES</span></div>
<table>
<tr><th class="c" style="width:50px;">#</th><th>通用规则</th><th style="width:170px;">适用范围</th></tr>
<tr><td class="c">1</td><td>单据编码一律以<b>外部（乐乐茶/美团）编码</b>为准，不关注鲜沐编码</td><td>全部下发/回传</td></tr>
<tr><td class="c">2</td><td>规格单位一律按<b>最小规格单位</b>进行</td><td>全部单据</td></tr>
<tr><td class="c">3</td><td>仓库编码/名称<b>线下梳理后提供给美团</b>，部分接口调用时需传参</td><td>涉及仓库的单据</td></tr>
<tr><td class="c">4</td><td>回传需带<b>批次（生产日期）+ 数量 + 明确出入库时间</b></td><td>全部回传</td></tr>
<tr><td class="c">5</td><td>所有下发单据支持<b>撤销后以同单号重推</b></td><td>全部下发</td></tr>
<tr><td class="c">6</td><td>审核类动作（门店建档、代仓审核、售后审核）由<b>鲜沐人工审核</b></td><td>基础数据 / 销售退货</td></tr>
</table>
</div>
</div>
</div>

<style>
.leyecha-doc { --bg:#f0f2f5;
    --card:#ffffff;
    --line:#dfe3e8;
    --ink:#26303a;
    --ink2:#5c6b7a;
    --blue:#2f6eb6;
    --blue-dark:#1f4e85;
    --blue-pale:#e8f1fa;
    --teal:#1e8a72;
    --teal-pale:#e4f4ef;
    --amber:#b07a1a;
    --amber-pale:#fdf3dd;
    --red:#c24545; }
.leyecha-doc * { margin:0;padding:0;box-sizing:border-box; }
.leyecha-doc { background:var(--bg);
    font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
    color:var(--ink);
    display:flex;justify-content:center;
    padding:28px 12px 60px; }
.leyecha-doc .doc { width:980px; }
.leyecha-doc .hero { background:linear-gradient(135deg,var(--blue-dark),var(--blue));
    color:#fff;border-radius:12px;padding:26px 32px 24px; }
.leyecha-doc .hero h1 { font-size:24px;font-weight:800;letter-spacing:1px; }
.leyecha-doc .hero .sub { margin-top:8px;font-size:12.5px;opacity:.92;line-height:1.7; }
.leyecha-doc .hero .sub b { font-weight:700; }
.leyecha-doc .legend { display:flex;gap:10px;margin-top:14px;flex-wrap:wrap; }
.leyecha-doc .chip { display:inline-flex;align-items:center;gap:6px;
    border-radius:20px;padding:4px 13px;font-size:11.5px;font-weight:600; }
.leyecha-doc .chip .dot { width:8px;height:8px;border-radius:50%; }
.leyecha-doc .chip.down { background:rgba(255,255,255,.18);color:#fff; }
.leyecha-doc .chip.up { background:rgba(255,255,255,.18);color:#fff; }
.leyecha-doc .chip.note { background:rgba(0,0,0,.14);color:#fff; }
.leyecha-doc .chip.down .dot { background:#7db8ec; }
.leyecha-doc .chip.up .dot { background:#7fe0c3; }
.leyecha-doc .chip.note .dot { background:#ffd97a; }
.leyecha-doc .card { background:var(--card);border:1px solid var(--line);border-radius:12px;
    margin-top:18px;padding:22px 28px 24px; }
.leyecha-doc .sec-head { display:flex;align-items:baseline;gap:12px;border-bottom:2px solid var(--blue);padding-bottom:10px;margin-bottom:16px; }
.leyecha-doc .sec-head .no { background:var(--blue);color:#fff;font-weight:800;font-size:13px;
    border-radius:6px;padding:3px 10px;letter-spacing:1px;flex-shrink:0; }
.leyecha-doc .sec-head h2 { font-size:18px;font-weight:800; }
.leyecha-doc .sec-head .en { font-size:11px;color:var(--ink2);margin-left:auto;letter-spacing:1px; }
.leyecha-doc h3 { font-size:14.5px;font-weight:800;margin:22px 0 10px;display:flex;align-items:center;gap:8px; }
.leyecha-doc h3:first-of-type { margin-top:0; }
.leyecha-doc h3::before { content:"";width:4px;height:15px;border-radius:2px;background:var(--blue);flex-shrink:0; }
.leyecha-doc h4 { font-size:13px;font-weight:700;color:var(--blue-dark);margin:16px 0 8px; }
.leyecha-doc p.desc { font-size:12.5px;color:var(--ink2);line-height:1.8;margin-bottom:10px; }
.leyecha-doc p.desc b { color:var(--ink); }
.leyecha-doc .callout { border-left:3px solid;border-radius:0 8px 8px 0;padding:10px 14px;font-size:12px;line-height:1.8;margin:10px 0; }
.leyecha-doc .callout b { font-weight:800; }
.leyecha-doc .callout.info { background:var(--blue-pale);border-color:var(--blue);color:var(--blue-dark); }
.leyecha-doc .callout.note { background:var(--amber-pale);border-color:#d9a93c;color:#7a5a14; }
.leyecha-doc .callout.warn { background:#fdeaea;border-color:var(--red);color:#8a3030; }
.leyecha-doc .callout ul { padding-left:18px; }
.leyecha-doc table { width:100%;border-collapse:collapse;font-size:12px;margin:8px 0 4px; }
.leyecha-doc th { background:#f4f6f9;color:var(--ink);font-weight:700;text-align:left;padding:8px 12px;border:1px solid var(--line);white-space:nowrap; }
.leyecha-doc td { padding:8px 12px;border:1px solid var(--line);line-height:1.65;vertical-align:top; }
.leyecha-doc tr:nth-child(even) td { background:#fafbfc; }
.leyecha-doc td.c, .leyecha-doc th.c { text-align:center; }
.leyecha-doc td .k { font-weight:700;color:var(--blue-dark); }
.leyecha-doc .tag { display:inline-block;border-radius:4px;padding:1px 8px;font-size:11px;font-weight:700; }
.leyecha-doc .tag.new { background:var(--amber-pale);color:var(--amber);border:1px solid #e4c88a; }
.leyecha-doc .tag.down { background:var(--blue-pale);color:var(--blue-dark);border:1px solid #bcd4ec; }
.leyecha-doc .tag.up { background:var(--teal-pale);color:var(--teal);border:1px solid #b5e0d3; }
.leyecha-doc .tag.mod { background:#eee9fb;color:#6a52c7;border:1px solid #d4c8f2; }
.leyecha-doc .figure { border:1px solid var(--line);border-radius:10px;background:#fff;
    padding:14px;margin:12px 0;text-align:center; }
.leyecha-doc .figure img { max-width:100%;height:auto;border-radius:4px; }
.leyecha-doc .figure .cap { font-size:11px;color:var(--ink2);margin-top:8px;letter-spacing:.5px; }
.leyecha-doc .figure.tall img { max-width:62%; }
.leyecha-doc .stages { display:flex;align-items:stretch;gap:0;margin-top:6px; }
.leyecha-doc .stage { flex:1;border-radius:10px;border:1.5px solid var(--blue);
    background:var(--blue-pale);padding:14px 16px; }
.leyecha-doc .stage .st { font-weight:800;font-size:13px;color:var(--blue-dark);margin-bottom:4px; }
.leyecha-doc .stage .sd { font-size:11.5px;color:var(--ink2);line-height:1.7; }
.leyecha-doc .stage .sd b { color:var(--ink); }
.leyecha-doc .stage-link { width:86px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;flex-shrink:0; }
.leyecha-doc .stage-link .lbl { font-size:10.5px;color:var(--ink2); }
.leyecha-doc .stage-link .ar { font-size:20px;color:var(--blue);font-weight:800;line-height:1; }
.leyecha-doc .dataline { display:flex;align-items:center;gap:0;flex-wrap:nowrap;margin-top:6px; }
.leyecha-doc .dnode { flex:1;background:#fff;border:1.5px solid var(--blue);border-radius:9px;
    text-align:center;padding:10px 6px 11px; }
.leyecha-doc .dnode .dn { font-weight:800;font-size:12.5px;color:var(--blue-dark); }
.leyecha-doc .dnode .dd { font-size:10.5px;color:var(--ink2);margin-top:3px;line-height:1.5; }
.leyecha-doc .dlink { width:30px;text-align:center;color:var(--blue);font-weight:800;font-size:15px;flex-shrink:0; }
.leyecha-doc .foot { margin-top:20px;text-align:center;font-size:11px;color:#9aa5b0;line-height:1.8; }
.leyecha-doc .anchor-nav { display:flex;gap:8px;flex-wrap:wrap;margin-top:14px; }
.leyecha-doc .anchor-nav a { font-size:11.5px;color:var(--blue-dark);text-decoration:none;font-weight:600;
    background:#fff;border:1px solid var(--line);border-radius:16px;padding:4px 12px; }
.leyecha-doc .anchor-nav a:hover { background:var(--blue-pale); }
.leyecha-doc { margin: 10px 0 26px; }
.leyecha-doc .doc { max-width: 100%; }
.leyecha-doc [hidden] { display: none !important; }


/* 原文档里 .figure 是 text-align:center + 图片 inline，站点全局把 img 改成 block，
   结果图贴左。这里把居中还回来（比 .custom-md img 多一层，压得住）。 */
.leyecha-doc .figure,
.leyecha-doc figure {
  text-align: center;
}
.leyecha-doc .figure img,
.leyecha-doc figure img,
.leyecha-doc img {
  display: inline-block;
  margin: 0 auto;
  vertical-align: middle;
}
.leyecha-doc .figure.tall img {
  max-width: 62%;
}
.leyecha-doc .figure .cap {
  text-align: center;
}
</style>
