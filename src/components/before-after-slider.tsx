'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import type { BeforeAfterScene } from '@/data/projects';

interface BeforeAfterSliderProps {
  scenes: BeforeAfterScene[];
  hideSceneSelector?: boolean;
  tall?: boolean;
}

export function BeforeAfterSlider({
  scenes,
  hideSceneSelector = false,
  tall = false,
}: BeforeAfterSliderProps) {
  const { lang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [split, setSplit] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const scene = scenes[activeIndex] ?? scenes[0];
  const activeSide: 'before' | 'after' = split > 50 ? 'before' : 'after';

  const updateSplitFromClientX = (clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, Math.round(rawPercent)));
    setSplit(clamped);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateSplitFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSplitFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplit((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplit((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="w-full flex flex-col bg-[var(--surface-inverted)] text-[var(--text-on-dark)] rounded-[2px] overflow-hidden">
      {!hideSceneSelector && scenes.length > 1 && (
        <div className="flex flex-wrap gap-1.5 p-2.5 bg-[var(--surface-receipt)] border-b border-[var(--border-dark)]">
          {scenes.map((item, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-2.5 py-1.5 font-mono-tech text-[11px] tracking-wide uppercase rounded-[2px] border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white'
                    : 'bg-[var(--surface-inverted-elevated)] border-[#343731] text-[var(--text-on-dark-muted)] hover:text-white'
                }`}
              >
                {item.label[lang]}
              </button>
            );
          })}
        </div>
      )}
      <div
        ref={stageRef}
        role="slider"
        tabIndex={0}
        aria-label={t.beforeAfter.sliderAriaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={split}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={`relative w-full ${
          tall
            ? 'h-[340px] sm:h-[440px] lg:h-[520px]'
            : 'h-[320px] sm:h-[380px] lg:h-[410px]'
        } select-none touch-none overflow-hidden cursor-ew-resize focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)]`}
      >
        <div
          className="absolute inset-0 z-0 bg-[#20221F] pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - split}% 0 0)`,
          }}
        >
          <Image
            src={scene.beforeImage}
            alt={`${scene.label[lang]} — ${t.beforeAfter.beforeTag}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <span className="absolute top-3.5 left-3.5 z-10 font-mono-tech text-[10px] tracking-wider px-2 py-1 bg-[#10110F]/85 text-[#F4F3EF] border-l border-[#9E9F99] rounded-[2px]">
            {t.beforeAfter.beforeTag}
          </span>
        </div>
        <div
          className="absolute inset-0 z-10 bg-[#3B342E] pointer-events-none"
          style={{
            clipPath: `inset(0 0 0 ${split}%)`,
          }}
        >
          <Image
            src={scene.afterImage}
            alt={`${scene.label[lang]} — ${t.beforeAfter.afterTag}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <span className="absolute top-3.5 right-3.5 z-10 font-mono-tech text-[10px] tracking-wider px-2 py-1 bg-[#10110F]/85 text-[#F4F3EF] border-r border-[var(--accent-primary)] rounded-[2px]">
            {t.beforeAfter.afterTag}
          </span>
        </div>
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[var(--accent-primary)] z-20 pointer-events-none"
          style={{ left: `${split}%` }}
        />
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-[var(--accent-primary)] text-white flex items-center justify-center rounded-[2px] z-20 pointer-events-none shadow-[0_4px_14px_rgba(0,0,0,0.45)]"
          style={{ left: `clamp(18px, ${split}%, calc(100% - 18px))` }}
        >
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>
      <div className="bg-[#141513] border-t border-[var(--border-dark)] p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <button
            type="button"
            onClick={() => setSplit(100)}
            className={`px-2.5 py-1.5 font-mono-tech text-[10px] tracking-wider rounded-[2px] border transition-colors cursor-pointer ${
              activeSide === 'before'
                ? 'bg-[#2A2C28] border-[#9E9F99] text-white'
                : 'bg-transparent border-[#2C2E2A] text-[var(--text-on-dark-muted)] hover:text-white'
            }`}
          >
            {t.beforeAfter.beforeTag}
          </button>
          <button
            type="button"
            onClick={() => setSplit(0)}
            className={`px-2.5 py-1.5 font-mono-tech text-[10px] tracking-wider rounded-[2px] border transition-colors cursor-pointer ${
              activeSide === 'after'
                ? 'bg-[var(--accent-primary)]/20 border-[var(--accent-primary)] text-white'
                : 'bg-transparent border-[#2C2E2A] text-[var(--text-on-dark-muted)] hover:text-white'
            }`}
          >
            {t.beforeAfter.afterTag}
          </button>
        </div>

        <div
          className={`font-mono-tech text-[11.5px] leading-relaxed pl-3 border-l transition-colors ${
            activeSide === 'before'
              ? 'border-[#9E9F99] text-[#D4D5CF]'
              : 'border-[var(--accent-primary)] text-[#F4F3EF]'
          }`}
        >
          {(activeSide === 'before' ? scene.beforeHighlights[lang] : scene.afterHighlights[lang]).map(
            (line) => (
              <div key={line}>{line}</div>
            )
          )}
        </div>
      </div>

      <div className="px-4 py-2.5 bg-[var(--surface-receipt)] border-t border-[var(--border-dark)] flex flex-wrap justify-between gap-2 font-mono-tech text-[11px] text-[var(--text-on-dark-muted)]">
        <span>{scene.projectRef}</span>
        <span>
          {scene.areaM2} m² · {(scene.budgetPLN / 1000).toFixed(0)}k PLN · {scene.weeks}{' '}
          {t.calculator.weeksUnit}
        </span>
      </div>
    </div>
  );
}
