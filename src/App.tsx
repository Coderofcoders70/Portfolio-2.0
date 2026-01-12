import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "unset";
  }, [isLoading]);

  return (
    <div className='App'>
      {/* Only show the actual content if loading is finished */}
      {isLoading ? (
        <Preloader finishLoading={() => setIsLoading(false)} />
      ) : (
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;