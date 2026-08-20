---
title: 数据分析之“术”——MySQL
published: 2021-02-07
description: MySQL 数据分析入门资料，系统整理数据库认知、Navicat 工具、数据类型、SQL 查询、SQL 操作与 Python 连接数据库。
category: 方法库
tags:
  - 方法沉淀
  - MySQL
  - 数据分析
draft: false
comment: false
---

# 数据分析之“术”——MySQL

## 一、MySQL简介

### 1.1 数据库认知

数据库是按照数据结构来组织、存储和管理数据的仓库，是保存有组织数据的容器，简单来说就是用来放数据的一个东西。我们常用的execl最多存放104万行的数据，随着互联网行业的发展，execl已经远远不能满足需求，由此数据库诞生，数据库是由列、行、表组成的。常见的数据库有Oracle、SQL server、DB2、MySQL等，目前大量的企业常用的数据库是MySQL，MySQL每个数据库最多可创建20亿个表，一个表允许定义1024列，每个表中的行数并没有直接限制，但受数据库的存储空间限制。

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-5.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">MySQL的构成</p>
数据库的相关操作主要是通过SQL完成，SQL是一种数据库查询和程序设计语言，用于存取数据以及查询、更新、管理关系数据库系统。在做数据分析工作中，最常用的是：数据查询语言、数据操作语言、数据定义语言，也就是增删查改相关操作。

### 1.2 Navicat工具

```Plaintext
Navicat是一套快速、可靠的数据库管理工具，专为简化数据库的管理及降低系统管理成本而设。它的设计符合数据库管理人员、开发人员及中小企业的需要。Navicat是以直觉化的图形用户界面而建的，让你可以以安全并且简单的方式创建、组织、访问并共用信息。
```

**1、数据库创建**

在连接MySQL后，可以在当前连接上点击鼠标右键，选择新建数据库选项即可创建数据库，数据库的名称需要使用英文，字符集推荐使用"utf8mb4"，相应的排序规则选择通用规则"utf8mb4\_general\_ci"。

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-6.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">数据库创建</p>

**2、数据表创建**

打开对应的数据库，选择表即可新建表，新建表时可以新增字段，字段需要设置的主要内容有字段名、字段类型、是否为null、是否主键等。

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-4.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">数据表创建</p>

**3、数据增删改**

打开对应的表，通过底部的操作按钮即可对当前表进行新增数据、删除数据、修改数据等操作。

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-1.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">数据增删改</p>

**4、数据库备份与恢复**

一般情况下，在做数据分析工作时，我们所获取的权限是有限的，但是为了避免出现误删数据库情况，可以将对应的数据库进行备份，通过对应数据右键点击转存SQL文件即可备份，同理，通过运行SQL文件就可恢复对应删除的数据库。

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-2.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">数据库备份</p>

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-3.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">数据库恢复</p>

**5、数据表的导入与导出**

通过表的导入向导操作即可完成数据表的导入，步骤为：选择导入向导\-选择文件\-附加选项\-选择目标表\-表结构\-导入模式\-开始导入\-导入成功。

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-9.webp" alt="default.png" />
</p>

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-7.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">数据表导入</p>

通过表的导出向导操作即可完成数据表的导出，步骤为：选择导出向导\-选择文件格式\-选择导出字段\-附加选项\-开始导出\-导入成功。

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-10.webp" alt="default.png" />
</p>

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-8.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">数据表导出</p>

### 1.3 数据类型

**1、数值型**

|类型|说明|
|---|---|
|tinyint\(size\)|\-128到127，在括号内规定最大位数|
|smallint\(size\)|\-32768到32767，在括号中规定最大位数|
|mediumint\(size\)|\-8388608到8388607，在括号中规定最大位数|
|int\(size\)|\-2147483648到2147483647，在括号中规定最大位数|
|bigint\(size\)|\-9223372036854775808到9223372036854775807，在括号中规定最大位数|
|float\(size,d\)|带有浮点小数点的小数字，在括号中规定最大位数与小数点右侧最大位数|
|double\(size,d\)|带有浮点小数点的大数字，在括号中规定最大位数与小数点右侧最大位数|
|decimal\(size,d\)|作为字符串存储的double类型|

**2、日期型**

