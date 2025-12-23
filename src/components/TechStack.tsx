import Card from "../components/Card";
import { type Variants } from "framer-motion";
import { SiHtml5, SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiJavascript, SiTypescript, SiCss3 } from "react-icons/si";

export function TechStack() {

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } },
    };

    return (
        <>
            <Card variants={itemVariants} className="md:col-span-2 md:row-span-1 flex flex-col justify-center gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                        Tech Stack
                    </h3>
                </div>
                <div className="flex flex-wrap mt-8 gap-4 justify-start">
                    <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
                        <SiHtml5 className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-orange-400 group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        <span className="text-xs text-slate-500 group-hover/icon:text-orange-300 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">Html 5</span>
                    </div>
                    <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
                        <SiCss3 className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-blue-400 group-hover/icon:scale-110" />
                        <span className="text-xs text-slate-500 group-hover/icon:text-blue-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">CSS</span>
                    </div>
                    <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
                        <SiReact className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-cyan-400 group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        <span className="text-xs text-slate-500 group-hover/icon:text-cyan-300 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">React</span>
                    </div>
                    <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
                        <SiNodedotjs className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-green-500 group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <span className="text-xs text-slate-500 group-hover/icon:text-green-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">Node</span>
                    </div>
                    <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
                        <SiMongodb className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-green-400 group-hover/icon:scale-110" />
                        <span className="text-xs text-slate-500 group-hover/icon:text-green-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">MongoDB</span>
                    </div>
                    <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
                        <SiTailwindcss className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-sky-400 group-hover/icon:scale-110" />
                        <span className="text-xs text-slate-500 group-hover/icon:text-sky-400 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">Tailwind CSS</span>
                    </div>
                    <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
                        <SiJavascript className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-yellow-500 group-hover/icon:scale-110" />
                        <span className="text-xs text-slate-500 group-hover/icon:text-yellow-500  opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">JavaScript</span>
                    </div>
                    <div className="group/icon flex flex-col items-center gap-2 cursor-pointer">
                        <SiTypescript className="text-4xl text-slate-600 transition-all duration-300 group-hover/icon:text-blue-500 group-hover/icon:scale-110" />
                        <span className="text-xs text-slate-500 group-hover/icon:text-blue-500 opacity-0 group-hover/icon:opacity-100 transition-opacity absolute mt-12">TypeScript</span>
                    </div>
                </div>
            </Card>
        </>
    )
}