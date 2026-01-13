import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard"; // Importing our new logic
import { FiArrowLeft } from "react-icons/fi";

// Images
import SmartBotImg from "../assets/my-work/museChatAIBuddy.jpg";
import TechGiantsLogoImg from "../assets/my-work/the-tech-giants-logo.jpg";
import MochaBaristaImg from "../assets/my-work/mocha-barista-logo.png"
import NetflixMoviesImg from "../assets/my-work/netflix-banner-logo.jpg"

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12 flex items-center gap-6">
          <Link to="/" className="p-3 rounded-full bg-slate-900 border border-white/10 hover:bg-white/10 hover:text-cyan-400 transition-all active:scale-95">
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">My Work</h1>
            <p className="text-slate-500 text-sm mt-1 font-mono uppercase tracking-widest">System_Deployments / 2026</p>
          </div>
        </div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          // Unified grid with NO manual col-spans to ensure perfect height matching
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ProjectCard 
            title="MuseChatAI"
            description="Let's chat with AI powered by Gemini API. Features secure authentication and persistent history."
            image={SmartBotImg}
            tags={["React", "TypeScript", "Node.js", "Express.js", "Gemini"]}
            liveLink="https://smartbot-museai.vercel.app/"
            githubLink="https://github.com/Coderofcoders70/Smartbot-frontend"
            variants={itemVariants}
          />

          <ProjectCard 
            title="The Tech Giants"
            description="MERN stack blogging platform with Google OAuth and high-performance Render deployment."
            image={TechGiantsLogoImg} // Use your new WebP here
            tags={["MongoDB", "Express", "React", "Node"]}
            liveLink="https://the-tech-giants-private.vercel.app/"
            githubLink="https://github.com/Coderofcoders70?tab=repositories"
            variants={itemVariants}
          />

          <ProjectCard 
            title="Netflix-clone"
            description="Ultimate Netflix Movies is your go-to platform for exploring the late  movies available on Netflix"
            image={NetflixMoviesImg} 
            tags={["React", "Tailwind CSS", "TMDB", "Node.js"]}
            liveLink="https://netflix-movies-6a7fc.web.app/"
            githubLink="https://github.com/Coderofcoders70?tab=repositories"
            variants={itemVariants}
          />

          <ProjectCard 
            title="Mocha Barista"
            description="A website for all the coffee lovers."
            image={MochaBaristaImg} 
            tags={["Html", "Tailwind CSS", "Swiper Js"]}
            liveLink="https://mocha-barista.netlify.app/"
            githubLink="https://github.com/Coderofcoders70?tab=repositories"
            variants={itemVariants}
          />
          
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;