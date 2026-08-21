'use client';
import { useRef, useEffect } from 'react';
import styles from './StarfieldCanvas.module.css';

export default function StarfieldCanvas({ className = '', starCount = 200 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const initStars = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: Math.random() * 50 - 25,
        vy: Math.random() * 50 - 25
      }));
    };

    initStars();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.x += star.vx / 100;
        star.y += star.vy / 100;

        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', initStars);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initStars);
    };
  }, [starCount]);

  return (
    <canvas ref={canvasRef} className={`${styles.canvas} ${className}`} />
  );
}
