---
title: "\"[[SQL真题，轻松拿捏！]]\""
tags: "[SQL]"
source: "\"[[SQL真题，轻松拿捏！]]\""
---

# 表连接原理与 LEFT JOIN

## 一句话定义

SQL 无 VLOOKUP，必须 JOIN 拼表再取字段；工作场景以 LEFT JOIN 为主——保留左表全部行，右表未匹配为 NULL。

## 详细说明

### 为什么连表

原表字段不够，需从另一张表补充。SQL 只能**先拼表再取字段**（Excel 可直接 VLOOKUP 劈字段）。

### LEFT JOIN 匹配过程

1. 固定左表，逐行取连接键
2. 右表逐行扫描匹配
3. 匹配成功 → 拼新行；失败 → 右表字段 NULL
4. 右表同键多行 → 左表一行膨胀为多行（简单笛卡尔积）

### JOIN 选型

| 类型 | 建议 |
| --- | --- |
| LEFT JOIN | **工作首选**，不丢左表数据 |
| INNER JOIN | 只保留双边匹配，易丢业务数据 |
| CROSS JOIN | 笛卡尔积，特殊场景 |

> 不要直接写 `JOIN`（默认 INNER），推荐显式 `LEFT JOIN`。

### 做题前提

先看懂每张表的粒度、字段和表间关系。

## 相关原子

- [数据分析-SQL-子查询WHERE IN与FROM子查询](/daishixiong/atoms/数据分析-sql-子查询where-in与from子查询.html)
- [数据分析-SQL-连续登录套路题思路](/daishixiong/atoms/数据分析-sql-连续登录套路题思路.html)


---

## 被引用于

- [第三章 · SQL 取数：数据在数据库里，怎么拿出来](/daishixiong/knowledge/03-sql取数.html)
- ["[[【戴师兄】SQL入门免费教程]]"](/daishixiong/atoms/数据分析-sql-sql入门课程知识框架.html)
- ["[[SQL真题，轻松拿捏！第二集~]]", "[[【戴师兄】SQL入门免费教程]]"](/daishixiong/atoms/数据分析-sql-子查询where-in与from子查询.html)
- ["[[【Tableau光速入门教程】下载安装注册激活全攻略_四大基础图表制作]]"](/daishixiong/atoms/数据分析-tableau-数据连接与提取模式.html)