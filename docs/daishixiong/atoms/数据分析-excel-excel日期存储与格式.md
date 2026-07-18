---
title: Excel 日期存储与格式
tags: "[Excel]"
source: "\"[[【2024最新版】Excel全面升级！保姆级教程免费看！（上）]]\""
---

# Excel 日期存储与格式

## 一句话定义

Excel 中日期本质是数字（1900-01-01 为 1），显示为日期需设置单元格格式，MAX 等函数可直接对日期列运算。

## 详细说明

- 43982 对应 2020-05-31（从 1900-01-01 起第 43982 天）。
- `=MAX(A:A)` 对日期列求最大值，返回的可能是数字，需设置「短日期」格式才能正常显示。
- 用 YEAR、MONTH 函数可从日期列提取年、月，用于后续 SUMIF 条件判断。
- 在数值前手动输入 `¥` 或日期文本会使单元格变文本型，无法参与计算；应通过**单元格格式**设置显示样式。

## 相关原子
- [数据分析-Excel-SUMIF与SUMIFS条件汇总](/daishixiong/atoms/数据分析-excel-sumif与sumifs条件汇总.html)
- [数据分析-Excel-环比计算与IFERROR容错](/daishixiong/atoms/数据分析-excel-环比计算与iferror容错.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [环比计算与 IFERROR 容错](/daishixiong/atoms/数据分析-excel-环比计算与iferror容错.html)