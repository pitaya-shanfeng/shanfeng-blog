---
title: 用户中心建设
published: 2026-11-08T11:45:00+08:00
description: 用户中心建设的完整材料：用户中心产品架构（用户库 / 用户标签 / 精准客群 / 会员体系 + 数据中心）、OneID 统一用户标识方案讨论，以及按五个域拆开的标签体系建设规划与系统 Demo 示例。
quote: 中台不是把数据搬到一起，是让同一个人在所有端上被认成同一个人。
category: 落地实战/产品设计
tags:
  - 用户中心
  - 标签体系
  - OneID
image: /assets/library/notes/user-center/cover.webp
banner: /assets/library/notes/user-center/banner.webp
draft: false
comment: false
hideSidebar: true
# 合集里第 2 篇
order: 2
---
## 一、产品架构

![青年优品·用户中心：建设思路、产品架构、能力边界与关键指标](/assets/library/notes/user-center/arch.webp)

<div class="block-divider"></div>

## 二、OneID方案

<div class="oneid-doc not-prose">
<main class="page">
<header>
<div class="eyebrow">方案讨论</div>
<h2 class="oneid-title">OneID 统一用户标识方案讨论</h2>
<p class="subtitle">参会角色：架构师、技术负责人、业务产品、技术产品负责人、技术产品</p>
<div class="meta">
<span>讨论版本：V1.1</span>
<span>日期：2026-09-09</span>
<span>范围：用户身份域、交易资金域、服务处置域、运营增长域、数据平台域</span>
</div>
</header>
<section>
<h2><span class="no">2.1</span>这次会需要确认什么</h2>
<p class="lead">同一手机号在不同项目线会产生多个 <span class="code">user_id</span>。这次需要确定：是清洗并合并现有账号，还是新增 OneID 统一关联；以及用户中心、业务线和数据平台分别怎么做。</p>
<div class="callout">
<strong>讨论前提：</strong>OneID 用于统一同一手机号下、跨项目线的注册账号。它不以 <span class="code">person_id</span> 做自然人合并，也不处理游客 <span class="code">open_id</span>。
</div>
<div class="callout good">
<strong>如果采用新增 OneID 的路线：</strong>所有 C 端用户业务都要能按 <span class="code">one_id</span> 聚合。客户主表和高频用户查询表直接补字段；订单、还款、案件等子表可按查询需要冗余落字段或通过父表关系解析。账号鉴权、订单原始归属、应用渠道和游客身份仍保留 <span class="code">user_id</span> / <span class="code">open_id</span>。
</div>
<div class="callout warn">
<strong>重要前提：</strong>标签工厂尚未建设。OneID 不是对现有标签工厂的改造项，而是标签工厂建设前必须完成的统一用户数据底座；历史标签项目代码仅作设计参考，不代表现网能力或本期影响范围。
</div>
</section>
<section>
<h2><span class="no">2.2</span>当前生产事实</h2>
<div class="summary-grid">
<div class="fact"><div class="num">约 1,625 万</div><div class="label">用户中心 <span class="code">qnvip_user.user</span> 表元数据行数</div></div>
<div class="fact"><div class="num">0</div><div class="label">已查 <span class="code">qnvip%</span> 生产 schema 中的 <span class="code">one_id</span> 字段</div></div>
<div class="fact"><div class="num">32 张</div><div class="label">订单库 <span class="code">qnvip_order</span> 中持久化 <span class="code">user_id</span> 的表</div></div>
</div>
<table style="margin-top:16px">
<thead><tr><th>领域</th><th>生产表中落 user_id 的数量</th><th>典型业务事实</th></tr></thead>
<tbody>
<tr><td>订单与交易</td><td>32</td><td>订单、账单、支付、退款、合同、风控、订单快照</td></tr>
<tr><td>营销</td><td>10</td><td>优惠券、活动、营销用户记录</td></tr>
<tr><td>商户中心</td><td>3</td><td>商户转单、转单日志、授信记录</td></tr>
<tr><td>商贸/履约</td><td>5</td><td>履约单、导出、用户角色、会话</td></tr>
<tr><td>客服</td><td>2</td><td>通话记录、坐席关联</td></tr>
<tr><td>S3 业务</td><td>7</td><td>客户、订单、通话等</td></tr>
</tbody>
</table>
<p class="source">说明：以上来自生产库元数据只读核验，不包含手机号、身份证、订单等明细查询。</p>
<div class="callout warn"><strong>补充事实：</strong>用户中心 <span class="code">user</span> 表存在 <span class="code">(mobile, biz_type, unregister_time)</span> 唯一索引，当前按项目线拆分账号是库级事实；<span class="code">user_history</span> 已有“账号合并”历史类型，方案一必须先专项核验既有实现和存量量级。</div>
</section>
<section>
<h2><span class="no">2.3</span>现在卡在哪里</h2>
<div class="flow">
<div class="node user"><h3>项目线账号</h3><p>手机号 A 在租赁、赊销、零售分别注册，产生多个 <span class="code">user_id</span>。</p></div>
<div class="arrow">→</div>
<div class="node one"><h3>当前缺口</h3><p>没有统一映射层，用户在运营、标签、订单聚合中可能被视为多个对象。</p></div>
<div class="arrow">→</div>
<div class="node data"><h3>业务结果</h3><p>订单与行为拆散，标签重复计算，人群重复圈选，跨业务复购和频次控制失真。</p></div>
</div>
<ul>
<li>同一手机号跨项目线的订单、访问、客服与营销事实无法稳定聚合。</li>
<li>如果没有 OneID，后续标签工厂只能按分散的 <span class="code">user_id</span> 建立 USER 主体，同一用户会在标签、人群与频控中被重复计算。</li>
<li>订单、支付、履约等仍必须保留账号级 <span class="code">user_id</span>，不能为了统一运营视角直接改写历史主键。</li>
<li>订单埋点当前直接以 <span class="code">user_id</span> 作为神策 <span class="code">distinctId</span> 和 Kafka 消息 key；仅改业务表不能解决行为与分析用户分裂。</li>
</ul>
</section>
<section>
<h2><span class="no">2.4</span>影响范围：不只是业务表</h2>
<table>
<thead><tr><th>影响域</th><th>当前事实</th><th>若选择新增 OneID 映射后的承接方式</th><th>边界</th></tr></thead>
<tbody>
<tr><td>用户中心与账号</td><td>注册、游客绑定、Token、注销、换绑均以 user_id 为账号单位</td><td>新增 one_id 映射、登录/查询响应可附带 one_id</td><td>Token subject、游客绑定和账号鉴权不替换 user_id</td></tr>
<tr><td>订单、支付、账单、合同、售后、风控</td><td>订单库至少 32 张 C 端事实表持久化 user_id，含事件、风控、快照、交易流水</td><td>逐表新增 one_id 并双写；历史按映射回填</td><td>原订单 user_id 永久保留，用于原始账号和业务线追溯</td></tr>
<tr><td>商户、履约、S3、贷后、客服</td><td>转单、履约单、客户、通话、工单等以 user_id 建立业务关联</td><td>C 端用户事实表新增 one_id；用户级查询逐步切换</td><td>员工、商户后台、坐席、操作人 user_id 不改</td></tr>
<tr><td>老租赁</td><td>rent_customer 直接关联用户中心 user_id/person_id；rent_order 及还款、代扣、售后等多通过 customer_id 关联客户</td><td>rent_customer 必须直接落 one_id；订单、还款等按是否需要高频用户查询决定冗余写入或通过 customer_id 关联聚合</td><td>mini_user_id 属游客身份；租赁后台用户、商户 OAuth 账号、客服人员 ID 排除；原老租赁服务仓尚待补齐</td></tr>
<tr><td>老赊销 / 分期</td><td>主系统为 qnvip-stage-api。sh_customer 直接关联 user_id/person_id；sh_order、还款、代扣、售后、机器人外呼多通过 customer_id 关联</td><td>sh_customer 必须直接落 one_id；订单、还款、风险、外呼、营销记录按 customer_id 关系补齐或在数仓聚合</td><td>sh_call_record.user_id 是后台用户，不纳入；约 50 张 customer_id 关联表需由分期团队盘点</td></tr>
<tr><td>共享金融平台</td><td>覆盖租赁、分期和大平台；fin_biz_order_user.user_id 为用户中心 ID，订单和还款计划多使用内部 fin_order_user_id 关联</td><td>fin_biz_order_user 必须直接落 one_id；订单和回款运营高频场景再评估冗余落 one_id</td><td>fin_account 等表可能包含个人、企业、资方等多种主体，需按组织类型排除</td></tr>
<tr><td>催收</td><td>贷后客户表及客户修改记录直接保存用户中心 user_id；借据、逾期订单池、案件分配、案件备注通常通过 customer_id/member_id 关联</td><td>客户主表先落 one_id；催收案件、借据、备注、逾期订单按客户关系补齐或在数仓按 one_id 聚合</td><td>催收员 oauth2_user_id、collector_id、operator_id 是内部人员，绝对排除</td></tr>
<tr><td>法诉</td><td>法诉客户表直接保存用户中心 user_id/person_id；案件、诉讼借据、分案、备注通过 customer_id 关联</td><td>法诉客户主表新增 one_id；案件与借据按客户关系补齐，支持跨项目线案件视图</td><td>法诉库 schema 名为 qnvip_litiagtion；法务/催收操作人账号不纳入</td></tr>
<tr><td>客服与服务中心</td><td>外呼通话记录、工单、用户反馈存在直接 user_id；挽单、备注等部分通过 customer_id 关联</td><td>通话、工单、反馈等直接字段优先双写；customer_id 记录确认来源后映射补齐</td><td>坐席、申请人、审批人、导出操作人 user_id 排除；Dify 等第三方 userId 需先核验语义</td></tr>
<tr><td>营销、触达</td><td>优惠券、活动、短信、外呼等以 user_id 或 open_id 承载</td><td>one_id 做人群、频控、归因主体；user_id/open_id 做具体渠道和权益执行定位</td><td>游客券和应用触达不能直接由 one_id 替代</td></tr>
<tr><td>埋点、Kafka、神策、AB 实验</td><td>订单风险与状态事件以 user_id 做 distinctId 和 Kafka key；部分 AB 实验按登录 user_id 分桶</td><td>事件 schema 双写 one_id + user_id；统一分析主体与分桶规则分阶段迁移</td><td>不可直接改历史 distinctId；游客 miniUserId 继续按游客口径</td></tr>
<tr><td>导流、游客、订阅</td><td>大量 mini_user_id/open_id/union_id 记录游客点击、归因、订阅与应用事件</td><td>注册后可按需补 one_id 做用户级归因</td><td>本期不以游客 ID 生成或归并 OneID</td></tr>
<tr><td>数仓、ES、未来标签工厂</td><td>标签工厂尚未建设；实际离线数仓/埋点平台也未在当前仓库完整覆盖</td><td>数仓 USER 域按 one_id 聚合；未来标签、人群、导出以 one_id 去重</td><td>须由数仓/数据平台补齐 ODS、DWD、DWS、ES、调度与血缘清单</td></tr>
</tbody>
</table>
<div class="callout warn"><strong>排除原则：</strong>不是所有名为 <span class="code">user_id</span> 的字段都属于 C 端注册用户。例如坐席、后台操作人、商户员工、OA/ERP 用户、下载申请人等必须逐表按字段语义排除。</div>
<div class="callout"><strong>客户关系型表的处理原则：</strong>老租赁、老赊销、催收、法诉的很多订单/案件/还款记录不直接存 <span class="code">user_id</span>，而是存 <span class="code">customer_id</span> 或 <span class="code">member_id</span>。这类表不能跳过，应先在客户主表建立 <span class="code">customer_id → user_id → one_id</span> 的可追溯映射，再回填或在数仓聚合。</div>
<div class="callout warn"><strong>贷后特殊边界：</strong><span class="code">tbl_member</span> 按身份证去重，更接近自然人层；OneID 不按身份证归并。OneID 应落在带项目线和用户中心 user_id 的 <span class="code">tbl_customer</span>，借据、还款、催收案件等先经源客户关系解析后再补 OneID，不能直接依据 member_id 写入。</div>
</section>
<section>
<h2><span class="no">2.5</span>方案一：清洗并合并存量 user_id</h2>
<div class="option bad">
<h3>方案描述</h3>
<p>选定一个存量 <span class="code">user_id</span> 作为保留账号，将同手机号、跨项目线的其他 <span class="code">user_id</span> 改写、合并或失效；下游表和接口统一改为保留账号。</p>
<div class="callout warn"><strong>必须先澄清的设计分叉：</strong>方案一有两种实现，不能混为一谈：<br>1）选一个既有 <span class="code">user_id</span> 作为统一 ID，此时不生成独立 OneID；<br>2）在存量清洗批次为每组账号生成新的 <span class="code">one_id</span>，并将下游原 <span class="code">user_id</span> 关联键整体改写为 OneID。第二种会生成 OneID，但本质仍是“替换下游关联键”的主键迁移。</div>
<h3 style="margin-top:16px">影响面</h3>
<ul>
<li><strong>用户中心：</strong>手机号、注销、换绑、游客绑定、Token、实名关联、账号历史均需重新定义。</li>
<li><strong>交易事实：</strong>订单、账单、支付、退款、合同、风控、履约等历史记录需批量改写或建立复杂兼容。</li>
<li><strong>下游系统：</strong>商户、客服、商贸、营销、S3、贷后等所有按 <span class="code">user_id</span> 查询、落表、传消息的链路都需同步迁移。</li>
<li><strong>数据与审计：</strong>历史订单原始账号归属被改变，注销、换绑、重注册、投诉和对账解释难度显著增加。</li>
<li><strong>接口兼容：</strong>历史调用方缓存的 <span class="code">user_id</span> 可能失效，需长期维护兼容层。</li>
</ul>
<div class="callout warn"><strong>结论：</strong>这是主键迁移，不是身份归并。改造范围横跨存量交易事实，回滚和审计成本高，不建议作为 OneID 建设路径。</div>
</div>
<h3 style="margin-top:20px">方案一执行流程</h3>
<div class="flow">
<div class="node user"><h3>选择或生成统一 ID</h3><p>按当前手机号找出跨项目线有效 user_id；选择保留 user_id，或在清洗批次生成新的 one_id。</p></div>
<div class="arrow">→</div>
<div class="node one"><h3>账号模型重构</h3><p>新项目线登录不能直接复用保留账号：现有 user 记录仅有一个 biz_type，需新增项目线账号关系或重构账号模型。</p></div>
<div class="arrow">→</div>
<div class="node data"><h3>全链路重写</h3><p>批量更新业务表、接口、MQ、缓存、ES、埋点 distinctId 与数仓历史数据，统一只认保留 user_id 或新 one_id。</p></div>
</div>
<h3 style="margin-top:20px">方案一存量清洗流程</h3>
<div class="flow">
<div class="node user"><h3>基线与分组</h3><p>冻结基线 T0；仅按当前手机号聚合跨项目线有效账号。历史手机号只用于审计，不参与归并。</p></div>
<div class="arrow">→</div>
<div class="node one"><h3>生成统一 ID 与对照</h3><p>形成“旧 user_id → 保留 user_id / 新 one_id”不可变映射账本；异常账号进入人工清单；先让读取链路支持别名解析。</p></div>
<div class="arrow">→</div>
<div class="node data"><h3>分批改写与补偿</h3><p>分库回写业务表、ES、数仓并升级消息/缓存/埋点；已被外部消费的数据只能兼容补偿，不能纯数据库回滚。</p></div>
</div>
<table style="margin-top:16px">
<thead><tr><th>方案一必须先定的清洗规则</th><th>原因</th></tr></thead>
<tbody>
<tr><td>保留 user_id 的选择规则</td><td>最早创建、最新活跃、特定项目线或其他规则会改变订单、登录与注销的历史解释。</td></tr>
<tr><td>已注销账号是否迁移到保留账号</td><td>会影响注销历史、订单审计、手机号重新注册和历史报表。</td></tr>
<tr><td>手机号换绑、号码回收、同项目线重复账号如何排除</td><td>不能用 user_history 的历史手机号自动合并，否则可能把不同用户合为一个账号。</td></tr>
<tr><td>外部已消费数据如何兼容</td><td>Kafka、神策、缓存、导出、外部渠道已使用旧 user_id，无法靠回写数据库完成修复。</td></tr>
</tbody>
</table>
<h3 style="margin-top:20px">方案一优点与代价</h3>
<table>
<thead><tr><th>维度</th><th>优点</th><th>代价与风险</th></tr></thead>
<tbody>
<tr><td>最终查询口径</td><td>理论上所有下游只需认一个统一 ID，查询模型直观。</td><td>必须同步重构项目线账号模型；现有 <span class="code">user.biz_type</span> 无法表达一个账号同时承担多个项目线。</td></tr>
<tr><td>数据模型</td><td>下游最终字段数量可能较少。</td><td>用户中心、订单、支付、履约、客服、营销、消息、缓存、埋点、数仓历史事实均需改写。</td></tr>
<tr><td>历史与回滚</td><td>迁移完成后表面上不需要映射 Join。</td><td>仍必须永久保留 old user_id 对照账本；外部已消费消息、报表、导出与缓存无法纯数据库回滚。</td></tr>
</tbody>
</table>
<div class="callout warn"><strong>关键风险：</strong>历史 Kafka 消息、缓存键、神策 distinctId、已导出名单与外部渠道无法靠数据库回写一并修正；需要长期兼容与重算。</div>
</section>
<section>
<h2><span class="no">2.6</span>方案二：新增 OneID 统一身份层</h2>
<div class="option good">
<h3>方案描述</h3>
<p>保留每个项目线账号的 <span class="code">user_id</span>，由用户中心统一维护 <span class="code">one_id ↔ user_id</span> 映射。相同手机号下的有效跨项目线账号归属同一个 OneID。</p>
<div class="flow">
<div class="node user"><h3>账号事实保持不变</h3><p>订单、支付、履约、客服仍按 <span class="code">user_id</span> 精确定位。</p></div>
<div class="arrow">→</div>
<div class="node one"><h3>用户中心统一映射</h3><p><span class="code">one_id</span> 是唯一来源，负责创建、归并、注销、换绑与历史关系。</p></div>
<div class="arrow">→</div>
<div class="node data"><h3>运营聚合消费</h3><p>数仓、营销及未来标签工厂按 <span class="code">one_id</span> 聚合多个账号事实。</p></div>
</div>
<h3>核心规则</h3>
<ul>
<li>相同手机号、不同项目线、账号有效：多个 <span class="code">user_id</span> 归属同一个 OneID。</li>
<li>不同手机号：不因 <span class="code">person_id</span> 相同而合并 OneID。</li>
<li>单个账号注销：仅关闭该 <span class="code">user_id</span>；映射历史保留。</li>
<li>全部账号注销后重新注册：新账号按新规则获得新的 OneID，不自动恢复旧关系。</li>
<li>换绑手机号：当前账号保留 OneID；旧手机号被新用户使用时，不继承原 OneID。</li>
</ul>
</div>
<div class="recommend">
<h3>候选方案的预期效果</h3>
<p>用户中心成为 OneID 唯一身份源；所有 C 端用户相关业务表可按节奏新增并落 one_id，原 user_id 保留为账号和交易事实键。是否采用该路线，待本次方案会确认。</p>
</div>
<h3 style="margin-top:20px">方案二实时生成与绑定流程</h3>
<div class="flow">
<div class="node user"><h3>手机号注册</h3><p>游客静默登录仅使用 open_id；用户授权手机号后进入注册逻辑。</p></div>
<div class="arrow">→</div>
<div class="node one"><h3>用户中心查询并绑定</h3><p>先查当前项目线有效 user_id：存在则复用其 one_id；不存在则创建 user_id 后，按手机号查其他项目线有效账号。</p></div>
<div class="arrow">→</div>
<div class="node data"><h3>复用或生成 OneID</h3><p>查到同手机号有效账号的 one_id 则绑定；均不存在则生成新 one_id，并建立首个映射。</p></div>
</div>
<p><strong>技术约束：</strong>同手机号跨项目线并发注册必须由用户中心事务/唯一约束控制；业务线只能读取和落库 one_id，不得自行按手机号计算。</p>
<h3 style="margin-top:20px">方案二存量回填与增量衔接流程</h3>
<div class="flow">
<div class="node user"><h3>确定基线 T0</h3><p>提取 user 当前状态、当前手机号摘要、项目线与创建时间；已注销账号与异常账号单独分类。</p></div>
<div class="arrow">→</div>
<div class="node one"><h3>生成映射基线</h3><p>同一当前手机号下的有效 user_id 绑定一个 one_id；只有一个有效账号也生成 one_id；映射记录生效时间与版本。</p></div>
<div class="arrow">→</div>
<div class="node data"><h3>补增量并分批下发</h3><p>补 T0 后的注册、注销、换绑变化；发布全量快照和可重放增量，再由下游双写、回填、校验、切换。</p></div>
</div>
<table style="margin-top:16px">
<thead><tr><th>历史数据类别</th><th>方案二建议处理</th></tr></thead>
<tbody>
<tr><td>同手机号、跨项目线、均有效</td><td>绑定同一个 OneID。</td></tr>
<tr><td>同手机号、仅一个有效账号</td><td>生成一个 OneID，保证每个有效 user_id 均有唯一映射。</td></tr>
<tr><td>已注销账号</td><td>不参与当前有效账号归并；保留其 user_id 与历史 OneID 关系用于追溯。</td></tr>
<tr><td>全部注销后重新注册</td><td>默认新建 OneID，不自动恢复旧映射；正式账号恢复流程另行定义。</td></tr>
<tr><td>空手机号、摘要缺失、同项目线多有效账号</td><td>进入异常清单，不自动归并。</td></tr>
<tr><td>user_history 中的旧手机号</td><td>仅用于审计、换绑核验和异常排查，不参与自动归并。</td></tr>
</tbody>
</table>
<h3 style="margin-top:20px">方案二优点与代价</h3>
<table>
<thead><tr><th>维度</th><th>优点</th><th>代价与风险</th></tr></thead>
<tbody>
<tr><td>账号与历史事实</td><td>保留原 user_id、订单归属、项目线、Token、游客与应用渠道语义。</td><td>长期存在 user_id 与 one_id 双键，需要清晰的数据模型、映射版本与查询规范。</td></tr>
<tr><td>迁移方式</td><td>可按业务线新增字段、双写、回填、校验、切读；可逐系统灰度。</td><td>各系统都要完成影响盘点，不能只改数据库表；消息、ES、埋点、缓存、导出也需纳入。</td></tr>
<tr><td>回滚能力</td><td>可关闭下游 OneID 读写开关并回到原 user_id 口径，不改写原交易主键。</td><td>映射错误需具备重新绑定、事件重放和下游定向重算能力。</td></tr>
</tbody>
</table>
<div class="callout good"><strong>方案二回滚原则：</strong>优先关闭 OneID 的下游读写开关，回退到原 user_id 口径；不删除已生成 OneID、映射和回填字段。通过映射版本、事件序号和回填批次定向重算或重新绑定。</div>
</section>
<section>
<h2><span class="no">2.7</span>方案二的分层影响与改造节奏</h2>
<table>
<thead><tr><th>层级</th><th>一期是否改造</th><th>需要做什么</th><th>不做什么</th></tr></thead>
<tbody>
<tr><td>用户中心</td><td>是</td><td>OneID 生成与映射、实时维护、历史回填、查询能力、变更记录</td><td>不改变现有 user_id 主键</td></tr>
<tr><td>订单/支付/履约/客服/商户</td><td>按业务线分批</td><td>客户主表和高频用户查询表直接双写；子表按关系回填或冗余落 one_id；用户级查询逐步按 one_id</td><td>不删除 user_id、不改历史订单原始归属</td></tr>
<tr><td>数仓 USER 域</td><td>方案必须明确，实施可二期</td><td>接入映射全量与增量，按 OneID 聚合多 user_id 的订单、行为、客服、风控事实</td><td>不让标签服务实时回查用户中心</td></tr>
<tr><td>标签工厂</td><td>OneID 完成后启动建设</td><td>从设计起以 OneID 作为 USER 主体、标签 ES、人群位图、CSV、导出和查询主键，保留 user_id_list 追溯</td><td>不把 OneID 当普通标签字段，不先按 user_id 建成后再迁移</td></tr>
<tr><td>营销/触达</td><td>分批接入</td><td>权益、触达、频控、归因逐步落 one_id；活动启动时冻结人群快照</td><td>应用订阅、游客券和发送渠道仍保留 user_id/open_id/appType</td></tr>
<tr><td>埋点/消息/实验</td><td>独立专项</td><td>Kafka、RocketMQ、神策、AB 实验事件契约新增 one_id；完成消费者兼容与历史口径迁移</td><td>不直接切换历史 distinctId，不把游客 miniUserId 替换为 one_id</td></tr>
</tbody>
</table>
<div class="callout warn"><strong>关键原则：</strong>业务线可以消费和按计划存储 OneID，但不得自行计算 OneID。所有新增/变更数据均应双写 <span class="code">user_id + one_id</span>，完成校验后再切换用户级查询与统计口径。</div>
</section>
<section>
<h2><span class="no">2.8</span>数仓与未来标签工厂必须以前置方式纳入方案</h2>
<p>OneID 是未来标签工厂的前置数据底座。用户中心一期方案需同步明确数仓 USER 域的承接方式，标签工厂在 OneID 映射与数仓聚合稳定后再启动建设：</p>
<div class="flow">
<div class="node one"><h3>用户中心映射</h3><p>全量基线 + 可重放增量：OneID、user_id、项目线、账号状态、生效时间。</p></div>
<div class="arrow">→</div>
<div class="node data"><h3>数仓 USER 域宽表</h3><p>保留明细 user_id，在 USER 域按 OneID 汇总订单、行为、服务与风控事实。</p></div>
<div class="arrow">→</div>
<div class="node user"><h3>未来标签与人群</h3><p>标签、人群、导出、触达以 OneID 去重；保留 user_id_list 供订单追溯。</p></div>
</div>
<p><strong>需要架构和数仓确认：</strong>映射事件、增量同步方式、回放机制、USER 域宽表模型，以及为未来标签工厂准备的 OneID 数据契约、活动快照和归因边界。</p>
</section>
<section>
<h2><span class="no">2.9</span>如果选择方案二，建议这样推进</h2>
<div class="phase-grid">
<div class="phase"><h3>阶段 0：方案定界</h3><p>确认 OneID 规则、项目线范围、注销/换绑/重注册口径、异常数据处理原则；完成 C 端字段语义清单。</p></div>
<div class="phase"><h3>阶段 1：用户中心底座</h3><p>建映射、实时维护、存量回填、数据校验、映射全量与增量契约。所有历史 user_id 保留。</p></div>
<div class="phase"><h3>阶段 2：业务线与数据平台承接</h3><p>业务表双写与回填；数仓 USER 域聚合、埋点/消息 schema 升级、营销人群去重；OneID 稳定后启动标签工厂建设。</p></div>
</div>
<table style="margin-top:16px">
<thead><tr><th>每个业务线需领取的执行任务</th><th>完成标准</th></tr></thead>
<tbody>
<tr><td>识别 C 端用户事实表、接口、MQ、缓存、ES、导出、埋点字段</td><td>形成“应新增 / 保留 / 排除”清单，由业务与技术共同签字确认</td></tr>
<tr><td>识别 customer_id / member_id 等间接用户关系</td><td>形成“客户主表 → 订单/还款/案件/工单”的关联路径，明确先补客户表还是在数仓聚合</td></tr>
<tr><td>在客户主表和高频用户查询表新增 one_id，并完成写入链路双写</td><td>新产生客户主数据同时有 user_id 和 one_id；子表明确冗余写入或关系解析方式；one_id 来源只允许用户中心</td></tr>
<tr><td>历史数据回填与校验</td><td>回填批次可重跑；缺失、冲突、无映射记录形成异常清单；不改写 user_id</td></tr>
<tr><td>用户级查询、统计、频控、归因切换</td><td>跨项目线用户聚合改用 one_id；账号/订单明细仍可按 user_id 追溯</td></tr>
<tr><td>事件、消息与埋点兼容</td><td>payload/属性同时带 user_id + one_id；消费者完成兼容验证；历史报表口径有迁移说明</td></tr>
</tbody>
</table>
<div class="callout good"><strong>建议验收：</strong>同一手机号跨项目线的有效 user_id 查询到同一个 OneID；单账号注销不影响其他账号；全部注销后重注册不继承旧 OneID；业务表双写完整；数仓和营销频控按 OneID 不重复统计。标签工厂启动条件：OneID 映射、数仓 USER 域与数据校验均已稳定。</div>
</section>
<section>
<h2><span class="no">2.10</span>会上需要确定的事项</h2>
<ol class="decision-list">
<li><div><strong>存量数据刷取方案：</strong>明确存量数据的刷取范围、处理规则和校验方式。</div></li>
<li><div><strong>上线后的兼容方案：</strong>明确上线后的双写、兼容和回退方案。</div></li>
<li><div><strong>用户资产打通：</strong>明确订单、优惠券、活动、还款、客服等用户资产如何按 OneID 聚合。</div></li>
<li><div><strong>两套方案对业务线的影响：</strong>明确不同方案对各业务线的改造范围和投入。</div></li>
<li><div><strong>数仓承接方案：</strong>明确数仓如何接入 OneID，并统一后续用户数据口径。</div></li>
<li><div><strong>注销、重登与换绑：</strong>明确用户注销、重新登录和手机号换绑后的 OneID 处理规则。</div></li>
<li><div><strong>数据平台与埋点影响：</strong>明确 OneID 对埋点、用户分析和数据回流的影响。</div></li>
<li><div><strong>架构与落地方案：</strong>明确 OneID 的架构设计和可执行的实施计划。</div></li>
</ol>
</section>
<section>
<h2><span class="no">2.11</span>会议结论模板</h2>
<p class="lead"><strong>本报告不预设最终方案。</strong>方案一是“清洗并统一现有账号”，方案二是“新增 OneID 映射，再分批接入”。会上需根据账号模型、迁移能力、消息与埋点兼容、回滚成本确定方案，并明确后续负责人和时间安排。</p>
<p class="source">事实来源：用户中心、订单、商户、商贸、客服、营销、S3、租赁、赊销、导流与埋点相关生产库元数据只读核验；用户中心、订单、营销等静态代码核验。表行数为 information_schema 近似值。标签工厂尚未建设；历史标签项目仅作设计参考。离线数仓、ES、MQ 消费组、神策项目及小程序前端埋点未被当前仓库完整覆盖，需由数仓/数据平台补充核验。</p>
</section>
</main>
</div>

