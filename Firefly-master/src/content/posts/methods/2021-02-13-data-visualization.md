---
title: 数据分析之“术”——数据可视化
published: 2021-02-13
description: 数据可视化方法整理，涵盖可视化工具、常见图形、Excel 与 Tableau 案例，以及复杂图形应用。
category: 方法库
tags:
  - 数据分析
  - 数据可视化
draft: false
comment: false
---

# 数据分析之“术”——数据可视化

## 一、数据可视化简介

### 1.1  什么是数据可视化

数据可视化主要借助于图形化手段，清晰有效地传达与沟通信息。但这并不意味着数据可视化就一定因为要实现某功能用途或者是为了看上去绚丽多彩而显得极端复杂。为了有效地传达思想概念，美学形式与功能需要齐头并进，通过直观地传达关键的方面与特征，从而实现对于相当稀疏而又复杂的数据集的深入洞察。我们可以通过一些案例可以较为清晰了解数据可视化具体是个什么概念：

（1）双十一数据大屏

在最近的几年双十一狂欢节时，阿里巴巴通过一块大屏幕展示淘宝、天猫的交易情况，屏幕中各种各样的图表展示了双十一的相关数据，我们可以通过这块大屏幕中的图表数据迅速了解到当前双十一的各类信息。

<p align="center">
  <img src="/assets/library/methods/data-visualization/gw1U607q.webp" alt="双十一数据大屏" />
</p>

<p class="image-caption" align="center">双十一数据大屏</p>

（2）新冠疫情地图

在2020年初国内外爆发新冠疫情，疫情期间很多平台都用地图表现当前现存确诊人数、累计确诊人数等数据在全国各省的分布情况，民众能够实时了解所在地疫情及全国疫情情况，从而让大家能够获取一些出行、防护等方面的参考意见、信息。

<p align="center">
  <img src="/assets/library/methods/data-visualization/IZ5JmP3X.webp" alt="新冠疫情地图" />
</p>

<p class="image-caption" align="center">新冠疫情地图</p>

（3）健身数据

很多健身相关平台在运动结束后，会将运动记录以柱形图、折线图、散点图等形式展示给用户查看，用户通过这些内容能够很清晰的了解自己健身的情况，从而跟进或调整自己的健身计划。

<p align="center">
  <img src="/assets/library/methods/data-visualization/5HtEhrVW.webp" alt="健身数据" />
</p>

<p class="image-caption" align="center">健身数据</p>

通过以上案例，我们可以看出数据可视化不仅仅是简单的画图，数据可视化是将相关数据通过图形化手段进行展示，不仅带给人们视觉上的冲击，同时还能够清晰有效的将信息进行传达或帮助用户洞察信息，揭示蕴含在数据中的规律、道理。


### 1.Tableau 可视化产物

在市面上存在很多种工具可以帮助我们实现数据可视化，与原型工具、流程图工具一样，我们需要关注的并不是工具如何使用，而是需要关注使用工具能够产出哪些内容，这些内容能够帮助我们解决什么问题，我们常用且比较实用的有以下两个工具，一个是Excel，一个是Tableau Desktop。Excel是大家比较熟悉的工具不做介绍，重点介绍一下Tableau Desktop。

Tableau Desktop是一款定位于数据可视化敏捷开发和实现的商务智能展示工具，可实现交互的、可视化的分析和仪表板应用，从而帮助企业快速认识、理解和分析业务，以便应用对不断变化的市场环境与挑战，它具有以下主要特点：

|特点|描述|
|---|---|
|高效性|Tableau Desktop通过内存数据引擎，可以直接查询外部数据，也可动态从数据仓库抽取数据，实现数据实时更新，可大大提高数据访问、查询和分析的使用效率|
|简单易用|不需要专业的技术背景、统计知识且可视化交互界面友好|
|可连接多种数据源|支持多种数据源，包括带有分隔符的文本文件、Excel文件、MySQL数据库等，同时允许把多个不同数据源结合起来使用，轻松实现数据融合。|

