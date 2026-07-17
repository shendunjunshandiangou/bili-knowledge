---
title: "\"[[【EXCEL教学】合并表格专题！]]\", \"[[Excel中最被低估的功能，学会数据透视表，你的Excel速度直接翻3倍]]\""
tags: "[Excel]"
source: "\"[[【EXCEL教学】合并表格专题！]]\", \"[[Excel中最被低估的功能，学会数据透视表，你的Excel速度直接翻3倍]]\""
---

# Power Query 加载策略

## 一句话定义

Power Query 处理完成后，通过「仅创建连接」避免中间表污染工作簿，再选择性加载最终结果到指定位置。

## 详细说明

### 推荐流程

1. **关闭并上载至 → 仅创建连接**：中间步骤不加载到 Sheet。
2. 在「查询和连接」面板找到目标查询。
3. 右键 → **加载到 → 表 → 现有/新工作表**。

### 误操作恢复

若点了「关闭并上载」导致所有中间表都加载：
- 在查询面板改回「仅创建连接」，清除多余 Sheet。
- 再按需加载最终表。

### PQ 与数据的关系

- 汇总表通过 PQ 加载时，数据实际存储在源文件中，Sheet 上是**连接关系**。
- 源表更新后点刷新即可，PQ 记忆的是操作步骤而非静态副本。

## 相关原子
- [数据分析-Excel-PowerQuery数据导入方式](/daishixiong/atoms/数据分析-excel-powerquery数据导入方式.html)
- [数据分析-Excel-PowerQuery追加与合并查询](/daishixiong/atoms/数据分析-excel-powerquery追加与合并查询.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- ["[[【EXCEL教学】合并表格专题！]]", "[[Excel中最被低估的功能，学会数据透视表，你的Excel速度直接翻3倍]]"](/daishixiong/atoms/数据分析-excel-powerquery数据导入方式.html)
- ["[[【EXCEL教学】合并表格专题！]]", "[[Excel中最被低估的功能，学会数据透视表，你的Excel速度直接翻3倍]]"](/daishixiong/atoms/数据分析-excel-powerquery追加与合并查询.html)