<div class="block-divider"></div>

## 三、标签体系规划

### 3.1 标签体系架构总览

标签体系按打标对象划分为五个域。每个域内部再区分“基础字段”和“标签”。

|域|打标对象|典型用途|
|---|---|---|
|USER|OneID 统一后的用户账号|用户分层、首单转化、复购、品类推荐、触达策略|
|PERSON|自然人身份|实名、二要素、身份证 OCR、人脸认证、基础画像|
|ORDER|单笔订单或用户订单事实|长租、短租、赊销、零售订单状态、履约、还款、逾期|
|PRODUCT|商品 SPU/SKU|类目、品牌、成色、销售模式、推荐偏好|
|MERCHANT|商户|商户供给能力、履约表现、售后表现|

字段和标签的边界：

|类型|定义|示例|是否作为标签资产管理|
|---|---|---|---|
|基础字段|业务系统、数仓或埋点中客观存在的明细字段，是标签计算和圈选规则的输入|oneid、订单ID、订单状态、商品SPU ID、渠道值、搜索词、账单日、售后状态|否|
|原子级标签|最小可复用、可圈选、口径稳定的事实型标签，尽量不带运营判断|是否注册、是否实名、最近访问时间、最近订单业务类型、当前是否逾期、最近浏览商品类目|是|
|非原子级标签|基于基础字段和原子标签加工得到的统计、偏好、分层或意向标签|生命周期阶段、复购意向、品类偏好、业务模式偏好、租后方案选择阶段|是|

