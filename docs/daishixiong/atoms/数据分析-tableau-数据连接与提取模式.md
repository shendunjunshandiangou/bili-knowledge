---
title: Tableau 数据连接与提取模式
tags: "[Tableau]"
source: "\"[[【Tableau光速入门教程】下载安装注册激活全攻略_四大基础图表制作]]\""
---

# Tableau 数据连接与提取模式

## 一句话定义

Tableau 可连接 Excel/CSV 文件或数据库；「数据提取」将源数据预加载为 hyper 格式，大数据量下比「实时」连接更快，一般推荐使用。

## 详细说明

**文件连接**：
- `.xlsx` / `.xls` → Microsoft Excel
- `.csv` → 文本文件

**服务器连接**：支持主流数据库（SQL 直连等，后续课程详讲）。

**两种连接方式**：

| 模式 | 行为 |
| --- | --- |
| 实时 | 每次操作直接读取源文件/库 |
| 数据提取 | Tableau 预加载数据，处理速度更快 |

提取后若源数据变动，点「刷新」重新提取。

**保存格式**：
- `.twbx`：含数据，适合学习练习
- `.twb`：不含数据，体积小、保密性好

## 相关原子
- [数据分析-Tableau-工作簿格式与工作区类型](/daishixiong/atoms/数据分析-tableau-工作簿格式与工作区类型.html)
- [数据分析-SQL-表连接原理与LEFT JOIN](/daishixiong/atoms/数据分析-sql-表连接原理与left-join.html)


---

## 被引用于

- [第四章 · 数据可视化与报表](/daishixiong/knowledge/04-数据可视化与报表.html)
- [Tableau Prep Builder 必学](/daishixiong/atoms/数据分析-tableau-prepbuilder必学.html)
- [Tableau 下载安装与密钥管理](/daishixiong/atoms/数据分析-tableau-下载安装与密钥管理.html)
- [Tableau 工作簿格式与工作区类型](/daishixiong/atoms/数据分析-tableau-工作簿格式与工作区类型.html)
- [Tableau 社区 Query 取数](/daishixiong/atoms/数据分析-tableau-社区query取数.html)