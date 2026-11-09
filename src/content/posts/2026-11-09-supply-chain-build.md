---
title: 供应链开放平台建设
published: 2026-11-09T16:35:00+08:00
description: 把仓、运、货、结算做成一套对外开放的能力：供应商与商家怎么接进来、库存与运力怎么复用、履约与对账怎么跑通，以及开放平台上「谁能看什么、谁该结算给谁」的边界。
quote: 开放平台不是把接口放出去，是把责任和成本一起分清楚。
category: 实战
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

<div class="plan-doc">

> **一句话总览**：短期用鲜沐大客户系统**人工代下单**跑通直供、代仓；长期切换到 **SaaS & 开放平台接口对接**。本文档按「品牌接入 → 五类数据对接 → 接口目录 → 功能清单」梳理，全部流程图与字段规则保留原图原表。

| 阅读指引 | 说明 |
| --- | --- |
| **下发** | 美团（乐乐茶）→ 鲜沐 |
| **回传** | 鲜沐→美团（乐乐茶） |
| **备注** | 原文档评论区中的讨论与待确认点 |


### 方案总览：两大阶段

```mermaid
flowchart LR
    subgraph S1["短期 · 人工代下单"]
        A[乐乐茶] -->|人工提交订单| B[鲜沐大客户系统]
        B -->|直供 / 代仓服务| A
    end
    subgraph S2["长期 · 接口对接"]
        C[乐乐茶·美团] <-->|SaaS & 开放平台 API| D[鲜沐]
    end
    S1 -. 演进 .-> S2
```


### 一、品牌接入

#### 1.1 业务背景

| 合作要素 | 内容 |
| --- | --- |
| **合作业务** | 货品：直供 + 代仓；门店：直营 + 加盟 |
| **合作区域** | 浙江外区 + 杭州送仓；江苏外区（不含南通、苏州等苏南区域）+ 南京送仓；重庆外区（年后暂定华东代仓业务及其他外区门店） |
| **合作仓库** | 嘉兴总仓、南京总仓、华西总仓、重庆总仓、长沙总仓（1月7日暂时终止合作），附件：《乐乐茶合作门店对应仓库信息0108.xlsx》 |
| **合作品类** | 直供：目前仅鲜果（未来可能会有标品）；代仓：鲜果、标品均有可能 |
| **交易履约** | 门店下单后随平台配送周期履约；日配区域日期双号下单，非日配区域在配送日前下单，附件：《乐乐茶合作门店-配送周期.xlsx》 |

#### 1.2 租户入驻

> 系统对接前，需先完成**品牌租户入驻**，才能支撑直供、代仓两大业务场景。

![租户入驻流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-01.png)

| 入驻环节 | 动作 | 货权归属 |
| --- | --- | --- |
| **新建品牌** | 人工在 SaaS 线下建立，获取租户 ID、appKey、appSecret | — |
| **商品报价（直供）** | 商品在 SaaS 进行报价，实现乐乐茶采购 | 鲜沐 |
| **商品代仓** | 货品在 SaaS 进行代仓申请/管理，实现乐乐茶采购/管理 | 乐乐茶 |


### 二、数据对接

> 共 **5 类数据**：基础数据、采购数据、销售数据、调拨数据、库存数据。除直供商品档案走线下映射外，其余均通过**接口方案**实现。

```mermaid
flowchart LR
    subgraph 数据对接
        B[基础数据<br/>商品/门店/供应商]
        P[采购数据<br/>入库/退货]
        S[销售数据<br/>出库/退货]
        T[调拨数据<br/>入库/出库]
        I[库存数据<br/>盘点/报损]
    end
    B --> P --> S --> T --> I
```

#### 2.1 基础数据

> 基础数据包含：**商品档案、门店档案、供应商档案**

| 档案 | 覆盖范围 | 实现方式 |
| --- | --- | --- |
| 商品档案 | 按直供/代仓分两类 | 直供：**线下商品映射**；代仓：**接口对接** |
| 门店档案 | 与鲜沐合作的乐乐茶门店 | 接口对接 |
| 供应商档案 | 代仓商品的供应商信息 | 接口对接 |

##### 1.1 商品映射（直供）

直供商品货权在鲜沐，仓储、库存管理及定价权均在鲜沐，需满足乐乐茶线上采购。该类商品档案**不需要接口创建/修改**，由人工线下维护三方编码。

![商品映射流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-02.png)

> **备注**（余涛）：根据实际情况，目前是否只需要**新增/修改**场景——删除场景可以通过线下完成，发生概率不高。