![标签体系五域架构](/assets/library/notes/tag-system/images/architecture.png)

### 3.2 USER 域

USER 域面向 OneID 统一后的用户账号，是用户运营圈选的主域。行为、渠道、交易聚合、偏好、生命周期等最终都应沉淀到 USER 域下。

#### 3.2.1 基础字段

|字段组|基础字段举例|主要用途|
|---|---|---|
|用户标识|用户ID（OneID）、手机号等|用户识别、跨业务归因；不直接作为标签暴露|
|注册与授权|注册时间、是否注册、授权手机号、授权姓名证件号等|首单转化、认证漏斗|
|地域画像|收货地址、省、市、学历、婚姻状况、工作经历、芝麻守约记录等|基础分层、区域运营、风险辅助|
|访问来源|首次/最近访问应用、小程序场景值、导流商ID/名称、渠道值/名称等|来源归因、渠道运营|
|设备信息|设备型号、操作系统、APP版本、设备ID等|设备识别、风险辅助、体验适配|
|行为事件|页面浏览、搜索词、商品点击、详情页访问、SKU选择、提交订单、去支付、领券、客服点击、认证回调、租后弹窗点击等|行为标签、意向识别、转化漏斗|

#### 3.2.2 原子级标签

| 标签 | 值域 · 数据类型 · 频率 | 业务含义 |
|---|---|---|
| **是否注册用户**<br>`is_registered_user` | 是 / 否 · 布尔 · T+1 | 区分游客、已注册用户，用于首单转化、注册后未下单召回 |
| **注册时间**<br>`register_time` | YYYY-MM-DD HH:MM:SS · 日期时间 · 一次性 | 判断新客阶段，支持注册后7天、30天内的新客运营 |
| **首次访问时间**<br>`first_visit_time` | YYYY-MM-DD HH:MM:SS · 日期时间 · 一次性 | 识别用户首次进入平台的时间，用于新客来源和首次触达分析 |
| **最近访问时间**<br>`last_visit_time` | YYYY-MM-DD HH:MM:SS · 日期时间 · T+1 | 判断用户近期是否活跃，是复购、召回、品类推荐的基础条件 |
| **首次访问应用**<br>`first_visit_app` | 支付宝-优品租 / 支付宝-租手机青年优品 / 支付宝-青友租 / 微信-优品租 / 字节-优品租 / 支付宝-优品商城 / 支付宝-优品分期 / 微信-优品商城 / 未知 · 枚举 · 一次性 | 首次访问应用，按 APPID 映射为中文应用名称；用于识别用户第一次进入的是哪个具体应用主体，不等同于场景值、导流商或渠道值 |
| **最近访问应用**<br>`last_visit_app` | 同 first_visit_app · 枚举 · T+1 | 最近一次访问应用，按 APPID 映射为中文应用名称；用于判断用户近期主要活跃在哪个应用主体，后续触达承接仍需结合场景值和渠道来源 |
| **用户省份**<br>`user_province` | 省级行政区 / 未知 · 枚举 · T+1 | 用于区域运营、履约覆盖判断和地域人群分层 |
| **用户城市**<br>`user_city` | 城市 / 未知 · 枚举 · T+1 | 用于城市维度的人群圈选、履约能力判断和区域投放分析 |
| **用户城市等级**<br>`user_city_tier` | 一线 / 新一线 / 二线 / 三线 / 四线及以下 / 未知 · 枚举 · 月 | 用于城市层级分层，辅助判断消费能力和品类推荐策略 |
| **是否授权手机号**<br>`is_authorized_phone` | 是 / 否 · 布尔 · T+1 | 判断用户是否具备基础触达和下单承接条件 |
| **首次导流商渠道值**<br>`first_quotient_scene` | 导流商渠道值 / 空 · 文本 · 一次性 | 记录用户首次通过导流商进入时的细分渠道值，用于首单来源归因和渠道拉新效果分析 |
| **最近导流商渠道值**<br>`last_quotient_scene` | 导流商渠道值 / 空 · 文本 · T+1 | 记录导流商下的细分渠道值，用于导流商渠道效果拆解 |
| **首次支付宝小程序场景值**<br>`first_alipay_mini_scene` | 支付宝小程序场景值 / 空 · 文本 · 一次性 | 记录用户首次支付宝小程序会话来源，用于新客入口分析和首单转化归因 |
| **最近支付宝小程序场景值**<br>`last_alipay_mini_scene` | 支付宝小程序场景值 / 空 · 文本 · T+1 | 记录用户最近一次支付宝小程序会话来源，用于会话入口分析 |
| **最近搜索词**<br>`last_search_keyword` | 搜索词 / 空 · 文本 · T+1 | 识别用户最近明确表达的商品或品类需求，用于推荐和召回 |
| **最近浏览商品SPU**<br>`last_browse_spu_id` | SPU ID / 空 · 文本 · T+1 | 识别用户最近关注的具体商品，用于继续转化和同品推荐 |
| **最近下单商品SPU**<br>`last_order_spu_id` | SPU ID / 空 · 文本 · T+1 | 识别用户最近成交的具体商品，覆盖租赁/赊销/零售全业务类型，用于复购推荐和同品转化 |
| **最近浏览类目**<br>`last_browse_category` | 一级/二级/三级类目 / 空 · 枚举 · T+1 | 识别用户最近关注的品类方向，用于品类推荐和复购圈选 |
| **最近下单类目**<br>`last_order_category` | 一级/二级/三级类目 / 空 · 枚举 · T+1 | 识别用户最近成交的品类方向，区分租赁/赊销/零售业务偏好，用于复购圈选和品类推荐 |
| **租安盾等级**<br>`rent_an_shield_level` | T1-T9 · 枚举 · 实时 | 支付宝租赁行业信用评级 |
| **私域用户**<br>`is_private_domain_user` | 是 / 否 · 布尔 · T+1 | 用户是否添加企业微信，用于私域运营触达和复购承接 |
| **支付宝消息订阅状态**<br>`alipay_msg_subscribe_status` | 已订阅 / 未订阅 · 枚举 · T+1 | 用户是否订阅支付宝消息，用于消息触达渠道承接判断 |
| **微信消息订阅状态**<br>`wechat_msg_subscribe_status` | 已订阅 / 未订阅 · 枚举 · T+1 | 用户是否订阅微信消息，用于消息触达渠道承接判断 |

