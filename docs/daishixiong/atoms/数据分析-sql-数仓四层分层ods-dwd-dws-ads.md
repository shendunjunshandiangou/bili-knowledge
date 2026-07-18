---
title: 数仓四层分层 ODS-DWD-DWS-ADS
tags: "[SQL, 数仓]"
source: "\"[[大厂SQL到底长啥样？]]\""
---

# 数仓四层分层 ODS-DWD-DWS-ADS

## 一句话定义

数仓普遍分 ODS（原始）→ DWD（清洗）→ DWS（宽表）→ ADS（应用）四层，每层只做一件事，用空间换开发效率与问题定位能力。

## 详细说明

### 各层职责

| 层 | 职责 | 关键约束 |
| --- | --- | --- |
| ODS | 业务系统原样同步 | **禁止加工**，与原始数据一致 |
| DWD | 清洗（编码统一、UNION 等） | 只做清洗 |
| DWS | 宽表、指标汇总 | 基于 DWD 开发，乐高组件 |
| ADS | 面向业务的应用表 | 分析师主要取数层 |

### 为什么分层

- **血缘追溯**：表报错沿层级往前定位
- **避免循环引用**：无规范时多表互相引用会导致全线崩溃
- **复用组件**：下层拼好的「积木」供上层直接使用

### 实现方式

`INSERT INTO` / `INSERT OVERWRITE`（Hive 常用）从下层取数写入上层。

### 注意

每家公司分层命名和层数不同（还有 DWM、DM 等），本质是**人为开发规范**。

## 相关原子

- [数据分析-SQL-大厂取数三级路径](/daishixiong/atoms/数据分析-sql-大厂取数三级路径.html)
- [数据分析-SQL-数仓表命名规范解读](/daishixiong/atoms/数据分析-sql-数仓表命名规范解读.html)
- [数据分析-SQL-分区表与全量增量](/daishixiong/atoms/数据分析-sql-分区表与全量增量.html)


---

## 被引用于

- [第三章 · SQL 取数：数据在数据库里，怎么拿出来](/daishixiong/knowledge/03-sql取数.html)
- [大厂取数三级路径](/daishixiong/atoms/数据分析-sql-大厂取数三级路径.html)
- [数仓表命名规范解读](/daishixiong/atoms/数据分析-sql-数仓表命名规范解读.html)
- [公司规模数据链路与必学工具](/daishixiong/atoms/数据分析-工具-公司规模数据链路与必学工具.html)
- [数据建设四环节定义](/daishixiong/atoms/数据分析-工具-数据建设四环节定义.html)
- [数分与数仓四维度对比](/daishixiong/atoms/数据分析-职业认知-数分与数仓四维度对比.html)