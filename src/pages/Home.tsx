import Card from "../components/Card";
import CoffeeCard from "../components/CoffeeCard";
import StatusCorner from "../components/StatusCorner";
import Confetti from "../components/Confetti";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { FiMapPin, FiArrowRight, FiHeart } from "react-icons/fi"; // Added FiHeart
import { MatrixText } from "../components/MatrixText";
import React, { useState, useEffect } from "react";
import { SiHtml5, SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiJavascript, SiTypescript, SiCss3 } from "react-icons/si";

const phrases = ["Lakshaya Sharma", "Full Stack Developer", "Backend Developer", "AI-Enthusiast"];

function Home() {
  const [aboutMode, setAboutMode] = useState<'work' | 'life'>('work');
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // --- EASTER EGG STATE ---
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [, setKeySequence] = useState<string[]>([]);
  const SECRET_CODE = "LAKSHAYA";

  // --- TYPEWRITER LOGIC ---
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  // --- EASTER EGG & CONSOLE HINT ---
  useEffect(() => {
    console.log("%c👀 Psst... Looking for a surprise?", "color: #22d3ee; font-size: 14px; font-weight: bold;");
    console.log("%cType 'LAKSHAY' or click the Magic Mode in footer...", "color: #e879f9; font-size: 12px;");

    const handleKeyDown = (e: KeyboardEvent) => {
      const char = e.key.toUpperCase();
      setKeySequence(prev => {
        const newSeq = [...prev, char].slice(-SECRET_CODE.length);
        if (newSeq.join("") === SECRET_CODE) {
          triggerParty();
        }
        return newSeq;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Helper to trigger party (used by Key press AND Button click)
  const triggerParty = () => {
    setIsPartyMode(true);
    console.log("%c🎉 PARTY MODE ACTIVATED! 🎉", "color: orange; font-size: 20px; font-weight: bold;");
    setTimeout(() => setIsPartyMode(false), 8000);
  };

  // --- SPOTLIGHT MOUSE TRACKER ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.getElementsByClassName("spotlight-card");
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } },
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30 flex flex-col"
    >
      {isPartyMode && <Confetti />}

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] mb-12">

        {/* 1. HERO Card */}
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

            <div className="relative w-20 h-20 md:w-30 md:h-30 rounded-full border-2 border-white/10 bg-white/5 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.6)]">
              <img src="/src/assets/my-photo.png" alt="Profile" className="object-cover w-full h-full" />
            </div>
          </div>

          <div className="mt-auto z-10">
            <h3 className="text-lg font-mono text-cyan-400 mb-2 font-bold min-h-[28px]">
              Hi, I am <span className="text-cyan-400">{text}</span>
              <span className="animate-pulse text-cyan-400">|</span>
            </h3>

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
            <Link to="/contact">
              <button className="flex items-center gap-2 bg-slate-100 text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform active:scale-95">
                Let's Talk
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </Link>

            <a
              href="src/assets/my-Resume/Lakshaya_Sharma_FullStackDeveloper.pdf"
              download="Lakshaya_Sharma_Resume.pdf"
              className="px-5 py-2.5 rounded-full font-bold text-sm text-slate-300 border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
            >
              My Resume ⬇
            </a>
          </div>
        </Card>

        {/* 2. ABOUT ME CARD */}
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
                <p className="text-slate-400 leading-relaxed">
                  My strength lies in bridging the gap between <span className="text-cyan-400">complex logic</span> and <span className="text-purple-400">pixel-perfect design</span>.
                </p>
                <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-green-500/20 shadow-[0_0_15px_-5px_rgba(34,197,94,0.1)]">
                  <p className="text-xs text-slate-500 font-mono mb-2 uppercase tracking-wider">Current Focus:</p>
                  <div className="min-h-[24px]">
                    <MatrixText />
                  </div>
                </div>
              </div>
            ) : (
              <div key="life" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-slate-400 leading-relaxed mb-4">When I'm not coding, I'm usually exploring <span className="text-orange-400">new tech trends</span> or refining my UI/UX taste.</p>
                <p className="text-slate-400 leading-relaxed">
                  I believe in <span className="text-white italic">"Shipping fast and breaking things"</span> (but fixing them faster).
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-500"><li>🎧 Lo-fi Music Playlists</li><li>☕ Black Coffee</li><li>🚀 Startup Enthusiast</li></ul>
              </div>
            )}
          </div>
        </Card>

        {/* 3. EDUCATION */}
        <Card variants={itemVariants} className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center group">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ring-1 ring-white/10 group-hover:ring-cyan-500/50">
            <span className="text-2xl">🎓</span>
          </div>
          <h3 className="font-bold text-slate-200">BCA Hons</h3>
          <p className="text-xs text-slate-500 mt-1">2022 - 2025</p>
          <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-wide">Graduated</p>
        </Card>

        {/* 4. LOCATION */}
        <Card variants={itemVariants} className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center">
          <FiMapPin className="text-3xl text-pink-500 mb-2" />
          <h3 className="font-bold">India</h3>
          <p className="text-xs text-slate-500">Remote Ready</p>
        </Card>

        {/* 5. SEE MY PROJECTS */}
        <Card variants={itemVariants} className="md:col-span-2 md:row-span-2 group cursor-pointer">
          <Link to="/projects" className="h-full w-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black z-0" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0" />
            <div className="relative z-10 text-center">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse">
                  See My
                </span>
                <br />
                <span className="text-white drop-shadow-2xl">
                  Projects
                </span>
              </h2>
              <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2">
                  View All <FiArrowRight />
                </div>
              </div>
            </div>
          </Link>
        </Card>

        {/* 6. TECH STACK */}
        <Card variants={itemVariants} className="md:col-span-2 md:row-span-1 flex flex-col justify-center gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">
              Tech Stack
            </h3>
          </div>
          <div className="flex flex-wrap mt-8 gap-4 justify-start">
            <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
              <SiHtml5 className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-orange-400 group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="text-xs text-slate-500 group-hover/icon:text-orange-300 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">Html 5</span>
            </div>
            <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
              <SiCss3 className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-blue-400 group-hover/icon:scale-110" />
              <span className="text-xs text-slate-500 group-hover/icon:text-blue-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">CSS</span>
            </div>
            <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
              <SiReact className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-cyan-400 group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="text-xs text-slate-500 group-hover/icon:text-cyan-300 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">React</span>
            </div>
            <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
              <SiNodedotjs className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-green-500 group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-xs text-slate-500 group-hover/icon:text-green-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">Node</span>
            </div>
            <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
              <SiMongodb className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-green-400 group-hover/icon:scale-110" />
              <span className="text-xs text-slate-500 group-hover/icon:text-green-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">MongoDB</span>
            </div>
            <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
              <SiTailwindcss className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-sky-400 group-hover/icon:scale-110" />
              <span className="text-xs text-slate-500 group-hover/icon:text-sky-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">Tailwind CSS</span>
            </div>
            <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
              <SiJavascript className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-yellow-500 group-hover/icon:scale-110" />
              <span className="text-xs text-slate-500 group-hover/icon:text-yellow-500  opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">JavaScript</span>
            </div>
            <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
              <SiTypescript className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-blue-500 group-hover/icon:scale-110" />
              <span className="text-xs text-slate-500 group-hover/icon:text-blue-500 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">TypeScript</span>
            </div>
          </div>
        </Card>

        {/* 7. COFFEE BREAK CARD */}
        <CoffeeCard className="md:col-span-2 md:row-span-1" />

        {/* 8. LEARNING CARD */}
        <Card variants={itemVariants} className="md:col-span-1 md:row-span-1 flex flex-col justify-center">
          <p className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Currently Learning</p>
          <div className="flex justify-between items-end mb-2"><h3 className="font-bold text-xl text-slate-200">Next.js 15</h3><span className="text-xs text-cyan-400 font-bold">75%</span></div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-white/5"><div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-[75%] animate-pulse" /></div>
        </Card>

        {/* 9. CONTACT LINK CARD */}
        <Card variants={itemVariants} className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-purple-600 to-indigo-600 border-none relative overflow-hidden group">
          <Link to="/contact" className="h-full w-full flex flex-col justify-between p-1">
            <div className="flex justify-end">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-[-5px]">Let's</h3>
              <h3 className="text-3xl font-bold text-white/70 group-hover:text-white transition-colors">Work.</h3>
            </div>
          </Link>
        </Card>

      </motion.div>

      {/* --- NEW FOOTER SECTION --- */}
      <footer className="mt-auto py-8 text-center text-slate-500 text-sm flex flex-col md:flex-row justify-center items-center gap-4">
        <p className="flex items-center gap-2">
          Designed & Built with <FiHeart className="text-red-500 fill-red-500 animate-pulse" /> by Lakshaya Sharma
        </p>
        <span className="hidden md:block text-slate-700">|</span>
        <button
          onClick={triggerParty}
          className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors animate-pulse"
        >
          ✨ Magic Mode
        </button>
      </footer>

      <StatusCorner />
    </div>
  );
}

export default Home;