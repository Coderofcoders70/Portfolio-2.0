import { Hero } from "./Hero";
import { About } from "./About";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Confetti from "../components/Confetti";
import CoffeeCard from "../components/CoffeeCard";
import React, { useState, useEffect } from "react";
import { TechStack } from "../components/TechStack";
import StatusCorner from "../components/StatusCorner";
import { motion, type Variants } from "framer-motion";
import { FiMapPin, FiArrowRight, FiHeart } from "react-icons/fi"; 

function Home() {

  // --- EASTER EGG STATE ---
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [, setKeySequence] = useState<string[]>([]);
  const SECRET_CODE = "LAKSHAYA";

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
        <Hero />

        {/* 2. ABOUT ME CARD */}
        <About />

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
          <p className="text-xs text-slate-500">Onsite/Remote Ready</p>
        </Card>

        {/* 5. MY PROJECTS */}
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
        <TechStack />

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