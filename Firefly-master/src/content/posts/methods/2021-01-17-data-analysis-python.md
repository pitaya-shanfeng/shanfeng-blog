---
title: 数据分析之“术”——Python
published: 2021-01-17
description: 从 Python 历史、基础语法、数据容器、常用库到数据分析案例，系统整理 Python 在数据分析中的入门与实战要点。
category: 方法库
tags:
  - 数据分析
  - Python
draft: false
comment: false
---

# 数据分析之“术”——Python

## 一、Python简介

### 1.1 Python历史

Python是一种高级的编程语言，可能是第一种既简单又功能强大的编程语言，它不仅适合于初学者，也适合专业人员使用。 

Python之父，荷兰人Guido van Rossum。他于1982年从阿姆斯特丹大学取得了数学和计算机硕士学位。20世纪80年代中期，Python之父Guido van Rossum还在CWI\(数学和理论计算机科学领域的研究中心，位于阿姆斯特丹\)为ABC语言贡献代码。ABC语言是一个为编程初学者打造的研究项目。ABC语言给了Python之父Guido很大影响，Python从ABC语言中继承了很多东西：比如字符串、列表和字节数列都支持索引、切片排序和拼接操作。在CWI工作了一段时间后，Guido构思了一门致力于解决问题的编程语言，他觉得现有的编程语言对非计算机专业的人十分不友好。于是，1989年12月份，为了打发无聊的圣诞节假期，Guido开始写Python的第一个版本。

1991年，Python的第一个解释器诞生了。他是由C语言实现的，有很多语法来自C，又受到了很多ABC语言的影响。有很多来自ABC语言的语法，知道今天还很有争议，强制缩进就是其中之一。要知道，大多数语言都是代码风格自由的，即：不在乎缩进有多少，写在哪一行，只要有必要的空格即可。而Python是必须要有缩进的，这也导致了很多其他语言的程序员开玩笑说“Python程序员必须会要用游标卡尺。”

Python1\.0版本于1994年1月发布，这个版本的主要新功能是lambda, map, filter和reduce，但是Guido不喜欢这个版本。六年半之后的2000年10月份，Python2\.0发布了。这个版本的主要新功能是内存管理和循环检测垃圾收集器以及对Unicode的支持。然而，尤为重要的变化是开发的流程的改变，Python此时有了一个更透明的社区。

2008年的12月份，Python3\.0发布了。Python3\.x不向后兼容Python2\.x，这意味着Python3\.x可能无法运行Python2\.x的代码。Python3代表着Python语言的未来，今天的Python已经进入到了3,0时代，Python的社区也在蓬勃发展，当你提出一个有关的Python问题，几乎总是有人遇到了同样的问题并已经解决了。

### 1.2 Python的优点

|1|简单|Python是一种代表简单主义思想的语言，阅读一个良好的Python程序就感觉像是在读英语一样，尽管这个英语的要求非常严格，Python这种伪代码本质是它最大的优点之一，能够使得编程者能够专注于解决问题而不是搞明白语言本身|
|---|---|---|
|2|易学|Python极其容易上手，由于其拥有简单的语法|
|3|免费、开源|Python是开源的，作为编程者可以自由的发布、拷贝、阅读它的源码|
|4|底层语言|当你使用Python编程的时候，无需考虑诸如管理程序使用的内存一类的底层细节|
|5|可移植性|由于它的开源本质，Python已经被移植在许多平台上，Python程序无需修改就可以在绝大部分平台使用|
|6|解释性|Python编写的程序不需要编译成二进制代码，可以直接从源代码运行程序|
|7|面向对象|Python既支持面向过程的编程，也支持面向对象的编程|
|8|可扩展性|Python程序中，可以使用C\\C\+\+编写部分程序用以保证代码运行效率或保证算法不公开|
|9|丰富的库|Python拥有非常庞大的标准库，可以帮助处理各种工作，除了标准库意外，还有许多高质量的库，例如：wxPython、Python图像库|
|10|代码规范|Python采用强制缩进的方式，使得代码具有极佳的可读性|

### 1.3 Python的应用

|序号|应用|描述|
|---|---|---|
|1|web应用开发|Python服务器端的编程，具有很丰富的web开发框架，能够快速完成一个网站的开发和web服务，Google、豆瓣就是很好的案例|
|2|数据分析|Python被广泛应用到科学和数据分析中，比如图像的可视化分析|
|4|网络运维|Python非常适合将运维工作中大量的重复工作自动化起来，提高工作效率|
|5|界面开发|Python在图形界面开发上很强大，可以使用一些框架开发桌面软件等|
|6|爬虫|Python在爬虫领域基本是霸主的存在，将网络一切数据作为资源，通过自动化程序进行有针对性的数据采集及处理|
|7|人工智能|Python有用丰富的科学运算库，各种人工智能算法都基于Python编写，Python基本确定为AI时代的头部语言|

## 二、Python基础讲解

### 2.1 基础语法

**1、语句与注释**

程序进行编写，执行的每一行代码，叫做语句；注释指的是对代码的解释和说明，可以提供代码的可读性，注释又分为单行注释与多行注释。

```Python
#这是单行注释，定义变量name
name="山风"
'''
  这是多行注释
  定义变量job
'''
job="产品经理"
"""
  这也是多行注释
  定义变量sex
"""
sex="男"
```

**2、变量与赋值**

变量通俗理解就是存储程序数据的容器，通过以下格式来定义变量：变量名=数据。变量名是由字母、数字、下划线组成的，只能由这三类元素组成且不能以数字开头。变量的命名方式有三种，分别为小驼峰命名法、大驼峰命名法、下划线命名法。需要注意的是，在Python中具有特殊功能的标识符不能作为变量名使用。

```Python
#定义变量name
name="山风"
#小驼峰命名法
nickName="山风"
#大驼峰命名法
NickName="山风"
#下划线命名法
nick_name="山风"
#具有特殊功能的标识符不能作为变量名使用
['False','None','True','and','as','assert','async','await','break','class','continue','def','del','elif','else','except','finally','for','from','global','if','import','in','is','lambda','nonlocal','not','or','pass','raise','return','try','while','with','yield']
```

|函数|说明|
|---|---|
|int\(x\[,base\]\)|将x转换为一个整数|
|float\(x\)|将x转换为一个浮点数|
|complex\(real\[,imag\]\)|创建一个复数，real为实部，imag为虚部|
|str\(x\)|将对象x转换为字符串|
|repr\(x\)|将对象x转换为表达式字符串|
|eval\(str\)|用来计算在字符串中的有效Python表达式，并返回一个对象|
|tuple\(s\)|将序列s转换为一个元祖|
|list\(s\)|将序列s转换为一个列表|
|chr\(x\)|将一个整数转换为一个Unicode字符|
|ord\(x\)|将一个字符转换为它的ASCII整数值|
|hex\(x\)|将一个整数转换为一个十六进制字符串|
|oct\(x\)|将一个整数转换为一个八进制字符串|
|bin\(x\)|将一个整数转换为一个二进制字符串|

**3、输入与输出**

在生活中无时无刻都存在输入与输出的例子，生活中的输入无处不在，例如我们使用电脑输入的文字，说出的语言等，同样输出也是随处可见，例如看到的内容、听到的声音等。

在Python中，提供了一个函数input\(\)用以输入字符串，同时也提供了一个函数print\(\)用以输出，在一些特殊场景下，同时提供了一些格式化输出的做法。

```Python
#定义变量name,通过输入的内容给当前变量赋值
name = input("请输入姓名")
#将变量name的内容输出
print(name)
#格式化输出符号：
# %s:输出字符串
job="产品经理"
print("职业是:%s" %job)
# %d:输出int类型数字
age=30
print("年龄是:%d" %age)
# %f:输出浮点数
work_year=7.5
print("工作年限是:%f" %work_year)
# %x:输出16进制数据
salary=1000000
print("年薪是:%x" %salary)
print("%s的职业是%s,年龄是%d,工作年限是%f,年薪是%x" %(name,job,age,work_year,salary))
```

**4、运算符**

Pythonz支持算术运算符、赋值运算符、复合赋值运算符、比较运算符、逻辑运算符：

|运算符类型|运算符|描述|
|---|---|---|
|算数运算符|\+|加|
||\-|减|
||\*|乘|
||/|除|
||//|取整数|
||%|取余|
||\*\*|指数|
|赋值运算符|=|把=右边的结果赋值给=左边的变量|
|复合赋值运算符|\+=|加法赋值运算符|
||\-=|减法赋值运算符|
||\*=|乘法赋值运算符|
||/=|除法赋值运算符|
||%=|取模赋值运算符|
||\*\*=|幂赋值运算符|
||//=|取整赋值运算符|
|比较运算符|==|等于|
||\!=|不等于|
||\>|大于|
||\<|小于|
||\>=|大于等于|
||\<=|小于等于|
|逻辑运算符|and|布尔“与”|
||or|布尔“或”|
||not|布尔“非”|

```Python
#算术运算符示例
a=2
b=5
print(a+b)
print(b-a)
print(a*b)
print(b/a)
print(b//a)
print(b%a)
print(b**a)
#复合赋值运算符
x=1
for i in range(5):
  x+=i
print(x)
y=20
for i in range(5):
  y*=i
print(y)
#比较运算符
m=20
n=10
print(m>n)
print(m==n)
#逻辑运算符
f=10
t=20
result1=f>t
result2=f<t
print(result1 and result2)
```

**5、if语句**

计算机之所以可以做很多自动化的任务，因为他可以自己做条件判断。比如，输入用户年龄，根据输入的年龄打印不同的内容。if语句执行时有一个特点，它是从上往下判断，如果某个判断是True，把该判断对应的语句执行后，就忽略剩下的elif、else。

```Python
#if语句示例，根据用户输入的年龄，打印不同的内容
#需要注意的是，通过input输入的为字符串，需要转换为整数
age=int(input("请输入你的年龄："))
if age>=25:
  print("你的年龄是：%d,你是个阿姨了" %age)
elif age>18:
  print("你的年龄是：%d,你是个小姐姐" %age)
else:
  print("你的年龄是：%d,你是个小女孩" %age)
```

**6、循环语句**

Python提供了两种循环语句，一种是while循环，一种是for循环。while循环适用于明确知道循环条件的情况，for循环适用于明确知道循环次数的情况

```Python
#while循环示例，根据输入的次数，打印对应次数的内容
n=int(input("请输入重复次数："))
i=1
while i<=n:
  print("山风是个产品经理")
  i=i+1
#for循环示例，根据输入的次数，打印对应次数的内容
m=int(input("请输入重复次数："))
for i in range(m):
  print("山风是个数据分析师")

sum=0
for x in [1,2,3,4,5,6,7,8,9,10]:
  sum=sum+x
print(sum)
```

在循环中，还有两个语句需要掌握，一个是break语句，一个是continue语句。break语句可以提前退出整个循环；continue语句是跳过当前这次循环，直接开始下一次循环。

```Python
#break语句示例，原计划打印1~50的数字，现要求打印到10后，不再打印
i=1
while i<=50:
  if i>10:
    break
  print(i)
  i=i+1
 #continue语句示例，原计划打印1~50的数字，现要求打印1~50的奇数
m=0
while m<50:
  m=m+1
  if m%2==0:
    continue
  print(m)
```

### 2.2 数据容器

**1、字符串（str）**

字符串在Python语言中是尤为重要的概念，通过单引号、双引号、三引号保卫的字符组，就是字符串。

（1）下标和切片

下标在Python中的概念就是编号的意思，在字符串、元组、列表中会经常使用到下标的概念，我们可以根据下标找到他们所对应的元素，这有点类似于我们坐高铁，根据高铁票上的座位号找到对应的座位一样。

通过下标我们可以取得某个字符串中对应的一个元素，但是如果想要截取一段元素就要用到切片，切片指的是对字符串、元组、列表中截取一部分的操作。

```Python
#下标示例，下标的语法str[i]，支持负数
name="山风"
print(name[1])

#切片示例，切片的语法str[起始：结束(可不填)：步长(可不填)]，支持负数
sentence="山风是个产品经理同时又是一个数据分析师"
print(sentence[0:15:2])
```

（2）字符串常见操作

|类型|函数|示例|说明|
|---|---|---|---|
|增|join\(\)|mystr\.join\(str\)|将str中每个元素之间插入mystr|
|删|lstrip\(\)|str\.lstrip\(\)|删除str字符串左边的空白字符|
||rstrip\(\)|str\.rstrip\(\)|删除str字符串末尾的空白字符|
||strip\(\)|str\.strip\(\)|删除str字符串两端的空白字符|
|查|find\(\)|mystr\.find\(str,start=0,end=len\(mystr\)\)|检测str是否包含在mystr中，如果是返回开始的索引值，否则返回\-1<br>|
||index\(\)|mystr\.index\(str,start=0,end=len\(mystr\)\)|检测str是否包含在mystr中，如果是返回开始的索引值，否则报一个异常<br>|
||count\(\)|mystr\.count\(str,start=0,end=len\(mystr\)\)|返回str在start与end之间在mystr中出现的次数|
||startswith\(\)|mystr\.startswith\(str\)|检查mystr字符串是否以str开头，是返回True，否则返回False|
||endswith\(\)|mystr\.endswith\(str\)|检查mystr字符串是否以str结束，是返回True，否则返回False|
||rfind\(\)|mystr\.rfind\(str,start=0,end=len\(mystr\)\)|检测str是否包含在mystr中，从右边开始查找，如果是返回开始的索引值，否则返回\-1|
||rindex\(\)|mystr\.rfind\(str,start=0,end=len\(mystr\)\)|检测str是否包含在mystr中，从右边开始查找，如果是返回开始的索引值，否则报一个异常|
|改|replace\(\)|mystr\.replace\(str1,str2,mystr\.count\(str1\)\)|把mystr中的str1替换成str2，如果count指定，则替换不超过count次|
||split\(\)|mystr\.split\(str="",maxsplit\)|以str为分隔符切片mystr，如果maxsplit有指定值，则仅分隔对应个数的子字符串|
||capitalize\(\)|mystr\.capitalize\(\)|把字符串的第一个字符大写,其他字符小写|
||title\(\)|mystr\.title\(\)|转换mystr中的单词以大写开始，其余字母均为小写|
||lower\(\)|mystr\.lower\(\)|转换mystr中所有大写字符为小写|
||upper\(\)|mystr\.upper\(\)|转换mystr中的小写字母为大写|
||ljust\(\)|mystr\.ljust\(width\)|返回一个原字符串左对齐，并使用空格填充至长度width的新字符串|
||rjust\(\)|mystr\.rjust\(width\)|返回一个原字符串右对齐，并使用空格填充至长度width的新字符串|
||center\(\)|mystr\.center\(width\)|返回一个原字符串居中，并使用空格填充至长度width的新字符串|
||partition\(\)|mystr\.partition\(str\)|把mystr以str分割成三部分，str前，str，str后|
||rpartition\(\)|mystr\.rpartition\(str\)|类似于partition\(\)，不过是从右边开始|
||splitlines\(\)|mystr\.splitlines\(\)|按照行分隔，返回一个包含各行作为元素的列表|

```Python
#字符串操作"增"示例
str="iam山风"
mystr="-"
mystr.join(str)
#字符串操作"删"示例
mystr="    我是山风     "
mystr.strip()
#字符串操作"查"示例
mystr="my name is 山风"
str="name"
mystr.find(str)
mystr.index(str)
mystr.count(str)
mystr.startswith("my")
mystr.endswith("my")
#字符串操作"改"示例
mystr="my job is PM"
mystr.replace("PM","CEO",1)
mystr.split(" ",2)
mystr.capitalize()
mystr.title()
mystr.lower()
mystr.ljust(20)
mystr.partition("job")
mystr.splitlines()
```

**2、列表（list）**

列表是Python内置的一种数据类型，list是一种有序的集合，可以随时添加和删除其中的元素，写在方括号之间、用逗号分隔开的数值列表，列表内的项目不必全是相同的类型。

（1）索引和切片

列表中的索引即与字符串的下标是一样的概念，用索引来访问列表中每一个位置的元素，索引是从0开始的，当索引超出了范围时，Python会报错，所以需要确保索引不要越界，最后一个元素的索引是len\(list\)\-1。

与字符串一致，通过索引我们可以取得某个列表中对应的一个元素，但是如果想要截取一段元素就要用到切片，切片指的是对字符串、元组、列表中截取一部分的操作。

```Python
#索引示例，索引的语法list[i]，支持负数
name_list=["山风","芋头","小青"]
print(name_list[1])

#切片示例，切片的语法list[起始：结束(可不填)：步长(可不填)]，支持负数
sentence_list=["山风是个产品经理","山风是个数据分析师","小青是个花艺师"]
print(sentence_list[0:2])
```

（2）列表常见操作

|类型|函数|示例|说明|
|---|---|---|---|
|添加元素|append\(\)|list\.append\(obj\)|在列表末尾添加新的元素|
||extend\(\)|list\.extend\(seq\)|在列表末尾一次性追加另一个列表中的多个值|
||insert\(\)|list\.insert\(index, obj\)|在列表指定位置前插入元素|
|修改元素|修改元素的时候，通过下标来确定要修改的是哪个元素，然后才能进行修改|||
|查找元素|使用in来作为查找列表内元素的方法|||
||index\(\)|list\.index\(str,start=0,end=len\(mystr\)\)|检测str是否包含list中，如果是返回开始的索引值，否则报一个异常|
||count\(\)|list\.count\(str,start=0,end=len\(mystr\)\)|返回str在start与end之间在list中出现的次数|
|删除元素|del|del list\[i\]|根据下标进行删除|
||pop\(\)|list\.pop\(\)|删除最后一个元素|
||remove|list\.remove\(obj\)|根据元素的值进行删除|
|列表排序|sort\(\)|list\.sort\(reverse=True\)|按照特定的顺序重新排列，默认为有小到大，如果设置了reverse=True，可改为倒序，由大到小|
||reverse\(\)|list\.reverse\(\)|将list逆置|

```Python
#列表操作，添加元素示例
name_list=["山风","芋头","小青"]
#append()示例
add_name=input("请输入需要添加的名字：")
name_list.append(add_name)
#extend()示例
add_name2=["小王","小李"]
name_list.extend(add_name2)
#insert()示例
name_list.insert(1,"小刚")
#列表操作，修改元素示例
name_list[1]="大芋头"
#列表操作，查找元素示例
for name in name_list:
  print(name)
#列表操作，删除元素示例
del name_list[1]
name_list.pop()
name_list.remove("山风")
#列表操作，列表排序示例
num_list=[5,2,1,4,7,3,6]
num_list.sort()
```

**3、元组（tuple）**

Python中存在另外一种有序列表叫元组tuple。tuple和list非常相似，但是元组一旦初始化就不能修改，这就意味着元组没有类似append\(\)、insert\(\)这样的方法。其他获取元素的方法与list一样，可以正常使用tuple\[1\]，tuple\[\-1\]，但不能赋值成另外的元素。那么tuple的意义在何？由于tuple不可变，所以代码更加安全，不会轻易被修改，定义tuple的方式需要额外注意：