不作为标签直接暴露：

- oneid、用户ID、手机号：属于用户识别基础字段。

- 身份证号、收货地址明文：属于敏感基础字段，不应直接开放圈选。

- 导流商ID/名称、渠道值/名称：属于渠道基础字段；可沉淀为首次/最近来源类标签。

- 单个埋点事件名：属于行为基础字段；经过最近一次、近7天、近30天等窗口加工后，才成为行为类标签。

#### 3.2.3 非原子级标签

| 标签 | 值域 · 频率 | 计算口径 |
|---|---|---|
| **生命周期阶段**<br>`lifecycle_stage` | 未注册 / 已注册未下单 / 首单转化期 / 履约中 / 历史成交 / 沉默 / 流失 · T+1 | 结合注册、认证、订单、履约、活跃时间计算，用于判断用户当前运营阶段 |
| **交易阶段**<br>`transaction_stage` | 未下单 / 首单用户 / 复购用户 · T+1 | 有效订单数为0/1/2及以上，用于区分首单转化和复购运营人群 |
| **活跃等级**<br>`active_level` | 高活跃 / 中活跃 / 低活跃 / 沉默 · T+1 | 近7/30/90天访问和关键行为频次，用于判断用户近期活跃程度、触达顺序和召回强度 |
| **历史有效订单数**<br>`total_valid_order_count` | 数值 · T+1 | 用户历史有效订单总数，不含已关闭、取消、测试、刷单等无效订单 |
| **分业务类型有效订单数**<br>`valid_order_count_by_business_type` | 长租N / 短租N / 赊销N / 零售N · T+1 | 按业务类型统计历史有效订单数 |
| **历史成交业务类型集合**<br>`history_business_type_set` | 长租 / 短租 / 赊销 / 零售 多值 · T+1 | 历史成交覆盖的业务类型集合 |
| **是否跨业务类型复购**<br>`is_cross_business_type_repurchase` | 是 / 否 · T+1 | 历史有效订单中出现两种及以上业务类型 |
| **主要业务类型偏好**<br>`main_business_type_preference` | 长租偏好 / 短租偏好 / 赊销偏好 / 零售偏好 / 混合 / 无偏好 · 月 | 历史有效订单数最高的业务类型；样本不足时为无偏好 |
| **品类偏好**<br>`category_preference` | 手机 / 电脑整机 / 平板设备 / 摄影航拍 / 智能穿戴 / 游戏装备 / 混合 / 无偏好 · 周 | 近90天浏览、搜索、下单按类目加权；订单权重高于浏览 |
| **品牌偏好**<br>`brand_preference` | Apple / 华为 / 小米 / 三星 / 大疆 / 佳能 / 其他 / 混合 / 无偏好 · 周 | 近90天浏览、点击、下单按品牌加权 |
| **成色偏好**<br>`condition_preference` | 全新 / 准新 / 99新 / 95新 / 二手 / 混合 / 无偏好 · 周 | 近90天浏览、点击、下单按成色加权 |
| **租期偏好**<br>`lease_term_preference` | 1-7天 / 30天 / 60天 / 90天 / 180天 / 365天 / 365天以上 / 无偏好 · 周 | 浏览、方案选择、下单中出现频次最高的租期 |
| **近7天下单未支付**<br>`order_flow_not_paid_7d` | 是 / 否 · T+1 | 近7天进入下单链路，但无有效支付或成交订单 |
| **近7天是否进入下单链路**<br>`has_entered_order_flow_7d` | 是 / 否 · T+1 | 近7天有提交订单、去支付等下单链路行为；时间窗口可扩展为近30天等 |
| **近7天是否点击提交订单**<br>`has_submit_order_click_7d` | 是 / 否 · T+1 | 近7天有点击提交订单按钮行为，接近支付节点；可按需扩展时间窗口 |
| **近30天是否有优惠券行为**<br>`has_coupon_action_30d` | 是 / 否 · T+1 | 近30天有领券、用券等优惠券相关行为，用于价格敏感人群识别 |
| **近30天是否点击客服**<br>`has_customer_service_click_30d` | 是 / 否 · T+1 | 近30天有客服咨询、售后诉求等行为，用于服务承接和疑虑化解 |
| **近30天是否有租后行为**<br>`has_post_lease_action_30d` | 是 / 否 · T+1 | 近30天有买断、续租、还款、归还等租后运营行为，仅适用于租赁业务用户 |
| **领券未使用**<br>`coupon_received_not_used` | 是 / 否 · T+1 | 领取或点击优惠券后未在有效期内核销 |
| **复购意向等级**<br>`repurchase_intent_level` | 高 / 中 / 低 / 无法判断 · T+1 | 历史有成交，且近期有访问、浏览、搜索、下单链路行为，则提高意向等级，用于筛选更值得优先承接的复购人群 |
| **租赁转赊销历史**<br>`rental_to_credit_sale_history` | 是 / 否 · T+1 | 历史先租赁后赊销成交 |
| **赊销转租赁历史**<br>`credit_sale_to_rental_history` | 是 / 否 · T+1 | 历史先赊销后租赁成交 |
| **短租转长租历史**<br>`short_rent_to_long_rent_history` | 是 / 否 · T+1 | 历史先短租后长租成交 |
| **短租转赊销历史**<br>`short_rent_to_credit_sale_history` | 是 / 否 · T+1 | 历史先短租后赊销成交 |
| **服务敏感用户**<br>`service_sensitive_user` | 是 / 否 · T+1 | 多次客服、售后、投诉相关行为或售后频次高 |
| **注册时长分段**<br>`register_duration_range` | ≤1天 / 1-7天 / 7-14天 / 14-30天 / 30-60天 / 60-90天 / \>90天 · T+1 | 基于注册时间计算距今天数分段，用于新客运营和注册未下单召回 |
| **最近访问距今天数分段**<br>`last_visit_days_range` | ≤1天 / 1-7天 / 7-14天 / 14-30天 / 30-60天 / 60-90天 / \>90天 / 未访问 · T+1 | 基于最近访问时间计算距今天数分段，用于活跃分层和召回节奏 |
| **最近浏览商详距今天数分段**<br>`last_browse_detail_days_range` | ≤1天 / 1-7天 / 7-14天 / 14-30天 / 30-60天 / 60-90天 / 未浏览 · T+1 | 基于最近商品详情页浏览行为计算距今天数分段，用于意向识别和转化承接 |
| **首次访问是否租物场景**<br>`first_visit_is_rental_scene` | 是 / 否 · T+1 | 对首次支付宝小程序场景值做归类，判断是否来自租物公域场景 |
| **最近访问是否租物场景**<br>`last_visit_is_rental_scene` | 是 / 否 · T+1 | 对最近支付宝小程序场景值做归类，判断是否来自租物公域场景 |
| **首次访问是否CPS渠道**<br>`first_visit_is_cps_channel` | 是 / 否 · T+1 | 对首次导流商渠道值做归类，判断是否来自CPS渠道 |
| **最近访问是否CPS渠道**<br>`last_visit_is_cps_channel` | 是 / 否 · T+1 | 对最近导流商渠道值做归类，判断是否来自CPS渠道 |
| **首次访问是否商业化渠道**<br>`first_visit_is_commercial_channel` | 是 / 否 · T+1 | 对首次渠道来源做归类，判断是否来自商业化投放渠道 |
| **最近访问是否商业化渠道**<br>`last_visit_is_commercial_channel` | 是 / 否 · T+1 | 对最近渠道来源做归类，判断是否来自商业化投放渠道 |
| **剩余额度分段**<br>`remaining_credit_range` | =0 / 0-1000 / 1000-2000 / 2000-3000 / 3000-4000 / 4000-5000 / 5000-6000 / 6000-7000 / 7000-8000 / \>8000 / 无额度 · T+1 | 风控输出的剩余额度分段，仅赊销用户有值，用于赊销复购和额度运营 |
| **总额度分段**<br>`total_credit_range` | 无额度 / =0(申请被拒) / 0-1000 / 1000-2000 / 2000-3000 / 3000-4000 / 4000-5000 / 5000-6000 / 6000-7000 / 7000-8000 / \>8000 · T+1 | 风控输出的授信总额度分段，仅赊销用户有值，用于额度分层和运营策略 |
| **贷款阶段**<br>`loan_stage` | 贷前 / 贷中 / 贷后 / 不适用 · T+1 | 基于赊销订单还款状态计算：贷前=无还款中订单，贷中=有还款中订单，贷后=订单已结清无还款中，用于赊销用户运营分层 |

