---
title: "\"[[⚡Python搭看板⚡]]\""
tags: "[可视化, Python]"
source: "\"[[⚡Python搭看板⚡]]\""
---

# Shiny 看板搭建流程

## 一句话定义

Shiny 是 Python Web 看板框架，需配合 Plotly 等作图库；按「构思→确认组件→查官方文档示例→改参数」四步从 0 搭建可筛选联动看板。

## 详细说明

**定位**：提供 Web 布局与交互；图表由独立作图库嵌入（Shiny=画框，作图库=画）。

**四步流程**（类比做饭）：
1. 构思轮廓：标题、指标卡、图表、布局
2. 确认组件：`titlePanel`、`valueBox`、图表、日期筛选器等
3. 逛官方文档组件分类，找示例语法
4. 照示例改参数（KPI→GMV、换图片路径）；不会改用 AI

**代码结构**：
- `ui`：`layout_columns` 等布局 + 组件
- `server`：响应筛选器，计算 GMV 等并返回图表

**意义**：从 0 主动探索产出第一个看板，建立迁移能力。

## 相关原子
- [数据分析-可视化-Python主动学习选工具法](/daishixiong/atoms/数据分析-可视化-python主动学习选工具法.html)
- [数据分析-可视化-PyGWalker拖拽出图](/daishixiong/atoms/数据分析-可视化-pygwalker拖拽出图.html)


---

## 被引用于

- ["[[⚡Python搭看板⚡]]"](/daishixiong/atoms/数据分析-可视化-python主动学习选工具法.html)