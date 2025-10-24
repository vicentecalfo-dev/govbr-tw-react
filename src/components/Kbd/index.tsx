// components/Kbd/index.tsx
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

/** Permite overrides de cor (Tailwind classes) */
type KbdColors = {
  bg?: string;
  text?: string;
  border?: string;
  shadow?: string; // simulando “inset”/elevations
};

const kbdBase = cva(
  [
    "inline-flex select-none items-center justify-center align-middle",
    "font-mono",
    "rounded-md border",
    "transition-colors",
    "whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-govbr-pure-0 text-govbr-gray-80 border-govbr-gray-20 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.02),0_1px_0_0_rgba(0,0,0,0.03)]",
        subtle:
          "bg-govbr-gray-2 text-govbr-gray-80 border-govbr-gray-10",
        outline:
          "bg-transparent text-govbr-gray-80 border-govbr-gray-20",
        ghost:
          "bg-transparent text-govbr-gray-80 border-transparent",
        dark:
          "bg-govbr-blue-warm-vivid-90 text-govbr-pure-0 border-govbr-blue-warm-20",
      },
      size: {
        xs: "text-[10px] px-1.5 h-5 min-w-[1.25rem]",
        sm: "text-[11px] px-2 h-6 min-w-[1.5rem]",
        md: "text-xs px-2.5 h-7 min-w-[1.75rem]",
      },
      density: {
        lowest: "tracking-wide",
        low: "",
        default: "",
        high: "",
      },
      pill: {
        true: "rounded-full",
        false: "",
      },
      muted: {
        true: "opacity-80",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      density: "default",
      pill: false,
      muted: false,
    },
  }
);

const groupVariants = cva("inline-flex items-center gap-1", {
  variants: {
    size: {
      xs: "gap-0",
      sm: "gap-0",
      md: "gap-0",
    },
  },
  defaultVariants: { size: "sm" },
});

const sepVariants = cva("text-[0.7em] opacity-70", {
  variants: {
    size: {
      xs: "mx-0",
      sm: "mx-0",
      md: "mx-0",
    },
  },
  defaultVariants: { size: "xs" },
});

type KnownKey =
  | "Mod"
  | "Ctrl"
  | "Cmd"
  | "Option"
  | "Alt"
  | "Shift"
  | "Enter"
  | "Return"
  | "Tab"
  | "Space"
  | "Backspace"
  | "Delete"
  | "Esc"
  | "Escape"
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight";

type Os = "auto" | "mac" | "win";

function detectOs(): Os {
  if (typeof navigator === "undefined") return "auto";
  const p = navigator.platform?.toLowerCase() || "";
  const ua = navigator.userAgent?.toLowerCase() || "";
  const isMac = /mac|iphone|ipad|ipod/.test(p) || /mac os|like mac os/.test(ua);
  const isWin = /win/.test(p) || /windows/.test(ua);
  return isMac ? "mac" : isWin ? "win" : "auto";
}

function labelFor(key: string | React.ReactNode, os: Os): React.ReactNode {
  if (typeof key !== "string") return key;

  const targetOs = os === "auto" ? detectOs() : os;
  const map: Record<string, string> = {
    // mod
    Mod: targetOs === "mac" ? "⌘" : "Ctrl",
    Cmd: "⌘",
    Ctrl: "Ctrl",
    Option: targetOs === "mac" ? "⌥" : "Alt",
    Alt: "Alt",
    Shift: "⇧",
    // control keys
    Enter: "Enter",
    Return: "↩",
    Tab: "Tab",
    Space: "␣",
    Backspace: "⌫",
    Delete: "⌦",
    Esc: "Esc",
    Escape: "Esc",
    // arrows
    ArrowUp: "↑",
    ArrowDown: "↓",
    ArrowLeft: "←",
    ArrowRight: "→",
  };
  return map[key] ?? key;
}

export type KbdProps = {
  /** conteúdo da tecla quando for uma única */
  children?: React.ReactNode;
  /** conjunto de teclas; se passado, renderiza como combo (ex.: ["Mod","K"]) */
  keys?: Array<string | React.ReactNode>;
  /** separador entre teclas no combo */
  separator?: React.ReactNode;
  /** mapeamento de Mod/Cmd/Ctrl baseado no SO */
  os?: Os;
  /** sobrescrita de cores */
  colors?: KbdColors;
  className?: string;
  muted?: boolean;
  pill?: boolean;
} & VariantProps<typeof kbdBase>;

export default function Kbd({
  children,
  keys,
  separator = "+",
  os = "auto",
  colors,
  className,
  muted,
  pill,
  variant,
  size,
  density,
}: KbdProps) {
  // COMBO
  if (keys && keys.length) {
    return (
      <span className={groupVariants({ size })} role="group" aria-label="keyboard shortcut">
        {keys.map((k, i) => (
          <React.Fragment key={i}>
            <kbd
              className={cx(
                kbdBase({ variant, size, density, pill, muted }),
                colors?.bg,
                colors?.text,
                colors?.border,
                colors?.shadow,
                className
              )}
            >
              {labelFor(k, os)}
            </kbd>
            {i < keys.length - 1 && (
              <span className={sepVariants({ size })} aria-hidden="true">
                {separator}
              </span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  }

  // TECLA ÚNICA
  return (
    <kbd
      className={cx(
        kbdBase({ variant, size, density, pill, muted }),
        colors?.bg,
        colors?.text,
        colors?.border,
        colors?.shadow,
        className
      )}
    >
      {labelFor(children as any, os)}
    </kbd>
  );
}