### 3.3 PERSON 域

PERSON 域面向自然人身份，承接实名、证件、人脸等身份事实，不存储敏感原文。

#### 3.3.1 基础字段

|字段组|基础字段举例|主要用途|
|---|---|---|
|身份标识|姓名、身份证号、身份证有效期|身份核验；敏感字段不直接开放圈选|
|二要素认证|姓名、证件号、认证状态、认证时间、认证结果|实名认证、首单准入|
|身份证 OCR|人像面上传状态、国徽面上传状态、OCR 识别结果、上传时间|认证漏斗、资料完整度|
|人脸认证|刷脸认证状态、认证时间、认证结果|身份核验、风控|
|基础画像|性别、年龄、学历、婚姻状况、工作经历|基础画像和人群分层|

#### 3.3.2 原子级标签

| 标签 | 值域 · 数据类型 · 频率 | 业务含义 |
|---|---|---|
| **实名认证状态**<br>`real_name_auth_status` | 未实名 / 已实名 · 枚举 · T+1 | 判断用户是否具备进入交易、审核、履约的基础身份条件，是首单转化和准入漏斗的关键节点 |
| **二要素认证状态**<br>`two_factor_auth_status` | 未认证 / 已认证 · 枚举 · T+1 | 判断姓名与证件号是否完成二要素核验；实名认证本质即二要素认证，用于认证未完成召回 |
| **身份证OCR状态**<br>`id_card_ocr_status` | 未上传 / 已上传 / 已通过 / 已失败 · 枚举 · T+1 | 判断身份证资料是否提交完整，用于识别卡在资料上传、识别失败、待补充的人群 |
| **身份证有效期状态**<br>`id_card_expiry_status` | 有效 / 即将过期 / 已过期 / 未知 · 枚举 · T+1 | 判断身份证是否在有效期内，用于识别证件过期需重新认证的人群 |
| **人脸认证状态**<br>`face_auth_status` | 未认证 / 已认证 / 失败 · 枚举 · T+1 | 判断用户是否完成刷脸核验，用于识别认证链路最后一步流失或失败用户 |
| **人脸认证有效期状态**<br>`face_auth_expiry_status` | 有效 / 即将过期 / 已过期 / 未知 · 枚举 · T+1 | 判断人脸认证是否在有效期内，用于识别需重新刷脸核验的人群 |
| **认证完成状态**<br>`auth_complete_status` | 未开始 / 部分完成 / 已完成 · 枚举 · T+1 | 汇总身份认证整体进度，用于区分未认证、半认证、可承接下单的人群 |
| **用户性别**<br>`user_gender` | 男 / 女 / 未知 · 枚举 · T+1 | 用于基础画像分析和部分品类偏好观察，不作为强运营判断条件 |
| **用户年龄段**<br>`user_age_range` | 18-24 / 25-30 / 31-35 / 36-40 / 40以上 / 未知 · 枚举 · T+1 | 用于年龄层分布、消费能力和品类偏好分析，辅助人群分层 |
| **芝麻守约记录状态**<br>`zm_contract_record_status` | 良好 / 有异常 / 未知 · 枚举 · T+1 | 判断用户历史守约表现是否存在异常，用于履约提醒、风险辅助和运营触达分层 |
| **芝麻信用分段**<br>`zm_credit_score_range` | \<550 / 550-600 / 600-650 / 650-700 / 700-750 / 750以上 / 未知 · 枚举 · T+1 | 通过授权匹配芝麻信用分段（原始分不可获取），用于差异化优惠和风险分层 |
| **最近风控等级**<br>`latest_risk_level` | 1\~4 / 14 / 141 / 15 / 16 / 未知 · 枚举 · T+1 | 最近一次风控输出的等级，值为风控内部编码，具体含义待风控确认（待确认） |
| **风控白名单状态**<br>`risk_whitelist_status` | 存在 / 不存在 · 枚举 · T+1 | 风控输出的租赁/赊销白名单状态，用于准入判断和运营承接（待确认） |
| **风控冷静期状态**<br>`risk_cooling_period_status` | 存在 / 不存在 · 枚举 · T+1 | 风控输出的租赁/赊销冷静期名单状态，用于营销触达排除（待确认） |
| **风控准入结果**<br>`risk_admission_result` | 通过 / 拒绝 / 未申请 · 枚举 · T+1 | 最近一次风控准入的结果，用于准入漏斗分析和拒绝召回（待确认） |

