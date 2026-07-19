# Chi Lin Kuo (Charlie)

**Blockchain & AI & Full-stack Developer**

charlie011111@gmail.com · https://kcl1104.github.io/ · https://www.linkedin.com/in/chi-lin-kuo-a47608209/ · https://github.com/KCL1104/

## Summary

AI development tooling — Claude Code and similar agents are my main development partner day to day. I write custom tools and skills for them, which is what shortens the loop from a requirement to a deploy.

AI agent development — I've taken agent systems from zero to one on my own: agent flow design, tool integration, multi-agent orchestration, prompt iteration, run monitoring.

- AI-native development: Claude Code as my daily driver across requirement breakdown, design, and implementation.
- Custom AI toolchains: MCP servers, agent skills, and automation scripts (issue triage, code review, commit standards) wired into team production workflows.
- Fast-iteration shipping: reliably delivering backend and full-stack products under tight delivery cycles.

## Awards

- Cypherpunk side track (hosted by Sanctum)
- AI FinTech Innovation & Creativity Competition: Social Group 3rd Place
- XueDao Hackathon: Won 3 tracks from Cathay Financial Holding, Zircuit, BGA
- Encode Solana Winter Build Challenge 2025: 1st place, Best Consumer App on Solana track

## Tech Stack

- **LLM / Agent** — PydanticAI, LangChain, Google ADK, A2A protocol, MCP, function calling, LLM-as-judge, eval harness
- **Backend** — Python, FastAPI, Django, Node.js, NestJS, SQLAlchemy 2.0 (async), PostgreSQL, Supabase, Redis, MongoDB
- **Frontend** — Next.js, React, TypeScript, shadcn/ui
- **Other** — Solana, Anchor, Docker, CI/CD, S3

## AI-Native Development

I treat AI coding agents as first-class teammates: I design the harnesses, tools, and skills they run on, then delegate the mechanical work so I can focus on architecture, API boundaries, and business logic.

- **Agent-driven delivery** — Claude Code and other coding agents as my primary development partner on a daily basis — driving requirement breakdown, design, and implementation, and compressing the cycle from requirements to deployment.
- **Custom MCP servers** — Build Model Context Protocol (MCP) servers that give agents first-class, typed access to internal tools, data, and services.
- **Agent skills & harnesses** — Design reusable agent skills and prompt templates that keep agents consistently aligned with team standards for commit messages, code reviews, and test writing.
- **Workflow automation** — Automation scripts for issue triage, code review, and commit-message standardization — integrated directly into team production workflows.

## AI-Agent Development

AI-agent development is the core of how I build — not a side experiment.

- **Multi-agent orchestration** — 12 PydanticAI agents with Pydantic-schema output contracts and a stateful director agent (Extrovid); Google ADK and the A2A protocol for inter-agent collaboration (LorePack); LangChain agent layers for signal parsing and urgency scoring (DeepFlow).
- **Quality, cost & testability** — LLM-as-judge review with best-of-N selection, keyframe gates ahead of generation spend, and provider factories behind USE_MOCK_* flags so the whole suite runs offline.

## Work Experience

### Backend Engineer — Star Vaults

*2026-03 – 2026-05 · Taipei*

Took one complete service module from zero to one (e-commerce platform / internal tooling). Architecture and implementation — worked through the architecture decisions with one or two senior engineers, then led the implementation, API design, data model and deployment. Backend — Node.js / NestJS, Python (FastAPI / Django), PostgreSQL, Supabase, Redis, MongoDB. Frontend — built the matching interfaces in React / Next.js, keeping the data contract consistent across front and back. Process — boilerplate, unit tests and repetitive code went to Claude Code. Wrote a set of prompt templates and agent skills so that commit messages, code review and tests followed team convention.

Tech: Node.js, NestJS, Python, FastAPI, Django, PostgreSQL, Supabase, Redis, MongoDB, React, Next.js

### Backend & Blockchain Engineer — Jepun International

*2025-09 – 2026-03 · Taipei*

Owned several services and modules in a mid-sized product line (3–5 person team, front and back). Backend — designed and built RESTful APIs in Python (FastAPI / Django) and Node.js / Express, along with the database schemas behind them (PostgreSQL, MongoDB, Supabase). Third-party integration — integrated multiple third-party APIs and SaaS services, handling cross-system data sync and error paths. AI / LLM features — built the LLM features in the product, covering agent flow design and prompt tuning. Frontend — built the matching interfaces in React / Next.js, keeping the data contract consistent across front and back. DevOps — automated CI/CD pipelines and containerized deploys.

