---
title: Tableau 社区 Query 取数
tags: "[Tableau, SQL]"
source: "\"[[【戴师兄】Tableau动态图表_动态仪表盘制作教程_数据动图教程_动态可视化教程_SQL教程_如何制作数据动图？怎么让数据动起来？]]\""
---

# Tableau 社区 Query 取数

## 一句话定义

Tableau Public 社区数据集支持 Query 页面写 SQL 筛选后下载 CSV/XLSX，模拟工作中 Web 界面取数流程。

## 详细说明

**入口**：社区数据页 → **Query** → 写 SQL → Run Query → Download。

**常用语句**：SELECT / FROM / WHERE / GROUP BY / ORDER BY / LIMIT。

**调试技巧**：不确定代码是否正确时加 **LIMIT** 限制行数，缩短加载时间（实战细节，培训机构少教）。

**字段探查**：用 DISTINCT 对比县名、州名等判断数据粒度（如仅美加有州级，多数国家仅国家级）。

**下载格式**：CSV（大容量）或 XLSX（给业务）。

分析师不需自建 Hive/Spark，但需能在给定界面写 SQL 取数。

## 相关原子
- [数据分析-SQL-SQL七大核心语句与执行顺序](/daishixiong/atoms/数据分析-sql-sql七大核心语句与执行顺序.html)
- [数据分析-Tableau-数据连接与提取模式](/daishixiong/atoms/数据分析-tableau-数据连接与提取模式.html)


---

## 被引用于

- [动态可视化主题与数据准备](/daishixiong/atoms/数据分析-tableau-动态可视化主题与数据准备.html)