Tableau Desktop中主要有三种可视化产物，分别为工作表、仪表板、故事。工作表又称视图，是可视化分析的基本单元；仪表板是多个工作表和一些对象的组合，按一定方式对其进行组织和布局，以揭示数据关系和内含；故事是按一定顺序排列的工作表或仪表板的集合，故事中各独单独的工作表或仪表板称为故事点，以故事方式揭示各事实之间的上下文或事件发展关系。

<p align="center">
  <img src="/assets/library/methods/data-visualization/N9w08VaV.webp" alt="Tableau Desktop 工作区" />
</p>

<p class="image-caption" align="center">Tableau Desktop 工作区</p>

## 二、 简单的可视化图形

### 2.1  柱状图、条形图

1、概念

柱状图是可视化中最常用的图形，它可以有效地对比信息，凸显出高低、大小差异，与时序数据结合可以凸显趋势和规律性特征。

柱状图是使用垂直的柱子显示类别之间的数值比较，其中一个轴表示需要对比的分类，另一个轴表示相应分类下的数值表现，条形图是柱状图的转置，工作中柱状图使用居多，条形图主要用于排名展示。柱状图或条形图描述的是分类数据，回答的是“每一类中有多少”的问题，此外柱状图也可以用于展示时序数据的趋势变化，需要注意的是，当柱状图显示的分类过多时会导致分类名称重叠等情况，此时可以考虑使用条形图。柱状图有以下常用的几类图形：

|序号|图形|描述|
|---|---|---|
|1|单一柱状图|反映单一类别数据对比或时序数据趋势|
|2|并列柱状图|展示两类及以上数据的对比，也可以展示变化趋势|
|3|普通堆积柱状图|展示数据的内部结构分布和整体的变化情况，建议分类不超过5类|
|4|百分比堆积柱状图|展示整体内部的相对占比和变化趋势，建议分类不超过5类|

2、Excel案例

现有一数码3C平台的电脑销售数据，如下：

<p align="center">
  <img src="/assets/library/methods/data-visualization/1NxOr6OO.webp" alt="某平台电脑销售数据" />
</p>

<p class="image-caption" align="center">某平台电脑销售数据</p>


通过execl选中需要展示的数据，插入“二维柱形图”及“二维条形图”方式实现以下图形：

（1）通过图表展示各品牌电脑的总销售量

<p align="center">
  <img src="/assets/library/methods/data-visualization/P5Lg5FPJ.webp" alt="各品牌电脑销售量（单一柱状图）" />
</p>

<p class="image-caption" align="center">各品牌电脑销售量（单一柱状图）</p>


（2）通过图表展示IBM与联想各季度销售量

<p align="center">
  <img src="/assets/library/methods/data-visualization/dSvCV6gC.webp" alt="核心品牌电脑各季度销售量（对比柱状图）" />
</p>

<p class="image-caption" align="center">核心品牌电脑各季度销售量（对比柱状图）</p>


（3）通过图表展示2019年第二季度销量排行

<p align="center">
  <img src="/assets/library/methods/data-visualization/fMVTnVMU.webp" alt="2019年Q2季度销量排行（条形图）" />
</p>

<p class="image-caption" align="center">2019年Q2季度销量排行（条形图）</p>


（4）通过图表展示各品牌销量及电脑整体销量变化情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/wmwT46Mk.webp" alt="各品牌销量及电脑整体销量变化（堆积柱状图）" />
</p>

<p class="image-caption" align="center">各品牌销量及电脑整体销量变化（堆积柱状图）</p>


（5）通过图表展示各品牌销量占比

<p align="center">
  <img src="/assets/library/methods/data-visualization/kcC7leac.webp" alt="各品牌销量占比（百分比堆积柱状图）" />
</p>

<p class="image-caption" align="center">各品牌销量占比（百分比堆积柱状图）</p>


3、Tableau案例

线上百货商城订单数据如下：