##### 1.2 商品同步（代仓）

代仓商品货权在乐乐茶，仓储、库存管理及定价权均在乐乐茶，需满足乐乐茶线下管理仓储、库存及线上采购。该类商品档案**通过接口创建/修改**，系统维护三方编码。

![商品下发流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-03.png)

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 商品编码 | 需要以**外部商品编码**为准，不关注鲜沐商品编码 |
| 2 | 规格单位 | 满足美团**多级规格**及转换比例下发，即规格单位、换算比例支持多级；库存单位、售后单位均以**最小规格单位**为准 |

##### 1.3 门店同步

直供/代仓商品均需支持乐乐茶合作门店下单，该类合作门店档案通过接口形式创建/修改，**需要人工审核**。

![门店下发流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-04.png)

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 门店编码 | 需要以**外部门店编码**为准，不关注鲜沐门店编码 |

##### 1.4 供应商同步

代仓商品需要在鲜沐进行仓储、库存管理动作，需提供供应商信息，该类供应商档案通过接口形式创建/修改。

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 供应商编码 | 需要以**外部供应商编码**为准，不关注鲜沐供应商编码 |


#### 2.2 采购数据

> 采购数据包含：**采购入库单据、采购出库（退货）单据**，均含「下发 / 取消 / 回传」三类场景，通过接口方案实现。

##### 2.2.1 采购入库

代仓商品货权在乐乐茶，乐乐茶完全把控采购入库环节，**指定鲜沐某仓库**完成相关动作，鲜沐跟随乐乐茶线上指令配合，并将收货入库结果进行**部分回传**。

![采购入库流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-05.png)

**采购入库下发**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 采购单号 | 需要以**外部采购单号**为准，不关注鲜沐采购单号 |
| 2 | 仓库编号 | 所有合作仓库编码和名称，线下梳理后提供给美团 |
| 3 | 商品编码 | 需要以**外部商品编码**为准，不关注鲜沐商品编码 |
| 4 | 规格单位 | 需要对方按照**最小规格单位**进行 |
| 5 | 供应商编码 | 需要以**外部供应商编码**为准，不关注鲜沐供应商编码 |

**采购入库回传**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 采购单号 | 需要以**外部采购单号**为准 |
| 2 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |
| 3 | 商品编码 | 需要以**外部商品编码**为准 |
| 4 | 规格单位 | 按最小规格单位进行 |
| 5 | 批次信息 | 回传时要求回传**批次（生产日期）、数量** |
| 6 | 入库时间 | 需要有明确的**入库时间**回传 |

**采购入库取消**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 采购单号 | 需要以**外部采购单号**为准 |
| 2 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |

##### 2.2.2 采购出库（退货）

代仓商品货权在乐乐茶，乐乐茶完全把控采购出库环节，指定鲜沐某仓库完成相关动作，鲜沐跟随乐乐茶线上指令配合，并将退货出库结果进行回传。

**采购退货下发**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 采购单号 | 需要以**外部采购单号**为准，不关注鲜沐采购单号 |
| 2 | 退货单号 | 需要以**外部采购退货单号**为准，不关注鲜沐采购退货单号 |
| 3 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团，**接口调用时需传参** |
| 4 | 商品编码 | 需要以**外部商品编码**为准 |
| 5 | 规格单位 | 按最小规格单位进行 |

**采购退货回传**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 采购单号 | 需要以**外部采购单号**为准 |
| 2 | 退货单号 | 需要以**外部采购退货单号**为准 |
| 3 | 仓库编号 | 合作仓库编码/名称，接口调用时需传参 |
| 4 | 商品编码 | 需要以**外部商品编码**为准 |
| 5 | 规格单位 | 按最小规格单位进行 |
| 6 | 批次信息 | 回传时要求回传**批次（生产日期）、数量** |
| 7 | 出库时间 | 需要有明确的**出库时间**回传 |

**采购退货取消**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 退货单号 | 需要以**外部采购退货单号**为准 |
| 2 | 仓库编号 | 合作仓库编码/名称，接口调用时需传参 |


#### 2.3 销售数据

> 销售数据包含：**销售出库单据、销售入库（退货）单据**，均含「下发 / 取消 / 回传」三类场景，通过接口方案实现。

##### 2.3.1 销售出库

乐乐茶门店线上生成直供/代仓商品**进货单**，鲜沐负责接收（需进行**库存、履约范围**等校验，返回成功失败结果，美团同步进行订单响应）后进行履约反馈出库结果。整体履约周期遵循**鲜沐规则、计划**。

