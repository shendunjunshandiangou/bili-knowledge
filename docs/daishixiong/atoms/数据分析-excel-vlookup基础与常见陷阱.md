---
title: VLOOKUP 基础与常见陷阱
tags: "[Excel]"
source: "\"[[【Excel教学】数据匹配专题！]]\""
---

# VLOOKUP 基础与常见陷阱

## 一句话定义

VLOOKUP 是 Excel 最基础的单向查找函数，要求查询列位于数据区域第一列，返回指定相对列号的值。

## 详细说明

### 语法

```
=VLOOKUP(查找值, 数据区域, 返回列号, FALSE)
```

- 返回列号是相对于查找区域的序号（1、2、3…），不是工作表绝对列号。
- 第四个参数 `FALSE`（或 0）表示精确匹配。

### 两大常见错误

1. **查询列不在首列**：VLOOKUP 硬性要求查找列是区域第一列，否则匹配出错。
2. **列号数错**：区域列顺序变化后返回列号需重新数。

### 找不到时

返回 `#N/A`，表示查找值在首列中不存在。

### 替代方案

查询列不在首列时，改用 [数据分析-Excel-XLOOKUP与INDEX-MATCH查找方案](/daishixiong/atoms/数据分析-excel-xlookup与index-match查找方案.html)。

## 相关原子
- [数据分析-Excel-XLOOKUP与INDEX-MATCH查找方案](/daishixiong/atoms/数据分析-excel-xlookup与index-match查找方案.html)
- [数据分析-Excel-INDEX-MATCH动态列查找](/daishixiong/atoms/数据分析-excel-index-match动态列查找.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [XLOOKUP 与 INDEX-MATCH 查找方案](/daishixiong/atoms/数据分析-excel-xlookup与index-match查找方案.html)