import React, { useEffect, useState } from "react";
import { motion, useScroll, useVelocity, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const RobotGuide = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Added 'polite' state for the follow-up message
  const [robotState, setRobotState] = useState<'hidden' | 'dizzy' | 'polite' | 'cta'>('hidden');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // 1. VELOCITY CHECK (For Fast Scrolling)
    const unsubscribeVelocity = scrollVelocity.on("change", (latest) => {
      const speed = Math.abs(latest);
      
      // Using your threshold of 25000
      if (speed > 25000 && robotState === 'hidden') {
        // Step 1: Get Dizzy
        setRobotState('dizzy');
        setShowMessage(true);
        
        // Step 2: After 3 seconds, become Polite/Cute
        const timer1 = setTimeout(() => {
          setRobotState('polite');
        }, 3000);

        // Step 3: After another 5 seconds, Hide
        const timer2 = setTimeout(() => {
          if (robotState !== 'cta') { // Don't hide if user scrolled to bottom
             setRobotState('hidden');
             setShowMessage(false);
          }
        }, 8000);

        return () => {
           clearTimeout(timer1);
           clearTimeout(timer2);
        };
      }
    });

    // 2. BOTTOM CHECK (For "Let's Work")
    const unsubscribeProgress = scrollYProgress.on("change", (latest) => {
      if (latest > 0.99) {
        setRobotState('cta');
        setShowMessage(true);
      } else if (latest < 0.90 && robotState === 'cta') {
        setRobotState('hidden');
        setShowMessage(false);
      }
    });

    return () => {
      unsubscribeVelocity();
      unsubscribeProgress();
    };
  }, [scrollVelocity, scrollYProgress, robotState]);

  // ANIMATION VARIANTS
  const robotVariants = {
    hidden: { y: 100, opacity: 0, scale: 0 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } },
    dizzy: { 
      rotate: [0, -20, 20, -20, 20, 0], 
      transition: { repeat: Infinity, duration: 0.6 } 
    },
    // Gentle bounce for the cute state
    bounce: {
      y: [0, -5, 0],
      transition: { repeat: Infinity, duration: 2 }
    }
  };

  if (robotState === 'hidden') return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2 pointer-events-none">
      
      {/* 1. THE CLOUDY MESSAGE BUBBLE */}
      <AnimatePresence mode="wait">
        {showMessage && (
          <motion.div 
            key={robotState} // Animates when message changes
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="relative bg-white text-slate-900 px-6 py-4 rounded-[2rem] rounded-br-none shadow-2xl border-2 border-cyan-500/20 max-w-[220px] text-xs font-bold mb-3 pointer-events-auto cursor-pointer"
            onClick={() => {
                if(robotState === 'cta') { /* Handle click */ }
            }}
          >
             {/* CONTENT SWITCHER */}
             {robotState === 'dizzy' && (
                <span>Whoa! Slow down, I'm getting dizzy! 😵‍💫</span>
             )}
             
             {robotState === 'polite' && (
                <span className="text-pink-600">
                   Please check my work properly...I have presented it with all my heart and love! ❤️
                </span>
             )}

             {robotState === 'cta' && (
                <Link to="/contact" className="hover:text-cyan-600 transition-colors block">
                   Yes!! You reached the end! 🚀<br/>
                   <span className="text-cyan-600 mt-1 block">
                      Let's work together? <span className="underline decoration-wavy">Click Here!</span>
                   </span>
                </Link>
             )}

             {/* Little Cloud Tail (CSS Triangle) */}
             <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-cyan-500/20 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE ROBOT AVATAR */}
      <motion.div
        variants={robotVariants}
        initial="hidden"
        animate={robotState === 'dizzy' ? ["visible", "dizzy"] : ["visible", "bounce"]}
        className="w-20 h-20 bg-slate-900 rounded-full border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center relative pointer-events-auto cursor-pointer group hover:scale-110 transition-transform overflow-hidden"
        onClick={() => setShowMessage(!showMessage)}
      >
         <div className="relative w-full h-full flex items-center justify-center">
            
            {/* --- EYES --- */}
            {/* Dizzy Eyes (Spinning Crosses) */}
            {robotState === 'dizzy' ? (
                <>
                  <div className="absolute top-6 left-5 text-cyan-400 text-lg animate-spin">x</div>
                  <div className="absolute top-6 right-5 text-cyan-400 text-lg animate-spin">x</div>
                </>
            ) : (
                /* Cute Eyes (Normal) */
                <>
                   <div className="absolute top-6 left-5 w-3 h-4 bg-cyan-400 rounded-full animate-blink" />
                   <div className="absolute top-6 right-5 w-3 h-4 bg-cyan-400 rounded-full animate-blink" />
                </>
            )}

            {/* --- BLUSH CHEEKS (Only when Cute) --- */}
            {(robotState === 'polite' || robotState === 'cta') && (
               <>
                  <div className="absolute top-9 left-2 w-3 h-2 bg-pink-500/60 rounded-full blur-[2px]" />
                  <div className="absolute top-9 right-2 w-3 h-2 bg-pink-500/60 rounded-full blur-[2px]" />
               </>
            )}
            
            {/* --- MOUTH EXPRESSIONS --- */}
            {robotState === 'dizzy' ? (
                // Wavy Dizzy Mouth
                <div className="absolute bottom-5 w-6 h-1 bg-white rounded-full skew-x-12" />
            ) : (robotState === 'polite' || robotState === 'cta') ? (
                // Happy Open Mouth (D Shape)
                <div className="absolute bottom-2 w-6 h-4 bg-white rounded-b-full overflow-hidden">
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-pink-400 rounded-t-full" /> {/* Tongue */}
                </div>
            ) : (
                // Default Smile
                <div className="absolute bottom-5 w-6 h-2 border-b-2 border-white rounded-full" />
            )}

            {/* --- ANTENNA --- */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-slate-500">
               <div className={`absolute -top-1.5 -left-1 w-3 h-3 bg-red-500 rounded-full ${robotState === 'dizzy' ? 'animate-ping' : ''}`} />
               <div className="absolute -top-1.5 -left-1 w-3 h-3 bg-red-500 rounded-full border border-red-400" />
            </div>

         </div>
      </motion.div>

    </div>
  );
};

export default RobotGuide;