#### 3.3.3 非原子级标签

| 标签 | 值域 · 频率 | 计算口径 |
|---|---|---|
| **身份认证阶段**<br>`identity_auth_stage` | 未开始 / 二要素完成 / OCR完成 / 人脸完成 / 全部完成 · T+1 | 按认证链路关键节点汇总，识别用户停留在哪个认证节点，用于认证漏斗分析和定向召回 |
| **身份信息完整度**<br>`identity_info_completeness` | 高 / 中 / 低 · T+1 | 基于实名、OCR、人脸、手机号授权等完成情况计算，用于判断用户资料是否足以承接下单、审核和后续履约 |

暂不纳入或待确认：

- 芝麻信用原始分：如无法稳定获取原始分，只保留业务可用分段或守约记录。

- 用户综合信用等级：如果当前只在订单或风控环节存在，不提前定义为 PERSON 或 USER 标签。

### 3.4 ORDER 域

ORDER 域面向单笔订单或用户订单事实。订单ID、订单原始状态、账单、履约、售后等都是 ORDER 域的基础字段来源。

#### 3.4.1 基础字段

|字段组|基础字段举例|主要用途|
|---|---|---|
|订单标识|订单ID、订单编号、下单用户、下单时间|订单识别和明细追踪；不直接作为标签|
|业务类型|长租、短租、赊销、零售|交易偏好、复购方向、业务模式分析|
|订单状态|申请中、待审核、待支付、待发货、待签收、还款中、已逾期、归还中、已完结、已关闭|履约分层、运营触达、异常识别|
|特殊订单|换方案新单/老单、赊销转高定价新单/老单、赊销转租赁新单/老单|方案变更、业务模式迁移、复购路径识别|
|订单来源|下单渠道、流量类型、导流商ID/名称、渠道值/名称、支付宝公域场景值|来源归因、结算、投放分层|
|商品方案|SPU ID、SKU ID、商品规格、租期、分期期数、月付金额、买断/续租/归还规则|订单内容、方案偏好、租后运营|
|账单还款|期数、应还日期、应还金额、已还金额、剩余未还金额、逾期天数、滞纳金、违约金|还款提醒、逾期分层、履约运营|
|履约子订单|续租、买断、归还、履约单号、签收、物流、质检报告|租后行为、履约结果、复购路径|
|售后|售后单号、售后类型、售后状态、申请时间、归还售后单|售后体验、异常识别、服务运营|

#### 3.4.2 原子级标签

