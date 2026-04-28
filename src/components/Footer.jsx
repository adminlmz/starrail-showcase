import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-black mb-2 gold-text">星穹铁道云游戏自动化</h2>
        <p className="text-slate-500 text-sm mb-6">
          SSH + RapidOCR · Python · 个人项目 · 仅供学习研究
        </p>
        <a href="https://github.com/adminlmz/starrail-showcase" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl transition-all hover:scale-105 text-sm">
          <Github size={16} /> GitHub
        </a>
        <p className="mt-8 text-slate-700 text-xs">⚠️ 本项目仅供学习研究，使用自动化脚本可能违反游戏服务条款</p>
      </div>
    </footer>
  )
}
