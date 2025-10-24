import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Skeleton – placeholder carregando, inspirado no shadcn/ui.
 *
 * Agora com props para customizar a **cor que pulsa** e a **animação**:
 * - `toneClassName`: classes Tailwind para a base/cor do skeleton (ex.: `bg-emerald-200`).
 * - `animateClassName`: classes Tailwind para a animação (ex.: `animate-pulse`, `motion-safe:animate-[pulse_1.5s_ease_infinite]`).
 *
 * Dica: se quiser somente trocar a cor, basta `toneClassName`. Se quiser
 * customizar a animação, passe `animate={false}` e use apenas `animateClassName`.
 */

const skeletonVariants = cva(
  "block select-none bg-govbr-gray-10 dark:bg-white/10",
  {
    variants: {
      theme: {
        light: "bg-govbr-gray-10",
        normal: "bg-govbr-gray-10",
        dark: "bg-white/15",
      },
      animate: {
        true: "animate-pulse",
        false: "",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      theme: "light",
      animate: true,
      radius: "md",
    },
  }
);

export type SkeletonProps = {
  className?: string;
  /** Cor/base do skeleton (ex.: bg-emerald-200, bg-zinc-200, bg-white/20) */
  toneClassName?: string;
  /** Classe(s) de animação (ex.: animate-pulse) */
  animateClassName?: string;
} & VariantProps<typeof skeletonVariants> & React.HTMLAttributes<HTMLDivElement>;

function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, theme, animate, radius, toneClassName, animateClassName, ...rest },
  ref
) {
  const variantClasses = skeletonVariants({ theme, animate, radius });
  // toneClassName e animateClassName entram por último para permitir override via Tailwind
  const classes = cx(variantClasses, toneClassName, animateClassName, className);
  return <div ref={ref} className={classes} {...rest} />;
});

export default Skeleton;
