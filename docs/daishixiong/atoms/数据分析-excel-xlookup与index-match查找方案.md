---
title: XLOOKUP 与 INDEX-MATCH 查找方案
tags: "[Excel]"
source: "\"[[【Excel教学】数据匹配专题！]]\""
---

# XLOOKUP 与 INDEX-MATCH 查找方案

## 一句话定义

当 VLOOKUP 查询列不在首列或需要更灵活定位时，用 XLOOKUP（新版）或 INDEX+MATCH（全版本）替代。

## 详细说明

### XLOOKUP

```
=XLOOKUP(查找值, 查找列, 返回列, [未找到值], [匹配模式], [搜索模式])
```

- 查找列和返回列可任意位置。
- Excel 2010 及以下不支持；WPS 新版支持。

### INDEX + MATCH

```
=INDEX(数据区域, MATCH(查找值, 查找列, 0), 列号)
```

- **INDEX**：按行号、列号返回区域中的值。
- **MATCH**：返回查找值在列/行中的位置序号（0=精确匹配）。
- 查询列和返回列位置完全自由，是低版本 Excel 的「万能查找」组合。

### 选型

| 场景 | 推荐 |
| --- | --- |
| 新版 Excel/WPS、列不在首列 | XLOOKUP |
| 低版本 Excel | INDEX+MATCH |
| 需动态确定列号（宽表翻译） | INDEX+MATCH 嵌套 |

## 相关原子
- [数据分析-Excel-VLOOKUP基础与常见陷阱](/daishixiong/atoms/数据分析-excel-vlookup基础与常见陷阱.html)
- [数据分析-Excel-INDEX-MATCH动态列查找](/daishixiong/atoms/数据分析-excel-index-match动态列查找.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [INDEX-MATCH 动态列查找](/daishixiong/atoms/数据分析-excel-index-match动态列查找.html)
- [VLOOKUP 基础与常见陷阱](/daishixiong/atoms/数据分析-excel-vlookup基础与常见陷阱.html)