---
title: 非常好的Python视频，使我大脑旋转🧠💫|Pandas|数据处理|数据分析|可视化|基础知识|自学
---

<BiliPlayer :bvid="'BV1JhkZBiEGc'" />

> **摘要**（框架级，仅可视化章节）：Pandas 处理完数据后，领域用户应用 **PyGWalker** 在 Jupyter 中 Tableau 式拖拽出图，优于手写 Matplotlib；日常仍推荐 BI 工具作图。

## Python 可视化工具选择

- 纯代码作图（Matplotlib 等）多维度、多图表、看板组合时代码复杂度高。
- **领域用户**更适合用开发者做好的现成工具，效率高于自己写可视化代码。
- **Power BI / Tableau** 拖拽无需代码；Python 内对应方案为 **PyGWalker**。

## PyGWalker 快速上手

**环境**：Jupyter Notebook；`pip install pygwalker` 安装，安装后需 restart kernel。

**基本用法**：

```python
import pygwalker as pyg
df = pd.read_excel("路径")
pyg.walk(df)
```

**示例**：订单数据——订单创建时间拖入（天粒度聚合）+ 成交金额；筛选排除已取消订单。

**报错处理**：主动搜索报错信息（如 widget 显示问题），按论坛方案装依赖后重启 Jupyter。

## 建议

- 更多操作见 **PyGWalker 官网**示例教程。
- **领域用户日常仍推荐 BI 工具作图**，Python 可视化以 PyGWalker 补位即可。

（本视频主体为 Pandas 入门，可视化仅为其中一章。）
---

## 文章正文

本视频主体为 Pandas 入门与 Python 面试应对；戴师兄（叔叔）在「理论认知」中把 Python 使用者分为四类，并重点讲解**领域用户**如何用 **PyGWalker** 做可视化（框架级，仅可视化章节）。

**四类 Python 使用者。** ①语言创造者；②工具创造者（TensorFlow、PyTorch、Matplotlib、Pandas、Django 等）；③应用开发者（用框架做互联网应用）；④**领域用户**——非计算机出身，用 Python 解决本领域问题，核心是**提升效率**（手动能做的事代码做得更快；手动做不出的基本无法用代码完成）。前三类需深度知识；领域用户只需基础语法+领域相关第三方包常用功能。

**工具使用价值。** 企业录用员工看能否给业务带来增长或效率提升——工具只能提效，**业务增长须人推动**（例：算出各商品日均销量后，还须产出捆绑销售等策略）。无职场经验者学习感受差，因缺业务经验——「完全没工作过跟工作过的学习效率完全不一样」，对 Python/Excel/SQL/Tableau 皆然。

**面试应对三种情况。** ①问会不会——直接说会，并追问业务具体需求（60 万+第三方包学不完，须结合需求）；②围绕简历 Python 经历——结合业务、效率、增长回应；③结合面试官业务场景——陌生则坦诚并展示学习思路。

**PyGWalker 快速上手（Pandas 处理完数据后）。** 纯代码作图（Matplotlib 等）多维度看板组合时代码复杂；领域用户更适合现成工具——Power BI/Tableau 拖拽无需代码；Python 内对应 **PyGWalker**。

环境：Jupyter Notebook；`pip install pygwalker` 安装后须 restart kernel。

```python
import pygwalker as pyg
df = pd.read_excel("路径")
pyg.walk(df)
```

示例：订单数据——订单创建时间（天粒度）+ 成交金额，筛选排除已取消订单。报错时主动搜索（如 widget 显示问题），按论坛方案装依赖后重启 Jupyter。

**建议。** 更多操作见 PyGWalker 官网；**领域用户日常仍推荐 BI 工具作图**，Python 可视化以 PyGWalker 补位即可。