![销售出库流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-06.png)

**销售出库下发（进货单下发）**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 进货单号 | 需要以**外部进货单号**为准，不关注鲜沐进货单号 |
| 2 | 门店编码 | 需要以**外部门店编码**为准，不关注鲜沐门店编码 |
| 3 | 商品编码 | 需要以**外部商品编码**为准 |
| 4 | 规格单位 | 按最小规格单位进行 |

**销售出库回传（进货单发货回传）**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 进货单号 | 需要以**外部进货单号**为准 |
| 2 | 门店编码 | 需要以**外部门店编码**为准 |
| 3 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |
| 4 | 商品编码 | 需要以**外部商品编码**为准 |
| 5 | 规格单位 | 按最小规格单位进行 |
| 6 | 批次信息 | 回传时要求回传**批次（生产日期）、数量** |
| 7 | 出库时间 | 需要有明确的**出库时间**回传 |

**销售出库取消（进货单取消）**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 进货单号 | 需要以**外部进货单号**为准 |
| 2 | 门店编码 | 需要以**外部门店编码**为准 |

> **备注**（余涛，2月2日讨论）：
> - 销售出入库回传需要有**批次信息** —— 已补充；
> - 需要**指定仓库发货**，否则会导致发货仓库不一致 —— 使用鲜沐规则，回传时告知仓库；
> - 销售出库（进货单）会包含**多个商品**，可能同时存在直供/代仓商品；
> - 乐乐茶期望：可以有销售出库的**预计出库时间** —— 暂不支持。

##### 2.3.2 销售入库（退货）

乐乐茶门店线上生成直供/代仓商品**售后单**，鲜沐负责接收（需进行**售后审核**，返回成功失败结果，美团同步进行订单响应）后进行回收反馈入库结果。整体售后规则遵循**鲜沐规则、计划**。

![销售退货流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-07.png)

**销售退货下发（售后单下发）**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 进货单号 | 需要以**外部进货单号**为准，不关注鲜沐进货单号 |
| 2 | 售后单号 | 需要以**外部售后单号**为准，不关注鲜沐售后单号 |
| 3 | 门店编码 | 需要以**外部门店编码**为准 |
| 4 | 商品编码 | 需要以**外部商品编码**为准 |
| 5 | 规格单位 | 按最小规格单位进行 |

**销售退货审核回传（售后单结果回传）**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 售后单号 | 需要以**外部售后单号**为准 |
| 2 | 门店编码 | 需要以**外部门店编码**为准 |
| 3 | 商品编码 | 需要以**外部商品编码**为准 |
| 4 | 规格单位 | 按最小规格单位进行 |

**销售退货回传（售后退货回传）—— 仅代仓商品回传**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 进货单号 | 需要以**外部进货单号**为准 |
| 2 | 售后单号 | 需要以**外部售后单号**为准 |
| 3 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |
| 4 | 商品编码 | 需要以**外部商品编码**为准 |
| 5 | 规格单位 | 按最小规格单位进行 |
| 6 | 批次信息 | 回传时要求回传**批次（生产日期）、数量** |
| 7 | 入库时间 | 需要有明确的**入库时间**回传 |

**销售退货取消（售后单取消）**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 售后单号 | 需要以**外部售后单号**为准 |
| 2 | 门店编码 | 需要以**外部门店编码**为准 |


#### 2.4 调拨数据

> 调拨数据包含：**调拨入库单据、调拨出库单据**，均含「下发 / 取消 / 回传」三类场景，通过接口方案实现。

##### 2.4.1 调拨入库

代仓商品货权在乐乐茶，乐乐茶完全把控**调拨（移库）入库**环节，指定鲜沐某仓库完成相关动作，鲜沐跟随乐乐茶线上指令配合，并将收货入库结果进行**部分回传**。

![调拨入库流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-08.png)

**调拨入库下发**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 调拨单号 | 需要以**外部调拨单号**为准，不关注鲜沐调拨单号 |
| 2 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |
| 3 | 商品编码 | 需要以**外部商品编码**为准 |
| 4 | 规格单位 | 按最小规格单位进行 |

**调拨入库回传**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 调拨单号 | 需要以**外部调拨单号**为准 |
| 2 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |
| 3 | 商品编码 | 需要以**外部商品编码**为准 |
| 4 | 规格单位 | 按最小规格单位进行 |
| 5 | 批次信息 | 回传时要求回传**批次（生产日期）、数量** |
| 6 | 入库时间 | 需要有明确的**入库时间**回传 |

