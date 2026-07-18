---
title: SUMIF 与 SUMIFS 条件汇总
tags: "[Excel]"
source: "\"[[【2024最新版】Excel全面升级！保姆级教程免费看！（上）]]\""
---

# SUMIF 与 SUMIFS 条件汇总

## 一句话定义

SUMIF 对满足单一条件的行求和；SUMIFS 支持多个条件同时判断，是报表按月份/区域/省份等维度汇总的核心函数。

## 详细说明

### SUMIF

```
=SUMIF(条件区域, 条件, 求和列)
```

示例：月成交金额 = 成交月份列等于筛选器月份的行的成交金额之和。

### SUMIFS

```
=SUMIFS(求和列, 条件区域1, 条件1, 条件区域2, 条件2, ...)
```

- 第一个参数是求和列（与 SUMIF 不同）。
- 熟练后可统一用 SUMIFS，方便后续扩展条件。

### 填充时的引用

- 条件区域、筛选器单元格：绝对引用 `$H$4`。
- 行内判断条件（如 A11 区域名）：混合引用 `$A11`（锁列不锁行）。

## 相关原子
- [数据分析-Excel-环比计算与IFERROR容错](/daishixiong/atoms/数据分析-excel-环比计算与iferror容错.html)
- [数据分析-Excel-公式引用方式混合引用](/daishixiong/atoms/数据分析-excel-公式引用方式混合引用.html)
- [数据分析-Excel-分析师常用快捷键](/daishixiong/atoms/数据分析-excel-分析师常用快捷键.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [Excel 日期存储与格式](/daishixiong/atoms/数据分析-excel-excel日期存储与格式.html)
- [公式引用方式混合引用](/daishixiong/atoms/数据分析-excel-公式引用方式混合引用.html)
- [分析师常用快捷键](/daishixiong/atoms/数据分析-excel-分析师常用快捷键.html)
- [环比计算与 IFERROR 容错](/daishixiong/atoms/数据分析-excel-环比计算与iferror容错.html)