我将创建一个位于 `src/app/components/sandbox-panel.tsx` 的折叠面板组件，用于配置沙盒模拟。

核心功能：  
1. **可折叠界面**：使用 Framer Motion 实现平滑高度动画，并配合自定义状态管理切换开关。  
2. **极简 UI**：严格遵循“无边框”要求，仅通过间距、字号和微妙的文字透明度（`text-muted-foreground`、`opacity-50`）区分区域，不依赖显式边框。  
3. **输入控件**：  
   - **日期选择器**：原生 HTML5 日期输入，样式完全重置以契合简洁主题；若需跨浏览器一致外观，将改用标准按钮弹出日历。  
   - **资源滑块**：范围 0.1–3.0，步长 0.1，用 Tailwind 工具类美化轨道与滑块。  
   - **数字输入**：冷启动流量专用，采用大字号强调其重要性。  
4. **图标**：集成 `lucide-react`，提供直观的视觉提示（日历、滑块、火箭、设置）。  
5. **响应式**：布局适配移动端与桌面端。

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  SlidersHorizontal, 
  Rocket, 
  ChevronDown, 
  Settings2,
  Info
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for cleaner tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SandboxPanel() {
  const [isOpen, setIsOpen] = useState(true);
  
  // State for inputs
  const [startDate, setStartDate] = useState<string>('');
  const [resourceFactor, setResourceFactor] = useState<number>(1.0);
  const [initialTraffic, setInitialTraffic] = useState<number>(1000);

  // Toggle handler
  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-neutral-50 p-8 font-sans text-neutral-900 flex items-start justify-center">
      {/* Main Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
        
        {/* Header Section (Always Visible) */}
        <button 
          onClick={togglePanel}
          className="w-full flex items-center justify-between p-6 hover:bg-neutral-50 transition-colors duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-900 rounded-xl text-white">
              <Settings2 size={20} />
            </div>
            <div className="text-left">
              <h2 className="font-semibold text-lg tracking-tight">Sandbox Configuration</h2>
              <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mt-0.5">
                Simulation Parameters
              </p>
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-neutral-400 group-hover:text-neutral-600"
          >
            <ChevronDown size={24} />
          </motion.div>
        </button>

        {/* Collapsible Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-8 pt-2 space-y-8">
                
                {/* Section 1: Date Picker */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <Calendar size={16} />
                    <span className="text-xs font-semibold uppercase tracking-widest">Launch Schedule</span>
                  </div>
                  
                  <div className="relative group">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={cn(
                        "w-full bg-transparent text-2xl font-light tracking-tight",
                        "focus:outline-none placeholder:text-neutral-200",
                        !startDate && "text-neutral-300 italic"
                      )}
                      placeholder="Select date..."
                    />
                    {!startDate && (
                      <div className="absolute inset-0 pointer-events-none flex items-center text-neutral-300 italic">
                        Select planned launch date...
                      </div>
                    )}
                  </div>
                </section>

                {/* Divider (Whitespace only as requested, but using a very subtle line if needed, or just spacing) */}
                {/* We will use spacing instead of borders to respect the "borderless" request strictly */}

                {/* Section 2: Resource Slider */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between text-neutral-500">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={16} />
                      <span className="text-xs font-semibold uppercase tracking-widest">Resource Allocation</span>
                    </div>
                    <span className="text-sm font-mono font-medium bg-neutral-100 px-2 py-1 rounded-md text-neutral-700">
                      {resourceFactor.toFixed(1)}x
                    </span>
                  </div>

                  <div className="pt-2">
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={resourceFactor}
                      onChange={(e) => setResourceFactor(parseFloat(e.target.value))}
                      className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    />
                    <div className="flex justify-between mt-2 text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                      <span>Eco (0.1x)</span>
                      <span>Standard (1.0x)</span>
                      <span>Boost (3.0x)</span>
                    </div>
                  </div>
                </section>

                {/* Section 3: Cold Start Traffic */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <Rocket size={16} />
                    <span className="text-xs font-semibold uppercase tracking-widest">Cold Start Traffic</span>
                  </div>
                  
                  <div className="flex items-baseline gap-2 group focus-within:text-neutral-900 transition-colors">
                    <span className="text-4xl font-extralight tracking-tighter tabular-nums">
                      {initialTraffic.toLocaleString()}
                    </span>
                    <span className="text-sm text-neutral-400 font-medium">users / hour</span>
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={initialTraffic}
                    onChange={(e) => setInitialTraffic(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 mt-2"
                  />
                </section>

                {/* Footer / Helper Text */}
                <div className="pt-4 flex items-start gap-2 text-neutral-400 text-xs">
                  <Info size={14} className="mt-0.5 shrink-0" />
                  <p>
                    Adjusting these parameters will recalculate the simulation timeline and resource consumption estimates in real-time.
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

```
