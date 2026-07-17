---
title: 【戴师兄】SQL入门免费教程
---

<BiliPlayer :bvid="'BV1dt4y1B7Fx'" />

> **摘要**：戴师兄 SQL 入门免费课（共 3 个分P、数十道练习题）。本重写仅覆盖**课程知识框架与核心概念**，不穷举每道题 SQL。详细题目解法见各分P原视频与配套练习平台。

## 课程结构总览

| 分P | 主题 | 核心内容 |
| --- | --- | --- |
| P1 | 基础查询 | SELECT/FROM、WHERE 筛选、ORDER BY 排序、LIMIT、去重 DISTINCT、基础聚合 |
| P2 | 多表与进阶 | 表连接（JOIN）、子查询四种情况、GROUP BY/HAVING |
| P3 | 窗口函数 | ROW_NUMBER/RANK/DENSE_RANK、分区 PARTITION BY、实战排名题 |

## P1 · 基础查询核心概念

### FROM：准备表格

- SQL 是**查询语言**，不修改原表
- FROM 本质是告诉数据库「数据在哪个表」，逻辑上复制一张表用于查询
- **执行顺序上 FROM 最先运行**，但书写顺序 SELECT 在前（以终为始）

### SELECT：取字段

- 基于 FROM 准备好的表，取出指定列
- SELECT 的字段必须来自 FROM 指定的表
- 可在 SELECT 中做计算（后续题目覆盖）

### WHERE / ORDER BY / LIMIT

- WHERE：行级筛选（聚合前）
- ORDER BY：排序
- LIMIT：限制返回行数

### 与 Excel 的对应

每个 SQL 关键字都可映射到 Excel 操作来理解，这是戴师兄推荐的入门方法。

## P2 · 表连接与子查询

### 表连接

- SQL 无 VLOOKUP，必须 JOIN 拼表再取字段
- 工作场景以 LEFT JOIN 为主

### 子查询四种情况

1. **WHERE IN**：用子查询结果做范围筛选
2. **FROM 子查询**：用 SQL 替代一张表
3. **SELECT 子查询**：在 SELECT 中嵌套标量查询
4. **相关子查询**：内外查询有关联条件

### GROUP BY / HAVING

- GROUP BY：按字段分组聚合
- HAVING：聚合**后**筛选（WHERE 是聚合前）

## P3 · 窗口函数

### 定义

在**已准备好的表格**上，按分区（PARTITION BY）对行打标排名，**不改变行数**（与 GROUP BY 缩减行数不同）。

### 三大排名函数

- `ROW_NUMBER()`：强制连续序号
- `RANK()`：同值跳号
- `DENSE_RANK()`：同值不跳号

### 不受 ORDER BY / LIMIT 影响

窗口函数在 GROUP BY 之后、最终 SELECT 阶段运行，排名独立于外层排序。

## 学习建议

1. 配合练习题平台逐题实操（先 FROM 角度读 SQL）
2. 用 Excel 操作类比每个关键字
3. 本课为入门级别，求职需在此基础上刷套路题

> **后续可续**：若需逐题拆解原子，可按分P追加任务登记。