```Python
#定义一个空的tuple
t=()
#定义只有一个元素的元组，必须加一个逗号
t=(1,)
#元组是不可变的，但是元组内包含列表，可以变相的发生改变
t=("a","b",["c","d"])
t[2][0]="x"
t[2][1]="y"
print(t)
```

**4、字典（dict）**

字典是另一种可变容器模型，且可存储任意类型对象。字典的每一个键值对（key、value）需要用冒号分割，每个对之间用逗号分割，整个字典包括在花括号内。

```Python
#字典的定义示例
#通过示例发现字典在某些场景下相对list的优势之处,案例：给定一个名字查看对应的分数
#list实现
name_list=["山风","芋头","小青"]
scores_list=[100,90,80]
name=input("请输入要查询谁的成绩：")
i=name_list.index(name)
print(scores_list[i])

#dict实现
scores_dict={"山风":100,"芋头":90,"小青":80}
name=input("请输入要查询谁的成绩：")
print(scores_dict[name])
```

（1）字典常见操作

|类型|函数|示例|说明|
|---|---|---|---|
|修改元素|字典的每个元素中的数据是可以修改的，只要通过key找到，即可修改|||
|添加元素|如果使用变量名\[键\]=数据时，这个键在字典中不存在，那么就会新增这个元素|||
|删除元素|del|del dict\[key\]|删除指定元素|
|||del dict|删除指定字典|
||clear\(\)|dict\.clear\(\)|清空整个字典|
|查找元素|len\(\)|len\(dict\)|测量字典中，键值对的个数|
||keys\(\)|list\(dict\.keys\(\)\)|返回一个包含字典所有key的列表|
||values\(\)|list\(dict\.values\(\)\)|返回一个包含字典所有value的列表|
||items\(\)|list\(dict\.items\(\)\)|返回一个包含所有键值对元组的列表|

```Python
scores_dict={"山风":100,"芋头":90,"小青":80}
#字典操作，修改元素示例
new_scores=input("请输入山风新的成绩：")
scores_dict["山风"]=int(new_scores)
print("山风现在的成绩是%d"%scores_dict["山风"])

#字典操作，添加元素示例
new_scores=input("请输入小王的成绩：")
scores_dict["小王"]=int(new_scores)
print("现在小王的成绩%d已经登记好了"%scores_dict["小王"])

#字典操作，删除元素示例
del scores_dict["芋头"]
del scores_dict
scores_dict.clear()
print(scores_dict)

#字典操作，查找元素示例
print(len(scores_dict))
print(list(scores_dict.keys()))
print(list(scores_dict.values()))
print(list(scores_dict.items()))
```

**5、集合（set）**

集合是一个无序的不重复元素序列，可以使用大括号或者set\(\)函数创建集合，创建一个空的集合必须使用set\(\)而不能使用\{\}，因为\{\}是用来创建一个空字典的。由于集合是无序的，所以无法使用下标，从而通过下标赋值、取值也无法实现；列表、元组、集合三者之间可以相互转换。

```Python
my_set={"山风","产品经理",10,30}
#不支持下标赋值、取值
#my_set[1]="数据分析师"   不成立
#通过set()创建集合，定义空的集合不能直接使用{}
other_list=[1,2,33,"芋头"]
other_set=set(other_list)
other_set.add("小青")
print(other_set,type(other_set))
#通过遍历获取数据
for i in my_set:
  print(i)
for index,value in enumerate(my_set):
  print(index,value)
#可以通过集合做去重的工作
other_list=[1,2,33,2,2,"芋头"]
other_set=set(other_list)
print(other_set)
```

### 2.3 自定义函数

在程序中，如果实现了某个功能的代码需要多次使用，就把该段代码组织成为一个小模块，这就是函数。函数可以提高编写的效率以及代码的重用，在Python中提供了内建函数，比如print\(\)、input\(\)，同时也可以自己创建函数，这种函数叫做用户自定义函数。

```Python
#定义函数的格式：
#def 函数名():
#  代码(代码有缩进，tab)

#定义函数示例
def outInfo():
  print("我的名字叫山风")
  print("我的职业是产品经理")
  print("我现在在使用的是Python")  
#调用函数示例
outInfo()
```

定义函数之后，就相当于完成了某个功能的代码，想要让代码能够执行，需要调用函数，调用函数只要通过函数名\(\)即可完成。需要注意的是，调用函数时，函数会从头开始执行，当函数中的代码执行完毕后，则函数调用结束，如果函数中存在return语句时，执行到return语句函数调用结束。
**1、函数的参数**

Python中函数的定义非常简单，由于函数参数的存在，使得函数变得非常灵活且应用广泛，Python中存在以下几种函数参数：位置参数、默认参数、可变参数、关键字参数。

（1）位置参数

位置参数也叫做必选参数，定义好函数后，如果函数包含了位置参数，调用函数时，传入的值必须按照位置顺序依次赋值给对应的位置参数。

```Python
#位置参数示例
#定义函数，包含一个位置参数
def calculation(x):
  return x*x
calculation(5)
#定义函数，包含多个位置参数
def calculation(x,n):
  return x**n
calculation(5,3)
```

（2）默认参数
默认参数可以简化函数的调用，设置默认参数时需要注意：必选参数在前，默认参数在后，否则Python会报错；当函数有多个参数时，把变化大的参数放在前面，变化小的参数放在后面，变化小的参数就可以作为默认参数。

```Python
#默认参数示例
#定义函数，包含多个位置参数，一个默认参数
def calculation(x,n=2):
  return x**n
calculation(5)
calculation(5,3)
#定义函数，包含多个位置参数，多个默认参数
def getInfo(name,age,work_year=7,job="产品经理",city="杭州"):
  info_list=[name,age,work_year,job,city]
  print(info_list)
#只传入对应的位置参数，默认参数不传
getInfo("山风",30)
#传入对应的位置参数，默认参数传入一个，默认替代第三个参数
getInfo("山风",30,9)
getInfo("山风",30,"数据分析师")
#传入对应的位置参数且传入对应的默认参数
getInfo("山风",30,job="数据分析师")
getInfo("山风",30,job="数据分析师",city="上海")
```

（3）可变参数
在Python函数中，还可以定义可变参数，顾名思义，可变参数就是传入的参数个数是可变的，可以是1个、2个到任意个，还可以是0个。

```Python
#通过位置参数实现以下函数
#通过传入列表、元组实现
def theSum(numbers):
  sum=0
  for i in numbers:
    sum+=i
  return sum
theSum([1,2,3,4,5,6,7,8])
theSum((1,2,3,4,5,6,7,8))

#通过可变参数实现上述函数
#将参数修改为*numbers后，该参数即为可变参数，这时候函数接收入参形成了一个元组
def theSum(*numbers):
  sum=0
  for i in numbers:
    sum+=i
  return sum
theSum(1,2,3,4,5,6,7,8)
#如果想要用列表、元组来调用上述函数的方式
nums=[1,2,3,4]
theSum(nums[0],nums[1],nums[2],nums[3])
thsSum(*nums)
```

（4）关键字参数
对于关键字参数，函数的调用者可以传入任意不受限制的关键字参数，传入的参数会形成一个字典；如果要限制关键字参数的名字，就可以使用命名关键字参数，命名关键字参数必须传入参数名。

```Python
#关键字参数示例
#定义函数，包含位置参数与关键字参数
#在参数前添加**后，对应参数即为关键字参数，这时候函数接收入参形成一个字典
def outInfo(name,age,**other):
  print(name,age,other)
outInfo("山风",30,job="产品经理",city="杭州")

#命名关键字参数示例
#定义函数，包含位置参数与命名关键字参数
#与关键字参数不一样，命名关键字参数需要一个特殊的*，在*后面的参数被视为命名关键字参数
def outInfo(name,age,*,job,city):
  print(name,age,job,city)
#调用错误,不存在years参数
outInfo("山风",30,years=7,city="杭州")
#调用正确
outInfo("山风",30,job="产品经理",city="杭州")
```

**2、函数返回值**

Python函数中所谓的返回值，就是程序中函数完成一件事情后，最后给调用者的结果。想要在函数中把结果返回给调用者，需要在函数中使用return。关于return有几点内容需要注意：

- 一个函数中可以有多个return语句，但是只要有一个return语句被执行到，那么这个函数就会结束，因此后面的return并不会产生作用

- return后面可以是元组、列表、字典等，只要是能够存储多个数据的类型，就可以一次性返回多个数据

```Python
#返回值示例
#通过return返回结果
def theSum(a,b):
  return a+b
#定义变量保存返回值
result=theSum(1,2)
#通过return返回多个数据,默认是元组，也可以设定为列表、元组、字典
def calculate(a,b):
  sum=a+b
  mul=a*b
  return sum,mul
```

**3、递归函数**

在函数内部，可以调用其他函数，如果一个函数在内部调用自身本身，这个函数就是递归函数。需要额外注意的是，使用递归函数要防止栈的溢出，在计算机中，函数调用通过栈这种数据结构实现，每当进入一个函数调用，栈就会加一层栈帧，每当函数返回，栈就会减一层栈帧，但是由于栈的大小并不是无限的，所以，递归调用的次数过多，会导致栈的溢出。解决递归调用栈溢出的方法是通过尾递归优化。尾递归指的是在函数返回的时候，调用自身本身且return语句不包含表达式，这样子递归本身无论调用多少次，都只占用一个栈帧，不会在出现溢出的情况。

```Python
#递归函数示例
def recursion(n):
  if n==1:
    return 1
  return n*recursion(n-1)
a=recursion(5)
print(a)
#导致栈溢出的递归函数
b=recursion(10000)
print(b)
#尾递归示例:遗憾的是，实际上Python解释器并没有对尾递归做优化，所以还是会产生溢出
def recursion(n):
  return tailRecursion(n,1)
def tailRecursion(num,i):
  if num==1:
    return i
  return tailRecursion(num-1,num*i)
c=recursion(1000)
print(c)
```

**4、局部变量与全局变量**

（1）局部变量

局部变量指的就是在函数内部定义的变量，作用范围是这个函数的内部，即只能在这个函数中使用，在函数的外部是不能被使用的，所以不同的函数可以定义相同名字的局部变量。局部变量的作用是为了在函数中定义变量来临时保存数据，当函数被调用时，局部变量被创建，当函数调用完成之后，这个变量就不能够使用了。

（2）全局变量

如果一个变量既能在函数中使用，也能在其他的函数中使用，这样的变量就是全局变量，简单来说在函数外边定义的变量叫做全局变量，全局变量可以在所有的函数中进行访问。

```Python
#局部变量与全局变量示例
#定义全局变量
a=100
def test1():
  b=10
#在函数内访问局部变量
  print(b)
def test2(): 
#在函数内访问全局变量
  print(a)
#调用函数，成功
test1()
test2()
#在函数外调用局部变量，不成功
print(b)
```

当函数内出现局部变量和全局变量相同名字时，函数内部的中的变量名=数据的概念为定义了一个局部变量，而不是修改全局变量的值。如果需要在函数中修改全局变量时，需要先在函数内部使用global函数声明变量为全局变量。

```Python
#函数内外出现局部变量和全局变量相同名字
a=100
def test1():
  a=10
  print("输出变量a为：%d"%a)
#这里输出的a为局部变量，值为10
test1()
#这里输出的a为全局变量，值为100
print("输出变量a为：%d"%a)

#函数内修改全局变量示例
a=100
def test1():
#声明a为全局变量
  global a
  a=10
  print("输出变量a为：%d"%a)
#这里输出的a为全局变量，值为10
test1()
#这里输出的a为全部变量，值为10
print("输出变量a为：%d"%a)
```

### 2.4 面向对象与模块

面向对象编程是一种程序设计思想，把对象作为程序的基本单元，一个对象包含了数据和操作数据的函数，这与面向过程的程序设计思想有着本质的区别：

- 面向过程：把计算机程序视为一系列的命令集合，即一组函数的顺序执行，为了简化程序设计，面向过程把函数继续切分为子函数，即把大块函数通过切割成小块函数来降低系统的复杂度。

- 面向对象：把计算机程序视为一组对象的集合，而每个对象都可以接收其他对象发过来的消息，并处理这些消息，计算机程序的执行就是一系列消息在各个对象之间的传递。

```Python
#场景：目前需要整理企业内部员工的所在分部的城市信息(整理包括收集、查询)
#面向过程示例：根据整个事情的流转过程来思考
#步骤：1、收集员工信息  2、定义查询函数  3、执行查询动作
staff1={"name":"山风","city":"杭州"}
staff2={"name":"芋头","city":"南昌"}
def lookUp(staff):
  print("员工的姓名是：%s,来自于%s"%(staff["name"],staff["city"]))
lookUp(staff1)
lookUp(staff2)

#面向对象示例：考虑面向的对象是员工，员工具有姓名、城市的属性
#步骤：1、创建类   2、创建对象  3、查询员工信息
class Staff(object):
  def __init__(self,name,city):
    self.name=name
    self.city=city
  def lookUp(self):
    print("员工的姓名是：%s,来自于%s"%(self.name,self.city))
staff1=Staff("山风","杭州")
staff2=Staff("芋头","南昌")
staff1.lookUp()
staff2.lookUp()
```

面向对象编程有两个非常重要的概念：类和对象。对象是面向对象编程的核心，在使用对象的过程中，为了将具有共同特征和行为的一组对象抽象定义提出了另外一个新的概念——类。简单来说，类就是创建对象的模板：

- 类：具有相同属性和行为事物的统称，类是抽象的，在使用的时候通常会找到这个类的一个具体的存在，使用这个具体的存在，一个类可以找到多个对象。

- 对象：某一个具体事物的存在，在现实世界中可以是看得见摸得着，可以直接使用的。

```Python
#定义类
#class 类名() --类名建议使用大驼峰命名法，object是所有类的最顶级父类
#outInfo()是一个实例方法，第一个参数一般是self，表示的是实例对象本身
class ProductManager(object):
  def outInfo(self):
    print("这是一个产品经理")
#创建对象
#对象名=类名() --通过类实例化一个对象
#对象名.outInfo() --对象调用实例方法、属性
pm1=ProductManager()
pm1.outInfo()
```

**1、对象的属性和方法**

通过一个类，可以创建多个对象，在创建一个对象时，默认会调用init\(\)方法，不需要手动调用，在init\(\)方法中的self参数，不需要传递，Python解释器会自动把当前的对象引用传递过去，如果在创建对象时，传递了多个实参，那么在init\(\)方法中除了self以外，还需要有对应数量的其他形参，这些其实就是对象的属性。在类内部获取属性、方法，通过self获取；在类的外部获取属性、方法，通过对象名获取。

```Python
#添加和获取对象的属性
class Staff(object):
  pass
staff1=Staff()
staff1.name="山风"
staff1.city="杭州"
print("员工的姓名是：%s,来自于%s"%(staff1.name,staff1.city))

#通过self获取对象属性
class Staff(object):
  def outInfo(self):
    print("员工的姓名是：%s,来自于%s"%(self.name,self.city))
staff2=Staff()
staff2.name="山风"
staff2.city="杭州"
staff2.outInfo()

#不带有参数的init()方法
class Staff(object):
  def __init__(self):
    self.name="山风"
    self.city="杭州"
  def outInfo(self):
    print("员工的姓名是：%s,来自于%s"%(self.name,self.city))
staff2=Staff()
staff2.outInfo()

#带有参数的init()方法
class Staff(object):
  def __init__(self,name,city):
    self.name=name
    self.city=city
  def outInfo(self):
    print("员工的姓名是：%s,来自于%s"%(self.name,self.city))
staff2=Staff("山风","杭州")
staff2.outInfo()
```

**2、继承**

在程序中，继承描述的是多个类之间的所属关系，如果一个类A里面的属性和方法可以复用，则可以通过继承的方式传递到类B里。那么类A就是基类，也叫做父类；类B就是派生类，也叫做子类。继承分为单继承、多继承：

（1）单继承

单继承指的是子类只继承一个父类。子类在继承的时候，在定义类时，小括号内为父类的名字，父类的属性、方法都会继承给子类。特殊情况：子类没有定义init\(\)方法初始化属性，也没有定义实例方法，但是只要父类有，创建子类的对象就相当于默认执行了继承过来的init\(\)方法。

（2）多继承

多继承指的是子类继承了多个父类，在定义类时，小括号内为父类的名字，以逗号区分开，所有父类的属性、方法都会继承给子类。多个父类中不重名的属性、方法不会有任何影响，同名的属性、方法以哪个父类在前为准。

```Python
#单继承示例
#父类
class A(object):
  def __init__(self):
    self.value=100
  def outInfo(self):
    print(self.value*100)  
#子类：不包含与父类同名的属性、方法
#子类继承了父类的属性、方法
class B(A):
  pass
b=B()
print(b.value)
b.outInfo()
#子类：包含与父类同名的属性、方法
#子类继承了父类的属性、方法；但以自己的为准
class B(A):
  def __init__(self):
    self.value=10
  def outInfo(self):
    print(self.value*10) 
b=B()
print(b.value)
b.outInfo()

#多继承示例
#多个父类
class A(object):
  def __init__(self):
    self.value=100
  def outInfo(self):
    print(self.value*100) 
  def putA(self):
    print("这是A的方法") 
class B(object):
  def __init__(self):
    self.value=10
  def outInfo(self):
    print(self.value*10) 
  def putB(self):
    print("这是B的方法")
#子类：不包含与父类同名的属性、方法
#子类继承了多个父类的属性、方法
class C(A,B):
  pass
c=C()
print(c.value)
c.outInfo()
c.putA()
c.putB()
```

**3、多态**

多态指的是不同的子类对象调用相同的父类方法，产生不同的执行效果，这种方式可以增加代码外部调用的灵活性，多态实现的基础是以继承和重写父类方法为前提，多态是一种调用方法的技巧，不会影响到类的内部设计。

```Python
#多态示例
class staff(object):
  def outInfo(self):
    print("我是一个员工")
class pm(staff):
  def outInfo(self):
    print("我是一个产品经理")
class da(staff):
  def outInfo(self):
    print("我是一个数据分析师")
boy=pm()
new_boy=da()
boy.outInfo()
new_boy.outInfo()
```

4、模块

模块通俗理解一个\.py文件就是一个模块，模块是管理功能代码的，常用模块有自定义模块、内置模块。内置模块就是Python自己内部自带的不需要我们去下载的模块，比如time，random等。

（1）自定义模块

自定义模块名字和变量名的定义很类似，都是由字母、数字、下划线组成，但是不能以数字开头，否则无法导入该模块。需要注意自定义的模块不要和系统的模块名重名，导入的功能代码不要再当前模块定义否则将无法使用导入模块的功能代码。

\#创建模块名为staff\_roster的自定义模块

**all** =\["staff\_num","outPut"\]

\#定义全局变量

staff\_num=80

\#定义函数

def outPut\(\):

print\("这是staff\_roster模块内的函数"\)

\#定义类

class staff\(object\):

def **init**\(self,name,city\):

```Plaintext
self.name=name

self.city=city
```

def show\(self\):