|类型|说明|
|---|---|
|date\(\)|日期，格式为YYYY\-MM\-DD|
|datetime\(\)|日期和时间的组合，格式为YYYY\-MM\-DD HH:MM:SS|
|timestamp\(\)|时间戳，格式为YYYY\-MM\-DD HH:MM:SS|
|time\(\)|时间，格式为HH:MM:SS|
|year\(\)|2位数或4位数的年|

**3、文本型**

|类型|说明|
|---|---|
|char\(\)|保存固定长度的字符串（可包含字母、数字以及特殊字符），在括号指定字符串的长度，最多255个字符|
|varchar\(\)|保存可变长度的字符串（可包含字母、数字以及特殊字符），在括号指定字符串的长度，最多255个字符；如果值长度大于255，则被转换为text类型|
|tinytext|存放最大长度为255个字符的字符串|
|text|存放最大长度为65535个字符的字符串|
|blob|用于blobs，存放最多65535字节的数据|
|mediumtext|存放最大长度为167777215个字符的字符串|
|longtext|存放最大长度为4294967295个字符的字符串|
|longblob|用于blobs，存放最多4294967295个字节的数据|
|enum\(x,y,z,etc\)|允许你输入可能值的列表，可以在enum列表中列出最大65535个值，如果列表中不存在插入的值，则插入空值|
|set|与enmu类似，最多包含64个列表项|

## 二、SQL查询数据库

现有如下三张表的数据：

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">staff员工表</p>

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-12.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">employee雇员表</p>

<p align="center">
  <img src="/assets/library/methods/data-analysis-mysql/default-11.webp" alt="default.png" />
</p>

<p class="image-caption" align="center">department部门表</p>

### 2.1 基础语句

**1、检索数据（select语句）**

```SQL
-- 语法结构：SELECT 字段 FROM 表名
-- 检索所有的列，使用*
SELECT * FROM staff
-- 检索单列:检索员工表中的员工编号列
SELECT eno FROM staff
-- 检索多列（检索多列的时候用逗号隔开）：检索员工表中的员工编号、员工姓名两列
SELECT eno,ename FROM staff
-- 限制检索结果（限制检索使用limit，限制的是行数）：检索员工表中的前5行
SELECT * FROM staff LIMIT 5
-- 去重检索（去重使用distinct）：员工表中有哪些不同的岗位
SELECT DISTINCT job FROM staff
```

**2、限定条件（where语句）**

|类型|常用命令|
|---|---|
|数值判断|大于\(\>\)、小于\(\<\)、等于\(=\)、不等于\(\<\>\)、大于等于\(\>=\)、小于等于\(\<=\)、范围\(between\)|
|逻辑判断|AND\\OR\\IN\(\)\\NOT IN\(\)|
|模糊判断|like"%风%"|

```SQL
-- 语法结构：SELECT 字段 FROM 表名 WHERE 条件 
-- 数值判断：检索出员工表中工资大于10000的员工信息
SELECT * FROM staff WHERE sal>10000
-- 逻辑判断：检索出员工表中工资大于10000且奖金不为零的员工信息
SELECT * FROM staff WHERE sal>10000 AND bonus>0
-- 模糊判断：检索出员工表中名字里带有”青“、结尾为”青“、开头为”青“的员工信息
SELECT * FROM staff WHERE ename LIKE "%青%"
SELECT * FROM staff WHERE ename LIKE "%青"
SELECT * FROM staff WHERE ename LIKE "青%"
-- 多条件判断：检索出员工表中来自于1、2、5三个部门、入职时间为2013-1-1到2015-12-31且工资大于5000的员工信息
SELECT * FROM staff 
WHERE 
        deptno in(1,2,5) 
        AND hiredate BETWEEN "2013-1-1" AND "2015-12-31" 
        AND sal>=5000
```

**3、创建计算字段**

```SQL
-- 1、计算字段（加减乘除：+-*/）
-- 语法结构：SELECT 字段1+字段2 AS "新字段名" FROM 表名
-- 计算员工收入
SELECT *,sal+bonus AS "员工收入" FROM staff

-- 2、拼接字段（concat）
-- 语法结构：SELECT CONCAT(字段1,字段2...) AS "新字段名" FROM 表名
-- 生成员工工牌信息，包含名字与岗位
SELECT *,CONCAT(ename,"-",job) AS "工牌信息" FROM staff
```

