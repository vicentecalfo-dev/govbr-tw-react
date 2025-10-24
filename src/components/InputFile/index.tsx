import React, { useEffect, useMemo, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faUpload,
  faImage,
  faFile,
  faXmark,
  faTrashCan,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// Ajuste o caminho conforme seu projeto
import { Button } from "../Button";

type FileLike = File;

const wrapperVariants = cva("w-full", {
  variants: {
    theme: {
      light: "text-govbr-gray-80",
      dark: "text-govbr-pure-0",
    },
    density: {
      comfy: "space-y-3",
      compact: "space-y-2",
    },
  },
  defaultVariants: {
    theme: "light",
    density: "comfy",
  },
});

const chipVariants = cva(
  "inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs",
  {
    variants: {
      theme: {
        light: "border-govbr-gray-20 bg-white",
        dark: "border-govbr-blue-warm-20/50 bg-govbr-blue-warm-10/30",
      },
    },
    defaultVariants: { theme: "light" },
  }
);

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes)) return "-";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}
function getExt(name: string): string {
  const idx = name.lastIndexOf(".");
  return idx >= 0 ? name.slice(idx + 1).toLowerCase() : "";
}
function isImage(f: File): boolean {
  return f.type.startsWith("image/");
}
function fileKey(f: File): string {
  return `${f.name}-${f.size}-${f.lastModified}`;
}

export type InputFileLabels = {
  pick?: string;            // "Selecionar arquivo"
  upload?: string;          // "Upload"
  acceptedHint?: string;    // "Aceita:"
  removeAria?: string;      // "Remover"
  prevPageAria?: string;    // "Página anterior"
  nextPageAria?: string;    // "Próxima página"
  pageXofY?: (x: number, y: number) => string; // "Página X de Y"
  clearAllAria?: string;    // "Remover todos"
};

export type InputFileProps = {
  accept?: string;
  multiple?: boolean;
  preview?: boolean;
  theme?: VariantProps<typeof wrapperVariants>["theme"];
  density?: VariantProps<typeof wrapperVariants>["density"];
  className?: string;

  onUpload?: (files: File[]) => Promise<void> | void;
  onChange?: (files: File[]) => void;

  /** i18n labels (json/obj) */
  labels?: InputFileLabels;

  /** Botões principais apenas com ícone (sem texto) */
  onlyIcon?: boolean;

  /** Desabilitar */
  disabled?: boolean;

  /** Controlado externamente (opcional) */
  value?: File[];
  setValue?: (files: File[]) => void;

  /** Densidade repassada ao Button */
  buttonDensity?: "high" | "default" | "low";
  /** Variantes dos botões principais (use as variantes do seu <Button/>) */
  pickVariant?: any;   // ex.: "outline"
  uploadVariant?: any; // ex.: "default" | "default-success"

  /** Paginação */
  itemsPerPage?: number; // default 8
};