```Plaintext
print("这是staff_roster模块内staff类内的函数")
```

\#解决导入的模块中方法没有调用就会执行的问题

if **name**=="**main**":

outPut\(\)

**all** =\["staff\_num","outPut"\]：导入模块有两种方式，一种采用的是import 模块名，一种采用的是from 模块名 import \*；通过第一种方式导入的模块，所有的内容都可以被使用，但是通过第二种方式导入的模块，只能使用对应在列表内的属性、方法。

if **name**=="**main**"：由于一个Python源码文件（\.py）可以被直接运行外，还可以作为模块被其他\.py文件导入。所以不管是直接运行还是被导入，\.py文件的最顶层代码都会被运行（Python用缩进来区分代码层次），而当一个\.py文件作为模块被导入时，我们可能不希望一部分代码被运行。

```Python
#第一种导入方式：import 模块名
import staff_roster
#模块中的全局变量、函数、类，全部正常使用
print(staff_roster.staff_num)
staff_roster.outPut()
staff1=staff_roster.staff("山风","杭州")
print(staff1.name)
staff1.show()

#第二种导入方式:from 模块名 import *
from staff_roster import *
#由于在__all__中设定了可使用的内容，模块中的全局变量、函数正常使用，类无法使用
print(staff_num)
outPut()
staff1=staff("山风","杭州")
print(staff1.name)
staff1.show()
```

（2）常见的内置模块

在做数据分析工作时，我们有一些常用的内置模块，例如：os模块（执行系统命令）、random模块（随机数）、math模块（数学运算）、time模块（时间）。

①math模块

math模块提供了许多对浮点数的数学运算函数，在需要对数据进行计算处理时，建议引入math模块，直接调用模块中的方法即可。

|方法|简述|举例|
|---|---|---|
|属性|||
|pi|数学常数π|math\.pi结果为3\.141592653589793|
|e|数学常数e|math\.e结果为2\.718281828459045|
|tau|数学常数2π|mathtau结果为6\.283185307179586|
|inf|正无穷大||
|nan|浮点数的NaN，相当于float（"nan"）||
|舍入运算|||
|ceil\(x\)|返回x的向上舍入值|math\.ceil\(3\.1\)结果为3math\.ceil\(\-3\.1\)结果为\-3|
|floor\(x\)|返回x的向下舍入值|math\.floor\(2\.8\)结果为2math\.floor\(\-2,8\)结果为\-3|
|trunc\(x\)|将x截为最接近与零的整数|math\.trunc\(1\.8\)结果为1math\.trunc\(\-1\.8\)结果为\-1|
|一般数学计算|||
|fabs\(x\)|返回x的绝对值|math\.fabs\(\-2\.6\)结果为2\.6|
|fsum\(s\)|返回可迭代序列s中的和|math\.fsum\(\[1,1e100,\-1e100\]\)结果为1\.0|
|fmod\(x,y\)|返回x%y|math\.fmod（8，3）结果为2\.0|
|pow\(x,y\)|返回x\*\*y|math\.pow\(2,3\)结果为8\.0|
|sqrt\(x\)|返回x的平方根|math\.sqrt\(4\)结果为2\.0|
|hypot\(x,y\)|返回坐标（x,y）到原点的几何距离|math\.hypot\(3,4\)结果为5\.0|
|factorial\(x\)|返回x的阶乘|math\.factorial\(4\)结果为24\.0|
|copysign\(x,y\)|返回与y具有相同符合的x|math\.copysign\(1,\-3\)结果为\-1\.0|
|gcd\(x,y\)|返回x与y的最大公约数|math\.gcd\(6,8\)结果为2|
|exp\(x\)|返回ex值|math\.exp\(1\)结果为2\.718281828459045|
|expm1\(x\)|返回exp\(x\)\-1|math\.expm\(1\)结果为1\.718281828459045|
|ldexp\(x,i\)|返回x\*\(2\*\*i\)|math\.ldexp\(2,2\)结果为8\.0|
|log\(x\[,base\]\)|返回指定base为底的x的对数，base默认为自然常数e|math\.log\(math\.e\)结果为1\.0|
|log10\(x\)|返回以10为底的x的对数|math\.log10\(100\)结果为2\.0|
|log2\(x\)|返回以2为底的x的对数|math\.log2\(8\)结果为3\.0|
|log1p\(x\)|返回1\+x的自然对数|math\.log1p\(math\.e\-1\)结果为1\.0|
|erf\(x\)|返回x的误差函数|math\.erf\(1\)结果为0\.8427007929497148|
|erfc\(x\)|返回x的互补误差函数|math\.erfc\(1\)结果为0\.15729920705028516|
|gamma\(\)|返回x的伽马函数||
|lgamma\(\)|返回x的伽马函数的绝对值的自然对数||
|三角函数|||
|sin\(x\)|正弦函数|math\.sin\(math\.pi/2\)结果为1\.0|
|cos\(x\)|余弦函数|math\.cos\(math\.pi/4\)结果为0\.7071067811865476|
|tan\(x\)|正切函数|math\.tan\(math\.pi/3\)结果为1\.7320508075688767|
|asin\(x\)|反正弦函数|math\.asin\(1\.0\)结果为1\.5707963267948966|
|acos\(x\)|反余弦函数|math\.acos\(1\.0\)结果为0\.0|
|atan\(x\)|反正切函数|math\.atan\(inf\)结果为1\.5707963267948966|
|atan2\(y,x\)|返回atan\(y/x\)|math\.atan2\(2,2\)结果为0\.7853981633974483|
|degrees\(x\)|将x从弧度转换为角度|math\.degress\(matth\.pi/2\)结果为90\.0|
|radians\(x\)|将x从角度转换为弧度|math\.radians\(180\)结果为3\.141592653589793|
|双曲函数|||
|sinh\(x\)|双曲正弦函数||
|cosh\(x\)|双曲余弦函数||
|tanh\(x\)|双曲正切函数||
|asinh\(x\)|反双曲正弦函数||
|acosh\(x\)|反双曲余弦函数||
|atanh\(x\)|反双曲正切函数||
|其他|||
|modf\(x\)|返回元组形式的x的小数和整数部分|math\.modf\(3\.14\)结果为\(0\.14000000000000012, 3\.0\)|
|frexp\(x\)|返回元组形式的x的正浮点尾数和浮点指数|math\.frexp\(100\)结果为\(0\.78125, 7\)|
|remainder\(x,y\)|返回x类似浮点数结构的尾数，计算方式为x\-n\*\*y,其中n为最佳接近x/y的整数|math\.remainder\(10,1\)结果为0\.0|
|isinf\(x\)|如果x是正无穷大，则返回true|math\.isinf\(inf\)结果为True|
|isfinite\(x\)|如果x不是无穷大的数，则不返回true|math\.isfinite\(1\)结果为True|
|isnan\(x\)|如果x是浮点数的NaN，则返回true|math\.isnan\(float\("nan"\)\)结果为True|
|isclose\(a,b\)|如果a和b足够接近，则返回True|math\.isclose\(1,1\.0000000001\)结果为True|

②time模块

time模块提供了各种与时间相关的函数，在需要对时间相关的数据进行处理时，建议引入time模块，直接调用模块中的方法即可。

|方法|简述|
|---|---|
|altzone\(\)|返回格林威治西部的夏令时区的偏移秒数，如果该地区在格林威治东部会返回负值|
|asctime\(x\)|接收时间元组并返回一个可读形式为'Fri Jan 22 14:05:57 2021'的字符串|
|gmtime\(x\)|接收时间戳并返回格林威治天文时间下的时间元组|
|localtime\(x\)|接收时间戳并返回当地时间下的时间元组|
|mktime\(\)|接收时间元组并返回时间戳|
|sleep\(x\)|推迟调用线程的运行，x指的是秒数|
|strftime\(fmt,x\)|接收时间元组，并返回可读字符串表示的当时时间，格式由fmt决定（可见下表）|
|strptime\(x,fmt\)|根据fmt的格式把一个时间字符串解析为时间元祖|
|time\(\)|返回当前时间的时间戳|
|tzset\(\)|根据环境变量TZ重新初始化时间相关设置|

```Python
#time模块示例
import time
#获取当前时间戳
ticks=time.time()
print("当前时间戳是：",ticks)
#获取对应时间戳的本地时间
localtime=time.localtime(ticks)
print("本地时间是：",localtime)
#将本地时间格式化
print(time.strftime("%y-%m-%d  %H:%M:%S",localtime))
```

Python中存在以下时间日期格式化符号，可以根据数据分析的场景，将时间元组翻译成对应格式的字符串：

|符号|解释|
|---|---|
|%y|两位数的年份表示（00\-99）|
|%Y|四位数的年份表示（000\-9999）|
|%m|月份（01\-12）|
|%d|月内中的一天（0\-31）|
|%H|24小时制小时数（0\-23）|
|%l|12小时制小时数（0\-11）|
|%M|分数数（0\-59）|
|%S|秒（0\-59）|
|%a|本地简化星期名称|
|%A|本地完整星期名称|
|%b|本地简化的月份名称|
|%B|本地完整的月份名称|
|%c|本地相应的日期表示和时间表示|
|%j|年内的一天（1\-366）|
|%p|本地AM或PM的等价符|
|%U|一年中的星期数（0\-53）星期天为星期的开始|
|%w|星期（0\-6），星期天为星期的开始|
|%W|一年中的星期数（0\-53）星期一为星期的开始|
|%x|本地相应的日期表示|
|%X|本地相应的时间表示|
|%Z|当前时区的名称|
|%%|%本身|

## 三、Python办公自动化

### 3.1 文件操作

文件包含文本文件和二进制文件（声音、图像、视频），从存储方式来说，文件在磁盘上的存储方式都是二进制形式，所以文本文件其实也应该算二进制文件，虽然都是二进制文件，但是二进制代表的意思不一样，二进制读写是将内存里面的数据直接读写入文本中，而文本是将数据先转换成字符串，再写入到文本中。

**1、读取文件**