<p align="center">
  <img src="/assets/library/methods/data-visualization/KAOwlwSo.webp" alt="某商城订单数据" />
</p>

<p class="image-caption" align="center">某商城订单数据</p>


通过tableau导入对应的订单数据表格文档，通过构建新建表、新建仪表板及柱状图实现以下图形：

（1）通过图表展示各地区的销售数据概览，包含销售额、销售数量、利润及利润率

<p align="center">
  <img src="/assets/library/methods/data-visualization/KEy0Gzy9.webp" alt="各地区销售概览（单一柱状图）" />
</p>

<p class="image-caption" align="center">各地区销售概览（单一柱状图）</p>


（2）通过图表展示各地区的利润分布，能够直观查看利润、销售额、利润率

<p align="center">
  <img src="/assets/library/methods/data-visualization/EVUYiuaQ.webp" alt="各地区利润分布（对比柱状图）" />
</p>

<p class="image-caption" align="center">各地区利润分布（对比柱状图）</p>


（3）通过图表展示各地区细分客户的利润占比，对比各地区不同客户的利润贡献程度

<p align="center">
  <img src="/assets/library/methods/data-visualization/f6D0iVZD.webp" alt="各地区细分客户类型利润占比利润分布（百分比堆积柱状图）" />
</p>

<p class="image-caption" align="center">各地区细分客户类型利润占比利润分布（百分比堆积柱状图）</p>


（4）销售分析仪表板

<p align="center">
  <img src="/assets/library/methods/data-visualization/G1NhUE8x.webp" alt="某商城销售数据看板" />
</p>

<p class="image-caption" align="center">某商城销售数据看板</p>


### 2.2  折线图、面积图

1、概念

折线图是用于展示指标在连续时间间隔上的变化，通过连接单个数据点，可反映变量随时间或有类别的变化趋势。

折线图中，数据是递增还是递减、增减的速率、增减的规律、峰值等特征都可以被清晰地展示，常用来分析数据随着有序变量（通常是时间）的变化趋势，也可以用来分析多组数据随时间变化的相互作用和相互影响，例如可用来分析某类商品或某几类商品随着时间变化的销售情况，进而预测未来的销售业绩。在折线图中，一般水平轴用来表示时间或有序维度的推移，并且间隔相同，而垂直轴代表不同时刻和维度的数据表现。折线图有以下常用的几种图形：

|序号|图形|描述|
|---|---|---|
|1|折线图（单、多折线）||
|2|点线图（折线与点组合）||
|3|曲线图||
|4|普通堆积面积图|反映整体和整体各部分随时的变化的趋势|
|5|百分比堆积面积图|分析整体中各部分随着时间的占比变化趋势|

2、Excel案例

现有国内主流电商的交易数据，如下：

<p align="center">
  <img src="/assets/library/methods/data-visualization/O9bIepE2.webp" alt="主流电商交易数据" />
</p>

<p class="image-caption" align="center">主流电商交易数据</p>

通过execl选中需要展示的数据，插入“二维折线图”方式实现以下图形：

（1）通过图表展示某猫平台交易额趋势

<p align="center">
  <img src="/assets/library/methods/data-visualization/mgvKPkkM.webp" alt="某猫平台交易额趋势（单折线图）" />
</p>

<p class="image-caption" align="center">某猫平台交易额趋势（单折线图）</p>


三个平台的交易额趋势

<p align="center">
  <img src="/assets/library/methods/data-visualization/0JuKXY76.webp" alt="各平台交易额趋势（多折线图）" />
</p>

<p class="image-caption" align="center">各平台交易额趋势（多折线图）</p>


各平台交易额及整体交易额变化情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/PY1dQgiA.webp" alt="各平台及整体交易额变化趋势（普通堆积面积图）" />
</p>

<p class="image-caption" align="center">各平台及整体交易额变化趋势（普通堆积面积图）</p>


各平台交易额占比变化

<p align="center">
  <img src="/assets/library/methods/data-visualization/5Sd6GnZd.webp" alt="各平台交易额占比变化（百分比堆积面积图）" />