**4、数据分组（group by）**

```SQL
-- 语法结构：SELECT 字段,计算字段 FROM 表名 WHERE 条件 GROUP BY 字段
-- 计算各岗位工资总和、奖金总和
SELECT job,SUM(sal) AS "工资总额",SUM(bonus) AS "奖金总额" FROM staff GROUP BY job
```

**5、数据过滤（having）**

```SQL
-- 语法结构：SELECT 字段,计算字段 FROM 表名 WHERE 条件 GROUP BY 字段 HAVING 条件
-- 计算各岗位工资总和、奖金总和，只显示奖金总和超过2000的职位
SELECT job,SUM(sal) AS "工资总额",SUM(bonus) AS "奖金总额" FROM staff GROUP BY job HAVING SUM(bonus)>2000
```

**6、结果排序（order by \.\.\.\.\. desc）**

```SQL
-- 语法结构：SELECT 字段,计算字段 FROM 表名  ORDER BY 字段 DESC
--默认为升序，DESC为降序
-- 计算各岗位工资总和、奖金总和，按照奖金降序排列
SELECT job,SUM(sal) AS "工资总额",SUM(bonus) AS "奖金总额" FROM staff GROUP BY job ORDER BY SUM(bonus) DESC
```

### 2.2 SQL函数

1、数值型函数

|函数|说明|
|---|---|
|SUM\(列名\)|返回某列的总和|
|AVG\(列名\)|返回某列的平均值|
|MIN\(列名\)|返回某列的最低值|
|MAX\(列名\)|返回某列的最高值|
|COUNT\(列名\)|返回某列的行数，不含包null值|
|COUNT\(\*\)|返回被选行数|
|COUNT\(distinct列名\)|返回去重列的行数|
|ABS\(列名\)|返回绝对值|
|SQRT\(列名\)|返回平方|

```SQL
-- 计算各岗位工资总支出、奖金总支出、平均工资
SELECT job,SUM(sal),SUM(bonus),AVG(sal) FROM staff GROUP BY job

-- 计算工资最高值与奖金最低值
SELECT max(sal),MIN(bonus) FROM staff

-- 计算员工表总行数、岗位总行数、部门个数
SELECT COUNT(*),COUNT(job),COUNT(DISTINCT deptno) FROM staff
```

2、日期型函数

|函数|说明|
|---|---|
|NOW\(\)|返回当前的日期和时间|
|CURDATE\(\)|返回当前的日期|
|CURTIME\(\)|返回当前的时间|
|DATE\(\)|提取日期或日期时间表达式的日期部分|
|EXTRACT\(\)|返回日期/时间|
|DATE\_ADD\(\)|给日期减去指定的时间间隔|
|DATE\_SUB\(\)|从日期减去指定的时间间隔|
|DATEDIFF\(\)|返回两个日期之间的天数|
|DATE\_FORMAT\(\)|用不同的格式显示日期/时间|

```SQL
-- 返回当前的日期、时间
SELECT NOW(),CURDATE(),CURTIME()
-- 使用不同格式显示日期时间
SELECT DATE_FORMAT(NOW(),"%Y-%m-%d")
SELECT DATE_FORMAT(NOW(),"%Y-%m")
SELECT DATE_FORMAT(NOW(),"%Y")
-- 返回当前时间加一天、减一天的结果
SELECT DATE_ADD(NOW(),INTERVAL 1 DAY)
SELECT DATE_SUB(NOW(),INTERVAL 1 DAY)
-- 返回两个日期相隔时间(大的日期放在前面，返回的值为正数)
SELECT DATEDIFF("2015-1-1","2013-12-31" )

-- 计算员工入职天数
SELECT *,DATEDIFF(CURDATE(),hiredate) AS "入职天数" FROM staff

-- 添加员工入职月份字段
SELECT *,DATE_FORMAT(hiredate,"%m") AS "入职月份" FROM staff

-- 检索员工表中入职超过4000天的员工姓名 
SELECT ename FROM staff WHERE  DATEDIFF(CURDATE(),hiredate)>4000
```

3、文本型函数

