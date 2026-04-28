import { useState, useEffect, useRef } from 'react'
import { Play, RotateCcw } from 'lucide-react'

const LOG_ENTRIES = [
  { t: 0,    color: 'text-gold-400',   text: '=== 星穹铁道自动化启动 ===' },
  { t: 300,  color: 'text-slate-400',  text: 'SSH 连接 175.178.95.190:22...' },
  { t: 900,  color: 'text-green-400',  text: '✓ SSH 连接成功' },
  { t: 1100, color: 'text-slate-400',  text: '1. 搜索"星穹铁道"...' },
  { t: 1500, color: 'text-slate-400',  text: '  JS eval 填入搜索框: \\u661f\\u7a79\\u94c1\\u9053' },
  { t: 1700, color: 'text-yellow-400', text: '  Press Enter' },
  { t: 2200, color: 'text-slate-400',  text: '  截图分析...' },
  { t: 2600, color: 'text-purple-300', text: "  OCR: Found '星穹铁道' at (180, 280) conf=0.98" },
  { t: 2900, color: 'text-purple-300', text: "  OCR: Found '秒玩' at (612, 340) conf=0.97" },
  { t: 3100, color: 'text-yellow-400', text: '  Click (612, 340)' },
  { t: 3500, color: 'text-slate-400',  text: '3. 处理服务器选择弹窗...' },
  { t: 4000, color: 'text-purple-300', text: "  OCR: Found '马上游玩' at (720, 480) conf=0.99" },
  { t: 4200, color: 'text-yellow-400', text: '  Click (720, 480)' },
  { t: 4500, color: 'text-slate-400',  text: '4. 等待游戏加载...' },
  { t: 5000, color: 'text-slate-500',  text: '  Still loading... (10s)' },
  { t: 5300, color: 'text-slate-500',  text: '  Still loading... (20s)' },
  { t: 5600, color: 'text-green-400',  text: '  ✓ 游戏已加载 (30s)' },
  { t: 5900, color: 'text-slate-400',  text: '\n=== 执行日常任务 ===' },
  { t: 6100, color: 'text-slate-400',  text: '2. 领取日常训练...' },
  { t: 6400, color: 'text-purple-300', text: "  OCR: Found '指南' at (450, 620)" },
  { t: 6600, color: 'text-yellow-400', text: '  Click (450, 620)' },
  { t: 7000, color: 'text-purple-300', text: "  OCR: Found '领取' at (820, 400)" },
  { t: 7200, color: 'text-yellow-400', text: '  Click (820, 400)' },
  { t: 7400, color: 'text-green-400',  text: '  ✓ 日常训练奖励已领取' },
  { t: 7700, color: 'text-slate-400',  text: '3. 执行派遣...' },
  { t: 8100, color: 'text-purple-300', text: "  OCR: Found '派遣' at (560, 620)" },
  { t: 8500, color: 'text-purple-300', text: "  OCR: Found '一键派遣' at (500, 480)" },
  { t: 8700, color: 'text-yellow-400', text: '  Click (500, 480)' },
  { t: 9000, color: 'text-purple-300', text: "  OCR: Found '确认' at (680, 520)" },
  { t: 9200, color: 'text-yellow-400', text: '  Click (680, 520)' },
  { t: 9400, color: 'text-green-400',  text: '  ✓ 派遣完成' },
  { t: 9700, color: 'text-slate-400',  text: '4. 收取邮件...' },
  { t: 10100,color: 'text-purple-300', text: "  OCR: Found '邮件' at (680, 620)" },
  { t: 10500,color: 'text-purple-300', text: "  OCR: Found '一键领取' at (850, 300)" },
  { t: 10700,color: 'text-yellow-400', text: '  Click (850, 300)' },
  { t: 10900,color: 'text-green-400',  text: '  ✓ 邮件已领取' },
  { t: 11200,color: 'text-gold-400',   text: '\n=== 全部日常任务完成 ✓ ===' },
  { t: 11500,color: 'text-slate-500',  text: '截图保存至 screenshots/screen.png' },
  { t: 11700,color: 'text-slate-500',  text: 'SSH 连接已关闭' },
]

export default function FlowLog() {
  const [shown, setShown] = useState(0)
  const [running, setRunning] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const rafRef = useRef(null)
  const containerRef = useRef(null)

  const runDemo = () => {
    setShown(0)
    setRunning(true)
    const start = Date.now()
    setStartTime(start)

    const tick = () => {
      const elapsed = Date.now() - start
      const count = LOG_ENTRIES.filter(e => e.t <= elapsed).length
      setShown(count)
      if (count < LOG_ENTRIES.length) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setRunning(false)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const reset = () => {
    cancelAnimationFrame(rafRef.current)
    setShown(0)
    setRunning(false)
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [shown])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-green-400 text-xs font-mono uppercase tracking-widest mb-3">完整运行日志</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">模拟执行过程</h2>
          <p className="text-slate-400 text-lg">点击 Run 查看一次完整自动化运行的实时日志</p>
        </div>

        <div className="terminal-win glow-purple">
          <div className="terminal-bar justify-between">
            <div className="flex items-center gap-2">
              <div className="dot bg-red-500" /><div className="dot bg-yellow-500" /><div className="dot bg-green-500" />
              <span className="ml-2 text-slate-500 text-xs font-mono">python full_daily.py — 星穹铁道日常自动化</span>
            </div>
            <div className="flex gap-3">
              <button onClick={runDemo} disabled={running}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-green-400 transition-colors disabled:opacity-40">
                <Play size={11} /> Run
              </button>
              <button onClick={reset}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-sky-400 transition-colors">
                <RotateCcw size={11} /> Reset
              </button>
            </div>
          </div>

          <div ref={containerRef} className="p-4 sm:p-5 h-80 overflow-y-auto space-y-0.5 scroll-smooth">
            {shown === 0 && !running && (
              <p className="text-slate-600 text-sm font-mono text-center pt-16">按 Run 开始演示</p>
            )}
            {LOG_ENTRIES.slice(0, shown).map((e, i) => (
              <p key={i} className={`font-mono text-xs sm:text-sm leading-relaxed ${e.color}`}>
                {e.text}
              </p>
            ))}
            {running && shown < LOG_ENTRIES.length && (
              <span className="font-mono text-xs text-gold-400 blink">█</span>
            )}
          </div>

          <div className="px-4 py-2 border-t border-slate-800 flex items-center gap-4 text-xs font-mono text-slate-600">
            <span className="text-purple-400">OCR</span> = RapidOCR 识别
            <span className="text-yellow-400">Click/Press</span> = 远程指令
            <span className="text-green-400">✓</span> = 验证成功
          </div>
        </div>
      </div>
    </section>
  )
}