</p>

<p class="image-caption" align="center">各平台交易额占比变化（百分比堆积面积图）</p>


3、Tableau案例

仍然采用上述某线上百货商城数据，通过tableau导入对应的订单数据表格文档，通过构建新建表、新建仪表板及折线图实现以下图形：

（1）通过图表展示各商品类型的销售趋势

<p align="center">
  <img src="/assets/library/methods/data-visualization/lIjUQZPG.webp" alt="各类别商品销售趋势（多折线图）" />
</p>

<p class="image-caption" align="center">各类别商品销售趋势（多折线图）</p>


（2）通过图表展示各商品类型及整体的销售趋势

<p align="center">
  <img src="/assets/library/methods/data-visualization/INM0NssU.webp" alt="各类别商品及整体订单趋势（普通堆积面积图）" />
</p>

<p class="image-caption" align="center">各类别商品及整体订单趋势（普通堆积面积图）</p>


（3）通过图表展示各类商品类型订单占比趋势

<p align="center">
  <img src="/assets/library/methods/data-visualization/gPZvlkqh.webp" alt="各类别商品订单占比趋势（百分比堆积面积图）" />
</p>

<p class="image-caption" align="center">各类别商品订单占比趋势（百分比堆积面积图）</p>


（4）商品销售趋势仪表板

<p align="center">
  <img src="/assets/library/methods/data-visualization/Z8X2Lndj.webp" alt="某商城各类别商品订单数据看板" />
</p>

<p class="image-caption" align="center">某商城各类别商品订单数据看板</p>


### 2.3  饼图、环形图

1、概念

饼图或环形图用于展示分类数据中各分类占整体的比例，用饼图或环形图的面积或弧长展示各类别占整体的多少，多用于展示静态分类数据分布。需要注意的是，只能用各分类加总等于整体的数据类型，对于去重的数据不适用。除此之外，饼图相对于其他类型的图而言，还有以下不足：

- 饼图不适用于多分类的数据，原则上一张饼图不可多于6个分类，因为随着分类的增多，每个切片就会变小，最后导致大小区分不明显，这样会失去使用饼图的意义。

- 饼图相对于其他具备同样功能的图表，需要占据更大的画布空间

- 多个饼图之间很难进行数值的比较


2、Excel案例

仍然采用上述数码3C平台的电脑销售数据，通过execl选中需要展示的数据，插入“二维饼图”、“圆环图”和“子母饼图”方式实现以下图形：

（1）通过图表展示2019年各品牌电脑销售额占比

<p align="center">
  <img src="/assets/library/methods/data-visualization/wkXKGKgt.webp" alt="各品牌电脑销售额占比（饼图）" />
</p>

<p class="image-caption" align="center">各品牌电脑销售额占比（饼图）</p>


<p align="center">
  <img src="/assets/library/methods/data-visualization/Wp2ot82V.webp" alt="各品牌电脑销售额占比（环形图）" />
</p>

<p class="image-caption" align="center">各品牌电脑销售额占比（环形图）</p>


（2）通过图表展示2019年各品牌电脑销售额占比，需要将国内外品牌进行区分

<p align="center">
  <img src="/assets/library/methods/data-visualization/vwAYe7R6.webp" alt="国内外各品牌电脑销售额占比（子母饼图）" />
</p>

<p class="image-caption" align="center">国内外各品牌电脑销售额占比（子母饼图）</p>


3、Tableau案例

仍然采用上述某线上百货商城数据，通过tableau导入对应的订单数据表格文档，通过构建新建表、新建仪表板、饼图及地图实现以下图形：

（1）通过图表展示各地区销售额、订单数占比分布

<p align="center">
  <img src="/assets/library/methods/data-visualization/siQ76WjI.webp" alt="各地区销售额占比（饼图）" />
</p>

<p class="image-caption" align="center">各地区销售额占比（饼图）</p>