Tech: Python, FastAPI, Django, Node.js, Express, PostgreSQL, MongoDB, Supabase, React, Next.js, CI/CD

## Projects

### Extrovid

*Solo personal project · AI-native film production · 2026-06 – 2026-07*

An AI-native film production system. It runs script, casting, storyboard, per-shot generation, voice and rough cut end to end, and you can talk to a director agent at any step to change something live. My work: multi-agent orchestration across 12 PydanticAI agents with outputs contracted through Pydantic schemas; a director agent carrying 8 stateful tools so the whole pipeline can be driven in plain language; a per-stage state machine so failures resolve to a single stage; LLM-as-judge review with best-of-N selection and a keyframe gate ahead of generation spend; and provider factories with USE_MOCK_* flags so 236 tests run offline.

Tech: Python, FastAPI, PydanticAI, SQLAlchemy 2.0 (async), PostgreSQL, Next.js
GitHub: https://github.com/KCL1104/extrovid

### LorePack

*Owner / Lead Developer · Personal project · 2026-02*

An AI-driven collaborative story world platform. Users build persistent worlds, AI agents generate illustrated chapters, and people collaborate across universes. My work: the overall architecture and the multi-agent collaboration flow; A2A protocol integration and the inter-agent messaging layer; and the frontend interface. Engineering focus: orchestration patterns for multi-agent systems, task delegation between agents, and aggregating their results.

Tech: Google ADK, A2A protocol, Next.js, FastAPI
GitHub: https://github.com/KCL1104/LorePack

### DeepFlow

*Owner / Lead Developer · Personal project · 2026-01*

A personal project built on the idea of a "smart defence system": context-aware scheduling and dynamic priority filter out notification noise and protect deep work time. Frontend — Next.js (App Router) with shadcn/ui: the "Focus Player" and the queue visualisation. Backend — Python FastAPI, Supabase and Redis: priority queue management and multi-platform webhook intake (Slack / Jira / Gmail). Agent — Python and LangChain: signal parsing, urgency scoring, context-aware response generation. Technical highlights: a Redis sorted set (ZSET) gives O(log N) dynamic priority queueing; LangChain orchestrates the LLM calls.

Tech: Next.js, shadcn/ui, FastAPI, LangChain, Redis, Supabase
GitHub: https://github.com/KCL1104/DeepFlow

### PinTool

*Backend Engineer · Hackathon-winning · Team project · 2025-10 – Present*

A Solana-native strategy automation platform. Creators publish on-chain strategies; subscribers pay in USDC on-chain for access. My work: backend architecture, API development and subscription verification logic; Anchor contract integration and on-chain/off-chain state sync; and working with frontend to get the integration contract right.

Tech: NestJS, Supabase, Anchor, TypeScript
GitHub: https://github.com/pintoolx
Demo: https://pintool.fun/
Award: Cypherpunk side track (Sanctum) · AI FinTech Innovation Competition

## Education

### Bachelor of Science in Computer Science — University of Taipei

*2021-09 – 2025-06 · Taipei, Taiwan*

Focused on software development, algorithms, data structures, and blockchain technology fundamentals.

### Self-Learning Blockchain Development — Independent Study

*2021 – Present*

Self-taught blockchain developer with a strong foundation in Solidity, Ethereum, and smart contract development.

### Blockchain Development Bootcamp — Online Learning Platform

*2024-06 – 2024-08*

Completed an intensive 8-week bootcamp focused on Ethereum development, Solidity, and dApp creation.

### Blockchain Study Group — Community

*2025-02 – 2025-06*

A blockchain study group hosting monthly meetups to discuss and learn about blockchain technology.

## Languages

- Chinese (Mandarin) — Native or Bilingual Proficiency
- English — Full Professional Proficiency

---

# Chi Lin Kuo 郭啟霖

**Blockchain & AI & Full-stack Developer**

charlie011111@gmail.com · https://kcl1104.github.io/ · https://www.linkedin.com/in/chi-lin-kuo-a47608209/ · https://github.com/KCL1104/

## 摘要

