---
title: 公式引用方式混合引用
tags: "[Excel]"
source: "\"[[【2024最新版】Excel全面升级！保姆级教程免费看！（上）]]\""
---

# 公式引用方式混合引用

## 一句话定义

Excel 公式填充时，相对引用会偏移、绝对引用（$）锁定、混合引用（$A11）锁列不锁行——报表多维度填充的核心技巧。

## 详细说明

| 引用类型 | 写法 | 向下填充 | 向右填充 |
| --- | --- | --- | --- |
| 相对引用 | A11 | 行变 | 列变 |
| 绝对引用 | $A$11 | 不变 | 不变 |
| 混合引用（锁列） | $A11 | 行变 | 列不变 |
| 混合引用（锁行） | A$11 | 行不变 | 列变 |

### 报表场景示例

SUMIFS 向下填充省份明细时：
- 求和列 `$E:$E`、条件区域 `$A:$A`：绝对引用。
- 筛选器 `$H$4`：绝对引用。
- 当前行区域 `$A11`、省份 `$B11`：混合引用，随下行变化但不随右列变化。

### 快捷操作

选中引用按 **F4** 循环切换相对/绝对/混合引用。

## 相关原子
- [数据分析-Excel-SUMIF与SUMIFS条件汇总](/daishixiong/atoms/数据分析-excel-sumif与sumifs条件汇总.html)
- [数据分析-Excel-INDEX-MATCH动态列查找](/daishixiong/atoms/数据分析-excel-index-match动态列查找.html)


---

## 被引用于

- [第二章 · Excel 基础与进阶：你的第一个动手技能](/daishixiong/knowledge/02-excel基础与进阶.html)
- [INDEX-MATCH 动态列查找](/daishixiong/atoms/数据分析-excel-index-match动态列查找.html)
- [SUMIF 与 SUMIFS 条件汇总](/daishixiong/atoms/数据分析-excel-sumif与sumifs条件汇总.html)