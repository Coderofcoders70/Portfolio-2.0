import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../Card";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link to="/" className="p-2 rounded-full bg-slate-900 border border-white/10 hover:bg-white/10 transition-colors">
            <FiArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold">Selected Works</h1>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]"
        >

          {/* PROJECT 1: Smart Bot (FIXED) */}
          <Card variants={itemVariants} className="md:col-span-2 relative group overflow-hidden flex flex-col justify-end">
             
             {/* 1. The Background Image/UI (Absolute & Full Size) */}
             <div className="absolute inset-0 bg-slate-900 z-0">
                {/* Simulated Screen */}
                <div className="w-full h-full p-8 mt-8 flex items-center justify-center opacity-50 group-hover:opacity-30 transition-opacity duration-500">
                    <div className="w-full max-w-md h-64 bg-slate-800 rounded-lg border border-white/10 overflow-hidden shadow-2xl">
                       {/* Header Bar */}
                       <div className="h-6 bg-slate-700 flex items-center px-2 gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"/>
                          <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                          <div className="w-2 h-2 rounded-full bg-green-500"/>
                       </div>
                       {/* Code/Chat Content */}
                       <div className="p-4 font-mono text-xs space-y-2">
                          <div className="text-slate-400">&gt; Connecting to Gemini API...</div>
                          <div className="text-green-400">&gt; Connection Established.</div>
                          <div className="text-blue-400">&gt; User: "Generate annual report"</div>
                          <div className="text-purple-400 typing-effect">&gt; AI: Processing request...</div>
                       </div>
                    </div>
                </div>
             </div>

             {/* 2. Gradient Overlay (To make text readable) */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10" />

             {/* 3. The Text Content (Highest Z-Index) */}
             <div className="relative z-20 p-6">
                <div className="flex justify-between items-end">
                   <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Smart Bot Dashboard</h2>
                      <p className="text-slate-400 text-sm max-w-md">
                        A full-stack AI chat interface powered by Gemini. Features real-time socket communication and persistent MongoDB chat history.
                      </p>
                      <div className="flex gap-2 mt-4">
                         <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded border border-cyan-500/20">React</span>
                         <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Node.js</span>
                         <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded border border-purple-500/20">Gemini AI</span>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"><FiExternalLink /></button>
                      <button className="p-3 bg-black text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"><FiGithub /></button>
                   </div>
                </div>
             </div>
          </Card>

          {/* PROJECT 2: Placeholder */}
          <Card variants={itemVariants} className="md:col-span-1 bg-slate-900/50">
             <div className="h-full flex flex-col justify-center items-center text-slate-500">
                <h3 className="text-xl font-bold mb-2">Project Two</h3>
                <p className="text-sm">Coming Soon...</p>
             </div>
          </Card>

           {/* PROJECT 3: Placeholder */}
           <Card variants={itemVariants} className="md:col-span-1 bg-slate-900/50">
             <div className="h-full flex flex-col justify-center items-center text-slate-500">
                <h3 className="text-xl font-bold mb-2">Project Three</h3>
                <p className="text-sm">Coming Soon...</p>
             </div>
          </Card>

        </motion.div>
      </div>
    </div>
  );
};

export default Projects;