<p align="center">
  <img src="/assets/library/methods/data-visualization/oQKAuoa2.webp" alt="各地区订单数占比（饼图）" />
</p>

<p class="image-caption" align="center">各地区订单数占比（饼图）</p>


（2）通过地图展示各省不同客户的订单数占比且将以上图表一起展示在仪表板中

<p align="center">
  <img src="/assets/library/methods/data-visualization/mu2nBVp6.webp" alt="各省市地区销售占比数据看板" />
</p>

<p class="image-caption" align="center">各省市地区销售占比数据看板</p>


### 2.4  散点图、气泡图

1、概念

散点图用来展示或探索变量之间的变化关系，也经常用来展示数据点在直角坐标平面上的分布，散点图也可以表示因变量随自变量变化情况，通常在做拟合、回归时会先做散点图初步确定拟合函数。

气泡图可用于展示三个变量之间的关系，也可用于展示两个变量之间的关系，与散点图类似，绘制时将一个变量放在横轴，另外一个变量放在纵轴，而第三个变量则用气泡大小来展示，气泡图也可用于分析数据之间的关联性。


2、Excel案例

现有某平台2019年拉新用户数据（主要通过广告和补贴两种方式进行拉新）如下：

<p align="center">
  <img src="/assets/library/methods/data-visualization/MLgFeJPj.webp" alt="某平台2019年用户拉新数据" />
</p>

<p class="image-caption" align="center">某平台2019年用户拉新数据</p>


通过execl选中需要展示的数据，插入“散点图”、“气泡图”方式实现以下图形：

（1）探索拉新活动投入与新增用户数之间的关系

<p align="center">
  <img src="/assets/library/methods/data-visualization/FmVhGYGU.webp" alt="拉新投入与新增用户的关系（散点图）" />
</p>

<p class="image-caption" align="center">拉新投入与新增用户的关系（散点图）</p>


（2）探索广告投入、补贴投入两类拉新投入与新增用户数之间的关系

<p align="center">
  <img src="/assets/library/methods/data-visualization/lHnlLWfK.webp" alt="两类拉新投入与新增用户的关系（气泡图）" />
</p>

<p class="image-caption" align="center">两类拉新投入与新增用户的关系（气泡图）</p>


3、Tableau案例

仍然采用上述某线上百货商城数据，通过tableau导入对应的订单数据表格文档，通过构建新建表、散点图、气泡图实现以下图形：

（1）商品折扣、购买数量与利润关系

<p align="center">
  <img src="/assets/library/methods/data-visualization/6fLf8amR.webp" alt="商品折扣、数量与利润的关系（散点图）" />
</p>

<p class="image-caption" align="center">商品折扣、数量与利润的关系（散点图）</p>


（2）通过气泡图展示各省市的销售额情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/frQucbAx.webp" alt="各省销售额分布情况（填充气泡图）" />
</p>

<p class="image-caption" align="center">各省销售额分布情况（填充气泡图）</p>


### 2.5  箱线图

1、概念

箱线图又称为盒须图、盒式图或箱型图，是一种用作显示一组数据分布情况的统计图。如果一个数据集中包含了一个或多个分类变量，同时分类变量对应的多个离散变量，那么可以用箱线图展示离散变量会如何随着分类变量的变化而变化，也可以用以展示不同分类变量下的额数据分布结构。

箱线图用5个数字对分布进行概括，即一组数据的最大值、最小值、中位数、下四分位数、上四分位数，对于数据集中的异常值，通常会以单独的点绘制。

箱型图多用于数值统计，相比于直方图和密度曲线较原始简单，非常适用于多组数据分布情况的对比，除此之外，如果样本数据比较多，箱线图可以将内部的数据分布很直观的进行展示。


2、Excel案例

仍然采用上述数码3C平台的电脑销售数据，通过execl选中需要展示的数据，插入“箱线图”方式实现以下图形：

（1）通过箱线图展示各品牌电脑销量表现情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/Uag7ORDJ.webp" alt="各品牌电脑历年销量表现（箱线图）" />
</p>

