---
title: INDEX-MATCH 动态列查找
tags: "[Excel]"
source: "\"[[【EXCEL教学】合并表格专题！]]\""
---

# INDEX-MATCH 动态列查找

## 一句话定义

面对列名需翻译、列号不固定的宽表，通过 INDEX+MATCH 嵌套实现「中文列名 → 英文列名 → 列号 → 行号 → 取值」的动态查找。

## 详细说明

### 适用场景

- 133 列英文宽表 + 中英对照表 + 给定 ID 提取多列数据。
- VLOOKUP 无法直接完成（查询列不在首列、列号动态变化）。

### 列号公式逻辑

1. MATCH 中文列名在对照表 B 列找行号。
2. INDEX 取该行第 1 列（英文名）。
3. MATCH 英文名在宽表表头行找列号。

### 行号公式逻辑

1. 同样先翻译中文列名（如「达人抖音号」）为英文列名。
2. MATCH 具体 ID 值在该英文列中找行号。

### 完整公式

```
=INDEX(数据区域, 行号公式, 列号公式)
```

### 紧急替代

时间紧迫时可插入辅助列翻译列名，复制列调整顺序后用 VLOOKUP。

## 相关原子
- [数据分析-Excel-XLOOKUP与INDEX-MATCH查找方案](/daishixiong/atoms/数据分析-excel-xlookup与index-match查找方案.html)
- [数据分析-Excel-公式引用方式混合引用](/daishixiong/atoms/数据分析-excel-公式引用方式混合引用.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [Power Query 追加与合并查询](/daishixiong/atoms/数据分析-excel-powerquery追加与合并查询.html)
- [VLOOKUP 基础与常见陷阱](/daishixiong/atoms/数据分析-excel-vlookup基础与常见陷阱.html)
- [XLOOKUP 与 INDEX-MATCH 查找方案](/daishixiong/atoms/数据分析-excel-xlookup与index-match查找方案.html)
- [公式引用方式混合引用](/daishixiong/atoms/数据分析-excel-公式引用方式混合引用.html)