|函数|说明|
|---|---|
|LEFT\(列名,长度\)|返回左边的字符|
|RIGHT\(列名，长度\)|返回右边的字符|
|LENGTH\)|返回某字段的长度|

```SQL
-- 返回员工的姓
SELECT ename,LEFT(ename,1) FROM staff
-- 返回员工姓名最后一位
SELECT ename,RIGHT(ename,1) FROM staff
-- 返回员工姓名长度
SELECT ename,LENGTH(ename) FROM staff
```

### 2.3 控制语句

1、if函数

```SQL
-- 语法结构：if(条件，为True返回的结果，为False返回的结果)
-- 查询员工表，新增一列用于标识收入高低，工资大于1万为高收入，工资收入小于等于1万为低收入
SELECT ename,sal,if(sal>10000,"高收入","低收入") FROM staff
```

2、条件函数（case when）

```SQL
-- 语法结构：
--         case when 条件1 then 结果1
--                          when 条件2 then 结果2
--                          when 条件3 then 结果3
--                          。。。
--                          else 默认结果
--          end AS 新字段名

-- 查询员工表新增员工类型，入职时间超过4000天以上为创始人，入职2500天以上为老员工，其他为新员工
SELECT *,CASE 
        WHEN DATEDIFF(CURDATE(),hiredate)>4000 THEN
                "创始人"
        WHEN DATEDIFF(CURDATE(),hiredate)>2500 THEN
                "老员工"
        ELSE
                "新员工"
END AS "员工类型" FROM staff
```

### 2.4 多表查询

一般情况下，在我们真实的项目中，开发部门会建立多个数据库，多张表，在做数据分析的时候，往往需要连接多张表进行查询，例如在分析订单相关数据时，可能需要将用户表、订单表、物流表等一起处理，进行分析工作。

1、UNION纵向连接

```SQL
-- UNION用于把来自多个SELECT语句的结果组合到一个结果集合中，也叫联合查询，需要注意的是，字段要完全相同
-- 语法结构：
-- SELECT...
-- UNION [ALL|DISTINCT]
-- SELECT...
-- UNION [ALL|DISTINCT]
-- SELECT...

-- (1)连接所有：UNION ALL
-- 将员工表和雇员表连接成一张大表
SELECT * FROM staff
UNION ALL
SELECT * FROM employee 

-- 将员工表中工资大于1万元的员工与雇员表中部门为4的雇员连接成一张大表
SELECT * FROM staff WHERE sal>10000
UNION ALL
SELECT * FROM employee WHERE deptno in(4)

-- (2)去重连接：UNION ALL
-- 将员工表和雇员表连接成一张大表
SELECT * FROM staff
UNION DISTINCT
SELECT * FROM employee 
```

2、横向连接

|连接类型|说明|
|---|---|
|内连接|join/inner join，表1 join 表2，返回表1与表2的共同的行|
|左连接|left join，表1 left join 表2，以表1为基础匹配表2的相关信息，即使右表没有匹配，也从左表返回所有的行|
|右链接|right join，表1right join表2，以表2为基础匹配表1的相关信息，即使左表没有匹配，也从右表返回所有的行|
|全连接|mysql中没有直接实现全连接，可以间接实现|

（1）内连接

```SQL
-- inner join内连接
-- 将员工表和部门表连接成一张大表，显示只有相同部门的数据
SELECT * FROM staff INNER JOIN department on staff.deptno=department.deptno
-- INNER JOIN 与 JOIN 一致
SELECT * FROM staff JOIN department on staff.deptno=department.deptno
-- 简写
SELECT * FROM staff JOIN department USING(deptno)
-- 使用on可以连接不同的字段
-- 查询员工及其上级信息
SELECT * FROM staff AS a JOIN staff AS b on a.mgno=b.eno
```

（2）左连接

```SQL
-- LEFT JOIN左连接
-- 将员工表和部门表连接成一张大表以左边表为准
SELECT * FROM staff LEFT JOIN department ON staff.deptno=department.deptno
-- 连接表的部分字段
SELECT a.*,b.dname FROM staff AS a LEFT JOIN department AS b ON a.deptno=b.deptno
-- 添加where条件，取左表与右表无交集内容
SELECT * FROM staff LEFT JOIN department ON staff.deptno=department.deptno WHERE department.deptno is null
```

