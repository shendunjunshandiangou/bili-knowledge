---
title: Power Query 数据导入方式
tags: "[Excel]"
source: "\"[[【EXCEL教学】合并表格专题！]]\", \"[[Excel中最被低估的功能，学会数据透视表，你的Excel速度直接翻3倍]]\""
---

# Power Query 数据导入方式

## 一句话定义

Power Query 通过三种常见入口获取数据：当前表区域、外部工作簿、文件夹批量导入，是 Excel 大批量数据清洗与合并的基础设施。

## 详细说明

### 三种导入方式

| 方式 | 操作 | 说明 |
| --- | --- | --- |
| 来自表格/区域 | 选中当前表区域 | 先转为智能表再导入编辑器 |
| 来自工作簿 | 选 Excel 文件 | 导航器选择具体 Sheet |
| 来自文件夹 | 指定文件夹 | 列出所有文件，保留 Content 列后「合并文件」 |

### 数据源管理

- 路径默认为绝对引用；文件移动后通过「数据源设置 → 更改源」重新定位。
- 结构相同的表可直接替换数据源（如 6 月换 4 月）。

### 从文件夹注意事项

- 过滤路径含 `~` 的打开中缓存文件。
- 排除非目标表（人员表、汇总表等）。
- 隐藏文件会被读取后自动删除。

### 适用场景

数据量级大（几十万行）时，新建空表通过 PQ 加载，避免直接打开 Excel 卡顿。

## 相关原子
- [数据分析-Excel-PowerQuery追加与合并查询](/daishixiong/atoms/数据分析-excel-powerquery追加与合并查询.html)
- [数据分析-Excel-PowerQuery加载策略](/daishixiong/atoms/数据分析-excel-powerquery加载策略.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [Power Query 加载策略](/daishixiong/atoms/数据分析-excel-powerquery加载策略.html)
- [Power Query 追加与合并查询](/daishixiong/atoms/数据分析-excel-powerquery追加与合并查询.html)