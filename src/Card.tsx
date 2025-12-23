import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      {...props}
      // Added 'spotlight-card' class here for the mouse tracking to find
      className={`spotlight-card relative group rounded-3xl p-[1px] overflow-hidden ${className}`}
    >
      {/* --- NEW: SPOTLIGHT OVERLAY --- */}
      {/* This creates the flashlight effect following the mouse */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 40%)`
        }}
      />

      {/* 1. The Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 2. The Inner Card */}
      <div className="relative h-full bg-slate-950/90 backdrop-blur-xl rounded-[23px] p-6 border border-white/10 group-hover:border-transparent transition-colors z-20">
        
        {/* 3. Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

        {/* 4. Content */}
        <div className="relative z-10 text-slate-200">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;