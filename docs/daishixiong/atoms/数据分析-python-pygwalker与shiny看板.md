---
title: "\"[[⚡Python搭看板⚡]]\""
tags: "[Python]"
source: "\"[[⚡Python搭看板⚡]]\""
---

# PyGWalker 与 Shiny 看板

## 一句话定义

Python 搭看板两路线：**PyGWalker**（类 Tableau 单图拖拽，难组仪表盘）与 **Shiny**（Web 仪表盘框架 + 独立作图库，可 layout/value_box/筛选联动）。

## 详细说明

| 工具 | 优势 | 局限 |
| --- | --- | --- |
| **PyGWalker** | 一行代码交互可视化；字段拖 X 轴；可选 AI 作图 | **无法多图仪表盘** |
| **Shiny** | 官方组件：layout_columns、value_box、图表；server 响应筛选 | 需配 Plotly 等；框架「画框嵌画」 |

**Shiny 搭建四步**：构思轮廓 → 列组件清单 → 逛官方文档选语法 → 照示例改参数（KPI→GMV 等）。

**结构**：导入库与数据 → `ui` 布局嵌组件 → `server` 按日期筛选计算 GMV/作图。

**意义**：0→1 主动探索完成的首个看板，可复制到第二个。

## 相关原子
- [数据分析-Python-主动学习选工具法](/daishixiong/atoms/数据分析-python-主动学习选工具法.html)
- [数据分析-工具-2023必学工具优先级](/daishixiong/atoms/数据分析-工具-2023必学工具优先级.html)
- [数据分析-职业认知-数分三大核心技能](/daishixiong/atoms/数据分析-职业认知-数分三大核心技能.html)


---

## 被引用于

- [第八章 · Python 与扩展工具](/daishixiong/knowledge/08-python与扩展工具.html)
- ["[[⚡Python搭看板⚡]]"](/daishixiong/atoms/数据分析-python-主动学习选工具法.html)