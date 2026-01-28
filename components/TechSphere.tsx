import React, { useEffect, useRef } from 'react';

const TechSphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles: {x: number, y: number, z: number}[] = [];
    const count = 220;
    const radius = Math.min(width, height) * 0.4;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi)
      });
    }

    let rotationX = 0;
    let rotationY = 0;

    const animate = () => {
      ctx.fillStyle = '#005C67';
      ctx.fillRect(0, 0, width, height);
      
      rotationX += 0.002;
      rotationY += 0.001;

      particles.forEach((p, i) => {
        // Rotación en X
        let y1 = p.y * Math.cos(rotationX) - p.z * Math.sin(rotationX);
        let z1 = p.y * Math.sin(rotationX) + p.z * Math.cos(rotationX);
        
        // Rotación en Y
        let x2 = p.x * Math.cos(rotationY) - z1 * Math.sin(rotationY);
        let z2 = p.x * Math.sin(rotationY) + z1 * Math.cos(rotationY);

        const perspective = 800 / (800 + z2);
        const px = x2 * perspective + width / 2;
        const py = y1 * perspective + height / 2;

        const alpha = (z2 + radius) / (2 * radius);
        ctx.fillStyle = i % 8 === 0 ? '#FFCC00' : '#ffffff';
        ctx.globalAlpha = alpha * 0.8;
        
        ctx.beginPath();
        ctx.arc(px, py, 2 * perspective, 0, Math.PI * 2);
        ctx.fill();
        
        // Dibujar conexiones sutiles
        if (i < 50) {
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(width/2, height/2);
            ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default TechSphere;