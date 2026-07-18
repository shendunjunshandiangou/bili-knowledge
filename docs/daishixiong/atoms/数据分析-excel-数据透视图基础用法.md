---
title: 数据透视图基础用法
tags: "[Excel]"
source: "\"[[Excel中最被低估的功能，学会数据透视表，你的Excel速度直接翻3倍]]\""
---

# 数据透视图基础用法

## 一句话定义

数据透视图与透视表强联动，可快速生成柱状/折线/饼/组合图，配合切片器实现动态可视化；组合图需用次坐标轴处理量级差异。

## 详细说明

### 基础图表

- 选中透视表 → 插入对应图表类型。
- 柱状图：各区域省份成交金额对比。
- 折线图：每日成交金额趋势。
- 饼图/环形图：各区域占比（配合列汇总百分比）。

### 组合图

- 柱状的成交金额 + 折线的月环比。
- 环比是百分比（0.x），成交金额是千万级 → 环比放**次坐标轴**。

### 联动规则

- 透视图行列配置与透视表完全一致，切换行列后图表结构随之变化。
- 切片器筛选后透视图同步更新。

### 动态排名图思路

月环比需多个月同时在透视表中计算，展示层通过 GETPIVOTDATA 或筛选取单月 Top N。

## 相关原子
- [数据分析-Excel-切片器与日程表](/daishixiong/atoms/数据分析-excel-切片器与日程表.html)
- [数据分析-Excel-GETPIVOTDATA提取规则](/daishixiong/atoms/数据分析-excel-getpivotdata提取规则.html)
- [数据分析-Excel-透视表值显示方式与环比](/daishixiong/atoms/数据分析-excel-透视表值显示方式与环比.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [GETPIVOTDATA 提取规则](/daishixiong/atoms/数据分析-excel-getpivotdata提取规则.html)
- [切片器与日程表](/daishixiong/atoms/数据分析-excel-切片器与日程表.html)