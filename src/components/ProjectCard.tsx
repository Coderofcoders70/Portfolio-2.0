import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import { FiGithub, FiExternalLink } from "react-icons/fi";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  className?: string;
  variants?: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  liveLink,
  githubLink,
  className = "",
  variants
}) => {
  return (
    <Card
      variants={variants}
      noPadding={true}
      className={`aspect-square sm:aspect-video md:aspect-[4/3] relative overflow-hidden group cursor-pointer ${className}`}
    >
      {/* 1. BACKGROUND IMAGE + KEN BURNS EFFECT */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          /* --- THE KEN BURNS LOGO: Slow zoom from 1 to 1.1 --- */
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{
            duration: 1.2, // Slow, elegant zoom
            ease: "easeOut"
          }}
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay to help the initial title pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
      </div>

      {/* 2. INITIAL TITLE (Fades out on hover) */}
      <div className="absolute left-4 bottom-6 md:left-6 md:bottom-8 z-10 group-hover:opacity-0 group-hover:translate-y-4 transition-all duration-300">
        <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-2xl flex items-center gap-2">
          {title} <span className="w-2 h-2 bg-cyan-700 rounded-full animate-pulse" />
        </h3>
      </div>

      {/* 3. INTERACTIVE HOVER OVERLAY */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-xl bg-slate-950/50 p-4 md:p-8 md:pb-12 flex flex-col justify-center">

        <h3 className="text-xl md:text-3xl font-bold text-white mb-2 mt-2 md:mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {title}
        </h3>

        <p className="text-slate-100 text-[13px] md:text-sm leading-tight md:leading-relaxed mb-4 md:mb-6 font-medium drop-shadow-md line-clamp-3 md:line-clamp-none translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          {description}
        </p>

        <div className="flex flex-wrap gap-1 md:gap-2 mb-6 md:mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 md:px-3 md:py-1 bg-cyan-500/20 backdrop-blur-md rounded-full text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-cyan-300 border border-cyan-500/30">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 md:gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noreferrer" className="p-3 md:p-4 bg-white text-black rounded-4xl hover:bg-gray-500 transition-all shadow-xl">
              <FiExternalLink size={15} />
            </a>
          )}
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noreferrer" className="p-3 md:p-4 bg-slate-900 text-white border border-white/10 rounded-4xl hover:bg-slate-800 transition-all shadow-xl">
              <FiGithub size={15} />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;