import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import { Button } from "../Button";
import { CopyAction } from ".";

export default {
  component: CopyAction,
  title: "CopyAction",
};

export const Basic = () => {
  const paragraphRef = React.useRef<HTMLParagraphElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 rounded-lg border border-govbr-gray-20 bg-white p-4 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-80">
            Texto para copiar
          </p>
          <p ref={paragraphRef} className="font-mono text-sm text-govbr-gray-90">
            Texto padrão para copiar
          </p>
        </div>
        <CopyAction targetRef={paragraphRef}>
          <Button variant="outline" className="w-40 justify-center">
            Copiar texto
          </Button>
        </CopyAction>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-lg border border-govbr-gray-20 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="copy-action-url"
            className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-80"
          >
            URL Pública
          </label>
          <input
            id="copy-action-url"
            ref={inputRef}
            defaultValue="https://www.gov.br"
            className="w-80 rounded-md border border-govbr-gray-20 px-3 py-2 text-sm text-govbr-gray-90 focus:border-govbr-blue-warm-vivid-70 focus:outline-none focus:ring-2 focus:ring-govbr-blue-warm-vivid-50"
            readOnly
          />
        </div>
        <CopyAction targetRef={inputRef}>
          <button className="w-40 rounded-md border border-govbr-gray-20 px-4 py-2 text-sm font-semibold text-govbr-blue-warm-vivid-70 transition hover:border-govbr-blue-warm-vivid-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-govbr-blue-warm-vivid-70">
            Copiar URL
          </button>
        </CopyAction>
      </div>
    </div>
  );
};

export const WithFeedback = () => {
  const codeRef = React.useRef<HTMLSpanElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-80">
        Código de Atendimento
      </span>
      <span
        ref={codeRef}
        className="w-fit rounded bg-govbr-gray-10 px-3 py-1 font-mono text-sm text-govbr-gray-90"
      >
        AG-541-2024
      </span>
      <CopyAction targetRef={codeRef}>
        {({ copy, copied }) => (
          <Button
            onClick={() => {
              copy().catch(() => undefined);
            }}
            variant={copied ? "default-success" : "default"}
            className="flex w-56 items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
            {copied ? "Código copiado!" : "Copiar código"}
          </Button>
        )}
      </CopyAction>
    </div>
  );
};

type CopyableListItemProps = {
  label: string;
  value: string;
};

const CopyableListItem = ({ label, value }: CopyableListItemProps) => {
  const valueRef = React.useRef<HTMLSpanElement>(null);

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-govbr-gray-20 bg-white px-4 py-3 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-80">
          {label}
        </p>
        <span ref={valueRef} className="font-mono text-sm text-govbr-gray-90">
          {value}
        </span>
      </div>
      <CopyAction targetRef={valueRef}>
        {({ copy, copied }) => (
          <Button
            size="icon"
            variant="ghost"
            aria-label={`Copiar ${label}`}
            onClick={() => {
              copy().catch(() => undefined);
            }}
            className={copied ? "text-govbr-green-warm-vivid-60" : undefined}
          >
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          </Button>
        )}
      </CopyAction>
    </div>
  );
};

export const ListUsage = () => {
  const items = [
    { id: 1, label: "Número do Protocolo", value: "PROTO-99213-AB" },
    { id: 2, label: "CPF", value: "123.456.789-00" },
    { id: 3, label: "Link público", value: "https://gov.br/meus-servicos" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <CopyableListItem key={item.id} label={item.label} value={item.value} />
      ))}
    </div>
  );
};