（3）右连接

```SQL
-- 右连接
-- 将员工表和部门表连接成一张大表以右边表为准
SELECT * FROM staff RIGHT JOIN department ON staff.deptno=department.deptno
-- 连接表的部分字段
SELECT a.ename,a.job,b.dname FROM staff AS a RIGHT JOIN department AS b ON a.deptno=b.deptno
-- 添加where条件，取左表与右表无交集内容
SELECT * FROM staff RIGHT JOIN department ON staff.deptno=department.deptno WHERE staff.deptno is null
```

（4）全连接

```SQL
-- 全连接：mysql不支持全连接，可以通过左右连接间接实现全连接
-- 将员工表和部门表连接成一张大表，显示所有的数据
SELECT * FROM staff LEFT JOIN department ON staff.deptno=department.deptno
UNION DISTINCT
SELECT * FROM staff RIGHT JOIN department ON staff.deptno=department.deptno
```

### 2.5 子查询

1、where子查询

```SQL
-- where子查询：主查询的条件是子查询的结果
-- 语法结构：SELECT 字段 FROM 表名 where 条件（SELECT 字段 FROM 表名）

-- （1）使用运算符
-- 查询员工表工资比”芋头“高的员工
SELECT eno,ename,sal FROM staff WHERE sal>(SELECT sal FROM staff WHERE ename="芋头")
-- 查询员工表中奖金与职位与”杨青青“一样的员工
SELECT eno,ename,job,bonus FROM staff WHERE (job,bonus)=(SELECT job,bonus FROM staff WHERE ename="杨青青")

-- （2）使用IN关键字
-- 查询员工表中的数据，这些数据必须同时在雇员表中出现
SELECT * FROM staff WHERE eno in  (SELECT eno FROM employee)
-- 查询员工表中的数据，这些数据必须没有在雇员表中出现
SELECT * FROM staff WHERE eno NOT in  (SELECT eno FROM employee)

-- （3）使用any关键词
-- ANY用来标识主查询的条件为满足子查询返回结果中任意一条数据记录，any有三种匹配模式：
-- =ANY：这与in概念一致
-- >ANY、>=ANY：比子查询中返回数据中最小值还要大的数据
-- <ANY、<=ANY：比子查询中返回数据中最大值还要小的数据
-- 查询员工表中工资不低于销售经理岗位工资的员工信息
SELECT ename,job,sal FROM staff WHERE sal>ANY(SELECT sal FROM staff WHERE job="销售经理")
-- 查询员工表中奖金不高于销售专员的员工信息
SELECT ename,job,bonus FROM staff WHERE bonus<ANY(SELECT bonus FROM staff WHERE job="销售专员")

-- （4）使用all关键词
-- 表示主查询的条件为满足子查询返回结果的所有记录，all有两种匹配模式
-- >ALL：大于所有
-- <ALL：小于所有
-- 查询员工表中比所有销售经理工资高的员工信息
SELECT ename,job,sal FROM staff WHERE sal>ALL(SELECT sal FROM staff WHERE job="销售经理")
-- 查询员工表中奖金比所有销售专员低的员工信息
SELECT ename,job,bonus FROM staff WHERE bonus<ALL(SELECT bonus FROM staff WHERE job="销售专员")

-- （5）使用exists关键字
-- exists是一个布尔类型，当返回结果集的时候为True，不能返回结果集时为false
-- 查询exists对外表采用遍历方式逐条查询，每次查询都会比较exists语句，当为True时，返回当前遍历的记录；反之，当为false时，丢弃当前遍历的记录
-- 查询所有员工的部门信息
SELECT * FROM department WHERE EXISTS(SELECT * FROM staff WHERE deptno=department.deptno)
```

2、from子查询

