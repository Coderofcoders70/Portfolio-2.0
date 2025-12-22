import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

// Update interface to accept standard motion props (like variants)
interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    // <motion.div
    //   whileHover={{ scale: 1.02 }}
    //   className={`relative group rounded-3xl p-[1px] overflow-hidden ${className}`}
    // >
    //   {/* 1. The Gradient Border (Hidden by default, visible on hover or low opacity) */}
    //   <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

    //   {/* 2. The Inner Card (The dark "Glass" background) */}
    //   <div className="relative h-full bg-slate-950/90 backdrop-blur-xl rounded-[23px] p-6 border border-white/10 group-hover:border-transparent transition-colors">
        
    //     {/* 3. Subtle Noise Texture (Optional, makes it look premium) */}
    //     <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

    //     {/* 4. Content */}
    //     <div className="relative z-10 text-slate-200">
    //       {children}
    //     </div>
    //   </div>
    // </motion.div>

    <motion.div
      whileHover={{ scale: 1.02 }}
      // We pass the ...props down so the animation variants work
      {...props} 
      className={`relative group rounded-3xl p-[1px] overflow-hidden ${className}`}
    >
      {/* 1. The Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 2. The Inner Card */}
      <div className="relative h-full bg-slate-950/90 backdrop-blur-xl rounded-[23px] p-6 border border-white/10 group-hover:border-transparent transition-colors">
        
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