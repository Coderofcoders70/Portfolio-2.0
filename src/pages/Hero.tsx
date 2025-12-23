import Card from "../components/Card";
import { type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const phrases = ["Lakshaya Sharma", "Full Stack Developer", "Backend Developer", "AI-Enthusiast"];

export function Hero() {

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

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

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } },
    };


    return (
        <>
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
        </>
    )
}