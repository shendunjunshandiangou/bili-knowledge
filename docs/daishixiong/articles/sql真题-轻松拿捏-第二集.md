---
title: SQL真题，轻松拿捏！第二集~
---

<BiliPlayer :bvid="'BV1V7DQB8E1E'" />

> **摘要**：SQL 真题系列第二课，聚焦**子查询**——通过动画演示 WHERE IN 子查询和 FROM 子查询的执行过程，讲清「先执行内部查询、用结果替换子查询语句」的本质。

## 一、子查询的本质

子查询就是**用一段 SQL 的计算结果，替代原来需要手写或子查询占位的地方**。

执行原则：识别子查询 → **先执行最内层** → 用结果替换子查询 → 继续外层逻辑。

## 二、WHERE IN 子查询

### 题目

查询属于技术部或产品部的所有员工。

### 写法逻辑

```sql
SELECT * FROM employee
WHERE dept_id IN (
    SELECT dept_id FROM department
    WHERE dept_name IN ('技术部', '产品部')
);
```

### 执行过程

1. **内层**：从部门表筛选名称，得到 dept_id 列表（如 101, 102）
2. **替换**：`IN (子查询)` 变成 `IN (101, 102)`
3. **外层**：员工表 WHERE 筛选，符合条件保留，不符合消失

本质就是**范围性查询**——用子查询框定 ID 范围。

## 三、FROM 子查询

### 题目

查询员工数 ≥ 2 的部门全部信息。

### 写法逻辑

```sql
SELECT * FROM department
WHERE dept_id IN (
    SELECT dept_id FROM (
        SELECT dept_id, COUNT(*) AS cnt
        FROM employee
        GROUP BY dept_id
    ) t
    WHERE cnt >= 2
);
```

### 执行过程

1. **最内层 FROM 子查询**：员工表按 dept_id 聚合计数，生成「部门 ID + 人数」临时表
2. **中间层**：筛选人数 ≥ 2 的部门 ID
3. **外层**：部门表 WHERE 筛选

FROM 子查询的本质：**用一段 SQL 替代一张表**，后续当普通表使用。

## 四、读 SQL 的方法

始终从 **FROM** 角度读——先找数据来源，再逐层向外理解 WHERE、GROUP BY、SELECT。

## 五、动画的作用与局限

- 动画只在**学习阶段**帮助理解执行过程
- 熟练后做题**不需要在脑中模拟动画**
- 连续登录等套路题属于另一类题型，子查询是基础功

## 六、子查询四种情况（系列预告）

1. WHERE IN 子查询
2. FROM 子查询
3. SELECT 子查询
4. 相关子查询

本课重点覆盖前两种最常用场景。
