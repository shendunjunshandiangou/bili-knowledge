---
title: "\"[[⚡Python搭看板⚡]]\", \"[[非常好的Python视频，使我大脑旋转🧠💫_Pandas_数据处理_数据分析_可视化_基础知识_自学]]\", \"[[【戴师兄】数据分析有哪些必学工具？2023最新版！Tableau丨Power BI丨FineBI丨SQL丨影刀丨Excel丨Python丨课程教程自学攻略]]\""
tags: "[可视化, Python, Tableau]"
source: "\"[[⚡Python搭看板⚡]]\", \"[[非常好的Python视频，使我大脑旋转🧠💫_Pandas_数据处理_数据分析_可视化_基础知识_自学]]\", \"[[【戴师兄】数据分析有哪些必学工具？2023最新版！Tableau丨Power BI丨FineBI丨SQL丨影刀丨Excel丨Python丨课程教程自学攻略]]\""
---

# PyGWalker 拖拽出图

## 一句话定义

PyGWalker 在 Jupyter 中用 Tableau/Power BI 式拖拽交互出图，一行 `pyg.walk(df)` 启动；分析师 Python 可视化必掌握，但日常仍优先 BI 工具。

## 详细说明

**定位**：仿 Tableau/Power BI 工作模式；比手写 Matplotlib 适合多维度、多图表场景。

**安装**：`pip install pygwalker`；Jupyter 中 install 后需 **restart kernel**。

**用法**：
```python
import pygwalker as pyg
df = pd.read_excel("路径")
pyg.walk(df)
```

**操作**：拖拽字段到轴/颜色等（度量常需拖到 **X 轴**）；可筛选订单状态等。

**AI 作图**（搭看板视频）：自然语言描述图表；部分筛选器需手动补；需订阅（有免费档）。

**局限**：单图为主，**难做多图仪表盘**（需 Shiny 等框架）。

**建议**：领域用户 **日常用 BI 作图**；PyGWalker 用于 Python 工作流内快速探索。

## 相关原子
- [数据分析-可视化-Python主动学习选工具法](/daishixiong/atoms/数据分析-可视化-python主动学习选工具法.html)
- [数据分析-Tableau-四大基础图表快速上手](/daishixiong/atoms/数据分析-tableau-四大基础图表快速上手.html)


---

## 被引用于

- ["[[⚡Python搭看板⚡]]"](/daishixiong/atoms/数据分析-可视化-python主动学习选工具法.html)
- ["[[⚡Python搭看板⚡]]"](/daishixiong/atoms/数据分析-可视化-shiny看板搭建流程.html)
- ["[[数据分析只用学4个工具？！！有哪些自学资料？如何自学？最短学习路径该怎么规划？SQL_Tableau_Python要学到什么程度？Python和R到底学哪个？]]"](/daishixiong/atoms/数据分析-可视化-四工具路径与tableau程度.html)