<p class="image-caption" align="center">各品牌电脑历年销量表现（箱线图）</p>


3、Tableau案例

仍然采用上述某线上百货商城数据，通过tableau导入对应的订单数据表格文档，通过构建新建表、箱线图实现以下图形：

（1）通过箱线图展示各地区各品类的利润分布

<p align="center">
  <img src="/assets/library/methods/data-visualization/NiXDWje4.webp" alt="各地区各品类利润分布（箱线图）" />
</p>

<p class="image-caption" align="center">各地区各品类利润分布（箱线图）</p>


### 2.6  漏斗图

1、概念

漏斗图用梯形面积展示某环节量与上一个环节之间的差异，漏斗图从上到下是有逻辑的顺序关系，展示了随业务流程的推进，业务流程完成和转化的情况。常用于业务流程规范、周期长、环节多的单流程分析，通过漏斗各环节业务数据的比较能够直观发现和定位问题所在的环节，进而支持业务策略调整和后期的新旧策略对比分析。

在我们日常工作中，主要应用的场景有流量分析、用户行为分析、渠道对比分析等找出产品、运营各个环节问题从而调整相关策略，提升效率。


2、Excel案例

现有一电商平台下单流程中各个环节的用户数据如下：

|用户主要行为|用户数|环节转化率|
|---|---|---|
|浏览|700,000|100%|
|登录|510,000|73%|
|加入购物车|320,000|63%|
|生成订单|210,000|66%|
|支付|90,000|43%|
|完成交易|86,000|96%|

通过execl选中需要展示的数据，插入“漏斗图”方式实现以下图形：

（1）通过漏斗图展示下单流程中各个环节的用户数及转化率

<p align="center">
  <img src="/assets/library/methods/data-visualization/wvddOlLG.webp" alt="下单流程转化分析（漏斗图）" />
</p>

<p class="image-caption" align="center">下单流程转化分析（漏斗图）</p>


3、Tableau案例

同样使用上述电商平台下单流程各个环节的用户数据，通过tableau导入对应的数据表格文档，通过构建新建表、条形图实现以下图形（tableau无法直接实现条形图，需要用两个对称的条形图进行转化实现）：

（1）通过漏斗图展示下单流程中各个环节的用户数及转化率

<p align="center">
  <img src="/assets/library/methods/data-visualization/oAaVW3mh.webp" alt="下单流程转化分析（漏斗图）" />
</p>

<p class="image-caption" align="center">下单流程转化分析（漏斗图）</p>


### 2.7  雷达图

1、概念

将多个维度的数据映射到不同的坐标轴上，这些坐标轴起始于同一圆心，结束于圆周边缘，在这样的坐标系下将主体在各维度上表现的点用线连接成封闭的图形成为雷达图，这样一个主题在多个维度上的数值表现即可清晰的展示出来，该图既可用于展示一个主体在各不同维度上的数值表现，又可用于展示多个主体在同一雷达图上各维度的对比表现。雷达图具有以下不足：

- 不能用于过多的维度变量

- 对比时不能展示过多的主体，最好不超过3个

- 各维度变量的数值大小需标准化到同一度量范围内


2、Excel案例

现有某公司产品部门构建的产品经理能力模型如下：

|能力分类|产品助理|产品经理|高级产品经理|
|---|---|---|---|
|需求挖掘能力|2|3|5|
|市场分析能力|1|3|4|
|用户调研能力|2|3|4|
|需求分析能力|2|3|5|
|专业设计能力|2|4|5|
|数据分析能力|1|3|4|
|产品规划能力|1|2|4|
|市场营销能力|1|2|3|
|渠道管理能力|1|2|3|

通过execl选中需要展示的数据，插入“雷达图”方式实现以下图形：

（1）通过使用雷达图展示三种产品岗位的能力要求

<p align="center">
  <img src="/assets/library/methods/data-visualization/QZZfk5TQ.webp" alt="产品岗位能力要求（雷达图）" />
