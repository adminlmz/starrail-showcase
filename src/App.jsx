import Hero from './components/Hero.jsx'
import Pipeline from './components/Pipeline.jsx'
import OcrDemo from './components/OcrDemo.jsx'
import Stack from './components/Stack.jsx'
import FlowLog from './components/FlowLog.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 overflow-x-hidden">
      <div className="star-bg fixed inset-0 pointer-events-none opacity-60" />
      <div className="relative z-10">
        <Hero />
        <Pipeline />
        <OcrDemo />
        <FlowLog />
        <Stack />
        <Footer />
      </div>
    </div>
  )
}
