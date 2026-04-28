import { useState } from 'react'

const SCENES = [
  {
    label: '搜索结果页',
    desc: '识别"星穹铁道"和"秒玩"按钮的位置',
    boxes: [
      { x: 12, y: 18, w: 22, h: 6, text: '星穹铁道', conf: 0.98, color: 'border-yellow-400 bg-yellow-400/10 text-yellow-300' },
      { x: 72, y: 17, w: 12, h: 6, text: '秒玩', conf: 0.97, color: 'border-green-400 bg-green-400/10 text-green-300' },
      { x: 12, y: 42, w: 22, h: 6, text: '云电脑', conf: 0.95, color: 'border-slate-500 bg-slate-500/10 text-slate-400' },
      { x: 72, y: 42, w: 12, h: 6, text: '秒玩', conf: 0.96, color: 'border-slate-500 bg-slate-500/10 text-slate-400' },
    ],
    action: '→ 点击第一个"秒玩" (612, 340)',
    actionColor: 'text-green-400',
  },
  {
    label: '服务器选择弹窗',
    desc: '识别"马上游玩"或"普通区"按钮',
    boxes: [
      { x: 25, y: 30, w: 50, h: 8, text: '选择服务器', conf: 0.99, color: 'border-slate-500 bg-slate-500/10 text-slate-400' },
      { x: 30, y: 48, w: 18, h: 7, text: '普通区', conf: 0.96, color: 'border-sky-400 bg-sky-400/10 text-sky-300' },
      { x: 55, y: 60, w: 20, h: 7, text: '马上游玩', conf: 0.98, color: 'border-yellow-400 bg-yellow-400/10 text-yellow-300' },
    ],
    action: '→ 点击"马上游玩" (720, 480)',
    actionColor: 'text-yellow-400',
  },
  {
    label: '游戏主界面',
    desc: '检测平台UI是否消失，判断游戏已加载',
    boxes: [
      { x: 5, y: 5, w: 15, h: 5, text: '开拓者', conf: 0.97, color: 'border-purple-400 bg-purple-400/10 text-purple-300' },
      { x: 70, y: 5, w: 12, h: 5, text: '800/800', conf: 0.95, color: 'border-purple-400 bg-purple-400/10 text-purple-300' },
      { x: 30, y: 82, w: 10, h: 5, text: '地图', conf: 0.98, color: 'border-green-400 bg-green-400/10 text-green-300' },
      { x: 46, y: 82, w: 10, h: 5, text: '指南', conf: 0.97, color: 'border-green-400 bg-green-400/10 text-green-300' },
      { x: 62, y: 82, w: 10, h: 5, text: '派遣', conf: 0.96, color: 'border-green-400 bg-green-400/10 text-green-300' },
    ],
    action: '→ 未检测到平台UI，游戏加载完成 ✓',
    actionColor: 'text-green-400',
  },
  {
    label: '派遣界面',
    desc: '识别"一键派遣"和"确认"按钮',
    boxes: [
      { x: 20, y: 10, w: 20, h: 6, text: '委托派遣', conf: 0.99, color: 'border-slate-500 bg-slate-500/10 text-slate-400' },
      { x: 35, y: 70, w: 28, h: 8, text: '一键派遣', conf: 0.98, color: 'border-yellow-400 bg-yellow-400/10 text-yellow-300' },
      { x: 60, y: 82, w: 15, h: 7, text: '确认', conf: 0.97, color: 'border-green-400 bg-green-400/10 text-green-300' },
    ],
    action: '→ 点击"一键派遣" → "确认"',
    actionColor: 'text-yellow-400',
  },
]

export default function OcrDemo() {
  const [active, setActive] = useState(0)
  const scene = SCENES[active]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-purple-400 text-xs font-mono uppercase tracking-widest mb-3">核心 AI 组件</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">RapidOCR 识别演示</h2>
          <p className="text-slate-400 text-lg">基于 ONNX Runtime 的中文 OCR 模型，实时识别游戏界面文字位置</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {SCENES.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActive(i)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                active === i
                  ? 'bg-purple-700 text-white shadow-lg shadow-purple-900/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-500 text-xs font-mono mb-2">游戏截图（模拟）+ OCR 识别框</p>
            <div className="relative bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-purple-950">
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(181,123,238,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(181,123,238,0.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-700 text-sm font-mono">
                  游戏画面
                </div>
              </div>
              {scene.boxes.map((box, i) => (
                <div
                  key={i}
                  className={`absolute border rounded px-1 flex items-center justify-center text-xs font-mono ${box.color} transition-all duration-300`}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.w}%`,
                    height: `${box.h}%`,
                  }}
                >
                  <span className="truncate">{box.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-slate-500 text-xs font-mono mb-2">OCR 输出结果</p>
            <div className="terminal-win h-full">
              <div className="terminal-bar">
                <div className="dot bg-red-500" /><div className="dot bg-yellow-500" /><div className="dot bg-green-500" />
                <span className="ml-2 text-slate-500 text-xs font-mono">ocr_result</span>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-slate-500 text-xs font-mono"># {scene.desc}</p>
                <p className="text-slate-500 text-xs font-mono">ocr_result, _ = ocr(image)</p>
                <div className="mt-3 space-y-2">
                  {scene.boxes.map((box, i) => (
                    <div key={i} className={`flex items-center gap-2 text-xs font-mono p-2 rounded-lg border ${box.color}`}>
                      <span className="text-slate-500">[{i}]</span>
                      <span className="flex-1">"{box.text}"</span>
                      <span className="text-slate-500">conf={box.conf}</span>
                      <span className="text-slate-600">({box.x}%,{box.y}%)</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <p className={`text-sm font-mono font-bold ${scene.actionColor}`}>{scene.action}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
