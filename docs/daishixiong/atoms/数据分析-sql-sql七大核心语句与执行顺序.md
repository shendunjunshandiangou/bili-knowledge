---
title: "\"[[【戴师兄】如何自学SQL？Tableau如何通过SQL直连数据库？SQL有哪些知识点？数据库要学到什么程度？]]\", \"[[SQL到底要学到什么程度才够用？]]\""
tags: "[SQL]"
source: "\"[[【戴师兄】如何自学SQL？Tableau如何通过SQL直连数据库？SQL有哪些知识点？数据库要学到什么程度？]]\", \"[[SQL到底要学到什么程度才够用？]]\""
---

# SQL 七大核心语句与执行顺序

## 一句话定义

SQL 由 SELECT/FROM/WHERE/GROUP BY/HAVING/ORDER BY/LIMIT 七语句构成；书写顺序与执行顺序不同，数据库按 FROM 先行单向执行。

## 详细说明

### 七大语句

`SELECT · FROM · WHERE · GROUP BY · HAVING · ORDER BY · LIMIT`

各主流数据库用法一致，语法顺序不能随意调换。

### 执行顺序

```text
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

### 书写 vs 执行

| 人写（以终为始） | 数据库跑 |
| --- | --- |
| SELECT 在前 | FROM 最先 |

先想清楚要什么字段（SELECT），再想从哪张表取（FROM）；数据库必须先定位表才高效。

### 单向执行

运行到后面步骤不会回头重新执行前面步骤。

## 相关原子

- [数据分析-SQL-SQL是什么一大能力两大属性](/daishixiong/atoms/数据分析-sql-sql是什么一大能力两大属性.html)
- [数据分析-SQL-子查询WHERE IN与FROM子查询](/daishixiong/atoms/数据分析-sql-子查询where-in与from子查询.html)


---

## 被引用于

- [第三章 · SQL 取数：数据在数据库里，怎么拿出来](/daishixiong/knowledge/03-sql取数.html)
- ["[[【戴师兄】SQL入门免费教程]]"](/daishixiong/atoms/数据分析-sql-sql入门课程知识框架.html)
- ["[[【戴师兄】如何自学SQL？Tableau如何通过SQL直连数据库？SQL有哪些知识点？数据库要学到什么程度？]]"](/daishixiong/atoms/数据分析-sql-sql是什么一大能力两大属性.html)
- ["[[SQL真题，轻松拿捏！第二集~]]", "[[【戴师兄】SQL入门免费教程]]"](/daishixiong/atoms/数据分析-sql-子查询where-in与from子查询.html)
- ["[[【戴师兄】Tableau动态图表_动态仪表盘制作教程_数据动图教程_动态可视化教程_SQL教程_如何制作数据动图？怎么让数据动起来？]]"](/daishixiong/atoms/数据分析-tableau-社区query取数.html)