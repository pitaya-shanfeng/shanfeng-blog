---
title: 用户中台建设
published: 2026-11-08T11:45:00+08:00
description: 用户中台的产品架构：用户库（唯一 ID 与多源数据打通）、用户标签、精准客群、会员体系四块能力，配上数据中心的洞察与应用，以及能力边界和该盯的关键指标。
quote: 中台不是把数据搬到一起，是让同一个人在所有端上被认成同一个人。
category: 落地实战/产品设计
tags:
  - 用户中台
  - 架构
  - 用户增长
image: /assets/library/notes/user-center/cover.webp
banner: /assets/library/notes/user-center/banner.webp
draft: false
comment: false
hideSidebar: true
# 合集里第 2 篇
order: 2
---

![青年优品·用户中心：建设思路、产品架构、能力边界与关键指标](/assets/library/notes/user-center/arch.webp)

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
<h2>一、这次会需要确认什么</h2>
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
<h2>二、当前生产事实</h2>
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
<h2>三、现在卡在哪里</h2>
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
<h2>四、影响范围：不只是业务表</h2>
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
<h2>五、方案一：清洗并合并存量 user_id</h2>
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
<h2>六、方案二：新增 OneID 统一身份层</h2>
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
<h2>七、方案二的分层影响与改造节奏</h2>
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
<h2>八、数仓与未来标签工厂必须以前置方式纳入方案</h2>
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
<h2>九、如果选择方案二，建议这样推进</h2>
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
<h2>十、会上需要确定的事项</h2>
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
<h2>十一、会议结论模板</h2>
<p class="lead"><strong>本报告不预设最终方案。</strong>方案一是“清洗并统一现有账号”，方案二是“新增 OneID 映射，再分批接入”。会上需根据账号模型、迁移能力、消息与埋点兼容、回滚成本确定方案，并明确后续负责人和时间安排。</p>
<p class="source">事实来源：用户中心、订单、商户、商贸、客服、营销、S3、租赁、赊销、导流与埋点相关生产库元数据只读核验；用户中心、订单、营销等静态代码核验。表行数为 information_schema 近似值。标签工厂尚未建设；历史标签项目仅作设计参考。离线数仓、ES、MQ 消费组、神策项目及小程序前端埋点未被当前仓库完整覆盖，需由数仓/数据平台补充核验。</p>
</section>
</main>
</div>

## 附：标签系统 Demo

<div class="proto-embed">
<iframe src="/proto/tag-system/prototype.html" title="标签系统原型：标签管理 / 标签详情 / 圈选配置 / 人群包管理" loading="lazy" allowfullscreen></iframe>
</div>
