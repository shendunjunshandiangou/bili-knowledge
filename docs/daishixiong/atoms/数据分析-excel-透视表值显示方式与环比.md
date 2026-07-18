---
title: 透视表值显示方式与环比
tags: "[Excel]"
source: "\"[[Excel中最被低估的功能，学会数据透视表，你的Excel速度直接翻3倍]]\""
---

# 透视表值显示方式与环比

## 一句话定义

在求和基础上，透视表可一键切换占比（总计/行/列/父级百分比）和差异（环比）；月环比用「差异百分比 + 月份 + 上一个」最快。

## 详细说明

### 占比类

| 显示方式 | 分母 |
| --- | --- |
| 总计的百分比 | 全表总和 |
| 列汇总的百分比 | 所在列总和 |
| 行汇总的百分比 | 所在行总和 |
| 父行/父列汇总的百分比 | 上一级维度汇总 |

### 环比类（重点）

- 值显示方式 → **差异百分比**。
- 基本字段 → 月份（或成交日期/年份）。
- 基本项 → **上一个**。
- 等价公式：`(本月 − 上月) / 上月`。

### 前提条件

透视表中必须包含上一个月的数据；筛掉前月则无法计算当月环比（与 [数据分析-Excel-环比计算与IFERROR容错](/daishixiong/atoms/数据分析-excel-环比计算与iferror容错.html) 同理）。

### 差异

指定维度值为基准，当前值 − 基准值（不算百分比）。

## 相关原子
- [数据分析-Excel-环比计算与IFERROR容错](/daishixiong/atoms/数据分析-excel-环比计算与iferror容错.html)
- [数据分析-Excel-计算字段与计算项](/daishixiong/atoms/数据分析-excel-计算字段与计算项.html)
- [数据分析-Excel-GETPIVOTDATA提取规则](/daishixiong/atoms/数据分析-excel-getpivotdata提取规则.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [GETPIVOTDATA 提取规则](/daishixiong/atoms/数据分析-excel-getpivotdata提取规则.html)
- [数据透视图基础用法](/daishixiong/atoms/数据分析-excel-数据透视图基础用法.html)
- [环比计算与 IFERROR 容错](/daishixiong/atoms/数据分析-excel-环比计算与iferror容错.html)
- [计算字段与计算项](/daishixiong/atoms/数据分析-excel-计算字段与计算项.html)
- [透视表行列值字段规则](/daishixiong/atoms/数据分析-excel-透视表行列值字段规则.html)