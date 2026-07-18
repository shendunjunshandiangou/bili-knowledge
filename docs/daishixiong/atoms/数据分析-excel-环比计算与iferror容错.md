---
title: 环比计算与 IFERROR 容错
tags: "[Excel]"
source: "\"[[【2024最新版】Excel全面升级！保姆级教程免费看！（上）]]\""
---

# 环比计算与 IFERROR 容错

## 一句话定义

环比 = 本期值 ÷ 上期值 − 1；算环比前必须确认上期数据存在，用 IFERROR 包裹可避免分母缺失时的报错。

## 详细说明

### 公式

```
环比 = (本期 - 上期) / 上期 = 本期/上期 - 1
```

### 实现方式（SUMIF 场景）

1. 用 SUMIF 算本期（筛选器月份）。
2. 复制公式，将月份条件 `-1` 得到上期值。
3. 组合：`=本期单元格/上期单元格 - 1`

### 数据前提

- 算 5 月环比需要 4 月数据存在；原数据只有 4–5 月时，4 月环比缺 3 月会报错。
- 筛选器选 4 月时，4 月环比同样无法计算。

### IFERROR

```
=IFERROR(环比公式, "-")
```

报错时显示横杠，避免 `#DIV/0!` 影响报表美观。

### 同比

把「上期」换成「去年同期」即可（如 20 年 5 月 ÷ 19 年 5 月 − 1）。

## 相关原子
- [数据分析-Excel-SUMIF与SUMIFS条件汇总](/daishixiong/atoms/数据分析-excel-sumif与sumifs条件汇总.html)
- [数据分析-Excel-透视表值显示方式与环比](/daishixiong/atoms/数据分析-excel-透视表值显示方式与环比.html)
- [数据分析-Excel-Excel日期存储与格式](/daishixiong/atoms/数据分析-excel-excel日期存储与格式.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [Excel 日期存储与格式](/daishixiong/atoms/数据分析-excel-excel日期存储与格式.html)
- [SUMIF 与 SUMIFS 条件汇总](/daishixiong/atoms/数据分析-excel-sumif与sumifs条件汇总.html)
- [透视表值显示方式与环比](/daishixiong/atoms/数据分析-excel-透视表值显示方式与环比.html)