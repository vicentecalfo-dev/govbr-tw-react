import React, { useEffect, useMemo, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * ProgressBar – barra de progresso com temas/variantes, labels opcionais e cores custom.
 * - ÚNICA fonte de verdade para variantes via cva (sem switch duplicado)
 * - trackClassName / progressClassName continuam podendo sobrescrever estilos
 * - Labels respeitam o tema e aceitam variante separada
 * - NOVO: label some em 100% e anima "..." quando o texto terminar com "..."
 */

const trackVariants = cva(
  "w-full overflow-hidden rounded-md",
  {
    variants: {
      theme: {
        light: "bg-govbr-gray-10",
        dark: "bg-govbr-blue-warm-20/30 supports-[color-scheme:dark]:bg-govbr-blue-warm-20/40",
      },
      density: {
        lowest: "h-7",
        low: "h-5",
        default: "h-4",
        high: "h-3",
      },
    },
    defaultVariants: {
      theme: "light",
      density: "default",
    },
  }
);

const barVariants = cva(
  "h-full transition-[width] duration-300 ease-out",
  {
    variants: {
      theme: { light: "", dark: "" },
      variant: {
        default: "bg-govbr-blue-warm-vivid-70",
        success: "bg-govbr-green-cool-vivid-50",
        danger: "bg-govbr-red-vivid-50",
        warning: "bg-govbr-yellow-vivid-20",
        info: "bg-govbr-gray-60",
      },
    },
    defaultVariants: { theme: "light", variant: "default" },
  }
);

const labelWrapVariants = cva("mb-1 flex items-center justify-between text-sm", {
  variants: {
    theme: {
      light: "text-govbr-gray-80",
      dark: "text-govbr-pure-0",
    },
  },
  defaultVariants: { theme: "light" },
});

const percentVariants = cva("font-medium tabular-nums", {
  variants: {
    theme: { light: "", dark: "" },
    variant: {
      default: "text-inherit",
      success: "text-inherit",
      danger: "text-inherit",
      warning: "text-inherit",
      info: "text-inherit",
    },
  },
  defaultVariants: { theme: "light", variant: "default" },
});

export type ProgressBarProps = {
  value: number;
  showLabels?: boolean;
  label?: string; // Ex.: "Carregando ..."
  trackClassName?: string;
  progressClassName?: string;
  className?: string;
  labelVariant?: VariantProps<typeof percentVariants>["variant"];
  labelClassName?: string;
  hideLabelOnComplete?: boolean;
} & VariantProps<typeof trackVariants> &
  VariantProps<typeof barVariants>;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ProgressBar({
  value,
  showLabels = true,
  label = "Carregando ...",
  trackClassName,
  progressClassName,
  className,
  theme,
  variant,
  density,
  labelVariant,
  labelClassName,
  hideLabelOnComplete = true
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));

  // Detecta se o label termina com "..."
  const endsWithEllipsis = useMemo(() => /\.\.\.$/.test(label), [label]);
  const baseLabel = useMemo(() => (endsWithEllipsis ? label.slice(0, -3) : label), [label, endsWithEllipsis]);

  // Animação dos três pontos: 0 → 1 → 2 → 3 → 0 (0 = sem pontos)
  const [dotCount, setDotCount] = useState(0);
  const shouldAnimate = showLabels && pct < 100 && endsWithEllipsis;

  useEffect(() => {
    if (!shouldAnimate) {
      // Quando não deve animar, mantém o label estável
      setDotCount(endsWithEllipsis ? 3 : 0);
      return;
    }
    const id = setInterval(() => {
      setDotCount((d) => (d + 1) % 4);
    }, 500); // ajuste fino da velocidade aqui
    return () => clearInterval(id);
  }, [shouldAnimate, endsWithEllipsis]);

  const displayLabel = endsWithEllipsis ? `${baseLabel}${".".repeat(dotCount)}` : label;

  const trackCls = cx(trackVariants({ theme, density }), trackClassName);
  const barCls = cx(barVariants({ theme, variant }), progressClassName);
  const labelsWrap = labelWrapVariants({ theme });
  const percentCls = percentVariants({ theme, variant: labelVariant || variant });

  return (
    <div className={cx("w-full", className)}>
      {showLabels && (
        <div className={cx(labelsWrap, labelClassName)}>
          {/* Esconde a mensagem do label quando chega a 100% */}
          <span aria-live="polite">
            {pct === 100 && hideLabelOnComplete ? "" : displayLabel}
          </span>
          <span className={percentCls}>{pct === 100 && hideLabelOnComplete ? "" : `${pct}%`}</span>
        </div>
      )}

      <div
        className={trackCls}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className={barCls} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}