---
title: 数仓表命名规范解读
tags: "[SQL, 数仓]"
source: "\"[[大厂SQL到底长啥样？]]\""
---

# 数仓表命名规范解读

## 一句话定义

数仓表名由「层级前缀 + 业务词根 + 更新后缀」组成，看表名即可判断数据来源、业务主题和全量/增量更新方式。

## 详细说明

### 命名三部分

1. **前缀**：ODS / DWD / DWS / ADS
2. **词根词缀**：业务主题简写（logistic→LGT，package→PKG），数仓统一维护词根表
3. **后缀**：
   - 频率：D=天、W=周、H=小时
   - 类型：DF=全量（full）、DI=增量（incremental）

### 解读示例

- `DWS_bilibili_cos_EP_detail_DI`：DWS 层 · B站课堂分批明细 · 按天**增量**
- `ODS_bilibili_video_Reply_DF`：ODS 层 · B站视频评论列表 · 按天**全量**

### 规范目的

方便数据管理、治理和开发；AST 解析可自动检验表名是否符合规范、血缘是否合规。

### 没有数仓时

规范由自己梳理业务过程后定义。

## 相关原子

- [数据分析-SQL-数仓四层分层ODS-DWD-DWS-ADS](/daishixiong/atoms/数据分析-sql-数仓四层分层ods-dwd-dws-ads.html)
- [数据分析-SQL-分区表与全量增量](/daishixiong/atoms/数据分析-sql-分区表与全量增量.html)


---

## 被引用于

- [第三章 · SQL 取数：数据在数据库里，怎么拿出来](/daishixiong/knowledge/03-sql取数.html)
- [分区表与全量增量](/daishixiong/atoms/数据分析-sql-分区表与全量增量.html)
- [数仓四层分层 ODS-DWD-DWS-ADS](/daishixiong/atoms/数据分析-sql-数仓四层分层ods-dwd-dws-ads.html)