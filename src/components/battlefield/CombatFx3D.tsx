import React, { useEffect, useRef } from 'react';
import type { CombatDisplay } from '../../hooks/useCombatRunner';

interface CombatFx3DProps {
  display: CombatDisplay;
  inBattle: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Shell {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  arcHeight: number;
  color: string;
  isCounter: boolean;
}

export function CombatFx3D({ display, inBattle }: CombatFx3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shellsRef = useRef<Shell[]>([]);
  const lastProjectileRef = useRef(display.projectile);
  const lastCounterRef = useRef(display.counterHit);
  const animFrameRef = useRef<number>(0);

  // Trigger player artillery projectile in 3D arc
  useEffect(() => {
    if (display.projectile > lastProjectileRef.current) {
      lastProjectileRef.current = display.projectile;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const w = canvas.width;
      const h = canvas.height;

      // Start at player tank barrel (approx 28% width, 46% height)
      // Land at enemy bunker (approx 72% width, 46% height)
      shellsRef.current.push({
        startX: w * 0.28,
        startY: h * 0.46,
        targetX: w * 0.72,
        targetY: h * 0.46,
        progress: 0,
        speed: 0.045,
        arcHeight: h * 0.35,
        color: '#F4C430',
        isCounter: false
      });

      // Muzzle blast particles at tank barrel
      for (let i = 0; i < 16; i++) {
        const angle = (Math.random() - 0.5) * Math.PI * 0.6;
        const speed = Math.random() * 5 + 3;
        particlesRef.current.push({
          x: w * 0.28,
          y: h * 0.46,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
          color: Math.random() > 0.3 ? '#F59E0B' : '#EF4444',
          alpha: 1,
          life: 0,
          maxLife: 20 + Math.random() * 15
        });
      }
    }
  }, [display.projectile]);

  // Trigger enemy counterattack projectile in 3D arc
  useEffect(() => {
    if (display.counterHit > lastCounterRef.current) {
      lastCounterRef.current = display.counterHit;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const w = canvas.width;
      const h = canvas.height;

      // Start at enemy bunker, land at player tank
      shellsRef.current.push({
        startX: w * 0.72,
        startY: h * 0.44,
        targetX: w * 0.28,
        targetY: h * 0.48,
        progress: 0,
        speed: 0.04,
        arcHeight: h * 0.3,
        color: '#EF4444',
        isCounter: true
      });

      // Enemy muzzle blast
      for (let i = 0; i < 14; i++) {
        const angle = Math.PI + (Math.random() - 0.5) * Math.PI * 0.6;
        const speed = Math.random() * 4 + 2;
        particlesRef.current.push({
          x: w * 0.72,
          y: h * 0.44,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
          color: '#DC2626',
          alpha: 1,
          life: 0,
          maxLife: 22
        });
      }
    }
  }, [display.counterHit]);

  // Main 3D Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      // 1. Ambient battlefield dust/embers in 3D perspective
      if (inBattle && Math.random() < 0.2) {
        particlesRef.current.push({
          x: Math.random() * w,
          y: h * 0.85 + Math.random() * (h * 0.15),
          vx: (Math.random() - 0.5) * 0.8,
          vy: -(Math.random() * 1.2 + 0.4),
          size: Math.random() * 2.5 + 1,
          color: Math.random() > 0.4 ? '#F59E0B' : '#D97706',
          alpha: 0.7,
          life: 0,
          maxLife: 70 + Math.random() * 40
        });
      }

      // 2. Render and update active 3D shells
      for (let i = shellsRef.current.length - 1; i >= 0; i--) {
        const s = shellsRef.current[i];
        s.progress += s.speed;

        if (s.progress >= 1) {
          // Detonation explosion at target
          const tx = s.targetX;
          const ty = s.targetY;

          // Shockwave ring
          for (let j = 0; j < 28; j++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 7 + 2;
            particlesRef.current.push({
              x: tx,
              y: ty,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              size: Math.random() * 5 + 2,
              color: s.isCounter
                ? (Math.random() > 0.5 ? '#EF4444' : '#F87171')
                : (Math.random() > 0.5 ? '#F59E0B' : '#FCD34D'),
              alpha: 1,
              life: 0,
              maxLife: 25 + Math.random() * 15
            });
          }

          shellsRef.current.splice(i, 1);
          continue;
        }

        // Parabolic 3D flight trajectory: Y arc + pseudo 3D scale
        const curX = s.startX + (s.targetX - s.startX) * s.progress;
        const linearY = s.startY + (s.targetY - s.startY) * s.progress;
        const arcY = -Math.sin(s.progress * Math.PI) * s.arcHeight;
        const curY = linearY + arcY;

        // Perspective 3D depth scale: rises up (larger) then falls into distance
        const depthScale = 1 + Math.sin(s.progress * Math.PI) * 0.7;

        // Ground shadow beneath shell in 3D floor
        ctx.save();
        ctx.beginPath();
        const shadowY = linearY + 30;
        ctx.ellipse(curX, shadowY, 8 * depthScale, 3 * depthScale, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fill();
        ctx.restore();

        // Smoke trail behind projectile
        if (Math.random() < 0.75) {
          particlesRef.current.push({
            x: curX,
            y: curY,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: (Math.random() * 3 + 2) * depthScale,
            color: s.color,
            alpha: 0.85,
            life: 0,
            maxLife: 18
          });
        }

        // Draw projectile with 3D glow
        ctx.save();
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 14 * depthScale;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(curX, curY, 4 * depthScale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(curX, curY, 6 * depthScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Render and update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [inBattle]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    />
  );
}

