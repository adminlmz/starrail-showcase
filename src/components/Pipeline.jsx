import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    icon: '🖥',
    title: 'SSH 连接',
    sub: 'paramiko',
    desc: '建立与云游戏服务器的 SSH 隧道，所有指令通过 /tmp/cmd.json 传递，结果通过 /tmp/result.json 返回',
    color: 'border-sky-700/50 bg-sky-950/30',
    label: 'text-sky-400',
  },
  {
    icon: '📸',
    title: '截图拉取',
    sub: 'SFTP + PIL',
    desc: '每步操作后通过 SFTP 拉取服务端截图到本地，转为 numpy 数组供 OCR 分析',
    color: 'border-violet-700/50 bg-violet-950/30',
    label: 'text-violet-400',
  },
  {
    icon: '🤖',
    title: 'AI OCR 识别',
    sub: 'RapidOCR · ONNX',
    desc: 'RapidOCR 基于 ONNX Runtime 的中文 OCR 模型，识别游戏界面按钮文字，返回位置坐标 + 置信度',
    color: 'border-yellow-700/50 bg-yellow-950/30',
    label: 'text-yellow-400',
    highlight: true,
  },
  {
    icon: '🧠',
    title: '状态决策',
    sub: '规则引擎',
    desc: '根据识别到的文字判断当前游戏状态（加载中 / 主界面 / 弹窗），决定下一步操作',
    color: 'border-green-700/50 bg-green-950/30',
    label: 'text-green-400',
  },
  {
    icon: '👆',
    title: '发送指令',
    sub: 'click / key / eval',
    desc: '通过 SSH 发送点击坐标或键盘事件，支持 JS eval 注入（用于输入框填值）',
    color: 'border-orange-700/50 bg-orange-950/30',
    label: 'text-orange-400',
  },
  {
    icon: '✅',
    title: '验证结果',
    sub: '截图 + OCR 确认',
    desc: '操作后再次截图 OCR，确认预期文字出现，失败则跳过不中断。全程日志输出',
    color: 'border-pink-700/50 bg-pink-950/30',
    label: 'text-pink-400',
  },
]

export default function Pipeline() {
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
          <p className="text-yellow-400 text-xs font-mono uppercase tracking-widest mb-3">执行流水线</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">每次运行做了什么</h2>
          <p className="text-slate-400 text-lg">6 个步骤循环，OCR 驱动决策，失败自动跳过</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className={`relative p-5 rounded-2xl border ${s.color} transition-all duration-500
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                ${s.highlight ? 'ring-1 ring-yellow-500/30' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {s.highlight && (
                <div className="absolute top-3 right-3 px-1.5 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded text-yellow-400 text-xs font-mono">
                  AI
                </div>
              )}
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-bold text-sm ${s.label}`}>{s.title}</span>
                <span className="text-slate-600 text-xs font-mono">{s.sub}</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              <div className={`absolute top-5 right-5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                bg-slate-900 border border-slate-700 text-slate-500`}>
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-mono px-4 py-2 bg-slate-900/40 rounded-xl border border-slate-800">
            <span>步骤 1-2 每次操作前执行</span>
            <span>·</span>
            <span className="text-yellow-500">步骤 3 是核心 AI 组件</span>
            <span>·</span>
            <span>步骤 4-6 循环</span>
          </div>
        </div>
      </div>
    </section>
  )
}
