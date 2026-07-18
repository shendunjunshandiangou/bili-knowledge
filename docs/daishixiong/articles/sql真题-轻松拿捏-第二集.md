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

---

## 文章正文

SQL 真题第二课聚焦**子查询**，同样用 HTML 动画演示执行过程（下载本地用浏览器打开）。执行原则：**识别子查询 → 先执行最内层 → 用结果替换子查询 → 继续外层**。

### 子查询的本质

每一段 SQL 查询结果就是一张表。`FROM` 后面本就跟表，所以可用一段 SQL **替代一张表**；`WHERE IN (...)` 是用子查询框定 ID **范围**。

### WHERE IN 子查询

查技术部或产品部所有员工：

```sql
SELECT * FROM employee
WHERE dept_id IN (
  SELECT dept_id FROM department
  WHERE dept_name IN ('技术部','产品部')
);
```

动画：内层筛部门名得 101、102 → 外层变成 `IN (101,102)` → 员工表筛选。本质与手写 ID 列表无异。

### FROM 子查询

查员工数 ≥ 2 的部门：内层 `GROUP BY dept_id COUNT(*)` 生成临时表，外层 `WHERE cnt >= 2`，再筛部门表。

### HAVING 子查询

`HAVING` 在 `GROUP BY` **之后**，筛的是聚合结果，不能用 `WHERE`（WHERE 在 GROUP BY 前）。示例：`HAVING COUNT(*) >= (SELECT COUNT(*) FROM ... WHERE dept_id=101)` 可简化为与常数比较。

读 SQL 从 **FROM** 起：取数 → 先 WHERE 减运算量 → GROUP BY → HAVING 筛结果 → SELECT 输出（SELECT 可在多阶段出现）。

### 真题 1：每用户最近登录日 + 设备名

日期与「最近」= 按用户取 **MAX(日期)** → `ROW_NUMBER() PARTITION BY user_id ORDER BY login_date DESC`，`WHERE rk=1`；**先完成核心逻辑再 JOIN** 用户表、客户端表，不要一上来连满所有表。注意别名别连错表（直播翻车点）。

### 真题 2：酒店连续入住 ≥2 晚

`DATEDIFF(checkout, checkin)` 或 `DATEDIFF` 与 `TIMESTAMPDIFF` **方向相反**，可套 `ABS()`。辅助列 `days >= 2` 可在内层 WHERE 完成，不必子查询——新增列不影响 GROUP BY 顺序。

### 真题 3：网易云——关注的人喜欢的音乐（排除已喜欢）

分段写三段 SQL 再组合：`follow` 取 user_id=1 关注谁 → `music_likes` 中 `user_id IN (...)` 的歌 → `music_id NOT IN (本人已喜欢)` → 最后 JOIN `music` 取名称、`DISTINCT`、排序。绕题**拆开写**即可。

### 真题 4：抖音短视频热度 Top3（通过率约 12%）

难点在**热度公式**与**粒度**。播放表每行 = 用户某次观看某视频的开始/结束时间及互动标记。完播率 = 播放时长 ≥ 视频 `duration` 的比例，可用 `AVG(IF(完播,1,0))` 等价于 `SUM/COUNT`。

热度 = A×完播率 + B×点赞 + C×评论 + D×转发，再 × 新鲜度（1/(最近无播放天数+1)）。「最近无播放天数」基准是**全表 MAX(end_time)**，非「今天」——题目坑点。近一个月发布视频用 `release_time` 与基准日差 ≤29 天。多层指标算完后**套子查询**算 `hot_index`，`ORDER BY DESC LIMIT 3`。

### 协作说明

动画只在**学习阶段**有用，熟练后不必脑中模拟。牛客网刷题接近数分 SQL；力扣偏算法。面试 SQL 难预判，靠平时套路积累。`COUNT(*)` 与 `COUNT(1)` 等价，不会计入 JOIN 来的无意义空行；完播率用 `AVG` 是 `SUM/COUNT` 的简化写法。