export default function InputFile({
  accept,
  multiple,
  preview = true,
  theme,
  density,
  className,
  onUpload,
  onChange,
  labels,
  onlyIcon = false,
  disabled,
  value,
  setValue,
  buttonDensity = "default",
  pickVariant = "outline",
  uploadVariant = "default",
  itemsPerPage = 8,
}: InputFileProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Estado interno (se não for controlado)
  const [internalFiles, setInternalFiles] = useState<FileLike[]>([]);
  const files = (value as FileLike[] | undefined) ?? internalFiles;

  // i18n defaults
  const i18n: Required<InputFileLabels> = {
    pick: labels?.pick ?? "Selecionar arquivo",
    upload: labels?.upload ?? "Upload",
    acceptedHint: labels?.acceptedHint ?? "Aceita:",
    removeAria: labels?.removeAria ?? "Remover",
    prevPageAria: labels?.prevPageAria ?? "Página anterior",
    nextPageAria: labels?.nextPageAria ?? "Próxima página",
    pageXofY: labels?.pageXofY ?? ((x, y) => `Página ${x} de ${y}`),
    clearAllAria: labels?.clearAllAria ?? "Remover todos",
  };

  // Previews de imagem via ObjectURL (sem mutar File)
  const [previews, setPreviews] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    // cria URLs que faltam
    const next = new Map(previews);
    let changed = false;
    for (const f of files) {
      if (isImage(f)) {
        const key = fileKey(f);
        if (!next.has(key)) {
          next.set(key, URL.createObjectURL(f));
          changed = true;
        }
      }
    }
    // remove URLs de arquivos que saíram
    for (const [key] of next) {
      const stillExists = files.some((f) => fileKey(f) === key && isImage(f));
      if (!stillExists) {
        const url = next.get(key)!;
        URL.revokeObjectURL(url);
        next.delete(key);
        changed = true;
      }
    }
    if (changed) setPreviews(next);
    // cleanup ao desmontar
    return () => {
      next.forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  function updateFiles(next: FileLike[]) {
    if (setValue) setValue(next);
    else setInternalFiles(next);
    onChange?.(next);
  }

  function openPicker() {
    if (!disabled) inputRef.current?.click();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list) return;
    const picked = Array.from(list) as FileLike[];
    const next = multiple ? [...files, ...picked] : picked.slice(0, 1);
    updateFiles(next);
    // permite re-selecionar o mesmo arquivo depois
    e.currentTarget.value = "";
  }

  function removeAt(idx: number) {
    const key = fileKey(files[idx]);
    const url = previews.get(key);
    if (url) {
      URL.revokeObjectURL(url);
      const cp = new Map(previews);
      cp.delete(key);
      setPreviews(cp);
    }
    const next = files.filter((_, i) => i !== idx) as FileLike[];
    updateFiles(next);
  }

  // Limpar todos os arquivos
  function clearAll() {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setPreviews(new Map());
    updateFiles([]);
  }

  const hasFiles = files.length > 0;
  const canUpload = hasFiles && !disabled;

  async function handleUpload() {
    if (!onUpload || !canUpload) return;
    await onUpload(files);
  }

  // Paginação
  const totalPages = Math.max(1, Math.ceil(files.length / Math.max(1, itemsPerPage)));
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [files.length, itemsPerPage, totalPages, page]);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageFiles = useMemo(() => files.slice(start, end), [files, start, end]);

  const simpleList = useMemo(
    () =>
      pageFiles.map((f, i) => {
        const idx = start + i;
        return (
          <div
            key={`${fileKey(f)}-simple`}
            className={cx(chipVariants({ theme }), "justify-between w-full md:w-auto")}
          >
            <span className="inline-flex items-center gap-2">
              <FontAwesomeIcon icon={isImage(f) ? faImage : faFile} />
              <span className="font-medium">{f.name}</span>
            </span>
            <span className="opacity-70 ml-3">
              {getExt(f.name).toUpperCase()} • {formatBytes(f.size)}
            </span>

            {/* Remover item: ghost-danger, só ícone */}
            <Button
              size="icon"
              variant="ghost-danger"
              density={buttonDensity}
              onClick={() => removeAt(idx)}
              aria-label={`${i18n.removeAria} ${f.name}`}
              title={i18n.removeAria}
            >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
        );
      }),
    [pageFiles, theme, buttonDensity, start, i18n.removeAria]
  );

  const showPager = files.length > itemsPerPage;

  return (
    <div className={cx(wrapperVariants({ theme, density }), className)}>
      {/* Controles superiores */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          onClick={openPicker}
          variant={pickVariant}
          density={buttonDensity}
          disabled={disabled}
          {...(onlyIcon ? { size: "icon" } : {})}
        >
          <FontAwesomeIcon icon={faFolderOpen} />
          {!onlyIcon && <span>{i18n.pick}</span>}
        </Button>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          aria-label={i18n.pick}
        />

        <Button
          type="button"
          onClick={handleUpload}
          variant={uploadVariant}
          density={buttonDensity}
          disabled={!canUpload}
          {...(onlyIcon ? { size: "icon" } : {})}
        >
          <FontAwesomeIcon icon={faUpload} />
          {!onlyIcon && <span>{i18n.upload}</span>}
        </Button>

        {/* Limpar todos: vermelho, só ícone, ao lado do Upload */}
        <Button
          type="button"
          onClick={clearAll}
          variant="default-danger"                // ajuste para a variante vermelha do seu <Button/>, p.ex. "destructive"
          density={buttonDensity}
          size="icon"
          disabled={!hasFiles || disabled}
          aria-label={i18n.clearAllAria}
          title={i18n.clearAllAria}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>

        {/* Paginação (topo) quando houver muitos arquivos */}
        {showPager && (
          <div className="ml-auto flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              density={buttonDensity}
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label={i18n.prevPageAria}
              title={i18n.prevPageAria}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <span className="text-xs opacity-70 px-1 select-none">
              {i18n.pageXofY(page, totalPages)}
            </span>
            <Button
              size="icon"
              variant="ghost"
              density={buttonDensity}
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label={i18n.nextPageAria}
              title={i18n.nextPageAria}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        )}
      </div>

      {/* Área de itens */}
      {hasFiles && preview ? (
        <>
          <ul className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {pageFiles.map((f, i) => {
              const idx = start + i;
              const key = fileKey(f);
              const previewUrl = previews.get(key);
              const isImg = isImage(f);

              return (
                <li
                  key={`${key}-card`}
                  className={cx(
                    "flex items-center gap-3 rounded-lg border p-3",
                    theme === "dark"
                      ? "border-govbr-blue-warm-20/50 bg-govbr-blue-warm-10/30"
                      : "border-govbr-gray-20 bg-white"
                  )}
                >
                  {/* Preview ou Ícone */}
                  <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-govbr-gray-10 flex items-center justify-center">
                    {isImg && previewUrl ? (
                      <img
                        src={previewUrl}
                        alt={f.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <FontAwesomeIcon icon={isImg ? faImage : faFile} className="text-xl opacity-70" />
                    )}
                  </div>

                  {/* Infos */}
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{f.name}</div>
                    <div className="text-xs opacity-70">
                      {getExt(f.name).toUpperCase()} • {formatBytes(f.size)}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost-danger"
                      density={buttonDensity}
                      onClick={() => removeAt(idx)}
                      aria-label={`${i18n.removeAria} ${f.name}`}
                      title={i18n.removeAria}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Paginação (base) */}
          {showPager && (
            <div className="mt-3 flex items-center justify-end gap-1">
              <Button
                size="icon"
                variant="ghost"
                density={buttonDensity}
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label={i18n.prevPageAria}
                title={i18n.prevPageAria}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
              <span className="text-xs opacity-70 px-1 select-none">
                {i18n.pageXofY(page, totalPages)}
              </span>
              <Button
                size="icon"
                variant="ghost"
                density={buttonDensity}
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label={i18n.nextPageAria}
                title={i18n.nextPageAria}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </div>
          )}
        </>
      ) : hasFiles ? (
        <>
          <div className="mt-3 flex flex-col gap-2">{simpleList}</div>
          {showPager && (
            <div className="mt-3 flex items-center justify-end gap-1">
              <Button
                size="icon"
                variant="ghost"
                density={buttonDensity}
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label={i18n.prevPageAria}
                title={i18n.prevPageAria}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
              <span className="text-xs opacity-70 px-1 select-none">
                {i18n.pageXofY(page, totalPages)}
              </span>
              <Button
                size="icon"
                variant="ghost"
                density={buttonDensity}
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label={i18n.nextPageAria}
                title={i18n.nextPageAria}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </div>
          )}
        </>
      ) : null}

      {/* dica do accept */}
      {accept && (
        <p className="mt-2 text-xs opacity-70">
          {i18n.acceptedHint} <code className="font-mono">{accept}</code>
          {multiple ? " • múltiplos arquivos" : ""}
        </p>
      )}
    </div>
  );
}