**调拨入库取消**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 调拨单号 | 需要以**外部调拨单号**为准 |
| 2 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |

##### 2.4.2 调拨出库

![调拨出库流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-09.png)

**调拨出库下发**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 调拨单号 | 需要以**外部调拨单号**为准，不关注鲜沐调拨单号 |
| 2 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团，**接口调用时需传参** |
| 3 | 商品编码 | 需要以**外部商品编码**为准 |
| 4 | 规格单位 | 按最小规格单位进行 |

**调拨出库回传**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 调拨单号 | 需要以**外部调拨单号**为准 |
| 2 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |
| 3 | 商品编码 | 需要以**外部商品编码**为准 |
| 4 | 规格单位 | 按最小规格单位进行 |
| 5 | 批次信息 | 回传时要求回传**批次（生产日期）、数量** |
| 6 | 出库时间 | 需要有明确的**出库时间**回传 |

**调拨出库取消**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 调拨单号 | 需要以**外部调拨单号**为准 |
| 2 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |


#### 2.5 库存数据

> 库存数据包含：**盘点单据、报损单据**，通过接口方案实现。

##### 2.5.1 盘点

代仓商品货权在乐乐茶。鲜沐仓内盘点有两类场景：① 乐乐茶**线下告知**鲜沐进行盘点；② 鲜沐**日常盘点**——均需将盘点结果回传至美团（区分**盘盈、盘亏**）。

![盘点流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-10.png)

**盘点结果回传**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 盘点单号 | 以**鲜沐盘点单号**为准 |
| 2 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |
| 3 | 商品编码 | 需要以**外部商品编码**为准 |
| 4 | 规格单位 | 需要按照最小规格单位进行 |
| 5 | 系统库存 | 即当前系统**盘点前**的库存 |
| 6 | 盘点库存 | 即当前系统**盘点后**的库存 |
| 7 | 批次信息 | 回传时要求回传**批次（生产日期）、数量** |
| 8 | 时间字段 | 需要有明确的时间回传（原文写「出库时间」） |

##### 2.5.2 货损（报损）

代仓商品货权在乐乐茶，乐乐茶有要求鲜沐可**主动发起报损单**，需鲜沐将报损结果回传至美团。

![货损流程](/assets/library/notes/supply-chain-build/leyecha-plan/fig-11.png)

**货损结果回传**

| 序号 | 字段 | 规则 |
| --- | --- | --- |
| 1 | 报损单号 | 以**鲜沐报损单号**为准 |
| 2 | 仓库编号 | 合作仓库编码/名称，线下梳理后提供给美团 |
| 3 | 商品编码 | 需要以**外部商品编码**为准 |
| 4 | 规格单位 | 需要按照最小规格单位进行 |
| 5 | 批次信息 | 回传时要求回传**批次（生产日期）、数量** |
| 6 | 出库时间 | 需要有明确的**出库时间**回传 |


### 三、接口目录（共 24 个）

> **注：所有下发的单据，均支持撤销后，以同样的业务单据号进行推送。**

| 序号 | 模块 | 具体接口 | 接口方向 | 备注 |
| --- | --- | --- | --- | --- |
| 1 | 基础数据 | 商品下发 | 美团→鲜沐 | |
| 2 | 基础数据 | 门店下发 | 美团→鲜沐 | |
| 3 | 基础数据 | 供应商下发 | 美团→鲜沐 | |
| 4 | 采购数据 | 采购入库下发 | 美团→鲜沐 | |
| 5 | 采购数据 | 采购入库回传 | 鲜沐→美团 | **部分结果**回传接口 |
| 6 | 采购数据 | 采购入库取消 | 美团→鲜沐 | |
| 7 | 采购数据 | 采购退货下发 | 美团→鲜沐 | |
| 8 | 采购数据 | 采购退货回传 | 鲜沐→美团 | **最终结果**回传接口 |
| 9 | 采购数据 | 采购退货取消 | 美团→鲜沐 | |
| 10 | 销售数据 | 销售出库下发 | 美团→鲜沐 | 即「进货单下发」接口 |
| 11 | 销售数据 | 销售出库回传 | 鲜沐→美团 | 即「进货单发货回传」接口 |
| 12 | 销售数据 | 销售出库取消 | 美团→鲜沐 | 即「进货单取消」接口 |
| 13 | 销售数据 | 销售退货下发 | 美团→鲜沐 | 即「售后下发」接口；售后类型只有「配送后售后」，售后服务类型只有「退款录入账单」「退货退款录入账单」 |
| 14 | 销售数据 | 销售退货审核回传 | 鲜沐→美团 | 即「售后结果回传」接口 |
| 15 | 销售数据 | 销售退货回传 | 鲜沐→美团 | **新增接口** |
| 16 | 销售数据 | 销售退货取消 | 美团→鲜沐 | **新增接口** |
| 17 | 调拨数据 | 调拨入库下发 | 美团→鲜沐 | **新增接口** |
| 18 | 调拨数据 | 调拨入库回传 | 鲜沐→美团 | **新增接口** |
| 19 | 调拨数据 | 调拨入库取消 | 美团→鲜沐 | **新增接口** |
| 20 | 调拨数据 | 调拨出库下发 | 美团→鲜沐 | **新增接口** |
| 21 | 调拨数据 | 调拨出库回传 | 鲜沐→美团 | **新增接口** |
| 22 | 调拨数据 | 调拨出库取消 | 美团→鲜沐 | **新增接口** |
| 23 | 库存数据 | 盘点结果回传 | 鲜沐→美团 | **新增接口** |
| 24 | 库存数据 | 货损结果回传 | 鲜沐→美团 | **新增接口** |

