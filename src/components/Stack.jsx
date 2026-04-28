import { useEffect, useRef, useState } from 'react'

const TECH = [
  { name: 'RapidOCR', role: '核心 AI 组件', detail: 'ONNX Runtime 推理，PP-OCRv4 模型，中文识别准确率 > 95%', badge: 'AI', badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', color: 'text-yellow-400', border: 'border-yellow-700/30 bg-yellow-950/20' },
  { name: 'Paramiko', role: 'SSH 远程控制', detail: '建立与云游戏服务器的 SSH 连接，通过 SFTP 传输截图和指令文件', badge: 'Core', badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30', color: 'text-sky-400', border: 'border-sky-700/30 bg-sky-950/20' },
  { name: 'NumPy + PIL', role: '图像处理', detail: '截图转 numpy 数组后传入 OCR 模型，支持灰度化预处理', badge: 'Vision', badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30', color: 'text-purple-400', border: 'border-purple-700/30 bg-purple-950/20' },
  { name: 'asyncio', role: '异步架构', detail: '等待轮询、超时控制均基于 asyncio，避免阻塞 SSH 连接', badge: 'Arch', badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30', color: 'text-green-400', border: 'border-green-700/30 bg-green-950/20' },
  { name: 'Playwright', role: '浏览器控制', detail: '备选方案：通过 Playwright 直接控制本地浏览器，无需 SSH', badge: 'Alt', badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30', color: 'text-orange-400', border: 'border-orange-700/30 bg-orange-950/20' },
  { name: 'OpenCV', role: '模板匹配', detail: '基于图像模板匹配识别游戏 UI 元素，与 OCR 互补', badge: 'Vision', badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30', color: 'text-pink-400', border: 'border-pink-700/30 bg-pink-950/20' },
]

const STATS = [
  { value: '~90s', label: '完整运行耗时' },
  { value: '>95%', label: 'OCR 识别准确率' },
  { value: '6步', label: '感知-决策-执行循环' },
  { value: '0', label: '人工干预次数' },
]

export default function Stack() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [])

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sky-400 text-xs font-mono uppercase tracking-widest mb-3">技术栈</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">用了什么技术</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {STATS.map((s, i) => (
            <div key={s.label}
              className={`text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50 transition-all duration-500
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-3xl font-black mb-1 gold-text">{s.value}</div>
              <div className="text-slate-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH.map((t, i) => (
            <div key={t.name}
              className={`p-5 rounded-2xl border ${t.border} transition-all duration-500
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold text-base ${t.color}`}>{t.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono ${t.badgeColor}`}>{t.badge}</span>
              </div>
              <p className="text-slate-400 text-xs mb-1 font-medium">{t.role}</p>
              <p className="text-slate-600 text-xs leading-relaxed">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