| 标签 | 值域 · 数据类型 · 频率 | 业务含义 |
|---|---|---|
| **是否有历史订单**<br>`has_history_order` | 是 / 否 · 布尔 · T+1 | 区分从未成交用户与历史成交用户，是首单转化和复购运营的基础边界 |
| **是否有已支付订单**<br>`has_paid_order` | 是 / 否 · 布尔 · T+1 | 判断用户是否真正进入过支付或成交阶段，用于剔除仅申请未成交的人群 |
| **是否首单用户**<br>`is_first_order_user` | 是 / 否 · 布尔 · T+1 | 识别只有一笔有效订单的用户，用于首单后承接、二单复购和跨业务模式复购 |
| **当前进行中订单状态**<br>`current_active_order_status` | 无进行中订单 / 待支付 / 待审核 / 待发货 / 待签收 / 还款中 / 已逾期 / 归还中 · 枚举 · T+1 | 判断用户当前订单处在哪个履约阶段，避免不合适触达，并支持支付、签收、还款、归还提醒 |
| **最近下单时间**<br>`last_order_time` | YYYY-MM-DD HH:MM:SS / 空 · 日期时间 · T+1 | 判断用户距最近一次交易的时间，用于复购窗口、沉默识别和召回节奏 |
| **最近订单业务类型**<br>`last_order_business_type` | 长租 / 短租 / 赊销 / 零售 / 无 · 枚举 · T+1 | 识别用户最近一次成交模式，用于判断后续更适合长租、短租、赊销或零售承接 |
| **最近订单状态**<br>`last_order_status` | 申请中 / 待审核 / 待支付 / 待发货 / 待签收 / 还款中 / 已逾期 / 归还中 / 已完结 / 已关闭 · 枚举 · T+1 | 识别最近订单结果与当前状态，用于未支付召回、履约提醒、已完结复购等场景 |
| **是否有待支付订单**<br>`has_pending_payment_order` | 是 / 否 · 布尔 · T+1；强提醒可实时 | 识别已经下单但未完成支付的高意向用户，用于支付召回和权益刺激 |
| **是否有履约中订单**<br>`has_fulfillment_order` | 是 / 否 · 布尔 · T+1 | 判断用户是否仍在履约中，用于屏蔽不合适复购触达，或进入租后运营 |
| **是否有特殊转换订单**<br>`has_special_conversion_order` | 是 / 否 · 布尔 · T+1 | 识别发生过换方案、赊销转租赁、赊销转高定价等特殊交易路径的用户 |
| **当前还款状态**<br>`current_repayment_status` | 无待还 / 正常待还 / 当前逾期 / 已结清 · 枚举 · T+1 | 判断用户当前账单履约状态，用于还款提醒、逾期分层和复购准入判断 |
| **当前是否逾期**<br>`is_current_overdue` | 是 / 否 · 布尔 · T+1；强提醒可实时 | 识别当前存在逾期的用户，用于履约干预和营销触达排除 |
| **当前逾期天数分段**<br>`current_overdue_days_range` | 0 / 1-7 / 8-30 / 31-90 / 90以上 · 枚举 · T+1 | 按逾期严重程度分层，用于不同强度的提醒、客服跟进和风险辅助 |
| **是否临近还款日**<br>`is_near_repayment_date` | 是 / 否 · 布尔 · T+1；强提醒可实时 | 识别即将到还款日的用户，用于提前提醒和降低逾期发生 |
| **是否有买断订单**<br>`has_buyout_order` | 是 / 否 · 布尔 · T+1 | 识别历史有买断行为的用户，用于判断其对设备持有和一次性转化的倾向 |
| **是否有续租订单**<br>`has_renewal_order` | 是 / 否 · 布尔 · T+1 | 识别历史有续租行为的用户，用于长租、续租和同类商品复购运营 |
| **是否有归还订单**<br>`has_return_order` | 是 / 否 · 布尔 · T+1 | 识别历史有归还行为的用户，用于归还后复购、短租复购和换新承接 |
| **当前售后状态**<br>`current_after_sale_status` | 无售后 / 售后处理中 / 售后已完结 · 枚举 · T+1 | 判断用户当前是否处于售后处理中，避免营销打扰，并支持服务跟进 |
| **最近售后类型**<br>`last_after_sale_type` | 类型 / 空 · 枚举 · T+1 | 识别最近售后原因或类型，用于服务体验分析和后续触达策略调整 |
| **历史是否逾期**<br>`has_historical_overdue` | 是 / 否 · 布尔 · T+1 | 用户历史是否发生过逾期，基于历史逾期次数判断，用于履约稳定性识别和复购准入 |
| **订单支付宝场景来源**<br>`order_alipay_scene_type` | 租物 / 非租物 / 不适用 · 枚举 · T+1 | 对订单的支付宝公域场景值做归类，区分租物订单和非租物订单 |
| **订单导流商渠道类型**<br>`order_quotient_channel_type` | CPS / 私域 / 其他 / 不适用 · 枚举 · T+1 | 对订单的导流商渠道来源做归类，区分CPS订单和私域订单 |
| **订单应用渠道**<br>`order_app_channel` | 支付宝 / 微信 / 字节 / 其他 · 枚举 · T+1 | 订单所属的应用渠道来源，用于渠道效果分析和投放归因 |

订单状态建议口径：

|标准状态|说明|
|---|---|
|申请中|用户已提交申请，订单尚未进入明确审核或支付状态|
|待审核|主要是风控、商户分流接单|
|待支付|主要是等待用户支付|
|待发货|商户或平台待发货|
|待签收|已发货，用户待签收|
|还款中|订单进入正常履约或还款阶段|
|已逾期|订单仍在还款中，但存在逾期事实|
|归还中|订单仍在还款中或履约中，但进入归还流程|
|已完结|已结清、已买断、已归还或履约完成|
|已关闭|取消、审核拒绝、超时关闭等非有效完结|

不作为标签直接暴露：

- order_id、订单编号：属于订单识别基础字段。

- 单笔订单原始状态：属于订单明细字段，可用于计算用户级订单状态标签。

- 取消、维修、换货、归还等过程状态：优先进入售后或履约字段，避免挤进订单主状态。

#### 3.4.3 非原子级标签

| 标签 | 值域 · 频率 | 计算口径 |
|---|---|---|
| **当前最大逾期天数**<br>`current_overdue_days_max` | 0 / 1-7 / 8-30 / 31-90 / 90以上 · T+1 | 当前未结清订单最大逾期天数，用于还款运营分层和营销排除条件 |
| **历史逾期次数**<br>`historical_overdue_count` | 数值 · T+1 | 历史发生逾期的订单或账单次数，用于识别履约稳定性和后续复购承接方式 |
| **还款风险等级**<br>`repayment_risk_level` | 高 / 中 / 低 · T+1 | 当前逾期、历史逾期次数、逾期天数综合判断，用于判断履约干预强度，不等同于风控审批结论 |
| **租后阶段**<br>`post_lease_stage` | 未到期 / 到期前45天 / 到期前15天 / 已买断 / 已续租 / 已归还 / 未选择 · T+1 | 基于租赁订单到期时间、买断/续租/归还子订单和租后行为计算，用于租后买断、续租、归还承接 |
| **续租意向等级**<br>`renewal_intent_level` | 高 / 中 / 低 / 无法判断 · T+1 | 可续租订单 + 到期窗口 + 续租入口点击/访问行为，用于筛选更值得承接的续租人群 |
| **买断意向等级**<br>`buyout_intent_level` | 高 / 中 / 低 / 无法判断 · T+1 | 可买断订单 + 到期窗口 + 买断入口点击/访问行为，用于买断转化和权益触达 |
| **归还意向状态**<br>`return_intent_status` | 有归还倾向 / 无明显归还倾向 / 已归还 · T+1 | 归还入口点击、归还售后单、归还履约子订单，用于归还提醒和归还后复购承接 |
| **近180天售后次数**<br>`after_sale_count_180d` | 数值 · T+1 | 近180天售后单数量，用于识别服务体验压力较高的人群 |
| **当前是否有处理中售后**<br>`current_after_sale_in_process` | 是 / 否 · T+1 | 当前是否存在处理中售后单，用于服务优先跟进和营销触达排除 |
| **最近下单距今天数分段**<br>`last_order_days_range` | ≤1天 / 1-7天 / 7-14天 / 14-30天 / 30-60天 / 60-90天 / \>90天 / 从未下单 · T+1 | 基于最近下单时间计算距今天数分段，用于复购窗口和沉默识别 |
| **下单未支付距今天数分段**<br>`order_not_paid_days_range` | ≤1天 / 1-7天 / 7-14天 / 14-30天 / 30-60天 / 60-90天 / \>90天 / 无未支付 · T+1 | 基于最近下单未支付行为计算距今天数分段，用于支付召回节奏 |
| **最近风控中关闭订单距今天数**<br>`last_risk_pending_close_days_range` | ≤1天 / 1-7天 / 7-14天 / 14-30天 / 30-60天 / 60-90天 / \>90天 / 无 · T+1 | 最近一次风控中主动申请关闭订单并通过距今天数，用于关单后召回 |
| **最近风控通过后关闭订单距今天数**<br>`last_risk_passed_close_days_range` | ≤1天 / 1-7天 / 7-14天 / 14-30天 / 30-60天 / 60-90天 / \>90天 / 无 · T+1 | 最近一次风控通过后订单关闭距今天数，用于关单后复购承接 |
| **最近后置风控通过距今天数**<br>`last_post_risk_pass_days_range` | ≤1天 / 1-7天 / 7-14天 / 14-30天 / 30-60天 / 60-90天 / \>90天 / 无 · T+1 | 最近一次后置风控通过距今天数，用于风控通过后的转化承接 |
| **最近订单结清距今天数**<br>`last_order_settled_days_range` | ≤1天 / 1-7天 / 7-14天 / 14-30天 / 30-60天 / 60-90天 / \>90天 / 无 · T+1 | 最近一次所有订单结清距今天数，用于结清后复购和赊销贷后运营 |
| **最近订单签收距今天数**<br>`last_order_signed_days_range` | ≤1天 / 1-7天 / 7-14天 / 14-30天 / 30-60天 / 60-90天 / \>90天 / 无 · T+1 | 最近一次订单完成签收距今天数，用于签收后体验跟进和复购承接 |

### 3.5 PRODUCT 域

PRODUCT 域面向商品 SPU/SKU。商品类目来源可按商品类目表中的一级类目、二级类目、三级类目维护，价格阈值不纳入本次标签体系。

#### 3.5.1 基础字段

|字段组|基础字段举例|主要用途|
|---|---|---|
|商品标识|SPU ID、SKU ID、商品名称、商品规格|商品识别、订单归因；不直接作为标签|
|类目|一级类目、二级类目、三级类目|品类偏好、推荐、复购方向|
|3C重点类目|手机、电脑整机、平板设备、摄影航拍、智能穿戴、游戏装备、外设配件、存储设备、数码配件|优先支持运营圈选|
|商品属性|品牌、成色、监管机、服务标签、上下架状态|推荐、人群偏好、交易判断|
|方案属性|租期、购买方式、金融方案、分期期数、月付/日付金额、买断/续租/归还规则|业务模式偏好、价格敏感、复购路径|

#### 3.5.2 原子级标签

