# 产品需求文档 (PRD)：MVP版 营销与增长可视化引擎 (报告解析型)

## 1. 产品定位
一个轻量级的 Web 工具，接收用户输入的外部“Deep Research 报告”（Markdown 或长文本格式），通过大模型将其转换为结构化 JSON 数据，并渲染成带有时间轴注解的、极简风格的商业增长交互图表。同时提供基于该数据的“自有产品预测”沙盘。

## 2. 核心交互流程 (User Flow)
1. **输入阶段**：用户在文本框内粘贴外部工具生成的 Deep Research 报告（包含该产品的历史背景、核心营销事件、流量/下载量估算等）。
2. **解析阶段 (核心业务逻辑)**：前端调用大模型 API（如 OpenAI / Anthropic / Gemini），配合预设的 System Prompt，强制从非结构化文本中提取出标准的 JSON 数据结构。
3. **渲染阶段**：将 JSON 数据绑定到可视化图表组件，展示一条带有节点标记（营销事件）的增长曲线。界面保持类似高端商业杂志的极简排版，确保高数据墨水比。
4. **推演阶段**：用户基于渲染出的图表，通过侧边栏面板调整参数（如：时间平移、预算缩放），生成自己的行动时间线（Gantt Chart）。

## 3. 核心功能模块与组件定义 (供 AI 编程参考)

### 模块 A：报告解析器 (Report Parser)
- **UI 组件**：大型 Textarea（用于粘贴报告），以及一个“Generate Dashboard”按钮。
- **数据逻辑**：
  - 用户点击生成后，触发 LLM API 调用。
  - Prompt 工程要求：系统需内置一段强提示词，要求模型输出严格的 JSON 格式。
  - 目标 JSON 数据结构 (示例，供前端绑定使用)：
    ```json
    {
      "productName": "Notion",
      "timelineData": [
        {"date": "2018-01", "value": 1000, "metricType": "MAU"},
        {"date": "2018-06", "value": 5000, "metricType": "MAU"}
      ],
      "keyEvents": [
        {"date": "2018-03", "eventType": "Product Launch", "description": "Notion launched publicly", "impactScore": 0.8}
      ]
    }
    ```

### 模块 B：可视化看板 (Visualization Dashboard)
- **图表库建议**：使用 Recharts 或 ECharts（对 React/Vue 支持良好）。
- **UI 组件**：
  - **主干曲线图**：展示 timelineData 中的数据趋势。去除繁琐的网格线，使用干净的无衬线字体。
  - **事件锚点 (Annotations)**：在曲线上对应 keyEvents 的日期打上标记（如小圆点）。Hover 或点击时，弹出悬浮卡片显示事件详情（如：产品更新、KOL 推广）。
  - **交互逻辑**：图表需支持基础的缩放和平移。

### 模块 C：自我推演沙盘 (Prediction Sandbox)
- **UI 组件**：右侧或下方的控制面板（Sliders & Inputs）。
- **数据逻辑**：
  - 基于解析出的历史 JSON 数据，提供一个“克隆并修改”的功能。
  - 用户输入“我的目标上线时间”，系统将历史时间轴整体平移到未来。
  - 用户调整“投入力度系数”（如 0.5x 或 2x），系统根据预设的简单乘数逻辑，重新计算推演的 metricValue，并实时渲染“预测曲线”和“建议行动时间表”。