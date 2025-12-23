import { useState } from "react";
import Card from "../components/Card";
import { type Variants } from "framer-motion";
import { MatrixText } from "../components/MatrixText";

export function About() {

    const [aboutMode, setAboutMode] = useState<'work' | 'life'>('work');

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } },
    };

    return (
        <>
            <Card variants={itemVariants} className="md:col-span-1 md:row-span-2 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-200">About Me</h3>
                    <div className="flex bg-slate-800 p-1 rounded-full border border-white/5">
                        <button onClick={() => setAboutMode('work')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${aboutMode === 'work' ? 'bg-slate-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Work</button>
                        <button onClick={() => setAboutMode('life')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${aboutMode === 'life' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Life</button>
                    </div>
                </div>
                <div className="relative h-full">
                    {aboutMode === 'work' ? (
                        <div key="work" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <p className="text-slate-400 leading-relaxed mb-4">I am a <span className="text-white font-bold">Full Stack Engineer</span> focused on scalable backends and intuitive frontend architectures.</p>
                            <p className="text-slate-400 leading-relaxed">
                                My strength lies in bridging the gap between <span className="text-cyan-400">complex logic</span> and <span className="text-purple-400">pixel-perfect design</span>.
                            </p>
                            <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-green-500/20 shadow-[0_0_15px_-5px_rgba(34,197,94,0.1)]">
                                <p className="text-xs text-slate-500 font-mono mb-2 uppercase tracking-wider">Current Focus:</p>
                                <div className="min-h-[24px]">
                                    <MatrixText />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key="life" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <p className="text-slate-400 leading-relaxed mb-4">When I'm not coding, I'm usually exploring <span className="text-orange-400">new tech trends</span> or refining my UI/UX taste.</p>
                            <p className="text-slate-400 leading-relaxed">
                                I believe in <span className="text-white italic">"Shipping fast and breaking things"</span> (but fixing them faster).
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-500"><li>🎧 Lo-fi Music Playlists</li><li>☕ Black Coffee</li><li>🚀 Startup Enthusiast</li></ul>
                        </div>
                    )}
                </div>
            </Card>
        </>
    )
}