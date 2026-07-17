---
title: "\"[[SQL真题，轻松拿捏！第二集~]]\", \"[[【戴师兄】SQL入门免费教程]]\""
tags: "[SQL]"
source: "\"[[SQL真题，轻松拿捏！第二集~]]\", \"[[【戴师兄】SQL入门免费教程]]\""
---

# 子查询 WHERE IN 与 FROM 子查询

## 一句话定义

子查询本质是用内层 SQL 结果替换占位：WHERE IN 框定 ID 范围；FROM 子查询用 SQL 替代一张表。

## 详细说明

### 执行原则

识别子查询 → **先执行最内层** → 结果替换子查询文本 → 继续外层。

### WHERE IN 子查询

```sql
WHERE dept_id IN (SELECT dept_id FROM dept WHERE name IN ('技术部','产品部'))
```

内层查出 ID 列表 → 外层当普通 IN 筛选。

### FROM 子查询

```sql
SELECT * FROM (SELECT dept_id, COUNT(*) cnt FROM emp GROUP BY dept_id) t
WHERE cnt >= 2
```

内层生成临时表 → 外层当普通表筛选/连接。

### 四种情况（入门课框架）

1. WHERE IN（本原子）
2. FROM 子查询（本原子）
3. SELECT 子查询
4. 相关子查询

### 读 SQL 方法

始终从 FROM 开始读，逐层向外。

## 相关原子

- [数据分析-SQL-表连接原理与LEFT JOIN](/daishixiong/atoms/数据分析-sql-表连接原理与left-join.html)
- [数据分析-SQL-SQL七大核心语句与执行顺序](/daishixiong/atoms/数据分析-sql-sql七大核心语句与执行顺序.html)


---

## 被引用于

- [第三章 · SQL 取数：数据在数据库里，怎么拿出来](/daishixiong/knowledge/03-sql取数.html)
- ["[[【戴师兄】如何自学SQL？Tableau如何通过SQL直连数据库？SQL有哪些知识点？数据库要学到什么程度？]]", "[[SQL到底要学到什么程度才够用？]]"](/daishixiong/atoms/数据分析-sql-sql七大核心语句与执行顺序.html)
- ["[[【戴师兄】SQL入门免费教程]]"](/daishixiong/atoms/数据分析-sql-sql入门课程知识框架.html)
- ["[[SQL真题，轻松拿捏！]]"](/daishixiong/atoms/数据分析-sql-表连接原理与left-join.html)