> 接口方向汇总：**下发 12 个**（美团→鲜沐）+ **回传 7 个 + 取消随下发**；其中 15~24 号共 **10 个为新增接口**。


### 四、功能清单

> 先以**最全的信息**作为评估，即需要：**批次、效期、数量、出入库时间**。

| 评估维度 | 说明 |
| --- | --- |
| 批次 | 回传单据需带批次（生产日期）+ 数量 |
| 效期 | 按最全口径评估 |
| 数量 | 按最小规格单位 |
| 出入库时间 | 各回传单据需有明确的出库/入库时间 |

> **待确认**：销售出库回传口径——原文档评论「乐乐茶是销售出库回传么？之前本来不该有『销售配送回传』，这个能保持一致么？需要确认下。」


#### 统一接口规则速查

| # | 通用规则 | 适用范围 |
| --- | --- | --- |
| 1 | 单据编码一律以**外部（乐乐茶/美团）编码**为准，不关注鲜沐编码 | 全部下发/回传 |
| 2 | 规格单位一律按**最小规格单位**进行 | 全部单据 |
| 3 | 仓库编码/名称**线下梳理后提供给美团**，部分接口调用时需传参 | 涉及仓库的单据 |
| 4 | 回传需带**批次（生产日期）+ 数量 + 明确出入库时间** | 全部回传 |
| 5 | 所有下发单据支持**撤销后以同单号重推** | 全部下发 |
| 6 | 审核类动作（门店建档、代仓审核、售后审核）由**鲜沐人工审核** | 基础数据/销售退货 |

</div>

<style>
  /* 只作用于第三节：对接方案文档 */
  .plan-doc h3 {
    font-size: 19px;
    font-weight: 700;
    color: #1e5c3d;
    margin: 30px 0 10px;
    padding-left: 12px;
    border-left: 4px solid #3fa06d;
    line-height: 1.45;
  }
  .plan-doc h4 {
    font-size: 15.5px;
    font-weight: 700;
    color: #2e7d53;
    margin: 22px 0 8px;
  }
  .plan-doc h5 {
    font-size: 14px;
    font-weight: 700;
    color: #456052;
    margin: 18px 0 6px;
  }
  .plan-doc blockquote {
    margin: 12px 0;
    padding: 12px 16px;
    border-left: 4px solid #3fa06d;
    background: #f1f8f4;
    border-radius: 6px;
    color: #1e5c3d;
  }
  .plan-doc img {
    /* 流程图有竖长也有横长：宽度最多占满，高度不超过 80vh，居中；
       竖图按高度缩放，不会被拉成很长一条 */
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 80vh;
    margin: 14px auto;
    background: #fff;
    border: 1px solid #e6eee9;
    border-radius: 8px;
  }
  .plan-doc table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0 18px;
    font-size: 14px;
  }
  .plan-doc th {
    background: #3fa06d;
    color: #fff;
    font-weight: 700;
    border: 1px solid #3fa06d;
    padding: 9px 12px;
    text-align: left;
  }
  .plan-doc td {
    background: #fff;
    border: 1px solid #dce5de;
    padding: 8px 12px;
    vertical-align: top;
  }
  .plan-doc tr:nth-child(even) td { background: #f7faf8; }
</style>
