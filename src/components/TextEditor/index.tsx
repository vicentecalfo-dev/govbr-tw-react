import React, { useCallback, useId, useMemo, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Toolbar usando seus componentes
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "../DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faHeading,
  faLink,
  faListUl,
  faListOl,
  faCode,
  faQuoteRight,
  faEye,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

/**
 * TextEditor – Markdown textarea com toolbar e preview
 * Botões apenas com ícones; Heading via DropdownMenu (H1..H6)
 * Agora com **Lista numerada** ao lado da lista não ordenada
 */

const editorVariants = cva(
  "rounded-md w-full placeholder:italic placeholder:text-base border box-border disabled:opacity-60 disabled:cursor-not-allowed read-only:cursor-default read-only:outline-none font-sans",
  {
    variants: {
      variant: {
        default:
          "bg-govbr-pure-0 border-govbr-gray-20 outline-govbr-blue-warm-vivid-70 text-govbr-pure-100 hover:bg-govbr-gray-10 disabled:hover:bg-govbr-pure-0 read-only:hover:bg-govbr-pure-0",
        danger:
          "border-govbr-red-vivid-50 outline-govbr-red-vivid-50 bg-govbr-red-vivid-10 placeholder:text-govbr-red-vivid-50 text-govbr-red-vivid-50",
        success:
          "border-govbr-green-cool-vivid-50 outline-govbr-green-cool-vivid-50 bg-govbr-green-cool-vivid-5 placeholder:text-govbr-green-cool-vivid-50 text-govbr-green-cool-vivid-50",
        warning:
          "border-govbr-yellow-vivid-20 outline-govbr-yellow-vivid-20 bg-govbr-yellow-vivid-5 placeholder:text-govbr-pure-100 text-govbr-pure-100",
        dark:
          "border-govbr-blue-warm-20 outline-govbr-blue-warm-20 bg-transparent hover:bg-govbr-blue-warm-20/20 placeholder:text-govbr-blue-warm-20 text-govbr-pure-0 disabled:bg-govbr-blue-warm-20/20 read-only:hover:bg-transparent",
        featured:
          "border-govbr-gray-2 outline-govbr-blue-warm-vivid-70 text-govbr-pure-100 bg-govbr-gray-2 hover:bg-govbr-gray-10 disabled:hover:bg-govbr-gray-2 read-only:hover:bg-govbr-gray-2 text-govbr-gray-80",
      },
      density: {
        lowest: "min-h-56 p-4 text-[1.05rem] leading-6",
        low: "min-h-48 p-4 text-base leading-6",
        default: "min-h-40 p-3 text-base leading-6",
        high: "min-h-32 p-2 text-sm leading-5",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "default",
    },
  }
);

export type TextEditorProps = {
  value: string;
  onChange: (nextValue: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  previewInitially?: boolean;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
} & VariantProps<typeof editorVariants>;

function cx(...cls: Array<string | undefined | false>) {
  return cls.filter(Boolean).join(" ");
}

export default function TextEditor({
  value,
  onChange,
  placeholder,
  label,
  hint,
  previewInitially = false,
  className,
  disabled,
  readOnly,
  variant,
  density,
}: TextEditorProps) {
  const [showPreview, setShowPreview] = useState(previewInitially);
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const id = useId();

  const apply = useCallback(
    (wrap: { prefix?: string; suffix?: string } | ((sel: string) => string)) => {
      if (!areaRef.current) return;
      const ta = areaRef.current;
      const start = ta.selectionStart ?? 0;
      const end = ta.selectionEnd ?? 0;
      const before = value.slice(0, start);
      const selected = value.slice(start, end);
      const after = value.slice(end);

      let next = value;
      if (typeof wrap === "function") {
        next = before + wrap(selected) + after;
      } else {
        const { prefix = "", suffix = "" } = wrap;
        next = before + prefix + (selected || "texto") + suffix + after;
      }

      onChange(next);
      requestAnimationFrame(() => {
        const pos = start + 2;
        ta.focus();
        ta.setSelectionRange(pos, pos);
      });
    },
    [value, onChange]
  );

  const insertHeading = useCallback(
    (level: 1 | 2 | 3 | 4 | 5 | 6) => apply((sel) => `${"#".repeat(level)} ${sel || `Título ${level}`}`),
    [apply]
  );

  const toolbar = useMemo(
    () => (
      <div className="flex flex-wrap items-center gap-3">
        <ButtonGroup>
          <Button size="icon" onClick={() => apply({ prefix: "**", suffix: "**" })} aria-label="Negrito">
            <FontAwesomeIcon icon={faBold} />
          </Button>
          <Button size="icon" onClick={() => apply({ prefix: "*", suffix: "*" })} aria-label="Itálico">
            <FontAwesomeIcon icon={faItalic} />
          </Button>

          {/* DropdownMenu para Cabeçalhos (H1..H6) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" aria-label="Cabeçalhos (H1–H6)">
                <FontAwesomeIcon icon={faHeading} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="min-w-36">
              <DropdownMenuLabel>Headings</DropdownMenuLabel>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <DropdownMenuItem key={n} onClick={() => insertHeading(n as 1 | 2 | 3 | 4 | 5 | 6)}>
                  {`H${n}`}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="icon" onClick={() => apply({ prefix: "[", suffix: "](https://)" })} aria-label="Link">
            <FontAwesomeIcon icon={faLink} />
          </Button>
          <Button size="icon" onClick={() => apply((sel) => `- ${sel || "item"}`)} aria-label="Lista não ordenada">
            <FontAwesomeIcon icon={faListUl} />
          </Button>
          <Button size="icon" onClick={() => apply((sel) => `1. ${sel || "item"}`)} aria-label="Lista numerada">
            <FontAwesomeIcon icon={faListOl} />
          </Button>
          <Button size="icon" onClick={() => apply({ prefix: "`", suffix: "`" })} aria-label="Código inline">
            <FontAwesomeIcon icon={faCode} />
          </Button>
          <Button size="icon" onClick={() => apply((sel) => `> ${sel || "citação"}`)} aria-label="Citação">
            <FontAwesomeIcon icon={faQuoteRight} />
          </Button>
        </ButtonGroup>

        {/* Toggle Preview/Edit (ícone só) */}
        <ButtonGroup className="ml-auto">
          <Button
            size="icon"
            variant={showPreview ? "default-success" : "outline"}
            onClick={() => setShowPreview((s) => !s)}
            aria-label={showPreview ? "Voltar para edição" : "Visualizar"}
          >
            <FontAwesomeIcon icon={showPreview ? faPen : faEye} />
          </Button>
        </ButtonGroup>
      </div>
    ),
    [apply, insertHeading, showPreview]
  );

  return (
    <div className={cx("w-full flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-govbr-gray-80">
          {label}
        </label>
      )}

      {/* Toolbar */}
      {toolbar}

      {/* Editor / Preview */}
      <div className="relative">
        {!showPreview ? (
          <textarea
            id={id}
            ref={areaRef}
            placeholder={placeholder}
            className={editorVariants({ variant, density })}
            spellCheck
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <div
            className={cx(
              editorVariants({ variant, density }),
              "prose prose-sm max-w-none overflow-auto bg-transparent"
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value || "_Nada para pré-visualizar._"}</ReactMarkdown>
          </div>
        )}
      </div>

      {hint && <span className="text-xs text-govbr-gray-70">{hint}</span>}
    </div>
  );
}
