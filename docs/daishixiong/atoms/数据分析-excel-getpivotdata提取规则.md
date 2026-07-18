---
title: GETPIVOTDATA 提取规则
tags: "[Excel]"
source: "\"[[Excel中最被低估的功能，学会数据透视表，你的Excel速度直接翻3倍]]\""
---

# GETPIVOTDATA 提取规则

## 一句话定义

GETPIVOTDATA 从透视表按条件提取汇总值；使用时必须满足「可见」且「唯一」两个条件。

## 详细说明

### 语法示例

```
=GETPIVOTDATA("成交金额", 透视表左上角, "区域", "华西北", "期数", "6-7")
```

- 勾选透视表选项「生成 GETPIVOTDATA」后，点击单元格自动生成，再改参数。

### 两大硬性要求

1. **可见**：透视表必须算出该值且未被折叠；折叠后即使逻辑上存在也取不到。
2. **唯一**：查询条件能定位到唯一单元格。期数放在行内且无列总计时，无法直接取期数汇总（条件不唯一）。

### 可省略维度

不需要的维度参数整对删除（如不要业务组则删掉 `"业务组", "xxx"` 这一对），但剩余条件仍须唯一。

## 相关原子
- [数据分析-Excel-透视表值显示方式与环比](/daishixiong/atoms/数据分析-excel-透视表值显示方式与环比.html)
- [数据分析-Excel-数据透视图基础用法](/daishixiong/atoms/数据分析-excel-数据透视图基础用法.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [数据透视图基础用法](/daishixiong/atoms/数据分析-excel-数据透视图基础用法.html)
- [透视表值显示方式与环比](/daishixiong/atoms/数据分析-excel-透视表值显示方式与环比.html)