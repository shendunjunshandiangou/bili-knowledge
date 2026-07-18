---
title: GPU 与 CPU 并行计算差异
tags: "[芯片产业]"
source: "\"[[一口气了解英伟达，芯片新王凭什么是他？]]\""
---

# GPU 与 CPU 并行计算差异

## 一句话定义

CPU 擅顺序复杂逻辑（像精准单发喷枪），GPU 为海量简单并行任务设计（像万枪齐发），因此深度学习训练天然更适合 GPU。

## 详细说明

- **CPU**：中央处理器，什么都能干，顺序计算、复杂推理强
- **GPU**：图形处理器，优化并行；核心数可达成千上万
- **图形场景**：4K 约 1000 万像素 × 30 帧/秒，每像素每帧需独立计算颜色
- **AI 应用**：深度学习需大量矩阵并行运算；讲者引用黄仁勋数据：训练大语言模型 GPU 相对 CPU 可用约 **4% 成本、1.2% 电力**

## 相关原子

- [财经商业分析-芯片产业-CUDA与GPGPU生态护城河](/xiaolin/atoms/财经商业分析-芯片产业-cuda与gpgpu生态护城河.html)
- [财经商业分析-芯片产业-ImageNet AlexNet与GPU算力转折](/xiaolin/atoms/财经商业分析-芯片产业-imagenet-alexnet与gpu算力转折.html)


---

## 被引用于

- [第四章 · 公司与产业](/xiaolin/knowledge/04-公司与产业.html)
- [CUDA 与 GPGPU 生态护城河](/xiaolin/atoms/财经商业分析-芯片产业-cuda与gpgpu生态护城河.html)
- [ImageNet AlexNet 与 GPU 算力转折](/xiaolin/atoms/财经商业分析-芯片产业-imagenet-alexnet与gpu算力转折.html)