要以读取文件的模式打开一个文件对象，使用Python内置的open\(\)函数，传入文件名和标识符，创建一个file对象，标识符“r”代表读。如果文件不存在，open\(\)函数会抛出一个错误；如果文件存在且打开成功，使用read\(\)发放可以一次读取文件的全部内容，Python把内容读到内存，用字符串表示出来；在文件使用完毕后，必须关闭文件，这时候需要调用close\(）方法，因为文件对象会占用操作系统的资源，并且操作系统同一时间能够打开的文件数量也是有限的。

```Python
#读取文件示例
#使用open()打开纯文本文件，创建一个file对象
file_reader=open("/Users/yutao/Desktop/Python示例/file/file1.txt","r")
#使用read()方法，读取文件内容
file_reader.read()
#使用close()关闭文件
file_reader.close()
#为了避免文件读写时发生错误，从而close()方法不会执行，可以使用try...finally
try:
  file_reader=open("/Users/yutao/Desktop/Python示例/file/file1.txt","r")
  file_reader.read()
finally:
  if file_reader:
    file_reader.close()
#上述方法过于繁琐，可以使用with语句。通过这种方式不必手动调用close()方法
with open("/Users/yutao/Desktop/Python示例/file/file1.txt","r") as file_reader:
  print(file_reader.read())
```

调用read\(\)会一次性读取文件的全部内容，如果文件过大，可能会导致内存不足，可以通过read\(x\)，每次读取固定字节的内容。同时还可以通过readline\(\)可以每次读取一行内容或者通过readlines\(\)一次读取所有内容并返回list。

```Python
#读取文件示例
#使用read(x)读取固定字节内容
with open("/Users/yutao/Desktop/Python示例/file/file1.txt","r") as file_reader:
  print(file_reader.read(10))
#通过readline()每次读取一行内容
  print(file_reader.readline())
  print(file_reader.readline())
#通过readlines()一次读取所有内容
  for line in file_reader.readlines():
    print(line.strip())
```

**2、文件打开方式**

|模式|描述|
|---|---|
|t|文本模式 \(默认\)。|
|x|写模式，新建一个文件，如果该文件已存在则会报错。|
|b|二进制模式。|
|\+|打开一个文件进行更新\(可读可写\)。|
|U|通用换行模式（不推荐）。|
|r|以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式。|
|rb|以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。这是默认模式。一般用于非文本文件如图片等。|
|r\+|打开一个文件用于读写。文件指针将会放在文件的开头。|
|rb\+|以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。一般用于非文本文件如图片等。|
|w|打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。|
|wb|以二进制格式打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。一般用于非文本文件如图片等。|
|w\+|打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。|
|wb\+|以二进制格式打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。一般用于非文本文件如图片等。|
|a|打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。|
|ab|以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。|
|a\+|打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。|
|ab\+|以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写。|

**3、字符编码**

要读取非UTF\-8编码的文本文件，需要给open\(\)函数传入encoding参数。有些编码不规范的文件，由于在文本文件中夹杂了一些非法编码的字符，导致会遇到错误，这时候可以给open\(\)函数传入errors参数，用以处理遇到编码错误后如何处理。

```Python
#字符编码示例
#读取GBK编码的文件
with open("/Users/yutao/Desktop/Python示例/file/file1.txt","r",encoding="gbk") as file_reader:
  print(file_reader.read())
#遇到编码错误，采用忽略的处理方式
with open("/Users/yutao/Desktop/Python示例/file/file1.txt","r",encoding="gbk",errors="ignore") as file_reader:
  print(file_reader.read())
```

**4、写入文件**

写文件与读文件是一样的，唯一区别是调用open\(\)函数时，传入标识符"w"或"wb"表示写文本文件或写二进制文件。以"w"模式写入文件时，如果文件已经存在，会将原有内容清空，直接覆盖新的内容，如果需要在原内容后面添加内容，可以采用"a"以追加模式写入。

```Python
#写入文件示例
#需要使用close()关闭文件的形式
file_write=open("/Users/yutao/Desktop/Python示例/file/file2.txt","w")
file_write.write("两个黄鹂鸣翠柳，一行白鹭上青天。窗含西岭千秋雪，门泊东吴万里船。")
file_write.close()
#不需要使用close()关闭文件的形式
with open("/Users/yutao/Desktop/Python示例/file/file2.txt","w") as file_write:
  file_write.write("岱宗夫如何，齐鲁青未了。造化钟神秀，阴阳割昏晓。荡胸生曾云，决眦入归鸟。会当凌绝顶，一览众山小。")
```

### 3.2 PDF处理

PDF的操作需要引入一些外部模块，包含以下模块：

```Python
#引入pdf操作所需要的一些模块
from PyPDF2 import PdfFileReader,PdfFileWriter
import pdfplumber
import pandas 
import os
```

**1、读取PDF**

```Python
#读取pdf文字内容示例
#可以将文件路径用变量代替，方便阅读
file_add1="/Users/yutao/Desktop/Python示例/file/PDFfile1.pdf"
#创建pdf文件对象
pdf1=pdfplumber.open(file_add1)
#获取指定第一页的文字内容
print(pdf1.pages[0].extract_text())
#遍历当前所有的页面，输出全部的文本值
for i in range(0,len(pdf1.pages)):
  print(pdf1.pages[i].extract_text())

#读取pdf表格内容示例
#可以将文件路径用变量代替，方便阅读
file_add2="/Users/yutao/Desktop/Python示例/file/PDFfile2.pdf"
#创建pdf文件对象
pdf2=pdfplumber.open(file_add2)
#获取指定第一页的表格内容
print(pdf2.pages[0].extract_table())
#定义一个列表，存储该pdf中所有的表格
all_content=[]
for i in range(0,len(pdf2.pages)):
  for j in pdf.pages[i].extract_tables():
    for k in j:
      if "" not in k:
        all_content.append(k)
deta=pandas.DataFrame(all_content)
deta.to_excel("file/pdf_table.xlsx",index=False,header=None)
```

**2、合并PDF**

该功能需要使用到os模块获取文件路径以及pypdf2模块中的PdfFileWriter进行生成一个新的PDF和PdfFileReader读取需要合并的PDF。

```Python
#合并pdf示例
#定义一个列表来存储所有的pdf路径
pdf_paths=[]
for file_name in os.listdir("/Users/yutao/Desktop/Python示例/file/"):
  if ".pdf" in file_name:
    pdf_paths.append(os.path.join("/Users/yutao/Desktop/Python示例/file/",file_name))
#新生成一个pdf文件
new_pdf=PdfFileWriter()
#记录pdf的总页数
numPages=0
for pdfpath in pdf_paths:
#PdfFileReader()的参数为文件对象
  old_pdf=PdfFileReader(open(pdfpath,"rb"))
  #获取当前pdf的页数
  pdfpages=old_pdf.getNumPages()
  numPages+=pdfpages
  for i in range(pdfpages):
    #根据当前页数一次添加到合并的pdf对象中
      new_pdf.addPage(old_pdf.getPage(i))
with open("/Users/yutao/Desktop/Python示例/newfile/newfile.pdf","wb") as p:
  new_pdf.write(p)
```

**3、PDF添加水印**

```Python
#PDF添加水印示例
#PDF添加水印就是将水印PDF和要加水印的PDF进行合并
pdf=PdfFileReader("/Users/yutao/Desktop/Python示例/file/PDFfile1.pdf")
water_pdf=PdfFileReader("/Users/yutao/Desktop/Python示例/file/water.pdf")

water=water_pdf.getPage(0)
writer=PdfFileWriter()
for i in range(pdf.getNumPages()):
    pdf.getPage(i).mergePage(water)
    writer.addPage(pdf.getPage(i))
writer.write(open("/Users/yutao/Desktop/Python示例/newfile/newfile2.pdf","wb"))
```

### 3.3 Excel处理

excel的操作需要引入openpyxl模块，用来读写xlsx/xlsm/xltx/xltm类型文件

**1、创建工作簿和表**

openpyxl模块中的Workbook方法可以根据路径创建一个新的excel文件，需要注意的是：无论是创建新的表还是新的文件都需要保存。

```Python
#创建工作簿和表示例
import openpyxl
#创建空白工作簿
wb=openpyxl.Workbook()
#创建工作表时直接指定标题，0表示放在第一个位置
ws=wb.create_sheet("表1",0)
#不设置位置会追加一个表
ws2=wb.create_sheet("表2")
#保存文件
wb.save("/Users/yutao/Desktop/Python示例/file/work1.xlsx")
```

**2、读取文件和表内容**

openpyxl模块中的load\_workbook方法读取本地存在的文件，在对表、表内容修改后，要调用save方法，否则excel文件内并不会发生修改。

```Python
import openpyxl
#读取文件示例
wb=load_workbook("/Users/yutao/Desktop/Python示例/file/work2.xlsx")
#获取所有表的名字
print(wb.sheetnames)
#获取默认的工作表
default=wb.active
default.title="表一"
print(wb.sheetnames)
#根据表名获取表
sheet=wb["表一"]
default.title="表1"
print(wb.sheetnames)
#保存文件
wb.save("/Users/yutao/Desktop/Python示例/file/work2.xlsx")

#读取表内容示例
sheet=wb["表1"]
#获取表数据的行列数
print("行数：",sheet.max_row)
print("列数：",sheet.max_column)
#获取一列
one_column=sheet["A"]
print("一列：",one_column)
#获取一行
one_row=sheet["1"]
print("一行：",one_row)
#获取一个单元格
one_cell=sheet["A1"]
print("一个单元格：",one_cell)
print("A1的值：",one_cell.value)
```

**3、写入内容**

```Python
import openpyxl
#写入内容示例
wb=load_workbook("/Users/yutao/Desktop/Python示例/file/work2.xlsx")
#一个单元格写入内容
sheet=wb["表2"]
sheet["A1"].value="A1"
#写入一列
for i in range(1,11):
    sheet["A{}".format(i)].value=i
#写入一行
for j in range(1,11):
    sheet.cell(row=1,column=j,value=j)
wb.save("/Users/yutao/Desktop/Python示例/file/work2.xlsx")
```

**4、案例演示**

（1）添加列数据

目前存在一个销售数据表，现需要根据单价和数量计算出销售额列：

![销售数据表（计算前）](/assets/library/methods/data-analysis-python/default.webp)

图20\-1  销售数据表（计算前）

```Python
#1、了解数据：确认python取出的数据与真实数据一致
from openpyxl import load_workbook
wb=load_workbook("/Users/yutao/Desktop/Python示例/file/案例.xlsx")
sheet=wb["订单"]

#获取数据的行列
print(sheet.max_row)
print(sheet.max_column)

#2、计算数据
#添加销售额列
sheet.cell(row=1,column=19).value="销售额"
for row_index in range(2,sheet.max_row+1):
    #获取单价
    one_price=sheet.cell(row=row_index,column=17).value
    #获取数量
    one_num=sheet.cell(row=row_index,column=18).value
    #去除单价或数量为空的列不计算
    if one_price==None or one_num==None:
        sheet.cell(row=row_index,column=19).value=None
    else:
        sheet.cell(row=row_index,column=19).value=one_price*one_num

#3、保存数据
wb.save("/Users/yutao/Desktop/Python示例/file/案例.xlsx")
```

![销售数据表（计算后）](/assets/library/methods/data-analysis-python/default-1.webp)

图20\-2  销售数据表（计算后）
（2）绘制图形

根据各个省的订单量绘制柱状图、饼图：

![各省销量（绘图前）](/assets/library/methods/data-analysis-python/default-3.webp)

图20\-3  各省销量（绘图前）

```Python
#1、读取文件
from openpyxl import Workbook
from openpyxl import load_workbook
from openpyxl.chart import BarChart,Reference
from openpyxl.chart import PieChart,ProjectedPieChart,Reference
wb=load_workbook("/Users/yutao/Desktop/Python示例/file/案例.xlsx")
sheet=wb["销量"]

#2、构建柱状图
#创建柱状图对象
bar_chart=BarChart()
lables1=Reference(sheet,min_row=2,max_row=32,min_col=1,max_col=1)
data1=Reference(sheet,min_row=2,max_row=32,min_col=2,max_col=2)
#设置图例
bar_chart.add_data(data1)
bar_chart.set_categories(lables1)
sheet.add_chart(bar_chart,"D2")

#3、构建饼图
#创建饼图对象
pie_chart=PieChart()
lables2=Reference(sheet,min_row=2,max_row=32,min_col=1,max_col=1)
data2=Reference(sheet,min_row=2,max_row=32,min_col=2,max_col=2)
#设置图例
pie_chart.add_data(data2)
pie_chart.set_categories(lables2)
sheet.add_chart(pie_chart,"D20")
#4、保存生效
wb.save("/Users/yutao/Desktop/Python示例/file/案例.xlsx")
```

![各省销量（绘图后）](/assets/library/methods/data-analysis-python/default-2.webp)

图20\-4 各省销量（绘图后）
（3）修改单元格格式

```Python
from openpyxl.styles import Alignment,Border,Side,Font
from openpyxl.styles import GradientFill
wb=load_workbook("/Users/yutao/Desktop/Python示例/file/案例.xlsx")
sheet=wb["销量"]

#设置单元格字体
sheet["A1"].font=Font(name="黑体",size=28,bold=True,color="FFC0CB")

#设置单元格背景颜色，填充渐变颜色
sheet["B1"].fill=GradientFill(stop=("FFC0CB","9F5F9F"))
wb.save("/Users/yutao/Desktop/Python示例/file/案例.xlsx")
```

（4）添加图片

```Python
from openpyxl.drawing.image import Image
wb=load_workbook("/Users/yutao/Desktop/Python示例/file/案例.xlsx")
sheet=wb["销量"]
img=Image("/Users/yutao/Desktop/Python示例/file/img.jpeg")
sheet.add_image(img,"D10")
wb.save("/Users/yutao/Desktop/Python示例/file/案例.xlsx")
```

### 3.4 Word处理

2020年初新冠疫情在国内得到很好的控制，各企业开始进行复工，员工返工需要向所在社区提供企业开出的在职证明，人工逐一生成这些文件需要消耗大量的时间，通过python及准备好的文档模板和员工名单可以快速的生成所有员工的在职证明。

![文档模板](/assets/library/methods/data-analysis-python/default-4.webp)

图20\-5  文档模板

![员工名单](/assets/library/methods/data-analysis-python/default-5.webp)

图20\-6  员工名单

```Python
#1、引入所需文件
#pandas模块，用来读取表格，Document用来处理word文档
import pandas as pd
from docx import Document

#2、定义替换函数
def replace_text(old_text,new_text):
    #读取所有段落
    all_paragraphs=document.paragraphs
    #循环每个自然段
    for paragraph in all_paragraphs:
        #循环读取所有的run（格式排版内容的东西统称）
        for run in paragraph.runs:
            #进行新文本替换旧文本
            run_text=run.text.replace(old_text,new_text)
            run.text=run_text
    #读取所有表格（如果word文档中存在表格的话）
    all_tables=document.tables
    #循环每个表格
    for table in all_tables:
        #循环表格中的每一行
        for row in table.rows:
            #循环每个单元格
            for cell in row.cells:
                进行新文本替换旧文本
                cell_text=cell.text.replace(old_text,new_text)
                cell.text=cell_text

#3、读取表格内的内容进行替换
pd=pd.read_excel("/Users/yutao/Desktop/Python示例/file/姓名.xls")
#循环读取每一行的内容
for row in range(0,len(pd)):
    #读取word模板中的内容
    document=Document("/Users/yutao/Desktop/Python示例/file/模板.docx")
    #获取excel的列字段，列字段与模板中所填内容的占位文字一致
    my_col=pd.columns.tolist()
    #获取每一列的内容
    for col in range(0,pd.shape[1]):
        #获取列字段，赋值给旧文本
        old_text=my_col[col]
        new_text=pd.iloc[row,col]
        #进行文字替换
        replace_text(str(old_text),str(new_text))
    #定义文件名为当年excel第一列的内容
    filename=str(pd.iloc[row,0])
    document.save("/Users/yutao/Desktop/Python示例/file/%s.docx"%(filename))
```

## 四、Python科学计算库

### 4.1 Matplotlib可视化

Matplotlib是一个Python 2D绘图库，它可以在各种平台上以各种硬拷贝格式和交互式环境生成出具有出版品质的图形，Matplotlib让简单的事情变得更简单，让无法实现的事情变得可以实现，只需要几行代码即可生成绘图，包含直方图、折线图、条形图、散点图、直方图等。可视化是在这个数据分析的关键辅助工具，Matplotlib可以将数据进行可视化更直观的呈现，使得数据更加客观、更具说服力，通过可视化可以帮助我们清晰的理解数据，从而调整我们的分析方法。

```Python
#导入模块
import matplotlib.pyplot as plt
#在jupyter中执行的时候显示图片
%matplotlib inline
#传入x和y，通过plot画图
plt.plot([1,2,3,4],[4,6,2,8])
#在执行程序的时候展示图形
plt.show()
```

**1、折线图**
折线图是用来显示数据的变化趋势，反应事物的变化情况，以折线的上升或下降表示统计数量的增减变化的统计图。

（1）折线图绘制

```Python
#绘制折线图示例
from matplotlib import pyplot as plt
import random
%matplotlib inline

#生成x,y的坐标值,通过列表表达式生成y坐标值；x与y需要以一一对应
x=range(2,26,2)
y=[random.randint(0,100) for i in x]

#设置图片大小
'''
figsize=(20,10):指定figure的宽和高，单位为英寸（1英寸=2.5）
dpi=8：指定figure的分辨率
'''
plt.figure(figsize=(20,10),dpi=80)

# #根据x,y的坐标值，设置x,y轴的刻度
# plt.xticks(x)
# plt.yticks(y)
#构造x，y轴刻度标签
x_ticks_label=["{}:00".format(i) for i in x]
plt.xticks(x,x_ticks_label,rotation=45)
y_ticks_label=["{}℃".format(i) for i in range(min(y),max(y)+1,10)]
plt.yticks(range(min(y),max(y)+1,10),y_ticks_label)

#设置显示中文
#matplotlib只显示英文，需要引入font_manager可以解决中文显示问题
from matplotlib import font_manager
my_font=font_manager.FontProperties(fname="/System/Library/Fonts/Hiragino Sans GB.ttc",size=18)
#添加坐标轴名称，rotation是指将字体进行旋转度数
plt.xlabel("时间",FontProperties=my_font)
plt.ylabel("温度",rotation=0,FontProperties=my_font)
#添加图片标题
plt.title("CPU温度监测记录",FontProperties=my_font)

#绘制折线、折点
#传入x和y，通过plot画图
#通过plot方法中传入的参数控制折线的颜色、形状
#通过plot方法中传入的参数控制折点的样式
'''
颜色：color="#FF0000"
透明度：alpha=0.8
线的样式：linestyle="--"
线的宽度：linewidth=2
折点的样式：marker="o"
折点的大小：markersize=10
折点的颜色：markerfacecolor="#FF0000"
折点边缘的颜色：markeredgecolor="#FF0000"
折点边缘宽度：markeredgewidth=2
'''
plt.plot(x,y,color="#FF0000",alpha=0.8,linestyle="-",linewidth=2,marker="o")

#绘制坐标
"""
"(%s,%s)"%(a,b)：坐标显示样式
xy=(a,b):x,y轴取的值
xytext=(-10,10)：坐标展示的偏移
textcoords="offset points"：以原点为坐标系
"""
for a,b in zip(x,y):
    plt.annotate("(%s,%s)"%(a,b),xy=(a,b),xytext=(-10,10),textcoords="offset points")
#保存图片
plt.savefig("/Users/yutao/Desktop/Python示例/file/t1.png")
#plt.show()需要放在保存图片后面，否则运行时会释放当前figure，保存了一张空图片
plt.show()
```

![折线图示例](/assets/library/methods/data-analysis-python/HCpybs4DcodShmxzd5icALEAnic.webp)

（2）拓展：一图多线

```Python
#一图多线示例
from matplotlib import pyplot as plt
import random
%matplotlib inline
x=range(2,26,2)
y1=[random.randint(0,100) for i in x]
y2=[random.randint(0,50) for i in x]
plt.figure(figsize=(20,10),dpi=80)
#绘制图片
plt.plot(x,y1,color="red",label="CPU")
plt.plot(x,y2,color="blue",label="RAM")
#绘制图例位置
plt.legend(loc="upper right")
#绘制网格
plt.grid(alpha=0.3)
#保存图片
plt.savefig("/Users/yutao/Desktop/Python示例/file/t2.png")
plt.show()
```

![一图多线](/assets/library/methods/data-analysis-python/WC0mb9zNMowV0IxYPllcAEpSntZ.webp)

（3）拓展：一图多子图

```Python
#一图多子图示例
import matplotlib.pyplot as plt
import numpy as np
x=np.arange(1,100)
#新建图片对象
fig=plt.figure(figsize=(20,10),dpi=80)
#通过add_subplot给figure增加子图，（x,y,n）指的是横向分为x个,竖向分为y个,目前子图在第n个位置
#新建子图1
ax1=fig.add_subplot(2,2,1)
ax1.plot(x,x)
#新建子图2
ax2=fig.add_subplot(2,2,2)
ax2.plot(x,x**2)
#新建子图3
ax3=fig.add_subplot(2,2,3)
ax3.plot(x,x**3)
#新建子图4
ax4=fig.add_subplot(2,2,4)
ax4.plot(x,x**x)
#保存图片
plt.savefig("/Users/yutao/Desktop/Python示例/file/t3.png")
plt.show()
```

![一图多子图](/assets/library/methods/data-analysis-python/MBjrbaH0ho5I87xRyppcVn1Untc.webp)

（4）拓展：设置坐标轴范围

```Python
#设置坐标轴范围示例
import matplotlib.pyplot as plt
import numpy as np
x=np.arange(-10,11,1)
y=x**2
plt.figure(figsize=(20,10),dpi=80)
plt.plot(x,y)
#调整坐标轴显示范围
"""
plt.xlim([-5,5]):控制x轴两端
plt.xlim([xmin=-4):控制x轴最小值
plt.xlim([xmax=4):控制x轴最大值
"""
plt.xlim([-8,8])
plt.ylim([0,80])
plt.savefig("/Users/yutao/Desktop/Python示例/file/t4.png")
plt.show()
```

![设置坐标轴范围](/assets/library/methods/data-analysis-python/RCX6bD2HEoJzJZxMvVacwXohn7d.webp)

（5）拓展：改变坐标轴的默认显示方式

```Python
#改变坐标轴默认显示方式示例
import matplotlib.pyplot as plt
import numpy as np
x=np.arange(-10,11,1)
y=x
plt.figure(figsize=(20,10),dpi=80)
#获取当前图表的图像
ax=plt.gca()
#设置图形的包围线
#none代表不展示对应的包围线
ax.spines["right"].set_color("none")
ax.spines["top"].set_color("none")
ax.spines["bottom"].set_color("red")
ax.spines["left"].set_color("blue")
#设置包围线的移动范围，“data”：移动轴的位置到交叉轴的指定坐标
ax.spines["bottom"].set_position(("data",0))
ax.spines["left"].set_position(("data",-2.5))
plt.plot(x,y)
plt.savefig("/Users/yutao/Desktop/Python示例/file/t4.png")
plt.show()
```

![改变坐标轴默认显示方式](/assets/library/methods/data-analysis-python/FLtsbdac2oPPYLxNkAacu1ofnBg.webp)

**2、散点图**

散点图是用两组数据构成多个坐标点，考察坐标点的分布，判断两变量之间是否存在某种关联或总结坐标点的分布模式的统计图。

```Python
#绘制散点图示例
from matplotlib import pyplot as plt
from matplotlib import font_manager

#生成x,y的坐标值
x=range(1,31)
y=[0,1,1,1.5,1.5,1,1.5,2,3,3,4.5,4.5,3,3.5,4,5,5,3,4,3,2,1.5,1.5,1,1.51,1,1,1,0.5,1]
plt.figure(figsize=(20,10),dpi=80)

#设置显示中文
my_font=font_manager.FontProperties(fname="/System/Library/Fonts/Hiragino Sans GB.ttc",size=18)
#添加坐标轴名称，rotation是指将字体进行旋转度数
plt.xlabel("服务时长",FontProperties=my_font)
plt.ylabel("服务评价",rotation=0,FontProperties=my_font)
#添加图片标题
plt.title("服务评价与服务时长",FontProperties=my_font)

#构造x，y轴刻度标签
x_ticks_label=["{}m".format(i) for i in x]
plt.xticks(x[::2],x_ticks_label[::2],rotation=45)
y_ticks_label=["{}".format(i) for i in range(min(y),max(y)+1,1)]
plt.yticks(range(min(y),max(y)+1,1),y_ticks_label)

#绘制散点图
plt.scatter(x,y,label="2号客服")
#绘制图例位置
plt.legend(loc="upper right",prop=my_font)
plt.savefig("/Users/yutao/Desktop/Python示例/file/t6.png")
plt.show()
```

![散点图示例](/assets/library/methods/data-analysis-python/KJf9baQuDoSS3pxT3Pfc3gsWnTd.webp)

**3、条形图**

条形图是将在工作表中的行、列中的数据进行绘制，方便一眼看出各个数据的大小，比较数据之间的差别的统计图。

（1）竖向条形图

```Python
#绘制条形图示例-竖向
from matplotlib import pyplot as plt
from matplotlib import font_manager

#生成x,y的坐标值
x=["项目经理","产品经理","UI设计师","前端开发工程师","后端开发工程师","运营经理","市场经理","人事经理"]
y=["18.5","15.6","9.2","14.4","22.1","13.4","15.6","7.8"]
plt.figure(figsize=(20,10),dpi=80)

#设置显示中文
my_font=font_manager.FontProperties(fname="/System/Library/Fonts/Hiragino Sans GB.ttc",size=18)
#添加坐标轴名称，rotation是指将字体进行旋转度数
plt.xlabel("岗位",FontProperties=my_font)
plt.ylabel("平均薪酬",rotation=90,FontProperties=my_font)
#添加图片标题
plt.title("某企业岗位与平均薪酬（竖向）",FontProperties=my_font)

#构造x，y轴刻度标签
plt.xticks(range(len(x)),x,FontProperties=my_font)
y_ticks_label=["{}k".format(i) for i in range(0,25,1)]
plt.yticks(range(0,25,1),y_ticks_label)

#绘制条形图
rects=plt.bar(range(len(x)),[float(i) for i in y],width=0.3,color=["red","green","blue","yellow","red","green","blue","yellow"])

#在条形图上加标注
for rect in rects:
    height=rect.get_height()
    plt.text(rect.get_x()+rect.get_width()/2,height+0.3,str(height),ha="center")

plt.savefig("/Users/yutao/Desktop/Python示例/file/t7.png")
plt.show()
```

![竖向条形图示例](/assets/library/methods/data-analysis-python/XIvobqdLwodFM3xGqHHchLLenMg.webp)

（2）横向条形图

```Python
#绘制条形图示例-横向
from matplotlib import pyplot as plt
from matplotlib import font_manager

#生成x,y的坐标值
x=["18.5","15.6","9.2","14.4","22.1","13.4","15.6","7.8"]
y=["项目经理","产品经理","UI设计师","前端开发工程师","后端开发工程师","运营经理","市场经理","人事经理"]
plt.figure(figsize=(20,10),dpi=80)

#设置显示中文
my_font=font_manager.FontProperties(fname="/System/Library/Fonts/Hiragino Sans GB.ttc",size=18)
#添加坐标轴名称，rotation是指将字体进行旋转度数
plt.xlabel("平均薪酬",FontProperties=my_font)
plt.ylabel("岗位",rotation=90,FontProperties=my_font)
#添加图片标题
plt.title("某企业岗位与平均薪酬（竖向）",FontProperties=my_font)

#构造x，y轴刻度标签
x_ticks_label=["{}k".format(i) for i in range(0,25,1)]
plt.xticks(range(0,25,1),x_ticks_label)
plt.yticks(range(len(y)),y,FontProperties=my_font)

#绘制条形图
rects=plt.barh(range(len(y)),[float(i) for i in x],height=0.3,color=["red","green","blue","yellow","red","green","blue","yellow"])

#在条形图上加标注
for rect in rects:
    width=rect.get_width()
    plt.text(width+0.3,rect.get_y()+rect.get_height()/2,str(width),va="center")

plt.savefig("/Users/yutao/Desktop/Python示例/file/t8.png")
plt.show()
```

![横向条形图示例](/assets/library/methods/data-analysis-python/U7m2bPcfUo1YijxtnoFcbNCVnjg.webp)

（3）并列和罗列条形图

```Python
#并列和罗列条形图示例
from matplotlib import pyplot as plt
fig=plt.figure(figsize=(20,10),dpi=80)
#新建子图1
ax1=fig.add_subplot(1,2,1)
#新建子图2
ax2=fig.add_subplot(1,2,2)

x=[1,2,3,4]
y1=[50,60,55,62]
y2=[22,34,27,55]

#并列
ax1.bar([float(i) for i in x],y1,width=0.3,color="green")
ax1.bar([float(i+0.3) for i in x],y2,width=0.3)
plt.xticks(range(1,5),x)

#罗列
ax2.bar([float(i) for i in x],y1,width=0.3,color="green")
ax2.bar([float(i) for i in x],y2,bottom=y1,width=0.3)

plt.savefig("/Users/yutao/Desktop/Python示例/file/t9.png")
plt.show()
```

![并列和罗列条形图示例](/assets/library/methods/data-analysis-python/YpHLbVxdeoKkQVxCjUPcCYVvnFf.webp)

**4、直方图**

直方图是用一系列高度不等的纵向条纹或线段表示数据分布的情况的统计图，一般情况下横轴表示数据范围，纵轴表示分布情况。

```Python
#直方图示例
from matplotlib import pyplot as plt
from matplotlib import font_manager
fig=plt.figure(figsize=(20,10),dpi=80)
st_result=[85, 89, 57, 46, 114, 83, 108, 134, 132, 92, 83, 61, 92, 92, 80, 100, 48, 56, 132, 131, 144, 48, 45, 131, 133, 113, 114, 77, 60, 127, 89, 150, 106, 100, 101, 52, 149, 81, 75, 41, 84, 109, 66, 40, 54, 114, 119, 123, 45, 70, 75, 44, 114, 64, 89, 70, 137, 114, 92, 51, 69, 142, 49, 77, 101, 51, 48, 41, 108, 57, 114, 137, 94, 91, 109, 84, 117, 80, 41, 116, 70, 63, 140, 138, 128, 104, 129, 139, 131, 50, 59, 54, 41, 117, 141, 96, 143, 127, 132, 67, 53, 123, 65, 147, 47, 107, 56, 47, 41, 133, 143, 41, 78, 45, 91, 71, 93, 113, 128, 105, 109, 114, 44, 42, 79, 63, 61, 105, 92, 62, 64, 41, 113, 77, 81, 95, 90, 109, 59, 138, 145, 142, 109, 122, 107, 46, 105, 145, 120, 91, 136, 135, 99, 51, 121, 82, 104, 122, 148, 94, 52, 98, 122, 128, 61, 73, 117, 73, 149, 114, 77, 60, 83, 100, 115, 133, 80, 97, 105, 122, 147, 48, 131, 74, 143, 46, 97, 88, 102, 102, 43, 129, 144, 65, 105, 140, 106, 91, 133, 77, 123, 83, 137, 84, 91, 130, 89, 89, 119, 42, 55, 115, 79, 141, 55, 136, 71, 108, 72, 118, 93, 79, 146, 104, 103, 85, 40, 44, 72, 71, 122, 141, 96, 49, 103, 117, 95, 149, 92, 62, 91, 50, 87, 147, 49, 56, 129, 73, 130, 96, 108, 116, 137, 122, 75, 63, 119, 127, 95, 138, 124, 137, 80, 45, 67, 51, 135, 109, 92, 138, 87, 119, 45, 65, 102, 136, 56, 71, 48, 140, 130, 131, 113, 44, 42, 83, 124, 70, 148, 52, 80, 104, 146, 52, 126, 132, 139, 45, 83, 95]

#设置组距
distance=2
#计算组数
group_num=int((max(st_result)-min(st_result))/distance)

#构造x轴刻度标签
plt.xticks(range(min(st_result),max(st_result))[::2])

#设置显示中文
my_font=font_manager.FontProperties(fname="/System/Library/Fonts/Hiragino Sans GB.ttc",size=18)
#添加坐标轴名称，rotation是指将字体进行旋转度数
plt.xlabel("分数",FontProperties=my_font)
plt.ylabel("人数",rotation=90,FontProperties=my_font)
#添加图片标题
plt.title("某学校高一数学模拟考试成绩分布",FontProperties=my_font)

#绘制直方图
plt.hist(st_result,bins=group_num)

plt.savefig("/Users/yutao/Desktop/Python示例/file/t10.png")
plt.show()
```

![直方图示例](/assets/library/methods/data-analysis-python/DqaybZRyToQ5Kpx3N4rceMIUnlc.webp)

**5、饼状图**

饼状图是用于表示不同分类的占比情况，通过弧度大小来对比各种分类的统计图。

```Python
#饼状图示例
from matplotlib import pyplot as plt
from matplotlib import font_manager
plt.figure(figsize=(20,15),dpi=80)

#新建变量赋值饼状图关键元素
label_list=["余额支付","微信支付","支付宝支付","花呗支付","快捷支付","线下收款"]
size=[10,25,30,17,14,4]
color=["#33CCFF","#33FF99","#3399FF","#9966FF","#FFCCFF","#666666"]
explode=[0,0,0,0.05,0,0]

#绘制饼图
"""
explode:设置各部分突出
label:设置各部分标签
labeldistance:设置标签文本距离圆心位置，1.1代表1.1倍的半径
autopct:设置园内文本
shadow:设置是否有阴影
startangle:起始角度，默认从0开始逆时针转
pctdistance:设置园内文本距离圆心距离

返回值：
patches:扇形实例
l_text:标签实例
p_text:百分比标签实例
"""
patches,l_text,p_text=plt.pie(size,explode=explode,colors=color,labels=label_list,labeldistance=1.05,autopct="%1.1f%%",shadow=False,startangle=90,pctdistance=0.7)

#设置显示中文
my_font=font_manager.FontProperties(fname="/System/Library/Fonts/Hiragino Sans GB.ttc",size=14)
#设置标签为中文
for t in l_text:
    t.set_fontproperties(my_font)

#设置圆内百分比字体大小
for p in p_text:
    p.set_size(14)
    
#
for i in patches:
    pass

#设置图例
plt.legend(prop=my_font,loc="upper right")
plt.savefig("/Users/yutao/Desktop/Python示例/file/t11.png")
plt.show()
```

![饼状图示例](/assets/library/methods/data-analysis-python/QoQfbhd6qooKP9xhENAcgHzinzh.webp)

### 4.2 NumPy科学计算库

NumPy是一个开源的Python科学计算库，用于快速处理任意维度的数组，NumPy支持常见的数组和矩阵操作，对于同样的数值计算任务，使用NumPy比直接使用Python要简洁得多，NumPy使用ndarray对象来处理多维数组，该对象是一个快速而灵活的大数据容器。

NumPy最重要的一个特点是其N维数组对象ndarray，它是一系列同类型数据的集合，以0下标为开始进行集合中元素的索引。ndarray对象是用于存放同类型元素的多维数组。

**1、Ndarray对象介绍**

```Python
#Ndarry对象示例1
import numpy as np

#创建一维数组
#1、直接传入列表
t1=np.array([1,2,3,4,5])
print(t1)
#2、传入range生成序列
t2=np.array(range(5))
print(t2)
#使用numpy自带的np.arange()生成数组
t3=np.arange(0,10,2)
print(t3)

#创建二维数组
list1=[[1,2],[3,4],[5,6]]
t4=np.array(list1)
print(t4)

#常用属性
#1、数组的维度ndim
print(t4.ndim)
#2、数组的形状shape
print(t4.shape)
#3、数组内有多少个元素size
print(t4.size)

#调整数组的形状
array_one=np.array([[1,2,3],[4,5,6]])
print(array_one)
#1、在原有数组基础上进行修改
array_one.shape=(3,2)
print(array_one)
#2、不修改原数组，返回一个新的数组
array_one_other=array_one.reshape(6,1)
print(array_one_other)

#将多维数组变成一维数组
#默认情况下”C“以行为主的顺序展开，”F“代表以列的顺序展开
#1、通过reshape实现
array_two=np.array([[1,2,3],[4,5,6],[7,8,9]])
array_three=array_two.reshape((9,),order="F")
print(array_three)
#2、通过flatten实现
array_four=array_two.flatten(order="C")
print(array_four)

#将一维数组变成多维数组
#1、一维数组转换为二维
array1=np.arange(12)
array2=array1.reshape((2,6))
print(array1)
print(array2)
#1、一维数组、二维数组转换为三维数组
array3=array1.reshape((2,2,3))
array4=array2.reshape((2,3,2))
print(array3)
print(array4)

#将数组转成列表list
array_a=np.arange(10)
list_a=array_a.tolist()
print(list_a)
```

对于数组而言，具有以下类型：

|名称|描述|
|---|---|
|np\.bool|用一个字节存储的布尔类型（True或False）|
|np\.int8|整数，\-128至127，1个字节|
|np\.int16|整数，\-32768至32767，2个字节|
|np\.int32|整数，\-2**31至2**32\-1，4个字节|
|np\.int64|整数，\-2**63至2**64\-1，8个字节|
|np\.uint8|无符号整数，0至25|
|np\.uint16|无符号整数，0至65535|
|np\.uint32|无符号整数，0至2\*\*32\-1|
|np\.uint64|无符号整数，0至2\*\*64\-1|
|np\.float16|半精度浮点数：16位，正负号1位，指数5位，精度10位|
|np\.float32|单精度浮点数：32位，正负号1位，指数8位，精度23位|
|np\.float64|双精度浮点数：64位，正负号1位，指数11位，精度52位|
|np\.complex64|复数，分别用两个32位浮点数表示实部和虚部|
|np\.complex128|复数，分别用两个64位浮点数表示实部和虚部|
|np\.object\_|python对象|
|np\.string\_|字符串|
|np\.unicode\_|unicode类型|

```Python
#Ndarry对象示例2
import numpy as np
import random
#NumPy的数据类型
a_array=np.array([1,2,3,4,5],dtype=np.int16)
#返回数组中每个元素的字节单位长度
print(a_array.itemsize)
#1、获取数组内数据的数据类型
print(a_array.dtype)
#2、调整数据类型
b_array=a_array.astype(np.int32)
print(b_array.dtype)

#随机生成小数（保留小数点后两位）
#1、原python语法
print(round(random.random(),2))
#数组的做法
c_array=np.array([random.random() for i in range(10)])
print(np.round(c_array,2))
```

数组与字符串、列表一样存在索引，也可以进行切片，修改数值操作，只是相对于字符串、列表而言，由于数组存在多维的情况，对应操作的复杂度也有一定的上升：

```Python
#Ndarry对象示例3
import numpy as np

#数组的索引和切片
#1、一维数组的操作方法
#冒号分隔切片参数 start:stop:step 来进行切片操作
a=np.array(range(10))
print(a[2:7:2])
#如果只放置一个参数，如[2]，将返回与该索引相对应的单个元素
print(a[3],a)
#如果为[3:],表示从该索引开始以后的所有项都将被提取
print(a[3:])

#2、多维数组的操作方法
b=np.arange(20).reshape(5,4)
print(b)
#取一行（一行是代表一条数据，索引也是从0开始的）
print(b[1])
#取一行
print(b[1,:])
#取连续的多行
print(b[1:])
print(b[1:3])
print(b[1:3,])
#取不连续的多行
print(b[[0,2,3]])
print(b[[0,2,3],:])
#取一列
print(b[:,1])
#取连续的多列
print(b[:,1:])
#取不连续的多列
print(b[:,[0,2,3]])

#取某个值
print(b[2,3])#三行四列的值
#取多个不连续的值
print(b[[0,1,1],[0,1,3]])#[[行，行，行。。。][列，列，列。。。]]

#数组中的数值修改
c=np.arange(12).reshape(3,4)
#1、直接修改
#修改某一行的值
c[0,:]=0
#修改某一列的值
c[:,1]=0
#修改连续多行
c[1:]=1
#修改连续多列
c[:,1:3]=2
#修改多行多列
c[1:3,2:4]=5#取第二行到第三行，第三列到第四列
#修改多个不相邻的点
c[[0,1,2],[1,3,0]]=10#[[行，行，行。。。][列，列，列。。。]]

#2、根据条件修改
#大于、小于、等于
c[c<5]=0
#与&、或|、非~
c[(c>0)&(c<10)]=6
c[(c<6)|(c>10)]=1
c[~(c>=6)]=5
#三目运算(np.where(condition,x,y)满足条件(condition)输出x，不满足输出y)
result=np.where(c>6,True,False)
print(result)
print(c)
```

**2、数组的计算**

（1）数组的轴的计算

在Numpy中轴的概念可以理解为方向，使用0，1，2数字表示，对一维数组而言，只有一个0轴；对于二维数组而言，有0轴、1轴；对于三维数组而言，有0轴、1轴、2轴。有了轴的概念后，我们计算会更加方便，比如计算一个二维数组的平均值，指定计算哪个方向上的数字的平均值即可。

```Python
#数组的轴示例
#创建一个二维数组
import numpy as np
a=np.arange(12).reshape(3,4)
print(a)
#计算0轴的数字之和
print(np.sum(a,axis=0))
#计算1轴的数字之和
print(np.sum(a,axis=1))
#计算整个数组数字之和
print(np.sum(a))

#创建一个三维数组
b=np.arange(12).reshape(2,2,3)
print(b)
#计算0轴的数字之和
print(np.sum(b,axis=0))
#计算1轴的数字之和
print(np.sum(b,axis=1))
#计算2轴的数字之和
print(np.sum(b,axis=2))
#计算整个数组数字之和
print(np.sum(b))
```

（2）数组与数的计算

```Python
#数组与数的计算示例
#创建一个二维数组
import numpy as np
a=np.arange(12).reshape(3,4)
print(a)
#数组与数的加法
print(a+1)
#数组与数的乘法
print(a*2)
#数组与数的除法
print(a/2)
```

（3）数组与数组的计算

```Python
#数组与数组之间的操作
#同种形状的数组（对应位置进行计算操作）
import numpy as np
a=np.arange(9).reshape(3,3)
b=np.arange(10,19).reshape(3,3)
print(a)
print(b)
print(a+b)
print(a*b)

#不同形状的多维数组不能计算,会报错：operands could not be broadcast together with shapes (2,3) (3,2) 
m=np.arange(6).reshape(2,3)
n=np.arange(6).reshape(3,2)
print(m)
print(n)
print(m+n)
print(m*n)

#行数或列数相同的一维数组和多维数组可以进行计算
#行形状相同
t1=np.arange(6).reshape(2,3)
t2=np.arange(3)
print(t1-t2)
#列形状相同
t3=np.arange(6).reshape(2,3)
t4=np.arange(2).reshape(2,1)
print(t3+t4)
```

（4）NumPy的计算方法

```Python
#NumPy的计算方法示例
import numpy as np
score=np.array([[80,92],[78,98],[88,68]])

#1、获取所有数据最大值
result=np.max(score)

#2、获取某一个轴上的数据最大值
result=np.max(score,axis=0)

#3、获取所有数据最小值
result=np.min(score)

#4、获取某一轴上的数据最小值
result=np.min(score,axis=1)

#5、数据的比较
result=np.maximum([1,2,3,4,5],3)#第一个参数中的每一个数与第二个参数比较返回大的
result=np.minimum([1,2,3,4,5],3)#第一个参数中的每一个数与第二个参数比较返回小的
result=np.maximum([1,2,3,4,5],[-2,0,2,4,6])#数组形状一样，第一个参数中的每一个数与第二个参数中的每一个数比较返回大的

#6、求平均值
#获取所有数据的平均值
result=np.mean(score)
#获取某一行或者某一列的平均值
result=np.mean(score,axis=0)

#7、返回给你轴上的累计和
result=score.cumsum(0)

#8、argmin求最小值索引
result=np.argmin(score,axis=0)

#9、求每一列的标准差
#标准差是一组数据平均值分散程度的一种度量，一个较大的标准差，代表大部分数值和平均值之间差异较大
#一个较小的标准差，代表这些数据较接近平均值反应出数据的波动稳定情况，越大表示波动越大，越不稳定
result=np.std(score,axis=0)

#10、极值
result=np.ptp(score,axis=0)
```

除了以上函数外，还有以下常用的函数：

|函数|描述|
|---|---|
|numpy\.sqrt\(array\)|平方根函数|
|numpy\.abs\(array\)numpy\.fabs\(array\)|计算绝对值|
|numpy\.square\(array\)|计算各元素的平方|
|numpy\.log\(array\)numpy\.log10\(array\)numpy\.log2\(array\)|计算各元素的各种对数|
|numpy\.sign\(array\)|计算个元素正负号|
|numpy\.isnan\(array\)|计算各元素是否为NaN|
|numpy\.isinf\(array\)|计算各元素是否为Inf|
|numpy\.cos\(array\)numpy\.cosh\(array\)numpy\.sin\(array\)numpy\.sinh\(array\)numpy\.tan\(array\)numpy\.tanh\(array\)|三角函数|
|numpy\.modf\(array\)|将数组中元素的整数和小数分离，返回两个数组|
|numpy\.ceil\(array\)|向上取整，也就是取比这个数大的整数|
|numpy\.floor\(array\)|向下取整，也就是取比这个数小的整数|
|numpy\.rint\(array\)|四舍五入|
|numpy\.trunc\(array\)|向0取整|
|numpy\.add\(array1，arry2\)|元素级加法|
|numpy\.subtract\(array1，arry2\)|元素级减法|
|numpy\.mulitply\(array1，arry2\)|元素级乘法|
|numpy\.divide\(array1，arry2\)|元素级除法|
|numpy\.power\(array1，arry2\)|元素级指数|
|numpy\.fmax\(array1，arry2\)|元素级最大值，忽略NaN|
|numpy\.fmin\(array1，arry2\)|元素级最小值，忽略NaN|
|numpy\.mod\(array1，arry2\)|元素级求模|
|numpy\.copysign\(array1，arry2\)|将第二数组中元素的符号赋值给第一个数组中的元素|
|numpy\.greater\(array1，arry2\)numpy\.greater\_equal\(array1，arry2\)numpy\.less\(array1，arry2\)numpy\.less\_equal\(array1，arry2\)numpy\.equal\(array1，arry2\)numpy\.not\_equal\(array1，arry2\)|元素级比较运算，产生布尔数组|
|numpy\.logical\_end\(array1，arry2\)numpy\.logical\_or\(array1，arry2\)numpy\.logic\_xor\(array1，arry2\)|元素级的真值逻辑运算|

**3、数组的操作**

（1）数组的添加、删除、去重

```Python
#数组的添加示例
#1、numpy.append函数在数组的末尾添加值，追加操作会分配整个数组，并把原来的数组复制到新数组中。
#需要注意的是，使用append输入数组的维度必须匹配否则将产生错误
"""
arr：输入数组 
values:要向arr添加的值，需要和arr形状相同（除了要添加的轴）
axis：默认为None，当axis无定义时，是横向添加，返回总是为一维数组；当axis有定义的时候，指的是沿对应轴添加元素，需要保证其他轴形状一致
"""
import numpy as np
a=np.array([[1,2,3,],[4,5,6]])
print(a)

#向数组添加元素
print(np.append(a,[7,8,9]))

#沿0轴添加元素
print(np.append(a,[[7,8,9]],axis=0))

#沿1轴添加元素
print(np.append(a,[[7,8,9],[10,11,12]],axis=1))

#2、numpy.insert函数在给定索引之前，沿给定轴在输入数组中插入元素
#当axis有定义的时候，指的是沿对应轴添加元素，需要保证其他轴形状一致

#未传递axis参数，数组会被展开后插入对应的元素
print(np.insert(a,3,[7,8]))

#传递axis参数，沿0轴插入
print(np.insert(a,1,[7],axis=0))

#传递axis参数，沿1轴插入
print(np.insert(a,1,[7,8],axis=1))
```

```Python
#数组的删除示例
#numpy.delete函数返回从输入数组中删除指定子数组的新数组，与insert函数一样，如果未提供axis参数，则输入数组展开
"""
arr：输入数组
objz：可以被切片，整数或整数数组，表明要从输入数组删除的子数组
axis：沿着对应的轴删除子数组，如果没有提供，则数组会被展开
"""

import numpy as np
a=np.arange(12).reshape(3,4)
print(a)

#未传递axis参数，数组会被展开后删除对应的子数组
#删除展开后数组为索引为5、7的元素
print(np.delete(a,[5,7]))

#传递axis参数，沿0轴删除
#删除数组中第1、2两行
print(np.delete(a,[0,1],axis=0))
```

```Python
#数组的去重示例
#numpy.unique函数用于去除数组中重复元素
"""
arr:输入数组，如果不是一维数组则会展开
return_index:如果未True，返回新列表元素在旧列表中的位置（索引），并以列表的形式存储 
return_inverse:如果未True，返回旧列表元素在新列表中的位置（索引），并以列表的形式存储
return_counts:如果为True，返回去重数组中的元素在原数组中的出现数组
"""
import numpy as np
a=np.array([1,2,3,2,4,3,1,2,5,6,7,4])
print(a)

#数组的去重
print(np.unique(a))

#去重数组+新数组内元素在原数组中的位置
print(np.unique(a,return_index=True))

#去重数组+原数组元素在新数组中的位置
print(np.unique(a,return_inverse=True))

#去重数组+新数组内元素在原数组出现的次数
print(np.unique(a,return_counts=True))
```

（2）数组的拼接

```Python
#数组的拼接示例
#要求被连接的数组的维度相同
import numpy as np
a=np.array([[1,2],[3,4]])
b=np.array([[5,6],[7,8]])

#1、根据轴连接数组
print(np.concatenate((a,b),axis=0))
print(np.concatenate((a,b),axis=1))

#2、根据轴进行堆叠,数组维度增加
print(np.stack((a,b),axis=0))
print(np.stack((a,b),axis=1))

#矩阵垂直拼接
v1=[[1,2,3],[4,5,6]]
v2=[[7,8,9],[10,11,12]]
print(np.vstack((v1,v2)))

#矩阵的水平拼接
v1=[[1,2,3],[4,5,6]]
v2=[[7,8,9],[10,11,12]]
print(np.hstack((v1,v2)))
```

（3）数组的分割

```Python
#数组的分割示例
#1、numpy.split函数将一个数组分割为多个子数组
"""
arr：被分割的数组
indices_or_sections:如果是一个整数，就用该数平均切分；如果是一个数组，为沿轴切分的位置
axis:沿着哪个维度进行切向，默认为0，横向切分；为1时，纵向切分
"""

import numpy as np
a=np.arange(12).reshape(3,4)
print(np.split(a,3,axis=0))

#2、numpy.hsplit函数用于水平分割数组，通过指定要返回的相同形状的数组数量来拆分原数组
print(np.hsplit(a,2))

#3、numpy.vsplit函数用于垂直分割数组，通过指定要返回的相同形状的数组数量来拆分原数组
print(np.vsplit(a,3))
```

（4）二维数组的转置

```Python
#二维数组的转置示例
#兑换数组的维度
import numpy as np
a=np.arange(12).reshape(3,4)
#方式1
print(np.transpose(a))
#方式2
print(a.T)
#方式3
print(a.swapaxes(1,0))
```

**4、数组的nan和inf**

```Python
#nan与inf示例
#解释
#inf表示无穷大，nan表示缺失的数据，任何数据与nan做运算，结果都是nan
#需要注意的是nan！=nan
import numpy as np
#判断数组中为nan的个数（float类型的数据才能赋值nan）
t=np.arange(24,dtype=float).reshape(4,6)
#使用numpy.count_nonzero函数判断非零的个数
print(np.count_nonzero(t))
#将两行两列位置的数据修改为nan
t[1,1]=np.nan
#由于nan！=nan，所以通过以下方式可以获取数组中nan的个数
print(np.count_nonzero(t!=t))

#案例
m=np.arange(24,dtype=float).reshape(4,6)
m[1,2:]=np.nan
print(m)
#遍历每一列，判断每一列是否有nan
for i in range(m.shape[1]):
    #获取当前列数据
    col=m[:,i]
    #判断当前列的数据是否含有nan
    nan_num=np.count_nonzero(col!=col)
    #条件成立代表当前列存在nan
    if nan_num!=0:
        #将这一列不为nan的数据拿出来
        col_not_nan=col[col==col]
        #将nan替换成这一列的平均值
        col[np.isnan(col)]=np.mean(col_not_nan)
print(m)      
```

### 4.3 Pandas科学计算库

Pandas是基于NumPy的一种工具，该工具是为了解决数据分析任务而创建的，Pandas纳入了大量库和一些标准的数据模型，提供了高效操作大型数据集所需的工具，提供了大量能使我们快速便捷地处理数据的函数和方法。

Pandas存在两种数据类型，分别为Series与Dataframe。Series是Pandas中最基本的对象，Series类似一种一维数组，事实上，Series基本就是基于NumPy的数组对象来的，和NumPy的数组不同，Series能为数据自定义标签，也就是索引，然后通过索引来访问数组中的数据。Dataframe是一个二维的表结构，Pandas的Dataframe可以存储多种不同的数据类型，并且每一个坐标轴都有自己的标签，这有点类似与一个Series的字典项。

**1、Series对象**

```Python
#Series对象示例
import pandas as pd 
from pandas import Series,DataFrame
import numpy as np

#1、创建Series对象并省略索引
"""
index参数是可省略的，如果不带index参数，pandas会自动用默认索引，类似于数组的索引：[0,1,2,3,...]

"""
#方式1:省略index参数，传入数据列表
sel=Series([1,2,3,4,5])
print(sel)
#方式2：分别传入数据列表和索引列表（展开）
sel=Series(data=[1,2,3,4,5],index=["一","二","三","四","五"])
print(sel)
#方式3:分别传入数据列表和索引列表（list）
sel=Series(data=[1,2,3,4,5],index=list("一二三四五"))
print(sel)
#方式4：将字典转换为Series
dict={"一":1,"二":2,"三":3,"四":4,"五":5}
sel=Series(dict)
print(sel)

#2、获取Series整体内容
#获取所有索引
print(sel.index)
#获取索引与数据，即键值对
print(list(sel.iteritems()))

#3、获取Series数据：通过位置下标或标签下标
#获取所有数据
print(sel.values）
#获取具体的数据
print("标签下标",sel["二"])
print("位置下标",sel[1])
#获取不连续的数据
print("标签下标",sel[["二","四"]])
print("位置下标",sel[[1,3]])
#使用切片取数据
print("位置切片",sel[1:3])#左包含，右不包含
print("索引切片",sel["二":"四"])#左右都包含

#4、重新赋值Series索引、数据
#重新赋值索引的值
sel.index=list("abcde")#直接在原Series中修改
print(sel)
"""
reindex重新索引，并不是在原Series中进行修改，只是利用原Series中的索引进行重新排序，然后返回新的Series
"""
sel_new=sel.reindex(list("ABCDE"))
print(sel)
print(sel_new)
sel_new2=sel.reindex(list("badce"))
print(sel)
print(sel_new2)
#重新赋值数据
sel["a"]=100
sel[1]=200
print(sel)

#5、删除指定的键值对
"""
inplace的值如果为True，则在原来的Series中进行修改，不会生成新的Series；如果为False，则不会修改原Series，会生成新的Series
"""
sel_new3=sel.drop(["a","c"],inplace=False)#传入的索引需要为标签索引
print(sel_new3)
print(sel)

sel_new4=sel.drop(["a","c"],inplace=True)#传入的索引需要为标签索引
print(sel_new4)
print(sel)
```

Series可以进行算数运算操作，对Series的算数运算都是基于index进行的，我们可以用加减乘除（\+，\-，\*，/）这样的运算符对两个Series进行运算，Pandas将会根据索引index对相应的数据进行计算，结果将会以浮点数的形式存储以避免丢失精度。如果Pandas在两个Series里找不到相同的index对应的位置就会返回NaN。

```Python
#Series算术运算操作示例
import pandas as pd 
from pandas import Series,DataFrame
import numpy as np

#加减乘除运算
sel1=Series([1,2,3,4,5],["产品经理","数据分析师","UI设计师","前端开发工程师","后端开发工程师"])
sel2=Series([1,5,5,7],["产品经理","UI设计师","测试工程师","运营经理"])
print(sel2-sel1)
print(sel2+sel1)
print(sel2*sel1)

#数组运算
sel=Series([1,2,3,4],["a","b","c","d"])
print(sel[sel>2])#布尔数组过滤
print(sel*2)#数组与数的计算
print(np.square(sel))#使用numpy数学函数
```

**2、DataFrame对象**

DataFrame（数据表）是一种二维数据结构，数据以表格的形式存储，分为若干行和列，通过DataFrame，能够很方便地处理数据，常见的操作有：选取、替换行或列的数据，重组数据表、修改索引、多重筛选。基本上可以把DataFrame理解成一组采用同样索引的Series的集合。

```Python
#DataFrame对象示例1
import pandas as pd 
from pandas import Series,DataFrame
import numpy as np

#1、创建DataFrame对象
"""
index参数是可省略的，如果不带index参数，pandas会自动用默认索引，类似于数组的索引：[0,1,2,3,...]
columns参数是可省略的，如果不带columns参数，pandas会自动用默认索引，类似于数组的索引：[0,1,2,3,...]
"""
#方式1：传入二维数组
df=DataFrame(np.arange(16).reshape(4,4),index=[1,2,3,4],columns=["a","b","c","d"])
print(df)
#方式2：将字典转换为DataFrame
dict={
    "name":["山风","芋头","小青"],
    "age":[30,28,27],
    "job":["产品经理","数据分析师","花艺师"]
}
df=DataFrame(dict,index=[1,2,3])#列已经在字典中定义了，重新定义会导致出现NaN
print(df)
#方式3：使用from_dict方法转化字典,默认生成行索引
df=DataFrame.from_dict(dict)
print(df)
#方式4：将Series转化为DataFrame
"""
通过这种方式，相同的index会对应起来，如果对应不上的，缺少的值会添加NaN
"""
data={
    "name":Series(["山风","芋头","小青"],[1,2,3]),
    "age":Series([30,28,27],[1,2,3]),
    "job":Series(["产品经理","数据分析师","花艺师"],[1,2,3])
}
df=DataFrame(data)
print(df)

#2、获取DataFrame整体内容
#获取行索引
print(df.index.tolist())
#获取列索引
print(df.columns.tolist())
#获取行数与列数
print(df.shape)
#获取数据的类型
print(df.dtypes)
#获取数据的维度
print(df.ndim)
#获取整体概览
print(df.info())
#展示头几行，默认显示5行
print(df.head(2))
#展示尾几行，默认显示5行
print(df.tail(2))

#3、获取DataFrame数据
#获取所有的数据
print(df.values)
#获取一行
print(df[0:1])
#获取多行
print(df[1:3])
#获取一列
print(df["name"])#返回的是一个Series
#获取多列
print(df[["name","job"]])#返回的是一个DataFrame
#获取多行里面的多列
print(df[1:3][["name","job"]])
"""
除了以上方法，还可以通过df.loc,df,iloc
df.loc:通过标签索引获取行数据 
df.iloc:通过位置索引获取行数据
"""
data={
    "name":Series(["山风","芋头","小青"],["a","b","c"]),
    "age":Series([30,28,27],["a","b","c"]),
    "job":Series(["产品经理","数据分析师","花艺师"],["a","b","c"])
}
df=DataFrame(data)
print(df)
#获取某一行某一列的数据
print(df.loc["a","name"])
#获取一行
print(df.loc["a"])
print(df.iloc[0])
#获取某一列
print(df.loc[:,"name"])
print(df.iloc[:,0])
#获取一行某列的数据
print(df.loc["a",["name","job"]])
print(df.iloc[1,[0,2]])
#获取多行多列的数据
print(df.loc[["a","b"],["name","job"]])
print(df.loc["a":"c",["name","job"]])
print(df.iloc[[0,1],[0,1]])
print(df.iloc[0:3,[0,1]])
```

DataFrame与Series一样，同样可以对索引和数据进行重新赋值：

```Python
#DataFrame对象示例2
import pandas as pd 
from pandas import Series,DataFrame
import numpy as np
data={
    "name":Series(["山风","芋头","小青"],["a","b","c"]),
    "age":Series([30,28,27],["a","b","c"]),
    "job":Series(["产品经理","数据分析师","花艺师"],["a","b","c"])
}
df=DataFrame(data)
print(df)
#1、重新赋值DataFrame索引
#修改index
df.index=["行1","行2","行3"]
print(df)
#修改colums
df.columns=["名字","年龄","职业"]
print(df)
#通过DataFrame.rename方法同样可以修改索引
"""
inplace的值如果为True，则在原来的DataFrame中进行修改，不会生成新的DataFrame；如果为False，则不会修改原DataFrame，会生成新的DataFrame
"""
df.rename(index={"行1":"1","行2":"2","行3":"3"},columns={"名字":"name","年龄":"age","职业":"job"},inplace=True)
print(df)

#2、将某行/某列转化为索引
#列转化为行索引
df.set_index("name",drop=False,inplace=True)#drop设置为False表示保留作为索引的列
df.index.name=None
print(df)

#行转化为列索引
df.set_axis(df.iloc[1],axis=1,inplace=True)
df.columns.name=None
print(df)

#3、重新赋值数据
df.iloc[1,2]="数据产品经理"
print(df)

#补充：DataFrame排序
data={
    "name":Series(["山风","芋头","小青"],["a","b","c"]),
    "age":Series([30,28,27],["a","b","c"]),
    "job":Series(["产品经理","数据分析师","花艺师"],["a","b","c"])
}
df=DataFrame(data)
df=df.sort_values(by="age",ascending=True)#True是升序，False是降序
print(df)
```

```Python
#DataFrame对象示例3
#添加数据
import pandas as pd 
from pandas import Series,DataFrame
import numpy as np
data={
    "name":Series(["山风","芋头","小青"],["a","b","c"]),
    "age":Series([30,28,27],["a","b","c"]),
    "job":Series(["产品经理","数据分析师","花艺师"],["a","b","c"])
}
df=DataFrame(data)
print(df)

#添加一列数据
#1、直接添加
df["pay"]=[10000,12000,5000]
print(df)

#2、使用insert方法1
"""
在某个具体位置插入一列可以用insert的方法
语法格式：
列表.insert(index,obj)
index指的是对象obj需要插入的索引位置；obj指的要插入列表的对列名
"""
col_name=df.columns.to_list()
col_name.insert(3,"years")
df2=df.reindex(columns=col_name)#刚插入时，整列都是NaN
print(df2)
df2["years"]=[2,3,2]
print(df2)
print(df)
#3、使用insert方法2
"""
df.insert(iloc,column,value)
iloc:要插入的位置
column：列名
value：值
"""
df.insert(3,"years",[3,5,5])
print(df)

#添加一行数据
#1、直接添加
df.loc["d"]=["小王","29","厨子","1","8000"]
print(df)
print("*"*30)
#2、使用append方法
new_df=DataFrame([["小李","26","司机","2","5000"]],columns=["name","age","job","years","pay"])
print(new_df)
df=df.append(new_df,ignore_index=True)#ignore_index=True，表示不按照原来的索引，从0开始递增
print(df)

#DataFrame合并
#使用concat方法
"""
concat(objs,axis,ignore_index)
objs：合并对象 
axis:合并方式，默认0表示按列合并，1表示按行合并
ignore_indexg:是否忽略索引
"""
df1=DataFrame(np.arange(6).reshape(2,3),columns=["a","b","c"])
df2=DataFrame(np.arange(6).reshape(3,2),columns=["d","e"])
print(df1)
print(df2)
result=pd.concat([df1,df2],axis=0,ignore_index=False)
print(result)

#DataFrame删除
#使用drop方法
"""
drop(lables,axis,inplace)
lables:要删除数据的标签 
axis：0表示删除行，1表示删除列，默认0
inplace:是否在当前DataFrame中执行此操作
"""
df=DataFrame(np.arange(6).reshape(2,3),columns=["a","b","c"])
print(df)
df.drop(["b"],axis=1,inplace=True)
print(df)
```

**3、数据处理**

在日常数据分析工作中，获取到手的数据量将会非常庞大，但是这些数据经常会出现一些数据异常情况，例如需要处理一些脏数据、需要做数据过滤、填充、合并等操作，这时候就要使用到Pandas中一些数据处理的方法。

```Python
#数据处理示例1(过滤、填充、去除重复)
import pandas as pd 
from pandas import Series,DataFrame
import numpy as np
from numpy import nan as NaN

#1、过滤缺失数据-一维数组
array_a=Series([1,NaN,2,NaN,3,4,5])
print(array_a)
#方式一：通过dropna方法返回一个过滤后的数组
print(array_a.dropna())

#方式二：通过布尔序列返回一个过滤后的数组
print(array_a.notnull())#返回判断非空的布尔序列
print(array_a.isnull())#返回判断是空的布尔序列
print(array_a[array_a.notnull()])#通过布尔序列返回过滤后的数组

#2、过滤缺失数据-二维数组
array_b=DataFrame([[1,2,3],[4,NaN,5],[6,NaN,NaN],[NaN,NaN,NaN]])
print(array_b)
#方式一：通过dropna方法返回过滤后的数组
#过滤所有NaN
print(array_b.dropna())
#过滤全部为NaN的行
print(array_b.dropna(how="all"))#默认为any，任何含有NaN的行全部过滤
#过滤全部为NaN的列
print(array_b.dropna(axis=1,how="all"))

#方式二：传入thresh=n保留至少有n个非NaN数据的行
print(array_b.dropna(thresh=2))

#3、填充缺失数据:使用fillna方法
array_c=DataFrame([[1,2,3],[4,NaN,5],[6,NaN,NaN],[NaN,NaN,NaN]])
print(array_c)
#用常数填充fillna
print(array_c.fillna(0))
array_c.fillna(0,inplace=True)#inplace=True直接在原数组上修改
print(array_c)
#通过字典填充不同的常数
print(array_c.fillna({0:10,1:20,2:30}))#字典这个概念是列
#填充平均数
print(array_c.fillna(array_c.mean()))#将当前列的非空值加起来平均后，填充当前列的NaN
#只填充某一列
array_c.iloc[:,1].fillna(5,inplace=True)
print(array_c)

#使用method=""改变插值方式
#(1)用前面的值来填充method="ffill"  用后面的值来填充method="bfill"
print(array_c.fillna(method="ffill"))
print(array_c.fillna(method="bfill"))
#(2)传入limit=""限制填充行数
print(array_c.fillna(method="ffill",limit=2))
#传入axis=""修改填充方向
print(array_c.fillna(method="ffill",limit=2,axis=1))

#4、移除重复数据：使用duplicated、drop_duplicates方法
array_d=DataFrame({"A":[1,1,1,2,2,3,3,1],"B":list("aabbbcda")})
print(array_d)
#判断每一行是否重复（结果是布尔值，True代表是重复的）
print(array_d.duplicated())
#去除全部重复行
print(array_d.drop_duplicates())
#指定按照某一列，去除重复行
print(array_d.drop_duplicates(["A"]))
#在上面基础上，保留重复行的最后一行
print(array_d.drop_duplicates(["A"],keep="last"))
#去除重复的同时改变DataFrame对象
array_d.drop_duplicates(["A"],inplace=True)
print(array_d)
```

```Python
#数据处理示例2(合并)
import pandas as pd 
from pandas import Series,DataFrame
import numpy as np
from numpy import nan as NaN

#1、合并数据
#方式一：使用join方法，着重关注行的合并
"""
jion方法需要保证合并的各个数组的列是不同的
"""
array_1=DataFrame({"A":[1,3,5],"B":[2,4,6]},index=["a","b","c"])
array_2=DataFrame({"C":[3,5],"D":[6,8]},index=["c","d"])
print(array_1)
print(array_2)
#（1）简单合并（默认是left左合并）
#左合并：按照左边的数组行进行合并
print(array_1.join(array_2,how="left"))
#右合并：按照右边的数组进行合并
print(array_1.join(array_2,how="right"))
#外合并：将所有的行进行合并
print(array_1.join(array_2,how="outer"))
#内合并：将相同的行进行合并
print(array_1.join(array_2,how="inner"))
#(2)多个数组合并
array_3=DataFrame({"E":[7,9],"F":[10,12]},index=["c","d"])
print(array_1.join([array_2,array_3],how="left"))

#方式二：使用merge方法，着重关注列的合并
staff1=DataFrame({"name":["山风","芋头","小青","小王"],"age":[30,28,27,27],"job":["产品经理","数据分析师","花艺师","厨子"]},index=range(4))
staff2=DataFrame({"name":["山风","小青","山风","小李","小陈"],"years":[2,3,3,5,3],"job":["产品经理","花艺师","数据分析师","司机","讲师"],"pay":[10000,5000,12000,4500,7000]},index=[0,2,0,4,5])
print(staff1)
print(staff2)

#默认下是根据左右对象中出现同名的列作为合并的键，合并方式为内合并
print(pd.merge(staff1,staff2))
#左合并
print(pd.merge(staff1,staff2,how="left"))
#右合并
print(pd.merge(staff1,staff2,how="right"))
#外合并
print(pd.merge(staff1,staff2,how="outer"))
#指定列名合并
print(pd.merge(staff1,staff2,on="name",suffixes=["1","2"]))#suffixes代表给重复的列的后缀
#指定多个列名合并
print(pd.merge(staff1,staff2,on=["name","job"]))
```

**4、多层索引**

```Python
#多层索引示例1(创建多层索引)
import numpy as np
import pandas as pd 
from pandas import Series,DataFrame

#1、Series创建多层索引
#单层索引
array_A=Series(np.random.randint(0,100,size=6),index=list("abcdef"))
print(array_A)
#多层索引
array_B=Series(np.random.randint(0,100,size=6),index=[["a","a","b","b","c","c"],["上","下","上","下","上","下"]])
print(array_B)

#2、DataFrame创建多层索引
#单层索引
array_C=DataFrame({"A":[1,3,5],"B":[2,4,6]},index=["a","b","c"])
print(array_C)
#(1)直接创建多层索引
array_D=DataFrame({"A":[1,3,5,7,9,11],"B":[2,4,6,8,10,12]},index=[["a","a","b","b","c","c"],["上","下","上","下","上","下"]])
print(array_D)

#(2)使用特定结构创建多层索引
index1=["a","a","b","b","c","c"]
index2=["上","下","上","下","上","下"]
t_index=pd.MultiIndex.from_arrays([index1,index2])
array_E=DataFrame({"A":[1,3,5,7,9,11],"B":[2,4,6,8,10,12]},index=t_index)
print(array_E)

#(3)使用product构造多层索引
index3=["a","b","c"]
index4=["上","下"]
t_index1=pd.MultiIndex.from_product([index3,index4])
array_F=DataFrame({"A":[1,3,5,7,9,11],"B":[2,4,6,8,10,12]},index=t_index1)
print(array_F)
t_index2=pd.MultiIndex.from_product([index4,index3])
array_G=DataFrame({"A":[1,3,5,7,9,11],"B":[2,4,6,8,10,12]},index=t_index2)
print(array_G)
```

```Python
#多层索引示例（多层索引对象的操作）
#1、Series的多层索引操作
array_B=Series(np.random.randint(0,100,size=6),index=[["a","a","b","b","c","c"],["上","下","上","下","上","下"]])
print(array_B)
#取一个第一级索引
print(array_B["a"])
print(array_B.loc["a"])
#取多个第一级索引
print(array_B[["a","b"]])
print(array_B.loc[["a","b"]])
#根据索引获取值
print(array_B["a","上"])
print(array_B.loc["a","上"])

#补充：通过iloc取值，计算的是最内层索引
print(array_B.iloc[0])
print(array_B.iloc[1:4])

#2、DataFrame的多层索引操作
array_D=DataFrame({"A":[1,3,5,7,9,11],"B":[2,4,6,8,10,12]},index=[["a","a","b","b","c","c"],["上","下","上","下","上","下"]])
print(array_D)
#获取列
print(array_D["A"])
#取一个第一级索引
print(array_D.loc["a"])
#取多个第一级索引
print(array_D.loc[["a","b"]])
#取一行
print(array_D.loc["a","上"])
#取一值
print(array_D.loc["a","上"]["A"])

#补充：通过iloc取值，计算的是最内层索引
print(array_D.iloc[1])
print(array_D.iloc[1:4])
```

**5、时间序列**

```Python
#时间序列示例
import numpy as np
import pandas as pd 
from pandas import Series,DataFrame

#1、生成一段时间范围
"""
该函数主要用于生成一个固定频率的时间索引，在调用构造方法时，必须指定start、end、periods中的两个参数值，否则报错
"""
date=pd.date_range(start="20180101",end="20180131")
print(date)
"""
在以上基础上，还可以添加periods、freq设置
freq：日期偏移量，取值为string，默认为“D”
periods：固定时期，取值为整数
"""
date_a=pd.date_range(start="20180101",periods=10,freq="2D")
print(date_a)
date_b=pd.date_range(start="20180101",periods=10,freq="1H30min")
print(date_b)
"""
如果使用的是start\end，可以根据closed参数选择是否包含开始时间和结束时间，left包含开始时间，不包含结束时间，rig%guit则相反
"""
date_c=pd.date_range(start="20180101",end="20180131",closed="left")
print(date_c)

#2、时间序列在pandas中的作用
#(1)将时间序列作为索引
index=pd.date_range(start="20180101",periods=10)
array1=DataFrame(np.arange(0,100,2).reshape(10,5),index=index)
print(array1)
#(2)按时间过滤对应的值
array2=array1.truncate(after="20180105")#after指定日期之后的值过滤掉，before指定日期之前的值过滤掉
print(array2)
#(3)按时间序列获取对应的值
array3=Series(np.random.randn(1000),index=pd.bdate_range(start="20180101",periods=1000))
print(array3)
#根据年份获取对应的行
result=array3["2018"]
print(result)
#根据年份和日期获取对应的行
result=array3["2018-05"]
print(result)
result=array3["2018-05-01"]
print(result)
#使用切片
result=array3["2018-05-01":"2018-05-05"]
print(result)
#通过between_time()返回位于指定时间段的数据集
array4=Series(np.random.randn(10),index=date_b)
print(array4.between_time("7:00","12:00"))
#以上方法同样适用于DataFrame
print(array1.loc["2018-01"])
#(4)日期移位
array5=Series(np.random.randn(10),index=pd.bdate_range(start="20190101",periods=10))
print(array5)
array5.shift(periods=2,freq="D")

#3、时间戳转换为时间根式
#处理单个
pd.to_datetime(1554970721123,unit="ms")#unit="ms"指的是精确到毫秒级别
pd.to_datetime(1554970721123,unit="ms").tz_localize("UTC").tz_convert("Asia/shanghai")
#处理多个
array6=DataFrame([1554970721123,1554970876523,1554970985445],columns=["time"])
print(array6)
pd.to_datetime(array6["time"],unit="ms").dt.tz_localize("UTC").dt.tz_convert("Asia/shanghai")
#中文日期转换
pd.to_datetime("2019年10月10日",format="%Y年%m月%d日")
```

**6、分组聚合**

```Python
#分组聚合示例1(分组)
import numpy as np
import pandas as pd 
from pandas import Series,DataFrame

df=DataFrame({
    "name":["山风","山风","芋头","小青","山风","芋头","山风","芋头","小青"],
    "month":[1,2,3,1,2,3,1,2,3],
    "bonus":[10000,2200,3000,2340,5600,5700,4400,2700,3900],
    "subsidy":[500,670,120,400,230,350,800,300,600]
})
print(df)

#1、根据某一列进行分组
group1=df.groupby("name")
#查看分组
print(group1.groups)
#查看分组后每组的数量
print(group1.count())
#查看分组的情况
for name,group in group1:
    print(name)#组的名字
    print(group)#组的内容
#选择/查看具体某一分组
print(group1.get_group("山风")) #get_group("组的名字")

#2、根据某一列对数组中某一列进行分组
group2=df["month"].groupby(df["name"])
for name,group in group2:
    print(name)#组的名字
    print(group)#组的内容

#3、按照多列进行分组
group3=df.groupby(["name","month"])
for name,group in group3:
    print(name)#组的名字
    print(group)#组的内容
#选择/查看具体某一分组
print(group3.get_group(("山风",1))) #get_group("组的名字")组的名字用元组表示

#4、按不同范围进行分组
subsidy_groups=pd.cut(df["subsidy"],bins=[100,300,600,800])#构建范围分组,如100~300（包含300不包含100）
group4=df.groupby(subsidy_groups)
for name,group in group4:
    print(name)#组的名字
    print(group)#组的内容

#补充：交叉表
pd.crosstab(subsidy_groups,df["month"])
```

```Python
#分组聚合示例2（聚合运算）
import numpy as np
import pandas as pd 
from pandas import Series,DataFrame
df=DataFrame({
    "name":["山风","山风","芋头","小青","山风","芋头","山风","芋头","小青"],
    "month":["1月","2月","3月","1月","2月","3月","1月","2月","3月",],
    "bonus":[10000,2200,3000,2340,5600,5700,4400,2700,3900],
    "subsidy":[500,670,120,400,230,350,800,300,600]
})
print(df)
#1、直接通过聚合函数计算
#分组后，进行聚合运算
group1=df.groupby("name")
print(group1.sum())
#分组后，只对某一列进行聚合运算
print(group1["bonus"].sum())

#2、使用agg函数做聚合运算
#使用自带的函数运算
print(group1.agg("sum"))
#使用自定义函数运算
def peakRange(df):
    return df.max()-df.min()
print(group1.agg(peakRange))
#同时进行多个运算
print(group1.agg(["sum","mean","std",peakRange]))
#给每列作用不同的函数
dict={
    "bonus":["sum","mean"],
    "subsidy":peakRange
}
print(group1.agg(dict))

#3、拓展：使用apply函数进行聚合运算（apply是pandas中自由度最高的函数）
def bigBonus(bonus):
    if bonus>=5000:
        return 1
    else:
        return 0
print(df["bonus"].apply(bigBonus))
```

## 五、Python数据分析案例

### 5.1 电影数据分析

现存在一个关于电影演员、电影、电视节目、电影明星和电影制作的在线数据库，其中包含了影片的众多信息、演员、片长、内容介绍、分级、评论等字段，如下：

![电影数据分析](/assets/library/methods/data-analysis-python/RxjFbPKyHo8cgKxp1NmcGGbdnXf.webp)

|字段|字段含义|
|---|---|
|movie\_title|电影名称|
|language|语言|
|country|国家|
|title\_year|电影年份|
|duration|片长|
|genres|电影类型|
|budget|制作成本|
|gross|票房收入|
|director\_name|导演姓名|
|director\_fans|导演粉丝数|
|actor1\_name|主演1姓名|
|actor2\_name|主演2姓名|
|actor3\_name|主演3姓名|
|actor1\_fans|主演1粉丝数|
|actor2\_fans|主演2粉丝数|
|actor3\_fans|主演3粉丝数|
|num\_voted\_users|投票人数|
|num\_user\_for\_reviews|用户评论数|
|num\_criticr\_for\_reviews|专家评论数|
|movie\_likes|点赞数量|
|movie\_score|电影评分|

**1、读取表格数据**

```Python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
df=pd.read_csv("/Users/yutao/Desktop/Python示例/movie_case/movie.csv")
"""
read_csv中可以新增usecols=[]参数，可以只读取对应列的数据生成DataFrame
"""
```

**2、清洗数据**

```Python
#1、概览数据
#概念数据是为了观察整体数据，方便数据清洗
df.shape#查看行、列
df.count()#查看每列非空数据的数据量
df.isna().sum()#查看每列NaN的个数
df.describe()#整个数据描述：可以查看各列总数、平均数、最大值等

#2、清洗数据
data=df.dropna(how="any")#删除任何含有NAN的行全部删除
```

**3、分析数据**

```Python
#1、电影发展趋势
"""
补充：lambda表达式
def = func(x):
    return x*x 
上述函数等同于func=lambda x: x*x
lambda(参数：返回值)
假如数据提供的年数不是201902形式，取出具体的年：
data["year"]=data["title_year"].apply(lambada x:x[0:4])
"""
from matplotlib.font_manager import _rebuild
#设定中文
plt.rcParams['font.sans-serif'] ="SimHei"
plt.rcParams['axes.unicode_minus'] = False
_rebuild() 
#（1）分析一：历年来电影数量走势
#历年电影数量
movie_years_count=data.groupby("title_year")["movie_title"].count()
#创建折线图
plt.figure(figsize=(20,10),dpi=80)
x=movie_years_count.index.astype("int")
y=movie_years_count.values.astype("int")
x_ticks_label=["{}年".format(i) for i in range(min(x),max(x)+1,10)]
y_ticks_label=["{}部".format(i) for i in range(0,max(y)+1,25)]
plt.xticks(range(min(x),max(x)+1,10),x_ticks_label,rotation=45,)
plt.yticks(range(0,max(y)+1,25),y_ticks_label)
plt.xlabel("年份")
plt.ylabel("数量",rotation=90)
plt.title("历年来电影数量走势")
# movie_years_count.plot()#pandas中的绘图方法
plt.plot(x,y)
plt.savefig("/Users/yutao/Desktop/Python示例/movie_case/t1.jpg")
plt.show()

#(2)分析二：历年来电影票房走势
#历年来票房数量
movie_years_gross=data.groupby("title_year")["gross"].sum()/100000000
#创建折线图
plt.figure(figsize=(20,10),dpi=80)
x=movie_years_gross.index.astype("int")
y=movie_years_gross.values.astype("int")
x_ticks_label=["{}年".format(i) for i in range(min(x),max(x)+1,10)]
y_ticks_label=["{}亿元".format(i) for i in range(0,max(y)+1,25)]
plt.xticks(range(min(x),max(x)+1,10),x_ticks_label,rotation=45,)
plt.yticks(range(0,max(y)+1,25),y_ticks_label)
plt.xlabel("年份")
plt.ylabel("票房",rotation=90)
plt.title("历年来电影票房走势")
plt.plot(x,y)
plt.savefig("/Users/yutao/Desktop/Python示例/movie_case/t2.jpg")
plt.show() 
```

![历年来电影数量走势](/assets/library/methods/data-analysis-python/Bx0Mb2rjUoTUGvx76K2cXKl5nfg.webp)

![历年来电影票房走势](/assets/library/methods/data-analysis-python/O2LQb3Af5o3m5Mxrl1Xc0UZcnQh.webp)

```Python
#2、电影情况分析
#（1）分析一：各国家电影数量
movie_country_count=data.groupby("country")["movie_title"].count()
#创建柱状图
plt.figure(figsize=(20,10),dpi=80)
x=movie_country_count.index
y=movie_country_count.values.astype("int")
y_ticks_label=["{}部".format(i) for i in range(0,max(y)+1,100)]
plt.xticks(range(len(x)),x,rotation=45)
plt.yticks(range(0,max(y)+1,100),y_ticks_label)
plt.xlabel("国家")
plt.ylabel("数量",rotation=90)
plt.title("各国家电影数量")
plt.bar(x,y)
plt.savefig("/Users/yutao/Desktop/Python示例/movie_case/t3.jpg")
plt.show()

#(2)分析二：电影时长分布
movie_duration=data["duration"]
#创建直方图
plt.figure(figsize=(20,10),dpi=80)
movie_duration_result=movie_duration.values
distance=5
group_num=int((max(movie_duration_result)-min(movie_duration_result))/distance)
plt.xticks(range(int(min(movie_duration_result)),int(max(movie_duration_result)))[::5])
plt.xlabel("时长")
plt.ylabel("数量")
plt.title("电影时长分布")
plt.hist(movie_duration_result,bins=group_num)
plt.savefig("/Users/yutao/Desktop/Python示例/movie_case/t4.jpg")
plt.show()

#(3)各题材电影数量\票房
#构建一个新的DataFrame，只需要类别和票房这两个特征
genre_data=pd.DataFrame(columns=["genre","gross"])
for i,row_data in data.iterrows():#使用迭代器的方式读取数据，返回数字索引（int）和每行的数据（Series）
    #使用split分割genres
    genres=row_data["genres"].split("|")
    n_genres=len(genres)
    #构建一个空字典，用以保存genre和gross
    dict_obj={}
    dict_obj["gross"]=[row_data["gross"]]*n_genres
    dict_obj["genre"]=genres
    #将字典转换为DataFrame
    genre_df=pd.DataFrame(dict_obj)
    #使用append方法将genre_df添加至genre_data
    genre_data=genre_data.append(genre_df,ignore_index=True)
#(1)统计各题材个数
genre_count=genre_data.groupby("genre").size()
plt.figure(figsize=(20,10),dpi=80)
x=genre_count.values.astype("int")
y=genre_count.index
x_ticks_label=["{}".format(i) for i in range(0,max(x),50) ]
plt.xticks(range(0,max(x),50),x_ticks_label)
plt.yticks(range(len(y)),y)
plt.xlabel("数量")
plt.ylabel("类别",rotation=90)
plt.title("各题材电影数量")
plt.barh(y,x)
plt.savefig("/Users/yutao/Desktop/Python示例/movie_case/t5.jpg")
plt.show()

#(2)统计各题材电影票房
gross_count=genre_data.groupby("genre")["gross"].sum()/100000000
plt.figure(figsize=(20,10),dpi=80)
x=gross_count.values.astype("int")
y=gross_count.index
x_ticks_label=["{}亿元".format(i) for i in range(0,max(x)+51,50) ]
plt.xticks(range(0,max(x)+51,50),x_ticks_label)
plt.yticks(range(len(y)),y)
plt.xlabel("票房")
plt.ylabel("类别",rotation=90)
plt.title("各题材电影票房")
plt.barh(y,x)
plt.savefig("/Users/yutao/Desktop/Python示例/movie_case/t6.jpg")
plt.show()
```

![各国家电影数量](/assets/library/methods/data-analysis-python/VBHmb5UODokz25xzHR0ctKY0nNc.webp)

![电影时长分布](/assets/library/methods/data-analysis-python/ETjhb4CdBogf9JxCdN9cIxfrnNd.webp)

![各题材电影数量](/assets/library/methods/data-analysis-python/EvPxbPIhzoJyAsxj3jWchWTnnVw.webp)

![各题材电影票房](/assets/library/methods/data-analysis-python/Fawab58EnoaIIlxCdTpc6TQGn0f.webp)

```Python
#3、盈利情况分析
#计算电影利润
data["profit"]=data["gross"]-data["budget"]

#(1)分析一：盈利电影占比分析
#盈利电影数量
x=sum(data["profit"].values>0)
#亏本电影数量
y=sum(data["profit"].values<=0)
#绘制饼图
label_list=["盈利电影","亏本电影"]
size=[x,y]
explode=[0,0.05]
plt.figure(figsize=(20,10),dpi=80)
plt.title("盈利电影占比")
plt.pie(size,explode=explode,labels=label_list,labeldistance=1.05,autopct="%1.1f%%",shadow=False,startangle=90,pctdistance=0.7)
plt.savefig("/Users/yutao/Desktop/Python示例/movie_case/t7.jpg")
plt.show()

#(2)分析二：导演盈利占比分析
director_profit=data.groupby("director_name")["profit"].sum()
#盈利导演数量
x=sum(director_profit.values>0)
#亏本导演数量
y=sum(director_profit.values<=0)
#绘制饼图
label_list=["盈利导演","亏本导演"]
size=[x,y]
explode=[0,0.05]
plt.figure(figsize=(20,10),dpi=80)
plt.title("盈利导演占比")
plt.pie(size,explode=explode,labels=label_list,labeldistance=1.05,autopct="%1.1f%%",shadow=False,startangle=90,pctdistance=0.7)
plt.savefig("/Users/yutao/Desktop/Python示例/movie_case/t8.jpg")
plt.show()

#(2)分析三：盈利前十的电影占比分析
movie_profit=data.groupby("movie_title")["profit"].sum().sort_values(ascending=False).head(10) 
label_list=movie_profit.index
size=movie_profit.values
explode=[0,0.05,0,0,0,0,0,0,0,0]
plt.figure(figsize=(20,10),dpi=80)
plt.title("盈利前十的电影占比")
plt.pie(size,explode=explode,labels=label_list,labeldistance=1.05,autopct="%1.1f%%",shadow=False,startangle=90,pctdistance=0.7)
plt.savefig("/Users/yutao/Desktop/Python示例/movie_case/t9.jpg")
plt.show()
```

![盈利电影占比](/assets/library/methods/data-analysis-python/GvHebXrmSo1yADx0LbKcYj5Unug.webp)

![盈利导演占比](/assets/library/methods/data-analysis-python/A9qGbaqS1oK5dNx8gOcc0bufnne.webp)

![盈利前十的电影占比](/assets/library/methods/data-analysis-python/UmuAbtelSoMQHuxzjxVccDOOn2g.webp)

```Python
#4、电影评分分析
#分析：电影时长与评分分析
#获取电影时长
movie_duration=data["duration"]
movie_duration_result=movie_duration.values
#获取电影评分
movie_score=data["movie_score"]
movie_score_result=movie_score.values
#绘制散点图
plt.figure(figsize=(20,10),dpi=80)
plt.xlabel("电影时长")
plt.ylabel("电影评分")
plt.title("电影时长与评分分析")

x_ticks_label=["{}分钟".format(i) for i in range(0,360,15)]
plt.xticks(range(0,360,15),x_ticks_label,rotation=45)
y_ticks_label=["{}分".format(i) for i in range(0,10)]
plt.yticks(range(0,10),y_ticks_label)

#绘制散点图
plt.scatter(movie_duration_result,movie_score_result)
plt.savefig("/Users/yutao/Desktop/Python示例/movie_case/t10.jpg")
plt.show()
```

![电影时长与评分分析](/assets/library/methods/data-analysis-python/W4XmbKE4MoPg8RxxHmHcWIEMnSg.webp)

### 5.2 销售数据分析

现存在一个较为完整的销售数据表，包含了订单、客户、商品、价格等信息，如下：

![销售数据表](/assets/library/methods/data-analysis-python/NPIDbKCP7oHIxHx8lCUcpFYjnxc.webp)

|字段|字段含义|
|---|---|
|RowID|行编号|
|OrderID|订单编号|
|OrderDate|订单时间|
|ShipDate|发货时间|
|ShipMode|发货方式|
|CustomerID|客户编号|
|CustomerName|客户姓名|
|Segment|客户类别|
|City|客户所在城市|
|State|客户所在省|
|Country|客户所在国家|
|PostalCode|邮编|
|Market|销售门店|
|Region|商品产地|
|ProductID|产品编号|
|Category|产品类别|
|Sub\-Category|产品子类别|
|ProductName|产品名称|
|Sales|销售额|
|Quantity|销售量|
|Discount|折扣|
|Profit|利润|
|ShippingCost|发货成本|
|OrderPriority|订单优先级|

**1、读取表格数据**

```Python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
data=pd.read_csv("/Users/yutao/Desktop/Python示例/sale_case/sale.csv",encoding="ISO-8859-1")
```

**2、清洗数据**

```Python
#1、概览数据
#概念数据是为了观察整体数据，方便数据清洗
data.shape#查看行、列
data.count()#查看每列非空数据的数据量
data.isna().sum()#查看每列NaN的个数
data.describe()#整个数据描述：可以查看各列总数、平均数、最大值等

#2、处理与业务不符合的数据
#(1)问题数据：发货时间早于订单时间
#为了保守起见，将两个时间转换为时间格式后进行处理
data["OrderDate"]=pd.to_datetime(data["OrderDate"])
data["ShipDate"]=pd.to_datetime(data["ShipDate"])
#两个时间的差值为负，即为发货时间早于订单时间
data["interval"]=(data["ShipDate"]-data["OrderDate"]).dt.total_seconds()
data.drop(index=data[data["interval"]<0].index,inplace=True)
#(2)问题数据：销售额为负
data[data["Sales"]<=0]#检查并没有这样的问题数据
#(3)问题数据：销售量为负
data[data["Quantity"]<=0]#检查并没有这样的问题数据

#3、修正异常值、重复值、缺失值
"""
重复值：删除 
缺失值：根据字段的重要性及缺失数量判断采用何种操作，常见有重新获取数据、填充数据、删除数据等操作 
异常值：设置为空，填充
关于填充：数值类型的数据，如果分布均匀可以采用平均值，如果分布不均匀，可以采用中位数；字符串类型的数据，可以采用众数
"""
#（1）重复值：行编号重复
#通过以下检查发现，行编号存在重复值
data["RowID"]
np.unique(data["RowID"]).size
#删除重复值
data.drop(index=data[data["RowID"].duplicated()].index,inplace=True)
#(2)缺失值：发货方式缺失
#查看发货方式缺失的数据
data[data["ShipMode"].isnull()]
#取出字符串的众数
data["ShipMode"].mode()[0]
#填充缺失值
data["ShipMode"].fillna(data["ShipMode"].mode()[0],inplace=True)
#(3)缺失值：邮编缺失
#查看邮编缺失的数据
# data[data["PostalCode"].isnull()]#发现缺失的数据过多，且不重要，可以直接删除
# data.drop(["PostalCode"],axis=1,inplace=True)
data.isna().sum()
#(4)异常值：折扣数值异常
#查看折扣数值异常数据
data[data["Discount"]>1]
#将这些异常值设置为空
data["Discount"]=data["Discount"].mask(data["Discount"]>1,None)
data[data["Discount"].isnull()]
#将这些空值填充平均值
meanDiscount = round(data[data.Discount.notnull()].Discount.sum()/ data[data.Discount.notnull()].Discount.size,2)
data["Discount"].fillna(meanDiscount,inplace=True)

#4、整理数据:拆分订单时间
#将订单时间拆分为年份、月份、季度，方便后续数据分析
data["Order_year"]=data["OrderDate"].dt.year
data["Order_month"]=data["OrderDate"].dt.month
data["quarter"]=data["OrderDate"].dt.to_period("Q")
data[["OrderDate","Order_year","Order_month","quarter"]]#查看拆分转化后的数据信息
```

**3、分析数据**

```Python
#1、各季度销售额及销售增长率分析
#按季度统计销售额
sales_quarter=data.groupby("quarter")["Sales"].sum()
# 计算销售增长率
sales_rates=[]#构建列表记录销售增长率数值
sales_rates_per=[]#构建列表记录销售增长率百分比字符串
for i in range(len(sales_quarter)):
    if i==0:
        sales_rate=0
    else:
        sales_rate=sales_quarter[i]/sales_quarter[i-1]-1
    sales_rates.append(sales_rate)
    sales_rates_per.append("%.2f%%"%(sales_rate))
#将季度、销售额、销售增长率构建为新的数组
sales_data=pd.DataFrame({
    "quarter":sales_quarter.index,
    "sales_quarter":sales_quarter.values,
    "sales_rates":sales_rates,
    "sales_rates_per":sales_rates_per
    
})
#绘制销售额的柱状图及销售增长率的折线图
#设定中文
plt.rcParams['font.sans-serif'] ="SimHei"
plt.rcParams['axes.unicode_minus'] = False
#获取坐标
y1=sales_data["sales_quarter"]/10000
y2=sales_data["sales_rates"]
x=[int(i) for i in sales_data.index.tolist()]
#绘制柱状图、折线图
fig=plt.figure(figsize=(20,10),dpi=80)
#构建子图
ax1=fig.add_subplot(1,1,1)
ax2=ax1.twinx()#ax2与ax1共享x轴
#绘制坐标轴
x_ticks_label=["{}".format(i) for i in sales_data["quarter"]]
ax1.set_xticks(x)
ax1.set_xticklabels(x_ticks_label,rotation=45)
y1_ticks_label=["{}万".format(i) for i in range(0,int(max(y1))+10,10)]
ax1.set_yticks(range(0,int(max(y1))+10,10))
ax1.set_yticklabels(y1_ticks_label)
ax1.set_xlabel('季度')
ax1.set_ylabel('销售额')
ax2.set_ylabel('增长率')
ax1.set_title('销售额与增长率')
#绘制图像
ax1.bar(x,y1,color="#B0C4DE")
ax2.plot(x,y2,color="red")
plt.savefig("/Users/yutao/Desktop/Python示例/sale_case/t1.jpg")
plt.show()
```

![销售额与增长率](/assets/library/methods/data-analysis-python/M1K0bMYZloD5Llx2d6ncnliZnLh.webp)

```Python
#2、各区域销售情况分析
#分析一：各地区销售额占比
sales_area = data.groupby(by='Market')['Sales'].sum()
fig1,ax1=plt.subplots(figsize=(20,10),dpi=80)
sales_area.plot(kind='pie',autopct="%1.1f%%",title='各地区销售额占比',ax=ax1)
fig1.savefig("/Users/yutao/Desktop/Python示例/sale_case/t2.jpg")

#分析二：历年各地区销售额对比
#各地区每一年的销售额
sales_area = data.groupby(by=['Market','Order_year'])['Sales'].sum()
# 将分组后的多层索引设置成列数据
sales_area = sales_area.reset_index(level=[0,1])
#使用数据透视表重新整理数据
# pd.pivot_table(data,index,columns,values,fill_value  )
sales_area = pd.pivot_table(sales_area,index='Market',columns='Order_year',values='Sales')
# 绘制图形
fig2,ax2=plt.subplots(figsize=(20,10),dpi=80)
sales_area.plot(kind = 'bar',title = '历年各地区销售额对比',ax=ax2)
fig2.savefig("/Users/yutao/Desktop/Python示例/sale_case/t3.jpg")

#分析三：不同类型的产品在各地区的销售额对比
category_sales_area = data.groupby(by=['Market','Category'])['Sales'].sum()
category_sales_area
# 将分组后的多层索引设置成列数据
category_sales_area = category_sales_area.reset_index(level=[0,1])
# 使用数据透视表重新整理数据
category_sales_area = pd.pivot_table(category_sales_area,index='Market',columns='Category',values='Sales')
# 绘制图形
fig3,ax3=plt.subplots(figsize=(20,10),dpi=80)
category_sales_area.plot(kind = 'bar',title = '不同类型产品在各地区销售额对比',ax=ax3)
fig3.savefig("/Users/yutao/Desktop/Python示例/sale_case/t4.jpg")
```

![各地区销售额占比](/assets/library/methods/data-analysis-python/FrYgbOyjQoGYT2xKJLIcYDlpn9b.webp)

![历年各地区销售额对比](/assets/library/methods/data-analysis-python/PMsMbBdxOoK7fhxVfG2cePGpnBb.webp)

![不同类型产品在各地区销售额对比](/assets/library/methods/data-analysis-python/SL8Ob4fyToTgWTxlORwccjLvn6I.webp)

```Python
#3、销售淡旺季分析
year_month = data.groupby(by=['Order_year','Order_month'])['Sales'].sum()
year_month  
# # 将索引订单年转为一列数据
sales_year_month = year_month.reset_index(level=[0,1]) 
# 利用透视表的确定销售额预览表
sales_year_month = pd.pivot_table(sales_year_month,
                                  index='Order_month',
                                  columns='Order_year',
                                  values='Sales')
# # 绘制图形
fig4,ax4=plt.subplots(figsize=(20,10),dpi=80)
sales_year_month.plot(title = '历年销售淡旺季',ax=ax4)
fig4.savefig("/Users/yutao/Desktop/Python示例/sale_case/t5.jpg")
```

![历年销售淡旺季](/assets/library/methods/data-analysis-python/R4gbbaHYxohSIuxw6NXc2IFlnmh.webp)

```Python
#4、新增客户分析
#复制整个数组 
data_customer = data.copy()
#删除重复的CustomerID 
data_customer = data_customer.drop_duplicates(subset=['CustomerID'])
data_customer
#按照年份与月份去分组 
new_customer = data_customer.groupby(by=['Order_year','Order_month']).size()
new_customer 
new_customer = new_customer.reset_index(level=[0,1])
new_customer 
customer_year_month = pd.pivot_table(new_customer,index='Order_month',columns='Order_year',values=0,fill_value=0)
fig5,ax5=plt.subplots(figsize=(20,10),dpi=80)
customer_year_month.plot(title = '新增客户分析',ax=ax5)
fig5.savefig("/Users/yutao/Desktop/Python示例/sale_case/t6.jpg")
```

![新增客户分析](/assets/library/methods/data-analysis-python/A7mUbnvvzot0HmxN6vac3Ywmnyd.webp)

在针对销售类数据进行分析时，不仅仅要关注销售本身的数据，同时也需要关注这些销售数据背后的人群，为此我们会常用到用户RFM模型将客户划分为八类人群，RFM模型的含义如下：

- R：客户最近一次交易时间的间隔。R值越大，表示客户交易发生的日期越久远，反之则表示客户交易发生日期约近。

- F：客户在最近一段时间内交易的次数。F值越大，表示客户交易越频繁，反之则表示客户交易不够活跃。

- M：客户在最近一段时间内交易的金额。M值越大，表示客户价值越高，反之则表示客户价值越低。

|客户群体类型|R|F|M|
|---|---|---|---|
|重要价值客户|0|1|1|
|重要唤回用户|1|1|1|
|重要深耕用户|0|0|1|
|重要挽留用户|1|0|1|
|潜力客户|0|1|0|
|一般维持客户|1|1|0|
|新客户|0|0|0|
|流失客户|1|0|0|

```Python
#5、RFM模型分析
# 获取2014年数据
data_14 = data [data ['Order_year']==2014]
# 2014年数据 取出三个字段 ['CustomerID','OrderDate','Sales']
data_14 = data_14[['CustomerID','OrderDate','Sales']]
#复制整个数据 
customdf = data_14.copy() 
#设置CustomerID为索引 
customdf.set_index('CustomerID',drop=True,inplace=True)  
#添加字段orders 数量1 
customdf['orders'] = 1 
#对整个数组进行透视 
rfmdf = customdf.pivot_table(index=['CustomerID'],
                    values=['OrderDate','orders','Sales'],
                    aggfunc={'OrderDate':'max',
                            'orders':'sum',
                            'Sales':'sum'})
#计算R 
rfmdf['R'] = (rfmdf.OrderDate.max()-rfmdf.OrderDate).dt.days
#计算M与F 
rfmdf.rename(columns={'Sales':'M','orders':'F'},inplace=True)
#构建客户分群方法 
def rfm_func(x):
    level = x.apply(lambda x: "1" if x >= 1 else '0')
    label = level.R + level.F + level.M
    d = {
        '011':'重要价值客户',
        '111':'重要唤回客户',
        '001':'重要深耕客户',
        '101':'重要挽留客户',
        '010':'潜力客户',
        '110':'一般维持客户',
        '000':'新客户',
        '100':'流失客户'
    }
    result = d[label]
    return result
#调用方法
rfmdf['label'] = rfmdf[['R','F','M']].apply(lambda x:x-x.mean()).apply(rfm_func,axis=1) 
#绘制图形 
fig6,ax6=plt.subplots(figsize=(20,10),dpi=80)
rfmdf.label.value_counts().plot(kind = 'bar',title = 'RFM模型分析',ax=ax6)
plt.xticks(rotation=0)
fig6.savefig("/Users/yutao/Desktop/Python示例/sale_case/t7.jpg")
```

![RFM模型分析](/assets/library/methods/data-analysis-python/OFofbrppaozOKixYISfcojqdn8b.webp)
