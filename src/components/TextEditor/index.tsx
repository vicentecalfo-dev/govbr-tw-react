import React, { useCallback, useId, useMemo, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Toolbar usando seus componentes
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../DropdownMenu";
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
  faTable,
  faEye,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

/**
 * TextEditor – Markdown textarea com toolbar e preview
 * Agora com i18n: labels configuráveis via prop `labels`.
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

export type TextEditorLabels = {
  // Toolbar aria-labels
  bold: string;
  italic: string;
  headings: string; // aria no botão do dropdown
  headingsMenuTitle: string; // título do menu
  link: string;
  unorderedList: string;
  orderedList: string;
  code: string;
  quote: string;
  table: string; // botão abrir formulário de tabela
  preview: string; // aria para entrar em preview
  edit: string; // aria para voltar a editar

  // Form tabela
  columns: string;
  rows: string;
  insert: string;
  cancel: string;

  // Conteúdos gerados
  selectedPlaceholder: string; // usado quando não há seleção
  tableHeaderBase: string; // "Cabeçalho"
  nothingToPreview: string; // texto do preview vazio
};

export const DEFAULT_LABELS_PT_BR: TextEditorLabels = {
  bold: "Negrito",
  italic: "Itálico",
  headings: "Cabeçalhos (H1–H6)",
  headingsMenuTitle: "Cabeçalhos",
  link: "Link",
  unorderedList: "Lista não ordenada",
  orderedList: "Lista numerada",
  code: "Código inline",
  quote: "Citação",
  table: "Inserir tabela (linhas/colunas)",
  preview: "Visualizar",
  edit: "Voltar para edição",
  columns: "Colunas",
  rows: "Linhas",
  insert: "Inserir",
  cancel: "Cancelar",
  selectedPlaceholder: "texto",
  tableHeaderBase: "Cabeçalho",
  nothingToPreview: "_Nada para pré-visualizar._",
};

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
  labels?: Partial<TextEditorLabels>; // <== NOVO
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
  labels,
}: TextEditorProps) {
  const L: TextEditorLabels = { ...DEFAULT_LABELS_PT_BR, ...(labels || {}) };

  const [showPreview, setShowPreview] = useState(previewInitially);
  const [tableFormOpen, setTableFormOpen] = useState(false);
  const [cols, setCols] = useState<number>(3);
  const [rows, setRows] = useState<number>(3);

  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const id = useId();

  const insertAtCursor = useCallback(
    (text: string) => {
      if (!areaRef.current) return;
      const ta = areaRef.current;
      const start = ta.selectionStart ?? 0;
      const end = ta.selectionEnd ?? 0;
      const before = value.slice(0, start);
      const after = value.slice(end);
      const next = `${before}${text}${after}`;
      onChange(next);
      requestAnimationFrame(() => {
        const pos = start + text.length;
        ta.focus();
        ta.setSelectionRange(pos, pos);
      });
    },
    [value, onChange]
  );

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
        next = before + prefix + (selected || L.selectedPlaceholder) + suffix + after;
      }

      onChange(next);
      requestAnimationFrame(() => {
        const pos = start + 2;
        ta.focus();
        ta.setSelectionRange(pos, pos);
      });
    },
    [value, onChange, L.selectedPlaceholder]
  );

  const insertHeading = useCallback(
    (level: 1 | 2 | 3 | 4 | 5 | 6) => apply((sel) => `${"#".repeat(level)} ${sel || `${L.tableHeaderBase} ${level}`}`),
    [apply, L.tableHeaderBase]
  );

  const buildMarkdownTable = useCallback(
    (c: number, r: number) => {
      const safeC = Math.max(1, Math.min(20, Math.floor(c)));
      const safeR = Math.max(1, Math.min(50, Math.floor(r)));
      const header = Array.from({ length: safeC }, (_, i) => `${L.tableHeaderBase} ${i + 1}`).join(" | ");
      const sep = Array.from({ length: safeC }, () => "---").join(" | ");
      const row = Array.from({ length: safeC }, () => " ").join(" | ");
      const body = Array.from({ length: safeR }, () => `| ${row} |`).join("\n");
      return `\n| ${header} |\n| ${sep} |\n${body}\n`;
    },
    [L.tableHeaderBase]
  );

  const handleInsertTable = useCallback(() => {
    insertAtCursor(buildMarkdownTable(cols, rows));
    setTableFormOpen(false);
  }, [insertAtCursor, buildMarkdownTable, cols, rows]);

  const toolbar = useMemo(
    () => (
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-0">
            <Button size="icon" onClick={() => apply({ prefix: "**", suffix: "**" })} aria-label={L.bold} variant="ghost">
              <FontAwesomeIcon icon={faBold} />
            </Button>
            <Button size="icon" onClick={() => apply({ prefix: "*", suffix: "*" })} aria-label={L.italic} variant="ghost">
              <FontAwesomeIcon icon={faItalic} />
            </Button>

            {/* DropdownMenu para Cabeçalhos (H1..H6) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" aria-label={L.headings} variant="ghost">
                  <FontAwesomeIcon icon={faHeading} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="min-w-36">
                <DropdownMenuLabel>{L.headingsMenuTitle}</DropdownMenuLabel>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <DropdownMenuItem key={n} onClick={() => insertHeading(n as 1 | 2 | 3 | 4 | 5 | 6)}>
                    {`H${n}`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="icon" onClick={() => apply({ prefix: "[", suffix: "](https://)" })} aria-label={L.link} variant="ghost">
              <FontAwesomeIcon icon={faLink} />
            </Button>
            <Button size="icon" onClick={() => apply((sel) => `- ${sel || "item"}`)} aria-label={L.unorderedList} variant="ghost">
              <FontAwesomeIcon icon={faListUl} />
            </Button>
            <Button size="icon" onClick={() => apply((sel) => `1. ${sel || "item"}`)} aria-label={L.orderedList} variant="ghost">
              <FontAwesomeIcon icon={faListOl} />
            </Button>
            <Button size="icon" onClick={() => apply({ prefix: "`", suffix: "`" })} aria-label={L.code} variant="ghost">
              <FontAwesomeIcon icon={faCode} />
            </Button>
            <Button size="icon" onClick={() => apply((sel) => `> ${sel || "citação"}`)} aria-label={L.quote} variant="ghost">
              <FontAwesomeIcon icon={faQuoteRight} />
            </Button>

            {/* Tabela (abre mini formulário abaixo da barra) */}
            <Button size="icon" onClick={() => setTableFormOpen((s) => !s)} aria-label={L.table} variant="ghost">
              <FontAwesomeIcon icon={faTable} />
            </Button>
          </div>

          {/* Toggle Preview/Edit (ícone só) */}
          <ButtonGroup className="ml-auto">
            <Button
              size="icon"
              variant={showPreview ? "default-success" : "default"}
              onClick={() => setShowPreview((s) => !s)}
              aria-label={showPreview ? L.edit : L.preview}
            >
              <FontAwesomeIcon icon={showPreview ? faPen : faEye} />
            </Button>
          </ButtonGroup>
        </div>

        {tableFormOpen && (
          <div className="flex items-end gap-3 rounded-md border bg-govbr-gray-10 p-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs">{L.columns}</label>
              <input
                type="number"
                min={1}
                max={20}
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value || "1", 10))}
                className="w-24 rounded border border-govbr-gray-30 bg-govbr-pure-100/5 p-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs">{L.rows}</label>
              <input
                type="number"
                min={1}
                max={50}
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value || "1", 10))}
                className="w-24 rounded border border-govbr-gray-30 bg-govbr-pure-100/5 p-2 text-sm"
              />
            </div>
            <div className="ml-auto flex gap-2">
              <Button onClick={handleInsertTable}>{L.insert}</Button>
              <Button variant="outline" onClick={() => setTableFormOpen(false)}>
                {L.cancel}
              </Button>
            </div>
          </div>
        )}
      </div>
    ),
    [L, apply, insertHeading, showPreview, tableFormOpen, cols, rows, handleInsertTable]
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
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {value || L.nothingToPreview}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {hint && <span className="text-xs text-govbr-gray-70">{hint}</span>}
    </div>
  );
}

