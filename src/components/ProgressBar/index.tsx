import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * ProgressBar – barra de progresso com temas/variantes, labels opcionais e cores custom.
 * - ÚNICA fonte de verdade para variantes via cva (sem switch duplicado)
 * - trackClassName / progressClassName continuam podendo sobrescrever estilos
 * - Labels respeitam o tema e aceitam variante separada
 */

const trackVariants = cva(
  "w-full overflow-hidden rounded-md", // base do trilho
  {
    variants: {
      theme: {
        light: "bg-govbr-gray-10",
        // inclui fallback para ambientes que suportam color-scheme
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
  "h-full transition-[width] duration-300 ease-out", // base da barra
  {
    variants: {
      theme: {
        light: "",
        dark: "",
      },
      variant: {
        // Mantido como padrão
        default: "bg-govbr-blue-warm-vivid-70",
        // Alinhado aos tokens usados no código original (switch)
        success: "bg-govbr-green-cool-vivid-50",
        danger: "bg-govbr-red-vivid-50",
        warning: "bg-govbr-yellow-vivid-20",
        info: "bg-govbr-gray-60",
      },
    },
    defaultVariants: {
      theme: "light",
      variant: "default",
    },
  }
);

// Labels (texto à esquerda e porcentagem à direita)
const labelWrapVariants = cva("mb-1 flex items-center justify-between text-sm", {
  variants: {
    theme: {
      light: "text-govbr-gray-80",
      dark: "text-govbr-pure-0",
    },
  },
  defaultVariants: { theme: "light" },
});

// Opcional: cor de destaque da % dependendo da variante (por padrão herda)
const percentVariants = cva("font-medium tabular-nums", {
  variants: {
    theme: {
      light: "",
      dark: "",
    },
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
  /** valor entre 0 e 100 */
  value: number;
  /** Mostra a faixa com textos acima da barra (padrão: true) */
  showLabels?: boolean;
  /** Label i18n (esquerda). Padrão: "Carregando ..." */
  label?: string;
  /** Força uma classe tailwind no TRILHO (fundo). Entra por último e sobrescreve se necessário */
  trackClassName?: string;
  /** Força uma classe tailwind na BARRA (progresso). Entra por último e sobrescreve se necessário */
  progressClassName?: string;
  /** Classe extra no wrapper */
  className?: string;
  /** Variante do estilo do texto dos labels (por padrão segue a barra) */
  labelVariant?: VariantProps<typeof percentVariants>["variant"]; // default|success|danger|warning|info
  /** Classes extras apenas nos labels (container) */
  labelClassName?: string;
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
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));

  // Usa somente cva para variantes; overrides são aplicados por último
  const trackCls = cx(trackVariants({ theme, density }), trackClassName);
  const barCls = cx(barVariants({ theme, variant }), progressClassName);

  const labelsWrap = labelWrapVariants({ theme });
  const percentCls = percentVariants({ theme, variant: labelVariant || variant });

  return (
    <div className={cx("w-full", className)}>
      {showLabels && (
        <div className={cx(labelsWrap, labelClassName)}>
          <span>{label}</span>
          <span className={percentCls}>{pct}%</span>
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
