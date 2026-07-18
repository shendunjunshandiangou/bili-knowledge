---
title: Power Query 追加与合并查询
tags: "[Excel]"
source: "\"[[【EXCEL教学】合并表格专题！]]\", \"[[Excel中最被低估的功能，学会数据透视表，你的Excel速度直接翻3倍]]\""
---

# Power Query 追加与合并查询

## 一句话定义

追加查询实现多表上下合并（UNION）；合并查询实现左右表连接（JOIN），是 Power Query 合并表格的两大核心操作。

## 详细说明

### 追加查询（上下合并）

- 把多张结构相同的表纵向拼接。
- 列名需一一对应；列顺序不同但列名相同可合并。
- 列顺序不同且未按列名对齐会导致数据错乱（需改 M 语言）。

### 合并查询（左右连接）

| 类型 | 含义 |
| --- | --- |
| 内连接 | 两表匹配键都存在才保留 |
| 左外部 | 保留左表全部，右表只保留匹配行 |
| 右外部 | 保留右表全部 |
| 全外部 | 两表所有行都保留 |
| 左反/右反 | 只保留未匹配行 |

- 连接后右表以 Table 嵌入，需**展开**所需列。
- 取消「使用原始列名作为前缀」避免列名冗余。
- 多连接键：按住 Ctrl 分别选两表对应列。

### 典型组合流程

文件夹合并 → 合并查询补全维度列 → 追加查询拼接历史数据。

## 相关原子
- [数据分析-Excel-PowerQuery数据导入方式](/daishixiong/atoms/数据分析-excel-powerquery数据导入方式.html)
- [数据分析-Excel-PowerQuery加载策略](/daishixiong/atoms/数据分析-excel-powerquery加载策略.html)
- [数据分析-Excel-INDEX-MATCH动态列查找](/daishixiong/atoms/数据分析-excel-index-match动态列查找.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [Power Query 加载策略](/daishixiong/atoms/数据分析-excel-powerquery加载策略.html)
- [Power Query 数据导入方式](/daishixiong/atoms/数据分析-excel-powerquery数据导入方式.html)