AI 開發工具深度使用者：日常以 Claude Code 等 agent 作為主要開發夥伴，能透過自訂義 tools 以及 skills 加速從需求到部署的循環。

AI Agent 開發：有獨自進行 agent flow 設計、tool 串接、多 agent 編排、prompt 迭代、執行監控等由 0 到 1 獨自開發 AI agent 系統的能力。

- AI-native 開發流程：以 Claude Code 貫穿需求拆解、設計到實作的日常開發。
- 自訂 AI 工具鏈：MCP server、agent skills 與自動化腳本（issue 分類、code review、commit 規範），實際接進團隊的生產流程。
- 快速迭代交付：在緊湊的交付週期下穩定產出後端與全端產品。

## 得獎紀錄

- Cypherpunk side track（由 Sanctum 主辦）
- AI 金融創新與創意競賽：社會組第三名
- XueDao Hackathon：拿下國泰金控、Zircuit、BGA 三個賽道獎項
- Encode Solana Winter Build Challenge 2025：Best Consumer App on Solana 賽道第一名

## 技術棧

- **LLM / Agent** — PydanticAI, LangChain, Google ADK, A2A protocol, MCP, function calling, LLM-as-judge, eval harness
- **後端** — Python, FastAPI, Django, Node.js, NestJS, SQLAlchemy 2.0 (async), PostgreSQL, Supabase, Redis, MongoDB
- **前端** — Next.js, React, TypeScript, shadcn/ui
- **其他** — Solana, Anchor, Docker, CI/CD, S3

## AI-native 開發方法

我把 AI coding agent 當成正式的團隊成員：由我設計它們運行所需的 harness、tools 與 skills，再把機械性的工作交出去，讓自己專注在架構、API 邊界與商業邏輯上。

- **Agent 驅動的交付** — 日常以 Claude Code 等 coding agent 作為主要開發夥伴，推動需求拆解、設計與實作，壓縮從需求到部署的循環。
- **自訂 MCP server** — 建置 Model Context Protocol（MCP）server，讓 agent 能以型別化、第一級的方式存取內部工具、資料與服務。
- **Agent skills 與 harness** — 設計可重複使用的 agent skills 與 prompt 模板，讓 agent 在 commit message、code review、測試撰寫上穩定符合團隊規範。
- **工作流自動化** — issue 分類、code review、commit message 標準化的自動化腳本，直接整合進團隊的生產流程。

## AI Agent 開發

AI agent 開發是我建構軟體的核心方式，不是附加的實驗。

- **多 agent 編排** — 12 個 PydanticAI agent、以 Pydantic schema 定義輸出契約並搭配 stateful director agent（Extrovid）；以 Google ADK 與 A2A protocol 進行 agent 間協作（LorePack）；以 LangChain agent 層負責訊號解析與緊急程度評分（DeepFlow）。
- **品質、成本與可測試性** — 以 LLM-as-judge 評審搭配 best-of-N 選片、在生成花費前設置 keyframe 關卡，並以 provider factory 搭配 USE_MOCK_* 讓整套測試可離線執行。

## 工作經歷

### 後端工程師 — Star Vaults

*2026-03 – 2026-05 · 台北*

從零到一負責某個完整服務模組（電商平台 / 內部工具場景）。架構與實作：與 1–2 位資深同事共同討論架構決策，由我主導後續實作、API 設計、資料模型與部署。後端服務開發：Node.js / NestJS、Python（FastAPI / Django）、PostgreSQL、Supabase、Redis、MongoDB。前端開發：以 React / Next.js 完成對應前端介面，確保前後端資料契約一致。開發流程：boilerplate、單元測試、重複性程式碼交給 Claude Code；寫了一組 prompt 模板跟 agent skills，讓 commit message、code review、test 這幾個環節照團隊規範走。

技術：Node.js, NestJS, Python, FastAPI, Django, PostgreSQL, Supabase, Redis, MongoDB, React, Next.js

### 後端與區塊鏈工程師 — Jepun International

*2025-09 – 2026-03 · 台北*

負責中型產品線中的數個服務 / 模組（3–5 人團隊，跨前後端）。後端服務開發：使用 Python（FastAPI / Django）與 Node.js / Express 設計與實作 RESTful API，並負責對應的資料庫 schema 設計（PostgreSQL、MongoDB、Supabase）。第三方服務串接：整合多個第三方 API 與 SaaS 服務，處理跨系統資料同步與錯誤處理。AI / LLM 功能整合：負責產品中 LLM 相關功能的開發，涵蓋 agent flow 設計與 prompt 調校。前端開發：以 React / Next.js 完成對應前端介面，確保前後端資料契約一致。DevOps：自動化 CI/CD pipeline、容器化部署。

