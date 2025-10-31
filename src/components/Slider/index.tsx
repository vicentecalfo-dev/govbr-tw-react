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

type RangeValue = [number, number];
type SliderValue = number | RangeValue;

export type SliderProps = {
  /** valor atual (modo controlado). Aceita número único ou tupla [min, max] quando `range` */
  value?: SliderValue;
  /** valor inicial (modo não-controlado). Aceita número único ou tupla [min, max] quando `range` */
  defaultValue?: SliderValue;
  /** callback ao mudar. Recebe número ou tupla dependendo do modo */
  onChange?: (value: SliderValue) => void;

  /** habilita modo range com duas alças */
  range?: boolean;

  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** mostrar valor numérico à direita */
  showValue?: boolean;

  /** custom de cores via classes Tailwind */
  colors?: Colors;

  className?: string;
} & VariantProps<typeof sliderRootVariants> &
  VariantProps<typeof sliderTrailVariants>;

export default function Slider({
  value,
  defaultValue,
  onChange,
  range,
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
  const inferredRange = useMemo(
    () => range ?? Array.isArray(value ?? defaultValue),
    [range, value, defaultValue],
  );

  const fallbackValue = useMemo<SliderValue>(
    () => (inferredRange ? [min, max] : min),
    [inferredRange, min, max],
  );

  const normalizedDefaultValue = useMemo(
    () =>
      normalizeValue(
        defaultValue ?? fallbackValue,
        inferredRange,
        min,
        max,
        step,
      ),
    [defaultValue, fallbackValue, inferredRange, min, max, step],
  );

  const normalizedControlledValue = useMemo(
    () =>
      value !== undefined
        ? normalizeValue(value, inferredRange, min, max, step)
        : undefined,
    [value, inferredRange, min, max, step],
  );

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<SliderValue>(normalizedDefaultValue);

  useEffect(() => {
    if (!isControlled) {
      setInternal(normalizedDefaultValue);
    }
  }, [isControlled, normalizedDefaultValue]);

  const current = useMemo<SliderValue>(() => {
    if (isControlled) {
      return normalizedControlledValue ?? normalizedDefaultValue;
    }
    return normalizeValue(internal, inferredRange, min, max, step);
  }, [
    internal,
    inferredRange,
    isControlled,
    max,
    min,
    normalizedControlledValue,
    normalizedDefaultValue,
    step,
  ]);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const activeThumbRef = useRef<number | null>(null);
  const valueRef = useRef<SliderValue>(current);

  useEffect(() => {
    valueRef.current = current;
  }, [current]);

  const span = useMemo(() => max - min || 1, [max, min]);

  const getRangeFromRef = useCallback((): RangeValue => {
    const raw = valueRef.current;
    return clampRange(toRange(raw, [min, max]), min, max, step);
  }, [min, max, step]);

  const emitChange = useCallback(
    (next: SliderValue) => {
      valueRef.current = next;
      if (!isControlled) {
        setInternal((prev) => (valuesAreEqual(prev, next) ? prev : next));
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const setSingleValue = useCallback(
    (next: number) => {
      const normalized = clamp(roundTo(next, step), min, max);
      emitChange(normalized);
    },
    [emitChange, min, max, step],
  );

  const setRangeValue = useCallback(
    (index: 0 | 1, next: number) => {
      const rangeValue = getRangeFromRef();
      const updated: RangeValue =
        index === 0 ? [next, rangeValue[1]] : [rangeValue[0], next];
      const normalized = clampRange(updated, min, max, step);
      emitChange(normalized);
    },
    [emitChange, getRangeFromRef, min, max, step],
  );

  const getClosestThumbIndex = useCallback(
    (val: number): 0 | 1 => {
      const [low, high] = getRangeFromRef();
      return Math.abs(val - low) <= Math.abs(val - high) ? 0 : 1;
    },
    [getRangeFromRef],
  );

  const positionToValue = useCallback(
    (clientX: number) => {
      const el = rootRef.current;
      if (!el) {
        const raw = valueRef.current;
        return typeof raw === "number" ? raw : raw[0];
      }
      const rect = el.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      const ratio = rect.width ? x / rect.width : 0;
      return min + ratio * (max - min);
    },
    [min, max],
  );

  const parseThumbIndexFromEvent = (event: React.PointerEvent<HTMLDivElement>) => {
    const thumb = (event.target as HTMLElement).closest<HTMLButtonElement>(
      "[data-slider-thumb-index]",
    );
    if (!thumb) return null;
    const index = Number(thumb.getAttribute("data-slider-thumb-index"));
    return Number.isNaN(index) ? null : index;
  };

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      const track = event.currentTarget;
      track.setPointerCapture(event.pointerId);
      const pointerValue = positionToValue(event.clientX);
      let thumbIndex = parseThumbIndexFromEvent(event);
      const isRangeMode = Array.isArray(valueRef.current);
      if (!isRangeMode) {
        thumbIndex = 0;
      } else if (thumbIndex === null) {
        thumbIndex = getClosestThumbIndex(pointerValue);
      }
      activeThumbRef.current = thumbIndex;
      if (Array.isArray(valueRef.current)) {
        setRangeValue((thumbIndex ?? 0) as 0 | 1, pointerValue);
      } else {
        setSingleValue(pointerValue);
      }
    },
    [disabled, getClosestThumbIndex, positionToValue, setRangeValue, setSingleValue],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      const thumbIndex = activeThumbRef.current;
      if (thumbIndex === null) return;
      const pointerValue = positionToValue(event.clientX);
      if (Array.isArray(valueRef.current)) {
        setRangeValue(thumbIndex as 0 | 1, pointerValue);
      } else {
        setSingleValue(pointerValue);
      }
    },
    [disabled, positionToValue, setRangeValue, setSingleValue],
  );

  const endPointerInteraction = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (activeThumbRef.current === null) return;
      activeThumbRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    [],
  );

  const handleThumbKeyDown = useCallback(
    (index?: 0 | 1) =>
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;
        const isRangeMode = Array.isArray(valueRef.current);
        const resolvedIndex = (isRangeMode ? index ?? 0 : 0) as 0 | 1;
        const baseValue = isRangeMode
          ? getRangeFromRef()[resolvedIndex]
          : (valueRef.current as number);
        const large = Math.max(step * 10, (max - min) / 10);

        switch (event.key) {
          case "ArrowLeft":
          case "ArrowDown":
            event.preventDefault();
            isRangeMode
              ? setRangeValue(resolvedIndex, baseValue - step)
              : setSingleValue(baseValue - step);
            break;
          case "ArrowRight":
          case "ArrowUp":
            event.preventDefault();
            isRangeMode
              ? setRangeValue(resolvedIndex, baseValue + step)
              : setSingleValue(baseValue + step);
            break;
          case "PageDown":
            event.preventDefault();
            isRangeMode
              ? setRangeValue(resolvedIndex, baseValue - large)
              : setSingleValue(baseValue - large);
            break;
          case "PageUp":
            event.preventDefault();
            isRangeMode
              ? setRangeValue(resolvedIndex, baseValue + large)
              : setSingleValue(baseValue + large);
            break;
          case "Home":
            event.preventDefault();
            isRangeMode
              ? setRangeValue(resolvedIndex, min)
              : setSingleValue(min);
            break;
          case "End":
            event.preventDefault();
            isRangeMode
              ? setRangeValue(resolvedIndex, max)
              : setSingleValue(max);
            break;
        }
      },
    [disabled, getRangeFromRef, max, min, setRangeValue, setSingleValue, step],
  );

  const percents = useMemo(() => {
    if (Array.isArray(current)) {
      return (current as RangeValue).map((val) =>
        clampPercent(((val - min) / span) * 100),
      ) as [number, number];
    }
    return [clampPercent(((current as number) - min) / span * 100)];
  }, [current, min, span]);

  const levelStyle = useMemo(() => {
    if (Array.isArray(current)) {
      const [start, end] = percents as [number, number];
      const left = Math.min(start, end);
      const width = Math.abs(end - start);
      return { left: `${left}%`, width: `${width}%` };
    }
    return { left: "0%", width: `${percents[0]}%` };
  }, [current, percents]);

  const displayValue = Array.isArray(current)
    ? `${(current as RangeValue)[0]} - ${(current as RangeValue)[1]}`
    : current;

  const thumbs = Array.isArray(current)
    ? (current as RangeValue).map((val, index) => {
        const percent = (percents as [number, number])[index];
        const [low, high] = current as RangeValue;
        return (
          <button
            key={index}
            type="button"
            data-slider-thumb-index={index}
            className={cx(
              sliderThumbVariants({ variant, density, disabled }),
              colors?.thumb,
            )}
            style={{ left: `${percent}%` }}
            onKeyDown={handleThumbKeyDown(index as 0 | 1)}
            role="slider"
            aria-valuemin={index === 0 ? min : low}
            aria-valuemax={index === 0 ? high : max}
            aria-valuenow={Math.round(val * 1000) / 1000}
            aria-disabled={disabled || undefined}
          />
        );
      })
    : [
        <button
          key="single"
          type="button"
          data-slider-thumb-index={0}
          className={cx(
            sliderThumbVariants({ variant, density, disabled }),
            colors?.thumb,
          )}
          style={{ left: `${percents[0]}%` }}
          onKeyDown={handleThumbKeyDown()}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={Math.round((current as number) * 1000) / 1000}
          aria-disabled={disabled || undefined}
        />,
      ];

  return (
    <div className={cx(sliderRootVariants({ density }), className)}>
      <div
        ref={rootRef}
        className={cx(sliderTrackVariants({ density }), colors?.track)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointerInteraction}
        onPointerCancel={endPointerInteraction}
      >
        <div
          className={cx(sliderTrailVariants({ variant, density }), colors?.trail)}
        />

        <div
          className={cx(sliderLevelVariants({ variant, density }), colors?.level)}
          style={levelStyle}
        />

        {thumbs}
      </div>

      {showValue && (
        <div className="ml-2 inline-block min-w-10 align-middle text-right text-sm tabular-nums">
          {displayValue}
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

function toRange(value: SliderValue | undefined, fallback: RangeValue): RangeValue {
  if (Array.isArray(value)) {
    return [value[0], value[1]];
  }
  if (typeof value === "number") {
    return [value, value];
  }
  return fallback;
}

function clampRange(
  range: RangeValue,
  min: number,
  max: number,
  step: number,
): RangeValue {
  let [start, end] = range;
  start = clamp(roundTo(start, step), min, max);
  end = clamp(roundTo(end, step), min, max);
  if (start > end) {
    [start, end] = [end, start];
  }
  return [start, end];
}

function normalizeValue(
  raw: SliderValue,
  isRange: boolean,
  min: number,
  max: number,
  step: number,
): SliderValue {
  if (isRange) {
    return clampRange(toRange(raw, [min, max]), min, max, step);
  }

  const numeric =
    typeof raw === "number"
      ? raw
      : Array.isArray(raw)
        ? raw[0]
        : min;

  return clamp(roundTo(numeric, step), min, max);
}

function valuesAreEqual(a: SliderValue, b: SliderValue) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a[0] === b[0] && a[1] === b[1];
  }
  return !Array.isArray(a) && !Array.isArray(b) && a === b;
}

function clampPercent(value: number) {
  return Math.min(Math.max(value, 0), 100);
}
