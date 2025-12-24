import { useEffect, useState } from "react";
import { motion, useScroll, useVelocity, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ROBOT_CONFIG = {
  messages: {
    dizzy: "Whoa! Slow down, getting dizzy! 😵‍💫",
    polite: "Please check my work properly... presented with love! ❤️",
    cta: "Yes!! You reached the end! 🚀",
    robotMsgUnderlined: "Let's work together?" 
  }, 
  timing: {
    autoHideDuration: 8000,
    dizzyDuration: 3000
  }, 
  colors: {
    cyan: "#22d3ee",
    purple: "#a855f7",
    red: "#ef4444",
  },
};

const StatusCorner = () => {
  // --- 1. SHARED SCROLL LOGIC ---
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // --- 2. ROBOT STATE LOGIC ---
  const [robotState, setRobotState] = useState<'hidden' | 'dizzy' | 'polite' | 'cta'>('hidden');
  const [showRobotMessage, setShowRobotMessage] = useState(false);

  useEffect(() => {
    // Check Velocity (Fast Scroll)
    const unsubscribeVelocity = scrollVelocity.on("change", (latest) => {
      const speed = Math.abs(latest);
      if (speed > 25000 && robotState === 'hidden') {
        setRobotState('dizzy');
        setShowRobotMessage(true);
        setTimeout(() => setRobotState('polite'), ROBOT_CONFIG.timing.dizzyDuration);
        setTimeout(() => {
           // If we are not at the bottom (CTA), go back to hidden (Loader)
           setRobotState((prev) => prev === 'cta' ? 'cta' : 'hidden');
           setShowRobotMessage(false);
        }, ROBOT_CONFIG.timing.autoHideDuration);
      }
    });

    // Check Position (Bottom CTA)
    const unsubscribeProgress = scrollYProgress.on("change", (latest) => {
      if (latest > 0.85) {
        setRobotState('cta');
        setShowRobotMessage(true);
      } else if (latest < 0.80 && robotState === 'cta') {
        // If user scrolls back up, switch back to Loader
        setRobotState('hidden');
        setShowRobotMessage(false);
      }
    });

    return () => {
      unsubscribeVelocity();
      unsubscribeProgress();
    };
  }, [scrollVelocity, scrollYProgress, robotState]);

  // --- 3. LOADER ANIMATION LOGIC ---
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const glowColor = useTransform(scrollYProgress, [0, 0.5, 1], [ROBOT_CONFIG.colors.cyan, ROBOT_CONFIG.colors.purple, ROBOT_CONFIG.colors.red]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2 pointer-events-none">
      
      {/* A. MESSAGE BUBBLE (Only visible when Robot is active) */}
      <AnimatePresence>
        {showRobotMessage && robotState !== 'hidden' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="relative bg-white text-slate-900 px-6 py-4 rounded-[2rem] rounded-br-none shadow-2xl border-2 border-cyan-500/20 max-w-[220px] text-xs font-bold mb-3 pointer-events-auto cursor-pointer"
          >
             {robotState === 'dizzy' && <span>{ROBOT_CONFIG.messages.dizzy}</span>}
             {robotState === 'polite' && <span className="text-pink-600">{ROBOT_CONFIG.messages.polite}</span>}
             {robotState === 'cta' && (
                <Link to="/contact" className="hover:text-cyan-600 transition-colors block">
                  {ROBOT_CONFIG.messages.cta}
                  <br/>
                  <span className="text-cyan-600 mt-1 block underline decoration-wavy">{ROBOT_CONFIG.messages.robotMsgUnderlined}</span>
                </Link>
             )}
             {/* Cloud Tail */}
             <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-cyan-500/20 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* B. THE COMPONENT SWITCHER (Loader <-> Robot) */}
      <div className="relative w-20 h-20 flex items-center justify-center pointer-events-auto cursor-pointer" onClick={() => setShowRobotMessage(!showRobotMessage)}>
        <AnimatePresence mode="wait">
          
          {robotState === 'hidden' ? (
            // --- OPTION 1: THE 3D REACTOR (Default) ---
            <motion.div
              key="loader"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-16 h-16"
              style={{ perspective: "1000px" }}
            >
                <motion.div style={{ rotateZ }} className="absolute inset-0 rounded-full border-2 border-dashed border-slate-600/50" />
                <motion.div style={{ rotateX, borderColor: glowColor }} className="absolute inset-2 rounded-full border-2 border-cyan-500/80 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <motion.div style={{ rotateY, borderColor: glowColor }} className="absolute inset-4 rounded-full border-2 border-purple-500/80" />
                <motion.div animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_20px_white]" />
            </motion.div>
          ) : (
            // --- OPTION 2: THE ROBOT (Active) ---
            <motion.div
              key="robot"
              initial={{ scale: 0, opacity: 0, rotate: 180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: -180 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-20 h-20 bg-slate-900 rounded-full border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center relative overflow-hidden"
            >
               {/* Robot Face Logic */}
               <div className="relative w-full h-full flex items-center justify-center">
                  {/* Eyes */}
                  {robotState === 'dizzy' ? (
                      <>
                        <div className="absolute top-6 left-5 text-cyan-400 text-lg animate-spin">x</div>
                        <div className="absolute top-6 right-5 text-cyan-400 text-lg animate-spin">x</div>
                      </>
                  ) : (
                      <>
                         <div className="absolute top-6 left-5 w-3 h-4 bg-cyan-400 rounded-full animate-blink" />
                         <div className="absolute top-6 right-5 w-3 h-4 bg-cyan-400 rounded-full animate-blink" />
                      </>
                  )}
                  {/* Blush */}
                  {(robotState === 'polite' || robotState === 'cta') && (
                     <>
                        <div className="absolute top-9 left-3 w-3 h-2 bg-pink-500/60 rounded-full blur-[2px]" />
                        <div className="absolute top-9 right-3 w-3 h-2 bg-pink-500/60 rounded-full blur-[2px]" />
                     </>
                  )}
                  {/* Mouth */}
                  {robotState === 'dizzy' ? (
                      <div className="absolute bottom-5 w-6 h-1 bg-white rounded-full skew-x-12" />
                  ) : (robotState === 'polite' || robotState === 'cta') ? (
                      <div className="absolute bottom-4 w-6 h-4 bg-white rounded-b-full overflow-hidden"><div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-pink-400 rounded-t-full" /></div>
                  ) : (
                      <div className="absolute bottom-5 w-6 h-2 border-b-2 border-white rounded-full" />
                  )}
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatusCorner;