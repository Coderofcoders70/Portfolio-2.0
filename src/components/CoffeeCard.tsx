import Card from "./Card";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCw, FiCoffee, FiSmile } from "react-icons/fi";

const CoffeeCard = ({ className }: { className?: string }) => {
  const [mode, setMode] = useState<'quote' | 'joke'>('quote');
  const [content, setContent] = useState<string>("Loading...");
  const [author, setAuthor] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Fetch on mount and when mode changes
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        if (mode === 'quote') {
          // Fetching from Quotable API
          const res = await fetch("https://dummyjson.com/quotes/random");
          const data = await res.json();
          setContent(`"${data.quote}"`);
          setAuthor(`- ${data.author}`);
        } else {
          // Fetching from JokeAPI (Safe mode, Programming jokes)
          const res = await fetch("https://v2.jokeapi.dev/joke/Programming?safe-mode&type=single");
          const data = await res.json();
          setContent(data.joke || "Why do programmers prefer dark mode? Because light attracts bugs.");
          setAuthor("");
        }
      } catch (error) {
        setContent("The server is having a coffee break. Try again!");
        setAuthor("");
        console.error("Error is defined in ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [mode]);

  return (
    <Card className={`flex flex-col justify-between ${className}`}>
      
      {/* HEADER: Tabs */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 bg-slate-900/50 p-1 rounded-full border border-white/5">
           <button 
             onClick={() => setMode('quote')}
             className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${mode === 'quote' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-slate-500 hover:text-slate-300'}`}
           >
             <FiCoffee /> Quote
           </button>
           <button 
             onClick={() => setMode('joke')}
             className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${mode === 'joke' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
           >
             <FiSmile /> Joke
           </button>
        </div>

        {/* Refresh Button */}
          <button 
            onClick={() => {
              setLoading(true);
              (async () => {
                try {
                  if (mode === 'quote') {
                    const res = await fetch("https://dummyjson.com/quotes/random");
                    const data = await res.json();
                    setContent(`"${data.quote}"`);
                    setAuthor(`- ${data.author}`);
                  } else {
                    const res = await fetch("https://v2.jokeapi.dev/joke/Programming?safe-mode&type=single");
                    const data = await res.json();
                    setContent(data.joke || "Why do programmers prefer dark mode? Because light attracts bugs.");
                    setAuthor("");
                  }
                } catch (error) {
                  setContent("The server is having a coffee break. Try again!");
                  setAuthor("");
                  console.error("Error is defined in ", error);
                } finally {
                  setLoading(false);
                }
              })();
            }}
            disabled={loading}
            className="text-slate-500 hover:text-white transition-colors p-2"
          >
          <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* BODY: Content Display */}
      <div className="flex-grow flex flex-col justify-center min-h-[100px]">
        <AnimatePresence mode="wait">
           <motion.div
             key={content} // Triggers animation when text changes
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.2 }}
           >
              <p className={`text-lg font-medium leading-relaxed ${mode === 'quote' ? 'text-slate-200 italic font-serif' : 'text-cyan-100 font-sans'}`}>
                {content}
              </p>
              {author && (
                <p className="text-sm text-slate-500 mt-2 text-right font-bold">
                  {author}
                </p>
              )}
           </motion.div>
        </AnimatePresence>
      </div>

    </Card>
  );
};

export default CoffeeCard;