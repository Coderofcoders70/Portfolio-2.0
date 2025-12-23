import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollCore = () => {
  const { scrollYProgress } = useScroll();

  // Map scroll progress (0 to 1) to rotation degrees
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -360]);
  
  // Change color from Cyan (Start) to Purple (End)
  const glowColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#22d3ee", "#a855f7", "#ef4444"] // Cyan -> Purple -> Red (at finish)
  );

  return (
    <div className="fixed bottom-8 left-8 z-50 pointer-events-none hidden md:flex items-center gap-4">
      
      {/* 3D REACTOR CONTAINER */}
      <div className="relative w-16 h-16" style={{ perspective: "1000px" }}>
        
        {/* 1. OUTER RING ( spins Z axis ) */}
        <motion.div
          style={{ rotateZ }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-slate-600/50"
        />

        {/* 2. MIDDLE RING ( spins X axis - creating depth ) */}
        <motion.div
          style={{ rotateX, borderColor: glowColor }}
          className="absolute inset-2 rounded-full border-2 border-cyan-500/80 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        />

        {/* 3. INNER RING ( spins Y axis - creating chaos ) */}
        <motion.div
          style={{ rotateY, borderColor: glowColor }}
          className="absolute inset-4 rounded-full border-2 border-purple-500/80"
        />

        {/* 4. THE CORE ( Pulsing Energy ) */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_20px_white]"
        />
        
      </div>

      {/* TEXT LABEL (Optional) */}
      <motion.div style={{ opacity: scrollYProgress }} className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
        System Charge
      </motion.div>

    </div>
  );
};

export default ScrollCore;