</p>

<p class="image-caption" align="center">产品岗位能力要求（雷达图）</p>


### 2.8  瀑布图

1、概念

瀑布图有助于理解依次引入正值与负值的累积效应变化后的结果表现，有助于理解最终结果中每一个环节的贡献的方向和大小情况，因看起来像悬在空中的砖块也被称为飞行砖图或马里奥图。瀑布图有一种变体就是我们常见的甘特图，在项目管理中常用于展示各模块的排期时间。


2、Excel案例

案例一：现有某岗位薪资结构如下：

|项目|金额（元）|
|---|---|
|基本工资|8100|
|全勤奖励|2700|
|加班费|5600|
|应发工资|16400|
|社保|-5590|
|公积金|-2300|
|个税|-1320|
|其他扣除|-570|
|实发工资|11620|

（1）通过瀑布图实现薪资结构各项变化的结果表现

<p align="center">
  <img src="/assets/library/methods/data-visualization/WNqDq8Zd.webp" alt="某岗位薪资结构分布（瀑布图）" />
</p>

<p class="image-caption" align="center">某岗位薪资结构分布（瀑布图）</p>


案例二：现有某企业产品运营团队发起的问卷调查计划排期如下：

||计划开始日期|持续天数|
|---|---|---|
|问卷调查排期|2019/10/1|25|
|项目确定|2019/10/1|3|
|问卷设计|2019/10/4|4|
|内部试访|2019/10/8|2|
|问卷确定|2019/10/10|2|
|实地执行|2019/10/12|7|
|数据录入|2019/10/15|5|
|数据分析|2019/10/20|3|
|归纳结论|2019/10/23|2|
|提交报告|2019/10/25|1|

（1）通过甘特图用于展示问卷调查排期

<p align="center">
  <img src="/assets/library/methods/data-visualization/wFbnw1yB.webp" alt="调查问卷计划排期（甘特图）" />
</p>

<p class="image-caption" align="center">调查问卷计划排期（甘特图）</p>


3、Tableau案例

仍然采用上述某线上百货商城数据，通过tableau导入对应的订单数据表格文档，通过构建新建表、甘特条形图实现以下图形：

各季度各品类销售额分布情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/GqLsz1FZ.webp" alt="各季度分品类销售额分布（瀑布图）" />
</p>

<p class="image-caption" align="center">各季度分品类销售额分布（瀑布图）</p>

### 2.9  树状图

1、概念

树状图采用矩形表示层次结构里的节点，父子节点之间的层次关系用矩形之间的相互嵌套隐喻来表达，从根节点开始，空间根据相应的子节点数目被分为多个矩形，矩形的面积大小通常对应节点的属性，每个矩形又按照节点进行分割，直到叶子节点为止。


2、Excel案例

线下超市品类数据如下：

<p align="center">
  <img src="/assets/library/methods/data-visualization/AUC3rduw.webp" alt="某线下超市品类数据" />
</p>

<p class="image-caption" align="center">某线下超市品类数据</p>


通过execl选中需要展示的数据，插入“树状图”方式实现以下图形：

（1）各地区各子品类销售分布情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/kNPYYMIO.webp" alt="各地区子品类销售分布（树状图）" />
</p>

<p class="image-caption" align="center">各地区子品类销售分布（树状图）</p>


3、Tableau案例

仍然采用上述某线上百货商城数据，通过tableau导入对应的订单数据表格文档，通过构建新建表、树状图实现以下图形：

（1）各地区各子品类销售分布情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/dql9QBtp.webp" alt="各地区子品类销售分布（树状图）" />
</p>

<p class="image-caption" align="center">各地区子品类销售分布（树状图）</p>


### 2.10  旭日图

1、概念

旭日图是一种现代饼图，它是超越传统饼图和环形图，既能清晰展示层级的归属关系，以父子层次结构来显示数据构成情况，又能表现各层级中各部分的占比情况，在旭日图中，离圆点越近表示级别越高，相邻两层是内层包含外层的关系。旭日图可以更细的溯源和分析数据，真正了解各层级中数据的具体构成。


