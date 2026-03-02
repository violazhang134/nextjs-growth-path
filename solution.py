我来为您严格按照 Next.js App Router 结构初始化项目。

```bash
# 1. 创建 Next.js 项目（使用 App Router）
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# 2. 进入项目目录
cd my-app

# 3. 验证 src/app 目录结构已创建
ls -la src/app/

# 4. 清理默认页面内容，创建干净的布局

# 覆盖 layout.tsx
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "Created with Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
EOF

# 5. 覆盖 page.tsx 为干净首页
cat > src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Hello, Next.js App Router!</h1>
    </main>
  );
}
EOF

# 6. 更新 tailwind.config.ts（确保配置正确）
cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
EOF

# 7. 简化 globals.css
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  color: #171717;
  background: #ffffff;
}
EOF

# 8. 删除不需要的默认文件（如果存在）
rm -f src/app/favicon.ico

# 9. 确认没有 pages 目录
if [ -d "pages" ] || [ -d "src/pages" ]; then
  echo "警告：发现 pages 目录，正在删除..."
  rm -rf pages src/pages 2>/dev/null
fi

# 10. 显示最终目录结构
echo ""
echo "✅ 项目初始化完成！"
echo ""
echo "📁 目录结构："
tree -I node_modules -L 4 || find . -maxdepth 4 -not -path "./node_modules/*" -print | sed 's|[^/]*/|  |g'

echo ""
echo "🔍 验证：检查是否存在 pages 目录..."
find . -name "pages" -type d 2>/dev/null | grep -v node_modules && echo "❌ 发现 pages 目录！" || echo "✅ 无 pages 目录（符合 App Router 规范）"

echo ""
echo "🚀 启动开发服务器："
echo "   cd my-app && npm run dev"
```

---

## 执行步骤总结

| 步骤 | 操作 | 说明 |
|:---|:---|:---|
| 1 | `create-next-app` | **关键参数 `--app`** 启用 App Router，`--src-dir` 创建 src 目录 |
| 2 | 覆盖 `layout.tsx` | 清理默认模板代码 |
| 3 | 覆盖 `page.tsx` | 创建极简首页 |
| 4 | 更新 `tailwind.config.ts` | 确保扫描 `src/app/**` 路径 |
| 5 | 清理 `globals.css` | 移除默认样式变量 |
| 6 | 删除 `favicon.ico` | 可选，清理默认资源 |
| 7 | 检查并删除 `pages` | **确保没有旧版 pages 目录** |

---

## 生成的核心结构

```
my-app/
├── src/
│   └── app/                 # ✅ App Router 根目录
│       ├── layout.tsx       # 根布局
│       ├── page.tsx         # 首页 (/)
│       └── globals.css      # 全局样式
├── public/                  # 静态资源
├── tailwind.config.ts       # Tailwind 配置
├── next.config.mjs
├── tsconfig.json
└── package.json

❌ 无 pages/ 目录（旧版结构）
❌ 无 src/pages/ 目录
```

运行命令后，访问 `http://localhost:3000` 即可看到干净的 "Hello, Next.js App Router!" 页面。