```SQL
-- from子查询：主查询的表是子查询的结果
-- 语法结构：SELECT 表名1.字段 FROM （SELECT 字段 FROM 表名2）AS 表名1
-- 查询各部门部门号、部门名称、部门地址、员工数、平均工资
SELECT b.deptno,b.dname,b.location,a.num,a.avg FROM (SELECT deptno,count(*) AS num,AVG(sal) AS avg FROM staff GROUP BY deptno) AS a ,department AS b WHERE a.deptno=b.deptno

-- 员工表新增员工类型，入职时间超过4000天以上为创始人，入职2500天以上为老员工，其他为新员工;查询各类员工平均薪资
SELECT new_staff.员工类型,AVG(new_staff.sal) AS "平均工资" FROM
(SELECT *,CASE 
        WHEN DATEDIFF(CURDATE(),hiredate)>4000 THEN
                "创始人"
        WHEN DATEDIFF(CURDATE(),hiredate)>2500 THEN
                "老员工"
        ELSE
                "新员工"
END AS "员工类型" FROM staff) AS new_staff
GROUP BY new_staff.员工类型
```

### 2.6 排序列

```SQL
-- (1)Row_number()简单排序
-- 将员工工资进行排序，并且将排序结果进行显示
SELECT ename,sal,        Row_number() OVER(ORDER BY sal DESC)AS "排序" FROM staff

-- (2)DENSE_RANK()相同排位不占位
-- 将员工工资进行排序，并且将排序结果进行显示,处理并列情况，相同排位不占位
SELECT ename,sal,DENSE_RANK() OVER(ORDER BY sal DESC) AS '排序' FROM staff

-- (3)RANK()相同排位占位
-- 将员工工资进行排序，并且将排序结果进行显示,处理并列情况，相同排位占位
SELECT ename,sal,RANK() OVER(ORDER BY sal DESC) AS '排序' FROM staff

-- (4)PARTITION BY分组排序
-- 将员工工资进行按照部门分组排序，并且将排序结果进行显示,处理并列情况，相同排位不占位
SELECT deptno,ename,sal,DENSE_RANK() OVER(PARTITION BY deptno ORDER BY sal DESC) AS '排序' FROM staff 

-- (5)ntile(n)平均分组
-- 将员工工资进行排序，分为三组，并且将排序结果进行显示
SELECT ename,sal,ntile(3) OVER(ORDER BY sal DESC)AS "排序" FROM staff
```

## 三、SQL操作数据库

### 3.1 创建删除库/表

```SQL
-- 1、创建数据库：可以使用sql创建也可以手动通过Navicat工具创建
-- 语法结构：CREATE DATABASE 数据库名 ;
-- 创建一个名字叫做case_test的数据库
CREATE DATABASE case_test;

-- 2、创建表：可以使用sql创建也可以手动通过Navicat工具创建
-- 语法结构：
-- CREATE TABLE 表名
-- (
-- 字段1 数据类型,
-- 字段2 数据类型,
-- 字段3 数据类型,
-- 字段4 数据类型,
-- ....
-- PRIMARY KEY (主键字段)
-- )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='表里面的内容' 

-- 创建一个空表
CREATE TABLE order_test 
(
        #字段名  `order_id` 
  #数据类型 varchar(20)
        #NOT NULL 非空  
        #默认 DEFAULT '' 
        # 注释 '唯一的订单编号'
  `order_id`varchar(20) NOT NULL DEFAULT '' '唯一的订单编号', 
  `cust_id` varchar(20) NOT NULL DEFAULT '' COMMENT '顾客ID', 
  `date` date DEFAULT NULL COMMENT '交易日期', 
  `original_value` double(10,2) DEFAULT '0.00' COMMENT '订单原始金额', 
  `discount` double(10,2) DEFAULT '0.00' COMMENT '订单折扣金额', 
  `items` int(11) NOT NULL DEFAULT '0' COMMENT '订单购买的商品数量',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='测试的订单表';

-- 3、删除表在：可以使用sql删除也可以手动通过Navicat工具删除
-- 语法结构：DROP TABLE 表名
-- 删除order_test数据表
DROP TABLE order_test

-- 4、删除数据库：可以使用sql删除也可以手动通过Navicat工具删除
-- 语法结构：DROP DATABASE 数据库名
-- 删除case_test数据库
DROP DATABASE case_test
```

### 3.2 插入数据

