import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion
import Card from "./Card";
import { FiMapPin } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiTypescript, SiGoogle } from "react-icons/si";

function App() {
  const [aboutMode, setAboutMode] = useState<'work' | 'life'>('work');

  // 1. The Animation Settings
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each card appearing
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start: invisible and 50px down
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 50, damping: 20 } // End: bounce gently into place
    }, 
  };

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30">

        {/* 2. Turn the Grid into a motion.div and apply the container variants */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]"
        >

          {/* 1. HERO Card (2x2) */}
          <Card variants={itemVariants} className="md:col-span-2 md:row-span-2 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="flex justify-between items-start z-10">
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 rounded-full w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Available for work
                </div>
              </div>
              <div className="relative w-20 h-20 md:w-30 md:h-30 rounded-full border-2 border-white/10 bg-white/5 overflow-hidden">
                <img src="/src/assets/my-photo.png" alt="Profile" className="object-cover w-full h-full" />
              </div>
            </div>
            <div className="mt-auto z-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-slate-100">Building </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">digital products</span>
                <br />
                <span className="text-slate-400 text-3xl md:text-4xl">that feel alive.</span>
              </h1>
              <p className="mt-4 text-slate-500 text-sm md:text-base max-w-sm">
                Full Stack Developer specializing in MERN & Creative UI.
              </p>
            </div>
            <div className="mt-6 flex gap-3 z-10">
              <button className="flex items-center gap-2 bg-slate-100 text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform active:scale-95">
                Let's Talk
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button className="px-5 py-2.5 rounded-full font-bold text-sm text-slate-300 border border-white/10 hover:bg-white/5 transition-colors">
                Copy Email
              </button>
            </div>
          </Card>

          {/* 2. ABOUT ME CARD (1x2 - Tall) */}
          <Card variants={itemVariants} className="md:col-span-1 md:row-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-200">About Me</h3>
              <div className="flex bg-slate-800 p-1 rounded-full border border-white/5">
                <button onClick={() => setAboutMode('work')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${aboutMode === 'work' ? 'bg-slate-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Work</button>
                <button onClick={() => setAboutMode('life')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${aboutMode === 'life' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Life</button>
              </div>
            </div>
            <div className="relative h-full">
              {aboutMode === 'work' ? (
                <div key="work" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-slate-400 leading-relaxed mb-4">I am a <span className="text-white font-bold">Full Stack Engineer</span> focused on scalable backends and intuitive frontend architectures.</p>
                  <p className="text-slate-400 leading-relaxed">My strength lies in bridging the gap between <span className="text-cyan-400">complex logic</span> and <span className="text-purple-400">pixel-perfect design</span>.</p>
                  <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-white/5">
                    <p className="text-xs text-slate-500 font-mono">Current Focus: <br /> <span className="text-green-400">System Design & AI Agents</span></p>
                  </div>
                </div>
              ) : (
                <div key="life" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-slate-400 leading-relaxed mb-4">When I'm not coding, I'm usually exploring <span className="text-orange-400">new tech trends</span> or refining my UI/UX taste.</p>
                  <p className="text-slate-400 leading-relaxed">I believe in <span className="text-white italic">"Shipping fast and breaking things"</span> (but fixing them faster).</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-500"><li>🎧 Lo-fi Music Playlists</li><li>☕ Black Coffee</li><li>🚀 Startup Enthusiast</li></ul>
                </div>
              )}
            </div>
          </Card>

          {/* 3. EDUCATION (1x1) */}
          <Card variants={itemVariants} className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center group">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ring-1 ring-white/10 group-hover:ring-cyan-500/50">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="font-bold text-slate-200">BCA Hons</h3>
            <p className="text-xs text-slate-500 mt-1">2022 - 2025</p>
            <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-wide">Graduated</p>
          </Card>

          {/* 4. LOCATION (1x1) */}
          <Card variants={itemVariants} className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center">
            <FiMapPin className="text-3xl text-pink-500 mb-2" />
            <h3 className="font-bold">India</h3>
            <p className="text-xs text-slate-500">Remote Ready</p>
          </Card>

          {/* 5. DASHBOARD PROJECT CARD (2x2) */}
          <Card variants={itemVariants} className="md:col-span-2 md:row-span-2 flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div><h2 className="text-2xl font-bold text-slate-100">Smart Bot</h2><p className="text-sm text-slate-500 mt-1">MERN Stack • Gemini API • Socket.io</p></div>
              <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-md"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span className="text-xs font-bold text-green-400">V1.0 Live</span></div>
            </div>
            <div className="relative w-full h-64 md:h-full bg-slate-900 rounded-t-xl border-t border-l border-r border-white/10 overflow-hidden shadow-2xl mt-4 group-hover:translate-y-[-5px] transition-transform duration-500">
              <div className="h-8 bg-slate-800 border-b border-white/5 flex items-center px-3 gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/20" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/20" /><div className="ml-4 w-full max-w-[150px] h-4 bg-slate-700/50 rounded-full" /></div>
              <div className="relative w-full h-full bg-slate-950 flex flex-col p-4">
                <div className="flex flex-col gap-3">
                  <div className="self-end bg-cyan-600/20 text-cyan-200 px-4 py-2 rounded-2xl rounded-tr-sm text-xs max-w-[80%] border border-cyan-500/20">Analyze user retention rates for Q3.</div>
                  <div className="self-start bg-slate-800 text-slate-300 px-4 py-2 rounded-2xl rounded-tl-sm text-xs max-w-[90%] border border-white/5"><span className="text-purple-400 font-bold text-[10px] block mb-1">GEMINI AI</span>Based on the data, retention is up by 15%. Here is the breakdown...</div>
                  <div className="self-start mt-2 w-full h-24 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-white/5 relative overflow-hidden"><div className="absolute bottom-0 left-0 right-0 h-10 bg-cyan-500/10 skew-y-3" /></div>
                </div>
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><button className="px-6 py-2 bg-white text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">View Case Study ↗</button></div>
              </div>
            </div>
          </Card>

          {/* 6. TECH STACK CARD (2x1) */}
          <Card variants={itemVariants} className="md:col-span-2 md:row-span-1 flex flex-col justify-center gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">My Tech Stack</h3>
              <span className="text-xs text-slate-500">Hover to activate</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 md:gap-8 justify-start">
              <div className="group/icon flex flex-col items-center gap-2 cursor-pointer"><SiReact className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-cyan-400 group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" /><span className="text-xs text-slate-500 group-hover/icon:text-cyan-300 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">React</span></div>
              <div className="group/icon flex flex-col items-center gap-2 cursor-pointer"><SiNodedotjs className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-green-500 group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" /><span className="text-xs text-slate-500 group-hover/icon:text-green-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">Node</span></div>
              <div className="group/icon flex flex-col items-center gap-2 cursor-pointer"><SiMongodb className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-green-400 group-hover/icon:scale-110" /><span className="text-xs text-slate-500 group-hover/icon:text-green-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">MongoDB</span></div>
              <div className="group/icon flex flex-col items-center gap-2 cursor-pointer"><SiTailwindcss className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-sky-400 group-hover/icon:scale-110" /><span className="text-xs text-slate-500 group-hover/icon:text-sky-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">Tailwind CSS</span></div>
              <div className="group/icon flex flex-col items-center gap-2 cursor-pointer"><SiTypescript className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-blue-500 group-hover/icon:scale-110" /><span className="text-xs text-slate-500 group-hover/icon:text-blue-500 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">TypeScript</span></div>
              <div className="group/icon flex flex-col items-center gap-2 cursor-pointer"><SiGoogle className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-orange-400 group-hover/icon:scale-110" /><span className="text-xs text-slate-500 group-hover/icon:text-orange-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">Gemini</span></div>
            </div>
          </Card>

          {/* 7. CONTACT CARD (1x1) */}
          <Card variants={itemVariants} className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-purple-600 to-indigo-600 border-none relative overflow-hidden group">
            <a href="mailto:lakshayas918@gmail.com" className="h-full w-full flex flex-col justify-between p-1">
              <div className="flex justify-end"><div className="bg-white/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></div></div>
              <div><h3 className="text-3xl font-bold text-white mb-[-5px]">Let's</h3><h3 className="text-3xl font-bold text-white/70 group-hover:text-white transition-colors">Work.</h3></div>
            </a>
          </Card>

          {/* 8. LEARNING CARD (1x1) */}
          <Card variants={itemVariants} className="md:col-span-1 md:row-span-1 flex flex-col justify-center">
            <p className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Currently Learning</p>
            <div className="flex justify-between items-end mb-2"><h3 className="font-bold text-xl text-slate-200">Next.js 15</h3><span className="text-xs text-cyan-400 font-bold">75%</span></div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-white/5"><div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-[75%] animate-pulse" /></div>
          </Card>

        </motion.div>
      </div>
    </>
  )
}

export default App;