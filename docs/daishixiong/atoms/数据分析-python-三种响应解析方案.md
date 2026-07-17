---
title: "\"[[⚡1节课搞定爬虫⚡]]\""
tags: "[Python]"
source: "\"[[⚡1节课搞定爬虫⚡]]\""
---

# 三种响应解析方案

## 一句话定义

HTTP 响应常见三种形态：**JSON** 用 `.json()`；**HTML** 用 BeautifulSoup 按标签提取；**纯文本** 用正则 `re` + 必要时 `json.loads` 转字典。

## 详细说明

| 类型 | 识别 | 工具 | 后续 |
| --- | --- | --- | --- |
| JSON | 花括号结构 | `response.json()` | 按字段路径取值 → DataFrame |
| HTML | 标签嵌套表格 | **BeautifulSoup** | 定位 tbody 等；可 AI 写规则 |
| 纯文本 | 长字符串片段 | **re** 正则 | 匹配起止 → `json.loads` → DataFrame |

**注意**：部分站点需特定 header 字段才会返回 JSON/文本而非 HTML。

**导出**：统一 `pandas.DataFrame.to_excel()`。

大多数爬虫场景以 **JSON** 为主，后两者为补充。

## 相关原子
- [数据分析-Python-网络请求五步法](/daishixiong/atoms/数据分析-python-网络请求五步法.html)
- [数据分析-Python-Pandas分析师定位](/daishixiong/atoms/数据分析-python-pandas分析师定位.html)


---

## 被引用于

- [第八章 · Python 与扩展工具](/daishixiong/knowledge/08-python与扩展工具.html)
- ["[[⚡1节课搞定爬虫⚡]]"](/daishixiong/atoms/数据分析-python-网络请求五步法.html)
- ["[[【戴师兄】快速掌握企业级爬虫项目全流程，实习生都学会了！数据爬取&数据清洗丨数据分析师 _ 数据标注 _ 数据治理 _ Tableau丨Excel丨后羿采集器丨]]", "[[教大家一个在职场非常实用的爬虫小技巧，人人都能学会~]]"](/daishixiong/atoms/数据分析-工具-爬虫选型与反爬现实.html)