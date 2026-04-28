import { useState, useEffect } from 'react'
import { Github, Zap, Eye, Clock } from 'lucide-react'

const LINES = [
  { text: '=== 星穹铁道自动化启动 ===', color: 'text-gold-400' },
  { text: 'SSH 连接云游戏服务器...', color: 'text-slate-400' },
  { text: '✓ 连接成功 175.178.95.190', color: 'text-green-400' },
  { text: '截图中...', color: 'text-slate-400' },
  { text: 'OCR 识别游戏界面...', color: 'text-purple-400' },
  { text: '识别到文字: 星穹铁道 [0.97]', color: 'text-purple-300' },
  { text: '点击 "秒玩" (612, 340)', color: 'text-yellow-400' },
  { text: '等待游戏加载 (轮询 OCR)...', color: 'text-slate-400' },
  { text: '✓ 游戏已加载 (30s)', color: 'text-green-400' },
  { text: '执行日常任务...', color: 'text-slate-400' },
  { text: '  ✓ 领取日常训练奖励', color: 'text-green-400' },
  { text: '  ✓ 一键派遣', color: 'text-green-400' },
  { text: '  ✓ 收取邮件', color: 'text-green-400' },
  { text: '=== 全部完成 ===', color: 'text-gold-400' },
]

export default function Hero() {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown >= LINES.length) return
    const t = setTimeout(() => setShown(s => s + 1), shown === 0 ? 400 : 320)
    return () => clearTimeout(t)
  }, [shown])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-yellow-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-950/50 border border-yellow-800/40 rounded-full text-yellow-400 text-xs mb-6">
          <Zap size={12} />
          <span>AI OCR · 云游戏自动化 · 每日零人工干预</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black mb-3">
          <span className="gold-text">星穹铁道</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-300 mb-4">云游戏日常自动化</h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          SSH 远程控制 + RapidOCR 视觉识别，全自动完成每日任务。<br />
          不用挂着看，跑完自动退出。
        </p>

        <div className="max-w-2xl mx-auto mb-10">
          <div className="terminal-win glow-gold">
            <div className="terminal-bar">
              <div className="dot bg-red-500" />
              <div className="dot bg-yellow-500" />
              <div className="dot bg-green-500" />
              <span className="ml-3 text-slate-500 text-xs font-mono">python full_daily.py</span>
            </div>
            <div className="p-4 sm:p-5 min-h-[280px] space-y-1.5">
              {LINES.slice(0, shown).map((line, i) => (
                <p key={i} className={`font-mono text-xs sm:text-sm slide-up ${line.color}`}>
                  {line.text}
                </p>
              ))}
              {shown < LINES.length && (
                <span className="font-mono text-xs text-gold-400 blink">█</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href="https://github.com/adminlmz/starrail-showcase"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-xl transition-all hover:scale-105"
          >
            <Github size={16} />
            查看源码
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <Eye size={14} className="text-purple-400" />
            <span>RapidOCR 视觉识别</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap size={14} className="text-yellow-400" />
            <span>SSH 远程控制</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-green-400" />
            <span>全程无人工干预</span>
          </div>
        </div>
      </div>
    </section>
  )
}
