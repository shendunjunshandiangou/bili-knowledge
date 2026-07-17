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