技術：Python, FastAPI, Django, Node.js, Express, PostgreSQL, MongoDB, Supabase, React, Next.js, CI/CD

## 專案

### Extrovid

*個人專案 solo · AI native 影像生成工作站 · 2026-06 – 2026-07*

AI native 的 AI 影像生成工作站。自動跑完劇本、選角、分鏡、逐鏡生成、配音、粗剪，每一步都能跟 director agent 即時對話修改。個人負責：多 agent 編排，12 個 PydanticAI agent，輸出以 Pydantic schema 定義契約；Director agent 掛載 8 個 stateful tool，可用自然語言操作整條 pipeline；Pipeline 架構採 per-stage state machine，失敗可定位至單一 stage；品質與成本以 LLM-as-judge 評審與 best-of-N 選片，並以 keyframe 作為生成前的成本關卡；可測試性以 provider factory 搭配 USE_MOCK_*，236 個測試可離線執行。

技術：Python, FastAPI, PydanticAI, SQLAlchemy 2.0 (async), PostgreSQL, Next.js
GitHub: https://github.com/KCL1104/extrovid

### LorePack

*Owner / 主導開發 · 個人專案 · 2026-02*

AI 驅動的故事世界共創平台。使用者可建立持久化世界觀、由 AI agent 生成插圖章節、並跨宇宙協作。個人負責：整體架構設計與多 agent 協作流程設計；A2A protocol 整合與 agent 間訊息傳遞機制；前端介面開發。學習重點：實作多 agent 系統的編排模式、agent 間任務委派與結果聚合。

技術：Google ADK, A2A protocol, Next.js, FastAPI
GitHub: https://github.com/KCL1104/LorePack

### DeepFlow

*Owner / 主導開發 · 個人專案 · 2026-01*

以「智慧防禦系統」為概念的個人專案，透過 context-aware 排程與動態優先順序，過濾通知干擾、保護深度工作時間。Frontend：Next.js（App Router）+ shadcn/ui，負責「Focus Player」與佇列視覺化。Backend：Python FastAPI + Supabase + Redis，負責優先佇列管理與多平台 webhook 接收（Slack / Jira / Gmail）。Agent：Python + LangChain，負責訊號解析、緊急程度評分與 context-aware 回應生成。技術亮點：以 Redis Sorted Set（ZSET）實作 O(log N) 動態優先佇列；以 LangChain 編排 LLM 互動。

技術：Next.js, shadcn/ui, FastAPI, LangChain, Redis, Supabase
GitHub: https://github.com/KCL1104/DeepFlow

### PinTool

*後端工程師 · Hackathon 得獎專案 · 團隊專案 · 2025-10 – Present*

Solana 原生的策略自動化平台，創作者可發佈鏈上策略，訂閱者透過 USDC 鏈上訂閱取得存取權限。個人負責：後端架構設計、API 開發、訂閱驗證邏輯；Anchor 智能合約串接、鏈上鏈下狀態同步機制；與前端協作確定前後端串接正確。

技術：NestJS, Supabase, Anchor, TypeScript
GitHub: https://github.com/pintoolx
Demo: https://pintool.fun/
獲獎：Cypherpunk side track（Sanctum）· AI 金融創新競賽

## 學歷

### 資訊科學學士 — University of Taipei

*2021-09 – 2025-06 · 台灣台北*

主修軟體開發、演算法、資料結構與區塊鏈技術基礎。

### 自學區塊鏈開發 — Independent Study

*2021 – Present*

自學區塊鏈開發，在 Solidity、Ethereum 與智能合約開發上具備扎實基礎。

### 區塊鏈開發訓練營 — Online Learning Platform

*2024-06 – 2024-08*

完成為期 8 週的密集訓練營，聚焦 Ethereum 開發、Solidity 與 dApp 實作。

### 區塊鏈讀書會 — Community

*2025-02 – 2025-06*

每月舉辦聚會、共同討論與學習區塊鏈技術的讀書會。

## 語言能力

- 中文（國語） — 母語／雙語程度
- 英文 — 專業工作能力

