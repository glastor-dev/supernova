
import React, { useRef, useEffect } from 'react';
import { Theme, VisualizerMode } from '../types';

interface VisualizerCanvasProps {
  analyser: AnalyserNode | null;
  theme: Theme;
  isPaused: boolean;
  mode: VisualizerMode;
  progress: number; // 0 to 1
}

const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({ analyser, theme, isPaused, mode, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const rotationRef = useRef<number>(0);
  const glitchRef = useRef(0);
  const pulseRef = useRef(1);

  const particles = useRef<{ x: number; y: number; vx: number; vy: number; size: number; color: string }[]>([]);

  useEffect(() => {
    const p: any[] = [];
    for (let i = 0; i < 250; i++) {
      p.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? theme.primaryColor : theme.secondaryColor
      });
    }
    particles.current = p;
  }, [theme.primaryColor, theme.secondaryColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const render = () => {
      const { width, height } = canvas;
      const centerX = width / 2;
      const centerY = height / 2;

      if (!analyser) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);
        animationRef.current = requestAnimationFrame(render);
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      // Análisis Pro
      let bass = 0; for (let i = 0; i < 8; i++) bass += dataArray[i]; bass /= 8;
      let mid = 0; for (let i = 8; i < 64; i++) mid += dataArray[i]; mid /= 56;
      const intensity = bass / 255;
      
      // Activar Glitch en picos
      if (bass > 225 && Math.random() > 0.8) glitchRef.current = 15 * intensity;
      else glitchRef.current *= 0.85;

      pulseRef.current = 0.95 + (intensity * 0.15);

      // 1. FONDO CON VIÑETEADO DINÁMICO
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
      
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.8);
      bgGrad.addColorStop(0, theme.backgroundGradient[1] || '#0a1a0a');
      bgGrad.addColorStop(1, '#000');
      ctx.globalAlpha = 0.4 + intensity * 0.2;
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      // 2. PARTÍCULAS REACTIVAS
      particles.current.forEach(p => {
        const speed = 1 + intensity * 20;
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          p.x = centerX + (Math.random() - 0.5) * 50;
          p.y = centerY + (Math.random() - 0.5) * 50;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + intensity), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // 3. RENDERIZADO DE MODOS
      ctx.save();
      // Aplicar Glitch Shake
      if (glitchRef.current > 1) {
        ctx.translate((Math.random() - 0.5) * glitchRef.current, 0);
      }

      if (mode === VisualizerMode.ORBITAL) {
        // --- MODO ORBITAL (Mejorado) ---
        const baseRadius = Math.min(width, height) * 0.22 * pulseRef.current;
        const points = 128;
        const angleStep = (Math.PI * 2) / points;
        if (!isPaused) rotationRef.current += 0.005 + (intensity * 0.01);

        // Dibujar Anillo de Energía
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotationRef.current);

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const angle = i * angleStep;
          const dataIdx = Math.floor((Math.abs(i - points / 2) / (points / 2)) * (bufferLength * 0.5));
          const val = dataArray[dataIdx];
          const r = baseRadius + (val / 255) * 150;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.quadraticCurveTo(Math.cos(angle - angleStep/2) * r, Math.sin(angle - angleStep/2) * r, x, y);
        }
        
        ctx.shadowBlur = 40 * intensity;
        ctx.shadowColor = theme.primaryColor;
        ctx.strokeStyle = theme.primaryColor;
        ctx.lineWidth = 3 + intensity * 5;
        ctx.stroke();

        // Anillo de Progreso Sutil
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius - 20, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * progress));
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Núcleo Central Pulsante
        const coreR = baseRadius * 0.7;
        const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR);
        coreGrad.addColorStop(0, '#fff');
        coreGrad.addColorStop(0.2, theme.primaryColor);
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, coreR * (0.8 + mid / 512), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

      } else {
        // --- MODO HORIZON (3D Bars) ---
        const barCount = 64;
        const barWidth = (width / barCount) * 0.8;
        ctx.save();
        ctx.translate(0, height * 0.8);
        for (let i = 0; i < barCount; i++) {
          const val = dataArray[i * 4];
          const h = (val / 255) * height * 0.5;
          const x = (i / barCount) * width;
          
          const g = ctx.createLinearGradient(x, 0, x, -h);
          g.addColorStop(0, theme.primaryColor);
          g.addColorStop(1, 'transparent');
          
          ctx.shadowBlur = 20 * intensity;
          ctx.shadowColor = theme.primaryColor;
          ctx.fillStyle = g;
          ctx.fillRect(x, 0, barWidth, -h);
        }
        ctx.restore();
      }

      ctx.restore();

      // 4. OVERLAY DE SCANLINES (Efecto Pro)
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#fff';
      for (let i = 0; i < height; i += 4) {
        ctx.fillRect(0, i, width, 1);
      }
      ctx.restore();

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, theme, isPaused, mode, progress]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0 block bg-black"
    />
  );
};

export default VisualizerCanvas;
