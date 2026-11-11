---
title: 订单中心建设
published: 2026-11-08T15:10:00+08:00
description: 订单中心的产品架构与两份设计思路：订单路由（按主状态 × 子状态拆单、按条件路由分发）、分流引擎（过滤条件、分流策略、S=D 优先级与按周轮询），以及订单核心、售后、履约、费项与基础服务的分工。
quote: 一张订单从下到交付要跨好几个系统，订单中心的本事是让它在正确的时间落到正确的系统。
category: 案例
tags:
  - 订单中心
  - 架构
  - 中台
image: /assets/library/notes/order-center-build/cover.webp
banner: /assets/images/case/2026-11-08-order-center-build.webp
draft: false
comment: false
hideSidebar: true
# 合集里第 5 篇
order: 5
---

## 一、产品架构

![青年优品·订单中心：建设思路、产品架构、能力边界与关键指标](/assets/library/notes/order-center-build/arch.webp)

<div class="block-divider"></div>

## 二、订单路由设计思路

<div class="order-route-doc not-prose">
<div class="wrap">
<div class="hero">
<h1>订单路由 · 中台设计思路</h1>
<div class="sub">订单中心核心能力 —— 让每一条订单链路都由配置定义，而非代码定义</div>
<div class="tags">
<span class="tag">状态机编排</span><span class="tag">节点编排</span><span class="tag">任务编排</span><span class="tag">条件路由</span>
</div>
</div>
<!-- ═══════════ 1 ═══════════ -->
<h2><span class="no">01</span>为什么需要订单路由</h2>
<div class="lead">订单中心要同时承接<b>租赁、赊销、零售</b>三种销售方式，且业务形态还在持续增加：长租、短租、转租赁、三方渠道单（美团短租）、大平台迁移后的商户单……如果每接一个新业务就在代码里硬编码一条新链路，订单中心会迅速变成改不动的单体。</div>
<h3>1.1 没有路由层时的四个真实痛点</h3>
<table>
<tr><th style="width:22%">痛点</th><th>具体表现</th></tr>
<tr><td><b>链路硬编码</b></td><td>租赁、赊销、零售各自一条 if-else 链路，新销售方式接入 = 新写一条分支 + 全量回归，上线周期以周计。</td></tr>
<tr><td><b>流转逻辑散落</b></td><td>状态流转规则散落在各个 service：关单时限写死在定时任务里、短信节点写死在状态变更回调里，改一个节点顺序要动多处代码。</td></tr>
<tr><td><b>差异无法表达</b></td><td>同样"待审核"状态，租赁要经历<b>前置风控 → 分流 → 商户审核</b>三个环节，赊销走授信，零售直连支付——这种结构性差异只能靠枚举分支堆叠。</td></tr>
<tr><td><b>历史包袱重</b></td><td>老租赁临时方案（长租 1030 版、短租 0624 版）在 0301 租赁迁移大平台时无法平滑兼容，被迫重走一遍开发。</td></tr>
</table>
<div class="callout">
<div class="t">一句话定义</div>
订单路由 = 把「订单状态怎么流转、链路经过哪些节点、节点触发什么任务、什么订单走什么链路」这四件事从代码里抽出来，变成<b>可配置、可复用、可灰度</b>的编排体系。
</div>
<!-- ═══════════ 2 ═══════════ -->
<h2><span class="no">02</span>设计目标与原则</h2>
<h3>2.1 北极星目标</h3>
<div class="lead" style="text-align:center;font-size:16px;"><b>新销售方式接入 = 编排一条新链路，不改代码快速上线。</b><br><span style="font-size:12.5px;color:#5A7A66;">上线周期从「周」压缩到「天」，回归范围从「全量」收敛到「新链路」。</span></div>
<h3>2.2 五条设计原则</h3>
<table>
<tr><th style="width:24%">原则</th><th>含义</th></tr>
<tr><td><b>状态与动作解耦</b></td><td>状态机只回答"现在是什么状态、允许流转到哪"；具体动作交给节点与任务执行。状态定义稳定，动作实现可替换。</td></tr>
<tr><td><b>配置即上线</b></td><td>链路模板、节点参数、任务规则、路由条件全部配置化，配置版本化留存，支持灰度发布与一键回滚。</td></tr>
<tr><td><b>快照一致性</b></td><td>链路执行过程中（转方案、续租、售后）一律读下单快照，不读实时价格/商品配置——保证历史订单的计费与履约依据不漂移。</td></tr>
<tr><td><b>失败必有兜底</b></td><td>每个节点定义超时时间与失败动作（重试/跳过/挂起/自动关单/转人工），任何订单不允许"卡死"在某个节点无感知。</td></tr>
<tr><td><b>全程可回放</b></td><td>每次状态流转、节点执行、任务触发均留痕（流转日志 + 节点执行实例），支持按订单号回放完整链路轨迹。</td></tr>
</table>
<!-- ═══════════ 3 ═══════════ -->
<h2><span class="no">03</span>核心概念模型</h2>
<h3>3.1 订单域模型</h3>
<p>先定域模型的三个基本关系，再谈编排：</p>
<ul>
<li><b>商品订单 1:N 履约订单</b>——一份商品订单按履约阶段拆单：首租一单、每次续租各一单（短租续租除外，≤90 天续租不重新创单、扩展原账单）；</li>
<li><b>商品订单 1:N 售后单</b>——追回 / 归还 / 退货，一单一售后，状态独立流转；</li>
<li><b>订单 1:1 下单快照</b>——价格快照、商品快照、风控快照在下单瞬间固化，快照 ID 是贯穿转方案、续租、售后的唯一依据。</li>
</ul>
<h3>3.2 编排层的五个核心概念</h3>
<table>
<tr><th style="width:18%">概念</th><th style="width:34%">定义</th><th>关键设计点</th></tr>
<tr><td><b>状态机</b><br>State Machine</td><td>主状态 × 子状态两级结构，定义订单生命周期的合法流转</td><td>主状态全局统一（一套工作语言）；子状态表达"当前正在被哪个节点处理"；关单时限按状态配置。</td></tr>
<tr><td><b>节点</b><br>Node</td><td>链路上的一个同步处理环节，有输入依赖、处理逻辑、超时与失败动作</td><td>节点类型全局注册（前置风控/分流/支付/后置风控/商户审核…）；同一节点在不同链路中可有不同参数。</td></tr>
<tr><td><b>任务</b><br>Task</td><td>由状态流转或节点完成触发的异步动作</td><td>任务类型注册中心：关单、短信、改址、导出、代扣计划生成、定时对账；延迟队列 + 幂等 + 重试 + 死信告警。</td></tr>
<tr><td><b>条件路由</b><br>Route Rule</td><td>条件表达式 → 链路模板的映射规则</td><td>条件维度：销售方式 / 渠道来源 / 风控等级 / 商品类型 / 用户标签；支持优先级排序与默认链路兜底。</td></tr>
<tr><td><b>链路模板</b><br>Template</td><td>一条完整订单链路的编排定义：节点有序列表 + 绑定的状态机 + 挂载的任务</td><td>按销售方式一套模板；模板版本化，老订单按下单时的模板版本走完生命周期。</td></tr>
</table>
<h3>3.3 主状态与子状态设计</h3>
<div class="diagram">
<svg viewBox="0 0 880 190" xmlns="http://www.w3.org/2000/svg" font-family="PingFang SC,Microsoft YaHei,sans-serif">
<style>
.st{fill:#fff;stroke:#3FA06D;stroke-width:1.2;rx:6;}
.sub{fill:#EAF5EE;stroke:#7FBF9A;stroke-width:1;rx:4;}
.lt{fill:#1E5C3D;font-size:12.5px;font-weight:700;text-anchor:middle;}
.ls{fill:#2A5A41;font-size:10.5px;text-anchor:middle;}
.ln{stroke:#3FA06D;stroke-width:1.4;fill:none;marker-end:url(#ah);}
.note{fill:#7A8A80;font-size:10.5px;text-anchor:middle;}
</style>
<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#3FA06D"/></marker></defs>
<!-- 主状态 -->
<rect class="st" x="14" y="30" width="76" height="40" rx="6"/><text class="lt" x="52" y="54">申请中</text>
<rect class="st" x="118" y="30" width="76" height="40" rx="6"/><text class="lt" x="156" y="54">待审核</text>
<rect class="st" x="222" y="30" width="76" height="40" rx="6"/><text class="lt" x="260" y="54">待支付</text>
<rect class="st" x="326" y="30" width="76" height="40" rx="6"/><text class="lt" x="364" y="54">待发货</text>
<rect class="st" x="430" y="30" width="76" height="40" rx="6"/><text class="lt" x="468" y="54">待签收</text>
<rect class="st" x="534" y="30" width="76" height="40" rx="6"/><text class="lt" x="572" y="54">还款中</text>
<rect class="st" x="638" y="30" width="76" height="40" rx="6"/><text class="lt" x="676" y="54">归还中</text>
<rect class="st" x="742" y="30" width="90" height="40" rx="6"/><text class="lt" x="787" y="54">完结 / 关闭</text>
<line class="ln" x1="90" y1="50" x2="116" y2="50"/><line class="ln" x1="194" y1="50" x2="220" y2="50"/>
<line class="ln" x1="298" y1="50" x2="324" y2="50"/><line class="ln" x1="402" y1="50" x2="428" y2="50"/>
<line class="ln" x1="506" y1="50" x2="532" y2="50"/><line class="ln" x1="610" y1="50" x2="636" y2="50"/>
<line class="ln" x1="714" y1="50" x2="740" y2="50"/>
<!-- 待审核子状态 -->
<rect class="sub" x="106" y="96" width="100" height="26" rx="4"/><text class="ls" x="156" y="113">风控中</text>
<rect class="sub" x="106" y="128" width="100" height="26" rx="4"/><text class="ls" x="156" y="145">分流中</text>
<rect class="sub" x="106" y="160" width="100" height="26" rx="4"/><text class="ls" x="156" y="177">商户待审核</text>
<path class="ln" d="M 148 70 L 148 94" fill="none"/>
<path class="ln" d="M 148 122 L 148 126" fill="none"/>
<path class="ln" d="M 148 154 L 148 158" fill="none"/>
<text class="note" x="290" y="112">子状态 = 链路节点的执行位：</text>
<text class="note" x="290" y="128">风控中 → 分流中 → 商户待审核</text>
<text class="note" x="290" y="144">正好对应前置风控 → 分流 → 商户审核三个节点</text>
<text class="note" x="620" y="112">关单时限按状态配置：</text>
<text class="note" x="620" y="128">如待支付 30 分钟未支付自动关单</text>
<text class="note" x="620" y="144">待发货超过商户承诺时效触发提醒与降级</text>
<text class="note" x="156" y="30">↓ 子状态示例（租赁链路）</text>
</svg>
<div class="cap">图 3-1 主状态机与"待审核"子状态展开</div>
</div>
<!-- ═══════════ 4 ═══════════ -->
<h2><span class="no">04</span>四层编排机制</h2>
<h3>4.1 第一层：状态机编排</h3>
<ul>
<li><b>两张配置表</b>：状态定义表（状态码、名称、是否终态、关单时限）+ 流转表（事件 × 当前状态 → 目标状态 + 触发动作）；</li>
<li><b>事件驱动</b>：支付回调、风控回调、分流结果、商户操作、定时任务，全部抽象为"事件"，事件是唯一合法的流转入口；</li>
<li><b>非法流转拦截</b>：不在流转表内的流转直接拒绝并记日志——防止并发回调导致状态错乱（如已关单订单又收到支付成功回调）；</li>
<li><b>子状态归一</b>：子状态流转由节点执行器驱动，节点完成即推进子状态，子状态全部完成后推主状态。</li>
</ul>
<h3>4.2 第二层：节点编排</h3>
<ul>
<li><b>节点类型注册中心</b>：前置风控、分流、支付、后置风控、商户审核、自动过审、授信校验、三方下单……新节点类型一次性开发，所有链路复用；</li>
<li><b>节点四要素</b>：输入依赖（需要哪些前置数据）、处理动作、超时时间、失败动作（重试 / 跳过 / 挂起 / 自动关单 / 转人工）；</li>
<li><b>链路模板 = 节点有序列表</b>：同一节点在不同模板中参数不同——例如分流节点只在租赁 / 转租赁链路生效，零售链路不挂载；</li>
<li><b>节点顺序可编排</b>：租赁链路是"前置风控 → 分流 → 商户审核 → 支付"，赊销链路是"授信校验 → 支付"，顺序差异只是模板配置差异。</li>
</ul>
<h3>4.3 第三层：任务编排</h3>
<table>
<tr><th style="width:20%">任务类型</th><th style="width:36%">触发时机（示例）</th><th>执行保障</th></tr>
<tr><td><b>自动关单</b></td><td>状态进入且停留超时（待支付 30min、待审核 24h 等）</td><td>延迟队列 + 执行前复查最新状态（防止"刚付完款就被关单"）</td></tr>
<tr><td><b>节点短信</b></td><td>9 类节点：分流 / 审核 / 支付 / 发货 / 签收 / 到期 / 逾期 / 归还 / 关单</td><td>模板按链路配置，触达前查免扰标识</td></tr>
<tr><td><b>改址</b></td><td>用户在待发货前申请修改地址</td><td>仅限定状态内生效，发货后拒绝并引导客服</td></tr>
<tr><td><b>导出 / 对账</b></td><td>运营批量导出、每日三方状态对账</td><td>异步任务中心调度，幂等去重</td></tr>
<tr><td><b>代扣计划生成</b></td><td>订单进入还款中时按快照账单生成</td><td>与资费域联动，失败进入死信告警</td></tr>
</table>
<h3>4.4 第四层：条件路由</h3>
<ul>
<li><b>规则结构</b>：IF 条件组合 THEN 挂载链路模板。条件维度支持：销售方式、渠道来源、风控等级、商品业务类目、用户标签；</li>
<li><b>优先级 + 默认兜底</b>：规则按优先级从高到低匹配，全部未命中走默认链路——不允许出现"无链路可走"的订单；</li>
<li><b>路由发生在下单瞬间</b>：命中结果连同链路模板版本号写入订单，后续流转按该版本执行，不受模板后续修改影响。</li>
</ul>
<div class="diagram">
<svg viewBox="0 0 880 320" xmlns="http://www.w3.org/2000/svg" font-family="PingFang SC,Microsoft YaHei,sans-serif">
<style>
.nd{fill:#fff;stroke:#3FA06D;stroke-width:1.3;rx:6;}
.br{fill:#EAF5EE;stroke:#3FA06D;stroke-width:1;stroke-dasharray:5 3;rx:8;}
.t1{fill:#1E5C3D;font-size:12px;font-weight:700;text-anchor:middle;}
.t2{fill:#5A7A66;font-size:10px;text-anchor:middle;}
.fl{stroke:#2E7D53;stroke-width:1.6;fill:none;marker-end:url(#a2);}
.dt{stroke:#9AA89E;stroke-width:1.1;fill:none;stroke-dasharray:4 3;marker-end:url(#a3);}
.lb{fill:#5A7A66;font-size:10px;text-anchor:middle;}
.hd{fill:#3FA06D;rx:6;}
</style>
<defs>
<marker id="a2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2E7D53"/></marker>
<marker id="a3" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#9AA89E"/></marker>
</defs>
<!-- 入口 -->
<rect class="nd" x="370" y="12" width="140" height="38" rx="6"/><text class="t1" x="440" y="36">统一下单入口</text>
<!-- 条件路由 -->
<rect class="nd" x="370" y="80" width="140" height="44" rx="6"/><text class="t1" x="440" y="99">条件路由</text><text class="t2" x="440" y="115">销售方式 × 渠道 × 风控等级</text>
<line class="fl" x1="440" y1="50" x2="440" y2="78"/>
<!-- 三分支 -->
<line class="fl" x1="370" y1="102" x2="185" y2="102"/><line class="fl" x1="370" y1="102" x2="185" y2="102" transform="translate(0,2)" opacity="0"/>
<line class="fl" x1="440" y1="124" x2="440" y2="150"/>
<path class="fl" d="M 370 102 L 370 138"/>
<path class="fl" d="M 510 102 L 700 102 L 700 138"/>
<!-- 租赁链路 -->
<rect class="br" x="70" y="140" width="600" height="88" rx="8"/>
<text class="t1" x="90" y="162">租赁链路</text>
<rect class="nd" x="150" y="150" width="86" height="34" rx="5"/><text class="t1" x="193" y="171">前置风控</text>
<rect class="nd" x="256" y="150" width="86" height="34" rx="5"/><text class="t1" x="299" y="171">分流</text>
<rect class="nd" x="362" y="150" width="86" height="34" rx="5"/><text class="t1" x="405" y="171">商户审核</text>
<rect class="nd" x="468" y="150" width="86" height="34" rx="5"/><text class="t1" x="511" y="171">支付</text>
<rect class="nd" x="574" y="150" width="86" height="34" rx="5"/><text class="t1" x="617" y="171">发货履约</text>
<line class="fl" x1="236" y1="167" x2="254" y2="167"/><line class="fl" x1="342" y1="167" x2="360" y2="167"/>
<line class="fl" x1="448" y1="167" x2="466" y2="167"/><line class="fl" x1="554" y1="167" x2="572" y2="167"/>
<text class="lb" x="299" y="200">状态机同步推进：风控中 → 分流中 → 商户待审核 → 待支付</text>
<text class="lb" x="299" y="216">挂载任务：审核短信 · 支付超时关单(30min) · 发货超时提醒</text>
<!-- 赊销链路 -->
<rect class="nd" x="380" y="160" width="0" height="0"/>
<rect class="br" x="70" y="244" width="600" height="62" rx="8"/>
<text class="t1" x="90" y="266">赊销链路</text>
<rect class="nd" x="150" y="254" width="100" height="34" rx="5"/><text class="t1" x="200" y="275">授信校验</text>
<rect class="nd" x="290" y="254" width="100" height="34" rx="5"/><text class="t1" x="340" y="275">首付差额支付</text>
<rect class="nd" x="430" y="254" width="100" height="34" rx="5"/><text class="t1" x="480" y="275">分期方案生效</text>
<line class="fl" x1="250" y1="271" x2="288" y2="271"/><line class="fl" x1="390" y1="271" x2="428" y2="271"/>
<text class="lb" x="480" y="298">不经过分流节点 · 赊销商户按 SS 等级传参定向承接</text>
<!-- 零售链路 -->
<rect class="br" x="700" y="140" width="168" height="166" rx="8"/>
<text class="t1" x="784" y="162">零售链路</text>
<rect class="nd" x="724" y="176" width="120" height="34" rx="5"/><text class="t1" x="784" y="197">全款 / 分期支付</text>
<rect class="nd" x="724" y="224" width="120" height="34" rx="5"/><text class="t1" x="784" y="245">直连发货履约</text>
<line class="fl" x1="784" y1="210" x2="784" y2="222"/>
<text class="lb" x="784" y="286">链路最短 · 无风控/分流节点</text>
<text class="lb" x="440" y="70" style="fill:#9AA89E;">路由命中结果 + 模板版本号写入订单，后续按版本执行</text>
</svg>
<div class="cap">图 4-1 条件路由与三条销售链路的编排示例</div>
</div>
<!-- ═══════════ 5 ═══════════ -->
<h2><span class="no">05</span>案例走查：用编排接入「美团短租」</h2>
<p>以 2026 年美团短租合作为例，验证"不改代码上线"是否成立。背景：保证金已缴、待对方能力就绪，平台侧需要新增一条三方渠道订单链路。</p>
<h3>5.1 配置清单（全部是配置动作，无核心代码改动）</h3>
<table>
<tr><th style="width:20%">配置项</th><th>内容</th></tr>
<tr><td><b>新增销售方式</b></td><td>销售方式枚举增加「美团短租」，挂三方渠道标识。</td></tr>
<tr><td><b>条件路由规则</b></td><td>IF 来源 = 美团 THEN 美团短租链路模板（优先级高于默认租赁链路）。</td></tr>
<tr><td><b>链路模板</b></td><td>三方订单创建 → 前置风控 → 分流 → 商户审核 → 支付确认 → 发货履约；短租 ≤90 天规则生效。</td></tr>
<tr><td><b>状态映射字典</b></td><td>美团订单状态 ↔ 平台状态机的映射表（三方状态回传统一翻译成平台事件）。</td></tr>
<tr><td><b>任务配置</b></td><td>短租到期提醒任务、逾期使用费任务（买断可抵扣 / 短租续租不抵扣）、节点短信模板。</td></tr>
<tr><td><b>快照字段</b></td><td>三方下单价格快照字段对齐（按命名规范：外部对接用「编码」，快照 = 下单时价格固化）。</td></tr>
</table>
<h3>5.2 这条案例验证了什么</h3>
<div class="cols">
<div class="col"><div class="t">验证一：差异被配置消化</div><p>美团短租与自有租赁的差异（渠道、支付方式、状态字典）全部落在路由规则、模板参数与映射字典里，状态机与节点类型零改动。</p></div>
<div class="col"><div class="t">验证二：复用而不是新造</div><p>前置风控、分流、商户审核节点直接复用大平台已有节点实例，只调整参数；9 类短信模板按链路重新挂载即可。</p></div>
<div class="col"><div class="t">验证三：回滚成本可控</div><p>配置版本化——异常时把路由规则切回默认链路，在途订单按原模板版本走完，新订单即时切换。</p></div>
</div>
<!-- ═══════════ 6 ═══════════ -->
<h2><span class="no">06</span>与周边系统的边界</h2>
<table>
<tr><th style="width:20%">系统</th><th style="width:40%">职责分工</th><th>交互方式</th></tr>
<tr><td><b>风控中心</b></td><td>前置 / 后置风控节点由风控中心执行并回调；风控等级作为条件路由与分流的入参</td><td>路由编排调用 + 回调驱动状态推进</td></tr>
<tr><td><b>分流引擎</b></td><td>是链路中的一个节点，被订单路由编排调用；承接"订单分给谁"的问题（详见分流引擎设计文档）</td><td>同步调用 + 结果事件（分流中 → 商户待审核）</td></tr>
<tr><td><b>价格中心</b></td><td>下单瞬间取价格快照；链路中所有计费、转方案、续租读快照不读实时配置</td><td>下单时同步获取，快照 ID 落订单</td></tr>
<tr><td><b>支付中心</b></td><td>支付节点封装渠道差异（宝付代扣 / 支付宝交易组件 2.0 / 预授权）</td><td>节点内调用，回调翻译为状态机事件</td></tr>
<tr><td><b>商贸履约系统</b></td><td>发货履约节点下发履约单（KA/自营推商贸、普通商户自发）</td><td>履约单状态回传驱动待发货 → 待签收</td></tr>
</table>
<div class="callout">
<div class="t">边界判断标准</div>
订单路由<b>不做</b>任何业务判断（风控结论、分流结果、价格计算都不是它的事），它只负责：<b>在正确的时间，把订单交给正确的节点，并在节点超时或失败时执行兜底</b>。业务能力全部在节点实现层。
</div>
<!-- ═══════════ 7 ═══════════ -->
<h2><span class="no">07</span>数据模型概览</h2>
<div class="diagram">
<svg viewBox="0 0 880 240" xmlns="http://www.w3.org/2000/svg" font-family="PingFang SC,Microsoft YaHei,sans-serif">
<style>
.ent{fill:#fff;stroke:#3FA06D;stroke-width:1.2;rx:6;}
.et{fill:#1E5C3D;font-size:12px;font-weight:700;text-anchor:middle;}
.ed{fill:#5A7A66;font-size:9.5px;text-anchor:middle;}
.rl{stroke:#2E7D53;stroke-width:1.3;fill:none;marker-end:url(#a4);}
.rt{fill:#2E7D53;font-size:10px;text-anchor:middle;}
</style>
<defs><marker id="a4" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2E7D53"/></marker></defs>
<rect class="ent" x="340" y="16" width="200" height="52" rx="6"/><text class="et" x="440" y="38">order 商品订单</text><text class="ed" x="440" y="56">订单号 / 状态 / 链路模板版本 / 快照 ID</text>
<rect class="ent" x="80" y="110" width="180" height="52" rx="6"/><text class="et" x="170" y="132">fulfillment_order 履约单</text><text class="ed" x="170" y="150">首租单 / 续租单 · 1:N</text>
<rect class="ent" x="290" y="110" width="180" height="52" rx="6"/><text class="et" x="380" y="132">order_state_log 流转日志</text><text class="ed" x="380" y="150">事件 / 前态 / 后态 / 操作来源</text>
<rect class="ent" x="500" y="110" width="180" height="52" rx="6"/><text class="et" x="590" y="132">node_execution 节点实例</text><text class="ed" x="590" y="150">节点类型 / 状态 / 耗时 / 失败动作</text>
<rect class="ent" x="706" y="110" width="160" height="52" rx="6"/><text class="et" x="786" y="132">task_queue 任务表</text><text class="ed" x="786" y="150">任务类型 / 触发时间 / 重试</text>
<rect class="ent" x="290" y="190" width="180" height="40" rx="6"/><text class="et" x="380" y="210">order_snapshot 快照</text><text class="ed" x="380" y="226">价格 / 商品 / 风控</text>
<rect class="ent" x="520" y="190" width="180" height="40" rx="6"/><text class="et" x="610" y="210">route_template 链路模板</text><text class="ed" x="610" y="226">节点序列 / 参数 / 版本</text>
<path class="rl" d="M 400 68 L 210 108"/><text class="rt" x="290" y="86">1 : N</text>
<path class="rl" d="M 440 68 L 440 108"/><text class="rt" x="452" y="90">1 : N</text>
<path class="rl" d="M 480 68 L 575 108"/><text class="rt" x="540" y="86">1 : N</text>
<path class="rl" d="M 590 162 L 640 188"/><text class="rt" x="640" y="176">引用</text>
<path class="rl" d="M 420 68 L 395 188"/><text class="rt" x="392" y="130">引用</text>
</svg>
<div class="cap">图 7-1 订单路由相关数据实体关系概览</div>
</div>
<!-- ═══════════ 8 ═══════════ -->
<h2><span class="no">08</span>关键指标与灰度机制</h2>
<h3>8.1 衡量"编排能力"本身的指标</h3>
<table>
<tr><th style="width:28%">指标</th><th>定义与目标方向</th></tr>
<tr><td><b>新链路上线周期</b></td><td>从需求确认到新链路生产可用的自然日。核心指标——直接验证"配置即上线"。</td></tr>
<tr><td><b>配置复用率</b></td><td>新链路中复用已有节点 / 任务 / 状态定义的比例，衡量中台沉淀厚度。</td></tr>
<tr><td><b>状态流转异常率</b></td><td>非法流转拦截数 + 节点失败挂起数 ÷ 总流转次数，衡量链路健壮性。</td></tr>
<tr><td><b>快照一致率</b></td><td>转方案 / 续租 / 售后计费取值与快照一致的订单占比，目标 100%。</td></tr>
<tr><td><b>任务执行及时率</b></td><td>关单 / 短信等任务在时限内完成的比例（含死信告警响应时长）。</td></tr>
</table>
<h3>8.2 灰度机制</h3>
<ul>
<li>新链路模板先挂<b>小流量规则</b>（如按用户尾号切 5%——借鉴分流引擎一期 AB 切流的做法），观察状态流转异常率与关单率；</li>
<li>配置支持<b>双版本并行</b>：在途订单按老版本走完，新订单切新版本，避免"改配置伤害存量订单"；</li>
<li>一键回滚 = 把路由规则指回旧模板版本，秒级生效。</li>
</ul>
<!-- ═══════════ 9 ═══════════ -->
<h2><span class="no">09</span>演进路线</h2>
<table>
<tr><th style="width:14%">阶段</th><th style="width:34%">范围</th><th>里程碑验证</th></tr>
<tr><td><b>1.0 状态机 + 节点配置化</b></td><td>主状态机统一、子状态机制、节点类型注册中心、租赁 / 赊销 / 零售三条链路模板化</td><td>三销售方式共用一套编排底座；大平台迁移（0301 MVP）期间链路平滑切换</td></tr>
<tr><td><b>2.0 任务编排 + 条件路由</b></td><td>任务中心（关单 / 短信 / 改址 / 对账统一调度）、条件路由规则引擎、三方渠道状态映射字典</td><td>美团短租等三方渠道按配置接入；短租续租不重新创单等差异化规则配置化表达</td></tr>
<tr><td><b>3.0 可视化与智能</b></td><td>链路可视化编排台（拖拽生成模板）、链路级灰度 / AB、节点执行数据反哺编排优化</td><td>运营自助编排实验链路；编排优化由数据回流驱动</td></tr>
</table>
<div class="callout">
<div class="t">与分流引擎的关系（收口）</div>
订单路由解决「<b>订单走什么流程</b>」，分流引擎解决「<b>流程中的订单分给谁</b>」——分流引擎是订单路由链路上的一个节点，两者共用订单上下文（标签 / 字段 / 商品 / 商户）与风控等级底座，共同构成订单中心"编排 + 分发"的双中台能力。
</div>
</div>
</div>

<div class="block-divider"></div>

## 三、分流引擎设计思路

<div class="split-engine-doc not-prose">
<div class="wrap">
<div class="hero">
<h1>分流引擎 · 中台设计思路</h1>
<div class="sub">订单中心核心能力 —— 基于订单标签、字段、商品、商户等多因子，把每一单分给最可能承接的商户</div>
<div class="tags">
<span class="tag">准入</span><span class="tag">商家过滤</span><span class="tag">分配策略</span><span class="tag">召回兜底</span><span class="tag">商户等级</span>
</div>
</div>
<!-- ═══════════ 1 ═══════════ -->
<h2><span class="no">01</span>为什么需要分流引擎</h2>
<div class="lead">大平台模式落地后，<b>自营降级为商户</b>，与 KA、普通商户在同一池子里竞争接单。订单不再天然属于某一家——每一单都要回答：这么多的商户，谁来接这一单最合适？人工派单和固定归属模式在千级商户规模下必然失效。</div>
<h3>1.1 引擎要同时满足的四个诉求</h3>
<table>
<tr><th style="width:20%">诉求</th><th>含义</th></tr>
<tr><td><b>转化最优</b></td><td>分给"最可能接单且履约最好"的商户——用发货意愿度与商户等级说话，而不是运营手工挑。</td></tr>
<tr><td><b>时效优先</b></td><td>分流必须实时完成。订单在"分流中"停留的每一秒都是转化损耗，这条红线有真实的试错代价背书（见第 8 节）。</td></tr>
<tr><td><b>漏损为零</b></td><td>任何一个订单都必须有承接结果：分出去、或走召回兜底，不允许"悬空"。</td></tr>
<tr><td><b>可运营</b></td><td>准入、过滤、分配、等级、上限全部配置化，业务同学可按业务类型（租赁 / 赊销 / 售卖）独立调整，不发版。</td></tr>
</table>
<div class="callout">
<div class="t">一句话定义</div>
分流引擎 = 以<b>订单上的各类标签、字段、商品、商户信息</b>为输入，经「准入 → 商家过滤 → 分配 → 召回兜底」四段流水线，产出唯一承接商户的<b>实时分发决策系统</b>。
</div>
<!-- ═══════════ 2 ═══════════ -->
<h2><span class="no">02</span>分流因子体系</h2>
<p>回应一个根本问题：分流到底看哪些信息？把输入统一整理为<b>四层因子</b>，全部配置化引用，新增因子只注册不改造：</p>
<table>
<tr><th style="width:16%">因子层</th><th style="width:44%">典型因子</th><th>来源</th></tr>
<tr><td><b>订单因子</b></td><td>销售方式（租赁/赊销/售卖/转租赁）、租期类型（长租&gt;90天 / 短租≤90天）、订单金额、地区、免押标识、下单渠道</td><td>订单上下文 + 下单快照</td></tr>
<tr><td><b>商品因子</b></td><td>业务类目、商品特征标签、货品 SKU、成色、是否监管机 / 是否激活</td><td>商品中心档案</td></tr>
<tr><td><b>商户因子</b></td><td>商户等级 S+~D、发货率、过审率、营业时间、接单上限、在途订单数、共租关系、入驻时长</td><td>商户中心 + 分流记录实时累计</td></tr>
<tr><td><b>风控因子</b></td><td>用户风控等级（SS~D）、发货意愿度（风控模型 API 出参）</td><td>风控中心</td></tr>
</table>
<div class="callout">
<div class="t">设计要点</div>
因子分层的意义在于<b>配置界面按层组织</b>：业务配"什么订单可以参与分流"看订单因子，配"什么商户有资格接"看商户因子，配"优先给谁"看风控因子。四层因子在引擎内部统一为订单上下文快照，保证同一次分流内口径一致。
</div>
<!-- ═══════════ 3 ═══════════ -->
<h2><span class="no">03</span>引擎主流程</h2>
<div class="diagram">
<svg viewBox="0 0 880 400" xmlns="http://www.w3.org/2000/svg" font-family="PingFang SC,Microsoft YaHei,sans-serif">
<style>
.st{fill:#3FA06D;rx:6;}
.pn{fill:#fff;stroke:#3FA06D;stroke-width:1.4;rx:6;}
.sb{fill:#EAF5EE;stroke:#7FBF9A;stroke-width:1;rx:5;}
.t1{fill:#fff;font-size:12.5px;font-weight:700;text-anchor:middle;}
.t2{fill:#1E5C3D;font-size:11.5px;font-weight:700;text-anchor:middle;}
.t3{fill:#5A7A66;font-size:10px;text-anchor:middle;}
.fl{stroke:#2E7D53;stroke-width:1.7;fill:none;marker-end:url(#as);}
.bk{stroke:#B07830;stroke-width:1.4;fill:none;stroke-dasharray:5 3;marker-end:url(#ab);}
.bt{fill:#B07830;font-size:10px;text-anchor:middle;}
.nt{fill:#7A8A80;font-size:10px;}
</style>
<defs>
<marker id="as" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2E7D53"/></marker>
<marker id="ab" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#B07830"/></marker>
</defs>
<!-- 输入 -->
<rect class="pn" x="20" y="20" width="150" height="48" rx="6"/><text class="t2" x="95" y="41">订单进入</text><text class="t3" x="95" y="57">分流中（子状态）</text>
<!-- 1 准入 -->
<rect class="pn" x="220" y="16" width="140" height="56" rx="6"/><text class="t2" x="290" y="38">① 分流准入</text><text class="t3" x="290" y="54">通用水位 + 特征矩阵</text>
<line class="fl" x1="170" y1="44" x2="218" y2="44"/>
<!-- 2 过滤 -->
<rect class="pn" x="410" y="16" width="140" height="56" rx="6"/><text class="t2" x="480" y="38">② 商家过滤</text><text class="t3" x="480" y="54">承接条件 + 流量规则</text>
<line class="fl" x1="360" y1="44" x2="408" y2="44"/>
<!-- 3 分配 -->
<rect class="pn" x="600" y="16" width="140" height="56" rx="6"/><text class="t2" x="670" y="38">③ 分配</text><text class="t3" x="670" y="54">意愿度 × 等级 × 系数</text>
<line class="fl" x1="550" y1="44" x2="598" y2="44"/>
<!-- 输出 -->
<rect class="pn" x="20" y="120" width="150" height="48" rx="6"/><text class="t2" x="95" y="141">商户待审核</text><text class="t3" x="95" y="157">承接成功</text>
<path class="fl" d="M 670 72 L 670 96 L 95 96 L 95 118"/>
<text class="nt" x="240" y="90">分流结果写分流记录（候选集 / 因子值 / 得分 / 耗时），状态推进：分流中 → 商户待审核</text>
<!-- 准入细节 -->
<rect class="sb" x="220" y="100" width="140" height="40" rx="5"/><text class="t3" x="290" y="116">通用：开关 · 共租上限</text><text class="t3" x="290" y="131">特征：类目 × 风控等级</text>
<rect class="sb" x="410" y="100" width="140" height="40" rx="5"/><text class="t3" x="480" y="116">商品 · 营业时间 · 属性</text><text class="t3" x="480" y="131">同人去重 · 上限 · 类型隔离</text>
<rect class="sb" x="600" y="100" width="140" height="40" rx="5"/><text class="t3" x="670" y="116">意愿度择优（模型 API）</text><text class="t3" x="670" y="131">S+~D 排序 · 优先级系数</text>
<!-- 召回 -->
<rect class="pn" x="360" y="200" width="240" height="60" rx="6" fill="#FDF7EF" stroke="#B07830"/><text class="t2" x="480" y="224" fill="#B07830">④ 召回兜底</text><text class="t3" x="480" y="242" fill="#A07840">过滤后无承接商户时触发 · 跳过召回条件再分配</text>
<path class="bk" d="M 480 72 L 480 198"/>
<text class="bt" x="560" y="130">过滤后候选集为空</text>
<path class="bk" d="M 480 260 L 480 292 L 290 292 L 290 74"/>
<text class="bt" x="384" y="286">再分配（二次分流回待分流池）</text>
<!-- 底部：链路反向编排 -->
<rect x="20" y="316" width="840" height="70" rx="8" fill="#EAF5EE" stroke="#3FA06D" stroke-width="1"/>
<text class="t2" x="150" y="342">链路按风控等级反向编排（大平台关键决策）</text>
<text class="t3" x="150" y="360">分配顺序本身就是分流配置的一部分</text>
<rect class="pn" x="330" y="330" width="150" height="40" rx="6"/><text class="t2" x="405" y="347">S+ 优质单</text><text class="t3" x="405" y="362">平台 → 自营 → KA → 商户</text>
<rect class="pn" x="510" y="330" width="150" height="40" rx="6"/><text class="t2" x="585" y="347">D 级差单</text><text class="t3" x="585" y="362">商户优先 · 自营兜底</text>
</svg>
<div class="cap">图 3-1 分流引擎四段流水线与召回回路</div>
</div>
<!-- ═══════════ 4 ═══════════ -->
<h2><span class="no">04</span>四段机制详解</h2>
<h3>4.1 ① 分流准入：这一单能不能进入分流</h3>
<table>
<tr><th style="width:22%">配置组</th><th>规则</th></tr>
<tr><td><b>通用准入</b></td><td>分流总开关；共租上限（同一订单最多分流次数）；进件时间窗口；是否平台店铺；触达次数上限；<b>超时重分流</b>（商户未及时审核，订单自动回流待分流池）。</td></tr>
<tr><td><b>特征准入</b></td><td>「业务类目 × 风控等级」矩阵：如 D 级用户 + 高价值类目 → 仅准入自营与 KA；SS 级用户 → 全量商户准入。<b>租赁 / 赊销 / 售卖三套独立配置</b>，互不干扰。</td></tr>
</table>
<h3>4.2 ② 商家过滤：哪些商户有资格接这一单</h3>
<table>
<tr><th style="width:22%">过滤组</th><th>规则</th></tr>
<tr><td><b>承接条件过滤</b></td><td>共租判断（多商户共租一单的排除）；商品特征（有没有这台货、成色是否匹配）；订单属性（免押 / 监管机 / 是否激活）；商户营业时间窗口。</td></tr>
<tr><td><b>流量规则过滤</b></td><td><b>同人去重</b>（同一用户的历史商户优先命中或按规则排除）；<b>分流上限</b>（单商户当日被分流次数）；<b>接单数按订单类型隔离</b>——长租 / 短租 / 赊销 / 零售 / 转租赁分别计数，防止短租大单量挤占长租商户的接单额度（2026.09 迭代）。</td></tr>
</table>
<h3>4.3 ③ 分配：候选商户里谁优先</h3>
<ul>
<li><b>意愿度择优</b>：调风控模型 API 获取各候选商户的"发货意愿度"，模型部分返回即对已返回商户执行择优，未返回商户赋值"中"——不让模型延迟阻塞分流时效；</li>
<li><b>等级排序</b>：S+ → S → A → B → C → D，同级内按意愿度；</li>
<li><b>优先级系数</b>：运营可对特定商户 / 类目配置系数，数值越小优先级越高，用于阶段性经营策略（如新类目冷启动扶持）；</li>
<li><b>降级策略</b>：模型 API 不可用时自动降级为"等级 + 均分"，分流不中断。</li>
</ul>
<h3>4.4 ④ 召回兜底：一单都不允许悬空</h3>
<ul>
<li><b>触发</b>：过滤后候选集为空；</li>
<li><b>动作</b>：跳过召回条件（放宽非核心过滤项，如营业时间）再分配一轮；仍无承接则回待分流池做二次分流；</li>
<li><b>记录</b>：召回命中单独打标，是衡量"过滤规则是否过紧"的直接信号——召回命中率持续偏高说明某条过滤规则误伤。</li>
</ul>
<!-- ═══════════ 5 ═══════════ -->
<h2><span class="no">05</span>商户等级体系</h2>
<p>等级是分配排序的骨架，也是商户经营的指挥棒。计算链路四步：</p>
<div class="diagram">
<svg viewBox="0 0 880 120" xmlns="http://www.w3.org/2000/svg" font-family="PingFang SC,Microsoft YaHei,sans-serif">
<style>
.bx{fill:#fff;stroke:#3FA06D;stroke-width:1.3;rx:6;}
.bt{fill:#1E5C3D;font-size:12px;font-weight:700;text-anchor:middle;}
.bd{fill:#5A7A66;font-size:10px;text-anchor:middle;}
.fl{stroke:#2E7D53;stroke-width:1.6;fill:none;marker-end:url(#a5);}
</style>
<defs><marker id="a5" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#2E7D53"/></marker></defs>
<rect class="bx" x="14" y="24" width="150" height="60" rx="6"/><text class="bt" x="89" y="48">考核指标</text><text class="bd" x="89" y="66">发货率 · 过审率</text>
<rect class="bx" x="214" y="24" width="160" height="60" rx="6"/><text class="bt" x="294" y="48">加权达成率</text><text class="bd" x="294" y="66">含客单价加权系数 · 权重和=100</text>
<rect class="bx" x="424" y="24" width="160" height="60" rx="6"/><text class="bt" x="504" y="48">综合得分</text><text class="bd" x="504" y="66">按售卖类型 × 业务类目分组</text>
<rect class="bx" x="634" y="24" width="160" height="60" rx="6"/><text class="bt" x="714" y="48">分组排名定级</text><text class="bd" x="714" y="66">S+ / S / A / B / C / D</text>
<line class="fl" x1="164" y1="54" x2="212" y2="54"/><line class="fl" x1="374" y1="54" x2="422" y2="54"/><line class="fl" x1="584" y1="54" x2="632" y2="54"/>
</svg>
<div class="cap">图 5-1 商户等级计算链路</div>
</div>
<ul>
<li><b>等级规则配置化</b>：按售卖类型 × 业务类目建规则，考核指标权重可配（权重加总 = 100，配置时强校验）；</li>
<li><b>保护机制</b>：白名单商户不参与排名；新商户（入驻 ≤30 天）设保护期不参与排名，避免冷启动即差评定级；</li>
<li><b>等级流动</b>：高级别商户名额固定，低级别向高级别溢出时按得分抢占下级名额——保持等级的稀缺性与区分度；</li>
<li><b>等级的两个用途</b>：分配排序（第 4.3 节）+ 链路反向编排（第 6 节）。等级即"商户的经营信用"。</li>
</ul>
<!-- ═══════════ 6 ═══════════ -->
<h2><span class="no">06</span>链路按风控等级反向编排</h2>
<div class="lead">大平台重构时最关键的决策：<b>分流链路的顺序不再固定，而是按订单风控等级反向编排</b>。订单质量决定平台资源的投入顺序——好单优先给自营保体验，差单让商户承接、自营兜底控风险。</div>
<table>
<tr><th style="width:18%">订单等级</th><th style="width:44%">承接链路顺序</th><th>逻辑</th></tr>
<tr><td><b>S+ 优质单</b></td><td>平台 → 自营 → KA → 商户</td><td>优质单优先自营保履约体验与复购；自营无货逐级外溢，商户收尾承接流量。</td></tr>
<tr><td><b>D 级差单</b></td><td>商户优先 · 自营按配置兜底</td><td>高风险单优先商户承接，自营只按配置的兜底比例参与，控制平台坏账敞口。</td></tr>
<tr><td><b>赊销 / 零售单</b></td><td>按 SS 等级传参定向分流</td><td>非租赁单不进入租赁分流池，按等级参数定向匹配承接方。</td></tr>
</table>
<div class="callout">
<div class="t">与订单路由的关系</div>
链路反向编排的落点在<b>订单路由的链路模板</b>上：条件路由按风控等级命中不同模板，模板中分流节点的候选商户顺序由分流引擎给出。两套机制的关系是——<b>路由决定"走哪条流程"，分流决定"流程里谁承接"</b>。
</div>
<!-- ═══════════ 7 ═══════════ -->
<h2><span class="no">07</span>分流记录与可回放</h2>
<ul>
<li><b>每次分流一条记录</b>：候选商户集、各商户因子值与得分、命中规则、最终结果、引擎耗时全量落库；</li>
<li><b>支持追溯回放</b>：客诉与商户申诉时，可按订单回放"当时为什么分给 A 不分给 B"——分流决策必须可解释；</li>
<li><b>等级快照归档</b>：商户等级按考核周期归档快照，历史订单按当时的等级口径复盘，避免"用今天的等级评判历史分流"；</li>
<li><b>统计口径隔离</b>：分单接单数统计按订单类型（长租 / 短租 / 赊销 / 零售 / 转租赁）隔离输出，直接服务接单上限配置的校准。</li>
</ul>
<!-- ═══════════ 8 ═══════════ -->
<h2><span class="no">08</span>试错复盘：灯火广告延迟分流</h2>
<div class="warn callout">
<div class="t">失败案例存档（2026.06.15 下线）——这条红线是用真实转化率换来的</div>
<b>设计初衷</b>：定向分流给投放广告的商户，用"延迟分流"换取广告变现。<br>
<b>实际结果</b>：分流成功率 <b>-5pt</b>；<b>83.8%</b> 的订单被延迟且拿不到定向标签；商户发货率仅 <b>+0.59%</b>。变现收益远不能覆盖转化损失。<br>
<b>决策</b>：全量回退并下线，确立引擎红线——<b>分流时效优先于定向变现</b>。
</div>
<h3>从这次试错沉淀的三条设计约束</h3>
<div class="cols">
<div class="col"><div class="t">时效红线制度化</div><p>任何新的分流增强（广告、精细化定向、更复杂的模型）上线前，必须先过"分流时效影响评估"，预估 P95 超出阈值的直接否决。</p></div>
<div class="col"><div class="t">标签完备性前置</div><p>83.8% 订单延迟后拿不到标签，说明定向能力依赖的标签必须在分流瞬间已就绪——标签生产滞后于分流的方案在架构上不可行。</p></div>
<div class="col"><div class="t">小流量验证机制</div><p>重试错必须有 AB 护栏（延续一期 30% 切流的做法）：先小流量对比成功率与发货率，达标才放量，不允许直接全量试。</p></div>
</div>
<!-- ═══════════ 9 ═══════════ -->
<h2><span class="no">09</span>关键指标</h2>
<table>
<tr><th style="width:26%">指标</th><th>定义与目标方向</th></tr>
<tr><td><b>分流成功率</b></td><td>一次分流即有承接的订单占比——引擎有效性的第一指标。</td></tr>
<tr><td><b>分流时效（P95）</b></td><td>订单进入"分流中"到产出结果的耗时 95 分位，红线指标。</td></tr>
<tr><td><b>召回命中率</b></td><td>触发召回后成功承接的比例；持续偏高 → 反查过滤规则是否过紧。</td></tr>
<tr><td><b>流量漏损单量</b></td><td>最终无承接而关单的订单量，目标趋近于零。</td></tr>
<tr><td><b>择优 vs 均分对比</b></td><td>AB 对比择优策略相对均分的发货率 / 取消率增益，验证模型价值。</td></tr>
<tr><td><b>分单接单数（按类型）</b></td><td>长租 / 短租 / 赊销 / 零售 / 转租赁隔离统计，校准各类型接单上限。</td></tr>
</table>
<!-- ═══════════ 10 ═══════════ -->
<h2><span class="no">10</span>演进路线</h2>
<table>
<tr><th style="width:16%">阶段</th><th style="width:36%">范围</th><th>里程碑验证</th></tr>
<tr><td><b>一期</b></td><td>AB 切流 30%（按用户尾号），风控 API 预估发货率、失败降级均分</td><td>小流量验证"择优优于均分"的假设成立</td></tr>
<tr><td><b>二期</b></td><td>升级"发货意愿度"，部分返回即择优，未返回赋"中"，全量放开</td><td>择优全量上线，转化增益稳定</td></tr>
<tr><td><b>三期 · 大平台重构</b></td><td>自营商户化、四段流水线成型、商户等级体系、链路按风控等级反向编排</td><td>0301 租赁迁移大平台 MVP 支撑</td></tr>
<tr><td><b>持续迭代</b></td><td>接单数按订单类型隔离统计（2026.09）；召回策略优化；灯火广告试错并沉淀时效红线</td><td>引擎在规模与复杂度上来后保持时效与漏损双达标</td></tr>
</table>
<div class="callout">
<div class="t">收口</div>
分流引擎的本质是<b>把"这单给谁"从人工经验变成可配置、可解释、可度量的实时决策</b>。它与订单路由共同构成订单中心的双中台：路由管流程编排，分流管资源分发，共用订单因子与风控等级底座。
</div>
</div>
</div>
