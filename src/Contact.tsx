import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "./Card";
import { FiMail, FiMapPin, FiGithub, FiArrowLeft } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30 flex items-center justify-center">
      
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 1. HEADER & INFO (Left Side) */}
        <Card className="md:col-span-1 md:row-span-2 flex flex-col justify-between min-h-[400px]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors mb-8">
              <FiArrowLeft /> Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">epic.</span>
            </h1>
            
            <p className="text-slate-400 mb-8">
              Whether you have a startup idea, need a backend architect, or just want to chat about AI—my inbox is open.
            </p>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-cyan-400"><FiMail /></div>
                <div>
                   <p className="text-xs text-slate-500">Email</p>
                   <p className="font-bold">lakshayas918@gmail.com</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-pink-400"><FiMapPin /></div>
                <div>
                   <p className="text-xs text-slate-500">Location</p>
                   <p className="font-bold">India (Remote)</p>
                </div>
             </div>
          </div>
        </Card>

        {/* 2. CONTACT FORM (Right Side) */}
        <Card className="md:col-span-1 md:row-span-2 bg-slate-900/30">
           <form className="flex flex-col gap-4 h-full justify-center">
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Your Name</label>
                 <input type="text" placeholder="Enter Name" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Your Email</label>
                 <input type="email" placeholder="Enter Email" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Message</label>
                 <textarea rows={4} placeholder="Let's work by sending the message.." className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors resize-none" />
              </div>

              <button className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] transition-shadow">
                 Send Message
              </button>
           </form>
        </Card>

      </div>
    </div>
  );
};

export default Contact;