import React, { useEffect, useRef } from 'react';
import {
  getParticleVisualSpec,
  THEMES,
  ThemeParticleType,
  WeddingTheme,
} from '../themes/themes';

interface Petal {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
  color: string;
  opacity: number;
  isSpark: boolean;
}

interface FallingPetalsCanvasProps {
  petalCount?: number;
  theme?: WeddingTheme;
  particleType?: ThemeParticleType;
  className?: string;
}

export const FallingPetalsCanvas: React.FC<FallingPetalsCanvasProps> = ({
  petalCount = 14,
  theme = THEMES.sarson_subah,
  particleType,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const resolvedParticleType = particleType || theme.particleType || 'marigold_petals';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spec = getParticleVisualSpec(resolvedParticleType, theme);
    const count = Math.min(16, Math.max(12, petalCount));
    let animationFrameId = 0;
    let width = (canvas.width = canvas.offsetWidth || 390);
    let height = (canvas.height = canvas.offsetHeight || 844);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 390;
      height = canvas.height = canvas.offsetHeight || 844;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const petals: Petal[] = Array.from({ length: count }, (_, i) => {
      const startX = ((i * 73) % 100) * 0.01 * width;
      const startY = ((i * 53) % 100) * 0.01 * height;
      const isSpark =
        (spec.motionMode === 'rose_and_sparks_up' || spec.motionMode === 'shimmer_fall') &&
        i % 2 === 1;

      const floatsUp =
        spec.motionMode === 'float_up' ||
        (spec.motionMode === 'rose_and_sparks_up' && isSpark);

      const baseSpeedY = 0.34 + (i % 4) * 0.14;

      return {
        x: startX,
        y: startY,
        baseX: startX,
        baseY: startY,
        size: isSpark ? 3.2 + (i % 3) * 1.2 : 6.5 + (i % 5) * 1.9,
        speedY: floatsUp ? -baseSpeedY : baseSpeedY,
        speedX: -0.1 + (i % 3) * 0.1,
        rotation: (i * 45 * Math.PI) / 180,
        rotationSpeed:
          spec.motionMode === 'spin_fall'
            ? (i % 2 === 0 ? 1 : -1) * (0.014 + (i % 3) * 0.006)
            : spec.motionMode === 'slow_rotate_fall'
            ? (i % 2 === 0 ? 1 : -1) * 0.0022
            : (i % 2 === 0 ? 1 : -1) * (0.004 + (i % 3) * 0.002),
        swayAmplitude:
          spec.motionMode === 'zigzag_fall' ? 1.45 : 0.35 + (i % 3) * 0.22,
        swaySpeed:
          spec.motionMode === 'zigzag_fall' ? 0.032 : 0.01 + (i % 4) * 0.004,
        swayOffset: i * 1.3,
        color: spec.colors[i % spec.colors.length],
        opacity: 0.48 + (i % 4) * 0.11,
        isSpark,
      };
    });

    const drawSingleParticle = (p: Petal, tick: number) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const twinkleFactor =
        spec.motionMode === 'orbit_twinkle' || p.isSpark
          ? 0.55 + 0.45 * Math.sin(tick * 0.06 + p.swayOffset)
          : 1;
      ctx.globalAlpha = Math.max(0.15, Math.min(0.95, p.opacity * twinkleFactor));

      if (p.isSpark) {
        // Warm diya spark or gold shimmer dot
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = spec.motionMode === 'rose_and_sparks_up' ? '#F7B538' : '#F2DA8E';
        ctx.shadowColor = '#F7B538';
        ctx.shadowBlur = 6;
        ctx.fill();
      } else if (spec.shape === 'sparkle') {
        const s = p.size * 0.92;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.3, -s * 0.3);
        ctx.lineTo(s, 0);
        ctx.lineTo(s * 0.3, s * 0.3);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.3, s * 0.3);
        ctx.lineTo(-s, 0);
        ctx.lineTo(-s * 0.3, -s * 0.3);
        ctx.closePath();
        ctx.fillStyle = p.color;
        ctx.fill();
      } else if (spec.shape === 'lotus') {
        // Serene lotus petal (cupped teardrop with golden rim)
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.15);
        ctx.bezierCurveTo(p.size * 0.95, -p.size * 0.35, p.size * 0.85, p.size * 0.75, 0, p.size * 1.05);
        ctx.bezierCurveTo(-p.size * 0.85, p.size * 0.75, -p.size * 0.95, -p.size * 0.35, 0, -p.size * 1.15);
        ctx.closePath();
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(201, 154, 75, 0.38)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      } else if (spec.shape === 'mango' || spec.shape === 'leaf') {
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.25);
        ctx.quadraticCurveTo(p.size * 0.72, 0, 0, p.size * 1.25);
        ctx.quadraticCurveTo(-p.size * 0.72, 0, 0, -p.size * 1.25);
        ctx.closePath();
        ctx.fillStyle = p.color;
        ctx.fill();
      } else if (spec.shape === 'shiuli') {
        ctx.fillStyle = '#FFFDF7';
        for (let k = 0; k < 5; k++) {
          ctx.save();
          ctx.rotate((k * Math.PI * 2) / 5);
          ctx.beginPath();
          ctx.ellipse(0, -p.size * 0.55, p.size * 0.28, p.size * 0.48, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = '#D9463E';
        ctx.fill();
      } else if (spec.shape === 'mogra' || spec.shape === 'jasmine_shimmer') {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.75, p.size * 0.52, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(
          p.size * 0.85,
          -p.size * 0.75,
          p.size * 0.9,
          p.size * 0.55,
          0,
          p.size
        );
        ctx.bezierCurveTo(
          -p.size * 0.9,
          p.size * 0.55,
          -p.size * 0.85,
          -p.size * 0.75,
          0,
          -p.size
        );
        ctx.closePath();
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(201, 154, 75, 0.28)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      ctx.restore();
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      for (const p of petals) {
        if (!prefersReducedMotion) {
          if (spec.motionMode === 'orbit_twinkle') {
            const orbitRadius = 16 + (p.swayOffset * 5) % 24;
            p.x = p.baseX + Math.cos(tick * 0.018 + p.swayOffset) * orbitRadius;
            p.y = p.baseY + Math.sin(tick * 0.018 + p.swayOffset) * orbitRadius;
            p.rotation += p.rotationSpeed;
          } else {
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(tick * p.swaySpeed + p.swayOffset) * p.swayAmplitude;
            p.rotation += p.rotationSpeed;

            if (p.speedY > 0 && p.y > height + p.size * 2) {
              p.y = -p.size * 2;
              p.x = Math.random() * width;
            } else if (p.speedY < 0 && p.y < -p.size * 2) {
              p.y = height + p.size * 2;
              p.x = Math.random() * width;
            }
            if (p.x > width + p.size * 2) {
              p.x = -p.size;
            } else if (p.x < -p.size * 2) {
              p.x = width + p.size;
            }
          }
        }
        drawSingleParticle(p, tick);
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [petalCount, resolvedParticleType, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="falling-petals-canvas"
      className={`pointer-events-none inset-0 w-full h-full ${className}`}
    />
  );
};
