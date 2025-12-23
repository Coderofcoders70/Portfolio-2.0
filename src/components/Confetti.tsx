import { useEffect, useRef } from "react";

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const colors = ["#22d3ee", "#e879f9", "#4ade80", "#fbbf24", "#ffffff"];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = -10; // Start above screen
        this.vx = Math.random() * 4 - 2; // Random horizontal drift
        this.vy = Math.random() * 5 + 2; // Fall speed
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 5 + 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // Gravity
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles continuously
    const interval = setInterval(() => {
        if(particles.length < 300) {
            particles.push(new Particle());
        }
    }, 20);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        // Remove off-screen particles
        if (p.y > canvas.height) particles.splice(index, 1);
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[100] pointer-events-none" 
    />
  );
};

export default Confetti;