2、Excel案例

采用上述某线下超市品类数据，通过execl选中需要展示的数据，插入“旭日图”方式实现以下图形：

（1）各地区各子品类销售分布情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/zB3ZYmCU.webp" alt="各地区子品类销售分布（旭日图）" />
</p>

<p class="image-caption" align="center">各地区子品类销售分布（旭日图）</p>


### 2.11  桑基图

1、概念

桑基图是一种描述事物流转方向和流转规模的可视化展示方案，他的优势是能直观地展示复杂的流转规律，方便快速找到重要的流转方式。


2、Tableau案例

采用上述某线上百货商城数据，通过tableau导入对应的订单数据表格文档，通过构建新建表、桑基图实现以下图形：

<p align="center">
  <img src="/assets/library/methods/data-visualization/image.webp" alt="各地区子品类销售分布（桑基图）" />
</p>

<p class="image-caption" align="center">各地区子品类销售分布（桑基图）</p>

## 三、  复杂的可视化图形

1、概念

组合图是为了方便展示或突出结论而把多种可视化图形展示在一张图表上，从而实现各信息之间的对比和相关性的探索。常用的有柱状图和折线图的组合，柱状图与柱状图的组合，在实际操作中，需要遵循少量原则，一般展示信息不要超过3个，否则很容易导致展示混乱，信息表达不聚焦。


2、Excel案例

平台交易数据及拉新数据如下：

<p align="center">
  <img src="/assets/library/methods/data-visualization/Ikf7dn56.webp" alt="某平台交易数据" />
</p>

<p class="image-caption" align="center">某平台交易数据</p>

|季度|实际拉新用户数|目标用户|目标完成度|
|---|---|---|---|
|2018Q1|183|500|37%|
|2018Q2|511|1,000|51%|
|2018Q3|614|1,200|51%|
|2018Q4|1,143|2,000|57%|
|2019Q1|1,254|2,000|63%|
|2019Q2|1,534|2,500|61%|
|2019Q3|3,181|4,000|80%|
|2019Q4|2,900|5,000|58%|

（1）通过图表展示历年用户数量与客单价趋势

<p align="center">
  <img src="/assets/library/methods/data-visualization/uDZcL0Ru.webp" alt="历年用户数量与客单价趋势（组合图：柱状图+折线图）" />
</p>

<p class="image-caption" align="center">历年用户数量与客单价趋势（组合图：柱状图+折线图）</p>


（2）通过图表展示历年实际拉新与目标拉新的情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/gez6Zpej.webp" alt="历年拉新用户情况（组合图：柱状图+气泡图）" />
</p>

<p class="image-caption" align="center">历年拉新用户情况（组合图：柱状图+气泡图）</p>


（3）在上述图表基础上展示拉新目标完成情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/7KkcgFad.webp" alt="历年拉新用户达成情况（组合图：柱状图+气泡图+折线图）" />
</p>

<p class="image-caption" align="center">历年拉新用户达成情况（组合图：柱状图+气泡图+折线图）</p>


3、Tableau案例

采用上述某线上百货商城数据，通过tableau导入对应的订单数据表格文档，通过构建新建表、柱形图、折线图实现以下图形：

（1）通过图表展示各季度销售额及销售额同比增长情况

<p align="center">
  <img src="/assets/library/methods/data-visualization/c9yq4P6P.webp" alt="销售额按季度同比增长（组合图：柱状图+折线图）" />
</p>

<p class="image-caption" align="center">销售额按季度同比增长（组合图：柱状图+折线图）</p>


（2）通过图表展示各省销售量分布，采用树梢图样式

<p align="center">
  <img src="/assets/library/methods/data-visualization/KUXYnjze.webp" alt="各省销量分布（组合图：柱状图+气泡图）" />
</p>

<p class="image-caption" align="center">各省销量分布（组合图：柱状图+气泡图）</p>

