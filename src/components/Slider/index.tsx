import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  sliderRootVariants,
  sliderTrackVariants,
  sliderTrailVariants,
  sliderLevelVariants,
  sliderThumbVariants,
} from "./variants";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Colors = {
  /** classes Tailwind para o wrapper/ trilho externo */
  track?: string;
  /** classes Tailwind para o fundo “vazio” */
  trail?: string;
  /** classes Tailwind para a parte preenchida */
  level?: string;
  /** classes Tailwind para o handler (thumb) */
  thumb?: string;
};

export type SliderProps = {
  /** valor atual (modo controlado) */
  value?: number;
  /** valor inicial (modo não-controlado) */
  defaultValue?: number;
  /** callback ao mudar */
  onChange?: (value: number) => void;

  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** mostrar valor numérico à direita */
  showValue?: boolean;

  /** custom de cores via classes Tailwind */
  colors?: Colors;

  className?: string;
} & VariantProps<typeof sliderRootVariants> & // { density }
  VariantProps<typeof sliderTrailVariants>;   // { variant }

export default function Slider({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
  colors,
  className,
  density = "default",
  variant = "default",
}: SliderProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<number>(clamp(roundTo(defaultValue, step), min, max));
  const current = isControlled ? clamp(roundTo(value!, step), min, max) : internal;

  const percent = useMemo(() => {
    const span = max - min || 1;
    return ((current - min) / span) * 100;
  }, [current, min, max]);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const setValue = useCallback(
    (next: number) => {
      const clamped = clamp(roundTo(next, step), min, max);
      if (!isControlled) setInternal(clamped);
      onChange?.(clamped);
    },
    [isControlled, onChange, min, max, step]
  );

  // Pointer handlers
  function positionToValue(clientX: number) {
    const el = rootRef.current;
    if (!el) return current;
    const rect = el.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    const ratio = rect.width ? x / rect.width : 0;
    return min + ratio * (max - min);
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    draggingRef.current = true;
    setValue(positionToValue(e.clientX));
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || disabled) return;
    setValue(positionToValue(e.clientX));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
  };

  // Teclado
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const large = Math.max(step * 10, (max - min) / 10);
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        setValue(current - step);
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        setValue(current + step);
        break;
      case "PageDown":
        e.preventDefault();
        setValue(current - large);
        break;
      case "PageUp":
        e.preventDefault();
        setValue(current + large);
        break;
      case "Home":
        e.preventDefault();
        setValue(min);
        break;
      case "End":
        e.preventDefault();
        setValue(max);
        break;
    }
  };

  // ARIA
  const ariaProps = {
    role: "slider",
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": Math.round(current * 1000) / 1000,
    "aria-disabled": disabled || undefined,
  };

  return (
    <div className={cx(sliderRootVariants({ density }), className)}>
      <div
        ref={rootRef}
        className={cx(
          sliderTrackVariants({ density }),
          colors?.track
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* fundo (trail) */}
        <div
          className={cx(
            sliderTrailVariants({ variant, density }),
            colors?.trail
          )}
        />

        {/* preenchido (level) */}
        <div
          className={cx(
            sliderLevelVariants({ variant, density }),
            colors?.level
          )}
          style={{ width: `${percent}%` }}
        />

        {/* handler */}
        <button
          type="button"
          className={cx(
            sliderThumbVariants({ variant, density, disabled }),
            colors?.thumb
          )}
          style={{ left: `${percent}%` }}
          onKeyDown={onKeyDown}
          {...ariaProps}
        />
      </div>

      {showValue && (
        <div className="ml-2 inline-block align-middle text-sm tabular-nums min-w-10 text-right">
          {current}
        </div>
      )}
    </div>
  );
}

/* utils */
function clamp(n: number, a: number, b: number) {
  return Math.min(Math.max(n, a), b);
}
function roundTo(n: number, step: number) {
  const inv = 1 / (step || 1);
  return Math.round(n * inv) / inv;
}