| 标签 | 值域 · 数据类型 · 频率 | 业务含义 |
|---|---|---|
| **商品一级类目**<br>`product_first_category` | 一级类目 · 枚举 · T+1 | 商品最上层类目，用于运营按大品类圈选、统计和推荐归因 |
| **商品二级类目**<br>`product_second_category` | 二级类目 · 枚举 · T+1 | 商品中层类目，用于更细的品类偏好识别和商品池运营 |
| **商品三级类目**<br>`product_third_category` | 三级类目 · 枚举 · T+1 | 商品细分类目，用于同类商品推荐、复购替换和具体品类分析 |
| **商品3C重点类目**<br>`product_key_3c_category` | 手机 / 电脑整机 / 平板设备 / 摄影航拍 / 智能穿戴 / 游戏装备 / 外设配件 / 存储设备 / 数码配件 / 其他 · 枚举 · T+1 | 将商品归并到手机数码 3C 重点经营类目，便于跨前后台类目做统一运营 |
| **商品品牌**<br>`product_brand` | Apple / 华为 / 小米 / 三星 / 大疆 / 佳能 / 影石 / 其他 · 枚举 · T+1 | 识别商品品牌，用于品牌偏好、品牌专题和同品牌复购推荐 |
| **商品成色**<br>`product_condition` | 全新 / 准新 / 99新 / 95新 / 90新 / 80新 / 其他 · 枚举 · T+1 | 识别商品成色，用于判断用户对新旧程度、价格和品质的偏好 |
| **商品支持销售模式**<br>`product_sales_mode_available` | 长租 / 短租 / 赊销 / 零售 · 多值枚举 · T+1 | 识别商品可承接的交易模式，是长租、短租、赊销、零售推荐匹配的基础 |
| **是否监管机**<br>`is_supervision_mobile_phone` | 是 / 否 / 不适用 · 枚举 · T+1 | 识别是否监管机，用于手机品类下的商品分层和推荐过滤 |
| **商品上下架状态**<br>`product_shelf_status` | 上架 / 下架 · 枚举 · T+1 | 判断商品是否可被推荐、投放或承接下单，避免将下架商品纳入运营人群策略 |

不作为标签直接暴露：

- SPU ID、SKU ID、商品名称、商品规格：属于商品基础字段，可用于最近浏览商品、偏好商品等标签计算。

- 商品价格阈值：本次不纳入用户标签体系。

#### 3.5.3 非原子级标签

| 标签 | 值域 · 频率 | 计算口径 |
|---|---|---|
| **近30天商品订单数**<br>`product_order_count_30d` | 数值 · T+1 | 近30天有效订单数，覆盖长租、短租、赊销、零售，用于判断商品近期成交表现 |
| **近30天分模式商品订单数**<br>`product_order_count_by_mode_30d` | 长租N / 短租N / 赊销N / 零售N · T+1 | 近30天按业务类型统计有效订单数，用于判断商品更偏向哪种交易模式成交 |
| **近30天商品点击数**<br>`product_click_count_30d` | 数值 · T+1 | 近30天商品点击或详情访问次数，用于判断商品近期兴趣热度 |
| **商品热度等级**<br>`product_hot_level` | 热门 / 常规 / 冷门 · T+1 | 基于近30天点击、下单、成交按类目内分位计算，用于商品推荐排序和运营选品 |
| **商品销售模式适配**<br>`product_sales_mode_fit` | 适合租赁 / 适合赊销 / 适合零售 / 多模式适合 · 周 | 结合商品属性和历史订单业务类型分布计算，用于商品与用户业务模式偏好的匹配 |

### 3.6 MERCHANT 域

MERCHANT 域面向商户。首版可保留基础事实，后续按商户运营目标扩展。

#### 3.6.1 基础字段

|字段组|基础字段举例|主要用途|
|---|---|---|
|商户标识|商户ID、商户名称|商户识别、订单归因|
|商户经营|商户状态、经营品类、支持销售模式、履约城市|供给治理、商户分层|
|履约表现|发货时效、签收时效、取消率、售后率、归还处理表现|履约治理、用户体验|

#### 3.6.2 原子级标签

| 标签 | 值域 · 数据类型 · 频率 | 业务含义 |
|---|---|---|
| **商户合作状态**<br>`merchant_status` | 正常 / 暂停合作 / 终止合作 · 枚举 · T+1 | 判断商户是否可参与供给、推荐、下单承接和运营活动 |
| **商户经营品类**<br>`merchant_category_scope` | 手机 / 平板 / 相机 / 无人机 / 游戏机 / 笔记本 / 智能穿戴 / 配件 / 其他 · 多值枚举 · T+1 | 识别商户主营供给范围，用于按品类匹配供给和分析商户能力 |
| **商户支持销售模式**<br>`merchant_sales_mode_scope` | 长租 / 短租 / 赊销 / 零售 · 多值枚举 · T+1 | 识别商户支持的业务模式，用于长租、短租、赊销、零售订单的供给匹配 |
| **商户履约城市**<br>`merchant_city` | 城市 · 枚举 · T+1 | 识别商户可履约城市，用于区域供给、物流履约和城市运营分析 |

#### 3.6.3 非原子级标签

| 标签 | 值域 · 频率 | 计算口径 |
|---|---|---|
| **近30天商户订单数**<br>`merchant_order_count_30d` | 数值 · T+1 | 近30天有效订单数，用于判断商户近期承接规模和供给活跃度 |
| **商户销售模式分布**<br>`merchant_sales_mode_distribution` | 长租N / 短租N / 赊销N / 零售N · T+1 | 近30天按业务类型统计订单，用于判断商户实际承接的业务模式结构 |
| **商户履约稳定性**<br>`merchant_fulfillment_stability` | 高 / 中 / 低 · 周 | 基于发货、签收、取消、售后等履约结果计算，用于判断商户供给是否适合进入重点推荐或活动承接 |

### 3.7 用户运营圈选规则示例

圈选规则不一定固化为标签。标签体系提供稳定条件，运营策略在规则层灵活组合。

|场景|圈选规则示例|依赖标签|
|---|---|---|
|复购转化|`历史成交订单数` ≥ 1 AND `近30天活跃` AND `当前无履约中订单` AND (`浏览过手机类目` OR `浏览过笔记本类目`)|total_valid_order_count、active_level、current_active_order_status、category_preference|
|租赁转赊销复购|`历史有租赁成交` AND `近30天浏览赊销商品` ≥ 1次 AND `当前逾期天数` = 0|history_business_type_set、main_business_type_preference、is_current_overdue|
|赊销转租赁复购|`历史有赊销成交` AND (`浏览租赁商品` OR `浏览短租商品`) AND `近7天活跃天数` ≥ 3|history_business_type_set、lease_term_preference、active_level|
|短租转长租|`历史短租订单` ≥ 1 AND (`浏览长租商品` OR `选择租期` \> 6个月) AND `最近订单状态` = "已完结"|valid_order_count_by_business_type、lease_term_preference、last_order_status|
|首单转化|`已注册` AND `已认证` AND `近7天进入下单链路` ≥ 1次 AND `成交订单数` = 0 AND `最近浏览类目` IN (手机, 平板, 笔记本)|is_registered_user、auth_complete_status、order_flow_not_paid_7d、last_browse_category|
|品类推荐|(`近30天浏览类目` OR `近90天成交类目`) AND `品牌偏好` ≠ "无" AND `租期偏好` ≠ "无"|category_preference、brand_preference、condition_preference、lease_term_preference|
|租后运营|`距离租期结束` ≤ 7天 AND `未选择买断` AND `未选择续租` AND `未选择归还` AND `租后提醒点击` ≥ 1次|post_lease_stage、renewal_intent_level、buyout_intent_level、return_intent_status|
|还款提醒|(`距离还款日` ≤ 3天 OR `当前逾期天数` \> 0) AND `本期已还金额` \< `应还金额`|is_near_repayment_date、is_current_overdue、current_overdue_days_range|
|注册未下单召回|`已注册` AND `注册时长`在对应分段 AND `历史无有效订单`|is_registered_user、register_duration_range、has_history_order|
|访客用户召回|`未注册` AND `最近访问`在对应分段|is_registered_user、last_visit_days_range|
|风控中取消订单召回|`最近风控中主动关闭订单`在对应分段 AND `当前无履约中订单`|last_risk_pending_close_days_range、has_fulfillment_order|
|风控通过后关闭订单召回|`最近风控通过后订单关闭`在对应分段 AND `当前无履约中订单`|last_risk_passed_close_days_range、has_fulfillment_order|
|赊销贷中额度运营|`贷款阶段`为贷中 AND `剩余额度`不为0 AND `历史无逾期`|loan_stage、remaining_credit_range、has_historical_overdue|
|赊销贷中无逾期运营|`贷款阶段`为贷中 AND `当前无逾期`|loan_stage、is_current_overdue|
|赊销贷中高额度运营|`贷款阶段`为贷中 AND `剩余额度`≥1000 AND `历史无逾期`|loan_stage、remaining_credit_range、has_historical_overdue|
|赊销贷后运营|`贷款阶段`为贷后 AND `历史无逾期`|loan_stage、has_historical_overdue|

![标签计算逻辑 Demo：原子标签与 AND / OR / NOT 组合](/assets/library/notes/tag-system/images/image-3.png)

### 3.8 系统Demo示例

![标签系统界面](/assets/library/notes/tag-system/images/image-4.png)

![标签系统界面](/assets/library/notes/tag-system/images/image-2.png)

![标签系统界面 · 人群圈选配置](/assets/library/notes/tag-system/images/image.png)

![标签系统界面](/assets/library/notes/tag-system/images/image-1.png)

<div class="block-divider"></div>

## 四、标签体系设计

（原型待补）
