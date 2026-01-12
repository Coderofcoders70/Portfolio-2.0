import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BOOT_STEPS = [
  "INITIALIZING NEURAL CORE...",
  "CALIBRATING ROBOT EMOTIONS...",
  "SYNCHRONIZING MERN STACK...",
  "LOADING CREATIVITY...",
  "SYSTEM READY."
];

const Preloader = ({ finishLoading }: { finishLoading: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // 1. Progress Counter Logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(finishLoading, 1000); // Wait 1s after 100% to exit
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Approx 3 seconds total

    // 2. Text Step Logic
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < BOOT_STEPS.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] bg-slate-950 flex flex-col items-center justify-center font-mono"
    >
      <div className="relative flex flex-col items-center">
        
        {/* 1. THE SPINNING REACTOR (Logo) */}
        <div className="relative w-24 h-24 mb-8" style={{ perspective: "1000px" }}>
          <motion.div 
            animate={{ rotateZ: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30"
          />
          <motion.div 
            animate={{ rotateX: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_20px_white]"
          />
        </div>

        {/* 2. PROGRESS PERCENTAGE */}
        <motion.h2 className="text-4xl md:text-6xl font-black text-white mb-4 tabular-nums">
          {progress}%
        </motion.h2>

        {/* 3. BOOT STATUS TEXT */}
        <div className="h-6">
            <motion.p 
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-cyan-500 text-xs md:text-sm tracking-[0.2em] uppercase"
            >
              {BOOT_STEPS[currentStep]}
            </motion.p>
        </div>

        {/* 4. PROGRESS BAR */}
        <div className="absolute bottom-[-100px] w-64 h-[2px] bg-slate-800 overflow-hidden">
            <motion.div 
                className="h-full bg-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
            />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;