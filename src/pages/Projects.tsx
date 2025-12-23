import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../Card";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";

// --- REUSABLE PROJECT CARD COMPONENT ---
// This ensures all future projects have the same layout
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubLink?: string;
  liveLink?: string;
  children: React.ReactNode; // For the background UI/Image
  className?: string; // To handle grid spanning (e.g., md:col-span-2)
  variants?: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  tags, 
  githubLink, 
  liveLink, 
  children, 
  className = "",
  variants
}) => {
  return (
    <Card variants={variants} className={`relative group overflow-hidden flex flex-col justify-end ${className}`}>
      
      {/* 1. BACKGROUND CONTENT (Image/UI) */}
      <div className="absolute inset-0 bg-slate-900 z-0">
         {/* Simulated Screen Container - centers content */}
         <div className="w-full h-full p-4 md:p-8 flex items-center justify-center opacity-50 group-hover:opacity-30 transition-opacity duration-500">
             {children}
         </div>
      </div>

      {/* 2. GRADIENT OVERLAY (Readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10 pointer-events-none" />

      {/* 3. TEXT CONTENT & BUTTONS */}
      <div className="relative z-20 p-6 flex flex-col h-full justify-end">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            
            {/* Text Info */}
            <div className="flex-1">
               <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
               <p className="text-slate-400 text-sm max-w-lg mb-4 leading-relaxed">
                 {description}
               </p>
               
               {/* Tags */}
               <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 text-slate-300 text-xs rounded border border-white/10">
                      {tag}
                    </span>
                  ))}
               </div>
            </div>

            {/* Buttons - Stack on mobile, Row on Desktop */}
            <div className="flex gap-3 mt-4 md:mt-0">
               {liveLink && (
                 <a 
                   href={liveLink} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform flex items-center justify-center"
                   title="View Live Site"
                 >
                   <FiExternalLink />
                 </a>
               )}
               {githubLink && (
                 <a 
                   href={githubLink} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="p-3 bg-slate-950 text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                   title="View Source Code"
                 >
                   <FiGithub />
                 </a>
               )}
            </div>
         </div>
      </div>
    </Card>
  );
};


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
          <h1 className="text-3xl font-bold">My Work</h1>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(350px, auto)]"
        >

          {/* --- PROJECT 1: SMART BOT --- */}
          <ProjectCard 
            title="Smart Bot"
            description="A full-stack AI chat interface powered by Gemini. Features real-time socket communication and persistent chat history."
            tags={["React", "Node.js", "Gemini AI", "Socket.io"]}
            liveLink="https://github.com/Coderofcoders70/Smartbot-frontend" // <-- ADD YOUR LINK
            githubLink="https://github.com/Coderofcoders70/Smartbot-frontend" // <-- ADD YOUR LINK
            className="mt-10 md:col-span-2 lg:col-span-2"
            variants={itemVariants}
          >
             {/* The "Visual" part of the card (Simulated Screen) */}
             <div className="w-full max-w-md bg-slate-800 rounded-lg border border-white/10 overflow-hidden shadow-2xl transform transition-transform group-hover:scale-105 duration-500">
                <div className="h-6 bg-slate-700 flex items-center px-2 gap-1">
                   <div className="w-2 h-2 rounded-full bg-red-500"/>
                   <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                   <div className="w-2 h-2 rounded-full bg-green-500"/>
                </div>
                <div className="p-4 font-mono text-xs space-y-2 h-40">
                   <div className="text-slate-400">&gt; Connecting to Gemini API...</div>
                   <div className="text-green-400">&gt; Connection Established.</div>
                   <div className="text-blue-400">&gt; User: "Generate annual report"</div>
                   <div className="text-purple-400 typing-effect">&gt; AI: Processing request...</div>
                </div>
             </div>
          </ProjectCard>


          {/* --- PROJECT 2: COMING SOON (Using the same layout structure) --- */}
          <Card variants={itemVariants} className="md:col-span-1 min-h-[350px] bg-slate-900/50 flex flex-col items-center justify-center text-slate-500 border-dashed border-2 border-white/5 hover:border-white/10 transition-colors">
             <div className="text-4xl mb-2">🚧</div>
             <h3 className="text-xl font-bold">Project Two</h3>
             <p className="text-sm">Work in Progress</p>
          </Card>

           {/* --- PROJECT 3: COMING SOON --- */}
           <Card variants={itemVariants} className="md:col-span-1 min-h-[350px] bg-slate-900/50 flex flex-col items-center justify-center text-slate-500 border-dashed border-2 border-white/5 hover:border-white/10 transition-colors">
             <div className="text-4xl mb-2">🚀</div>
             <h3 className="text-xl font-bold">Project Three</h3>
             <p className="text-sm">Coming Soon...</p>
          </Card>

        </motion.div>
      </div>
    </div>
  );
};

export default Projects;