---
title: "\"[[大厂SQL到底长啥样？]]\""
tags: "[SQL, 数仓]"
source: "\"[[大厂SQL到底长啥样？]]\""
---

# 大厂取数三级路径

## 一句话定义

大厂日常 80–90% 取数不需写 SQL：优先看板下载 → 其次数据集自助查询 → 最后才从数仓应用层写 SQL。

## 详细说明

### 三级路径

| 优先级 | 方式 | 覆盖场景 |
| --- | --- | --- |
| 1 | 看板直接下载 | 常用/核心指标已固化 |
| 2 | 数据集可视化查询 | 看板未覆盖但数仓已加工好的数据 |
| 3 | 手写 SQL | 从应用层（APP/ADM/ADS）取数，通常只需 WHERE |

### 都没有时

提需求让数仓团队加工新表/新指标。

### 与数分日常的关系

进大厂后大量时间在看板和数据集上，而非天天写复杂 SQL。往大厂走仍需会 SQL 以便协作和应急取数。

## 相关原子

- [数据分析-SQL-数仓四层分层ODS-DWD-DWS-ADS](/daishixiong/atoms/数据分析-sql-数仓四层分层ods-dwd-dws-ads.html)
- [数据分析-SQL-分区表与全量增量](/daishixiong/atoms/数据分析-sql-分区表与全量增量.html)


---

## 被引用于

- [第三章 · SQL 取数：数据在数据库里，怎么拿出来](/daishixiong/knowledge/03-sql取数.html)
- ["[[大厂SQL到底长啥样？]]"](/daishixiong/atoms/数据分析-sql-分区表与全量增量.html)
- ["[[大厂SQL到底长啥样？]]"](/daishixiong/atoms/数据分析-sql-数仓四层分层ods-dwd-dws-ads.html)
- ["[[一没数据，二没权限，怎么积累分析经验？]]"](/daishixiong/atoms/数据分析-求职-零数据积累分析经验.html)