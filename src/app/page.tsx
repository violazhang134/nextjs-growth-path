"use client";

import { useState } from "react";
import InputArea from "./components/input-area";
import SandboxPanel from "./components/sandbox-panel";
import ExportButton from "./components/export-button";
import { ReportData } from "@/types";
import { mockReportData } from "@/lib/mock-data";

export default function Home() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleGenerate = async (input: string) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/parse-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report: input }),
      });
      
      if (!response.ok) throw new Error("解析失败");
      
      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
      // 使用模拟数据演示
      setReportData(mockReportData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Growth Path</h1>
        </div>
      </header>

      {/* Main Content */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[30%_1fr] gap-8">
            {/* Left Panel - Input + Sandbox */}
            <div className="space-y-6">
              <InputArea onSubmit={handleGenerate} loading={loading} />
              {reportData && <SandboxPanel reportData={reportData} />}
            </div>

            {/* Right Panel - Visualization */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">增长路径可视化</h2>
                {reportData && <ExportButton reportData={reportData} />}
              </div>
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                  <p className="text-red-600 text-xs mt-1">已加载演示数据</p>
                </div>
              )}

              {!reportData && !loading && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <p>粘贴Deep Research报告后点击生成查看结果</p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                  <p className="mt-4 text-gray-600">Analyzing data and aligning timelines...</p>
                </div>
              )}

              {reportData && !loading && (
                <div className="h-[500px]">
                  {/* Recharts visualization will be rendered here */}
                  <div className="text-center text-gray-500 py-20">
                    极简增长曲线图（基于Recharts）
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}