```SQL
-- 插入数据：可以使用sql插入也可以手动通过Navicat工具插入
-- （1）插入一行：VALUES中的值需要和表中的字段完全对应
-- 语法结构：INSERT INTO 表名 VALUES (值1,值2,....)
-- 向order_test 表中插入一行数据
INSERT INTO order_test VALUES ('0001','C1','2017/1/1','199','99','1')

-- (2)插入一行：VALUES中的值需要和标识出的字段对应
-- 语法结构：INSERT INTO 表名 (字段1,字段2,....) VALUES (值1,值2,....)
-- 向order_test 表中插入一行数据
INSERT INTO order_test (`order_id`,`cust_id`,`date`,`original_value`,`discount`,`items`) VALUES ('0002','C2','2017/1/1','30.7','0','3')

-- (3)插入多行：VALUES中的值需要和标识出的字段对应
-- 语法结构：INSERT INTO 表名 (字段1,字段2,....) VALUES (值1,值2,....),(值1,值2,....),(值1,值2,....)
-- 向order_test 表中插入多行数据
INSERT INTO order_test (`order_id`,`cust_id`,`date`,`original_value`,`discount`,`items`) VALUES 
('0003','C3','2017/1/3','49.9','19','1'),
('0004','C4','2017/2/19','125','0','5'),
('0005','C2','2017/3/5','499','100','4'),
('0006','C4','2017/11/11','273.5','23.5','11')
```

### 3.3 更新内容

```SQL
-- （1）更新表数据
-- 语法结构:UPDATE 表名 SET 字段=新值 WHERE 字段=旧值(更新的条件)
-- 把order_test表中订单为0002的订单日期修改为"2018-1-1"
UPDATE order_test
set date = '2018/1/1' 
where order_id = '0002'

-- （2）更新表结构：增加列
-- 语法结构:ALTER TABLE 表名 ADD 列名 数据类型
-- 在order_test表中增加订单实付金额“spend”列
ALTER TABLE order_test ADD spend DOUBLE(10,2)

-- (3)更新表结构：删除列
-- 语法结构:ALTER TABLE 表名 DROP 列名 
ALTER TABLE order_test DROP spend 

-- (4)更新表结构：删除行
-- 语法结构:DELETE FROM 表名 WHERE 条件
DELETE FROM order_test WHERE order_id="0001"
```

## 四、Python连接数据库

### 4.1 直接连接

在Python中可以通过引入PyMySQL库用于连接MySQL，并进行增删改查的相关操作。

```Python
#1、python连接数据库案例
#引入pymysql 
import pymysql 
#打开数据库连接 
#host: SQL主机地址
#port: 端口号 
#user: 数据库用户名
# password :数据库密码
# db: 数据库名
# charset='utf8' 
con = pymysql.connect(host="127.0.0.1",port=3306,user='root',password='19941104',db='case_sql',charset='utf8')
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = con.cursor()
# 使用 execute() 方法执行 SQL语句 
cursor.execute("select * from staff") 
# 接收全部的返回结果行
res = cursor.fetchall() 
print(res)
# 关闭连接  
con.close()
```

### 4.2 封装方法

用过以上这种方法，每次调用时相对而言会比较繁琐，可以将链接数据的操作在python中封装为一个方法，每次使用时，进行调用。

```Python
#2、python连接数据库封装方法
import pymysql 
import pandas as pd 
#封装方法
#DB 连接数据库的参数,字典形式 
#sql 传入进来sql语句 
def get_mysql_data(DB,sql):
    conn = pymysql.connect(host=DB['host'],port=DB['port'],user=DB['user'],password=DB['password'],db=DB['dbname'],charset='utf8')
    # 创建一个游标
    cursor = conn.cursor()
    # 使用 execute() 方法执行 SQL语句 
    cursor.execute(sql) 
    # 接收全部的返回结果行
    data = cursor.fetchall() 
    # cols 字段信息 
    cols = cursor.description 
    # 执行 
    conn.commit() 
    conn.close() 
    
    #转变数据 
    col = [] 
    for i in cols:
        col.append(i[0])
    #data转成list形式 
    data = list(map(list,data)) 
    data = pd.DataFrame(data,columns = col) 
    
    return data 

DB = {'host':"127.0.0.1",
     'port': 3306,
     'user':'root',
     'password':'19941104',
     'dbname':'case_sql'}
SQL = "select * from staff" 

res = get_mysql_data(DB,SQL) 
display(res)
```

