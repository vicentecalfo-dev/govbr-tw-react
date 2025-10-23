import React, { useState } from "react";
import TextEditor from "."; // ajuste o caminho se o TextEditor estiver em outro diretório
import { Button } from "../Button";

export default {
  component: TextEditor,
  title: "Form/TextEditor",
};

export const Default = () => {
  const [value, setValue] = useState<string>("");
  return (
    <div className="flex flex-col gap-6 w-[720px]">
      <TextEditor
        label="Descrição"
        placeholder="Escreva em **Markdown**…"
        value={value}
        onChange={setValue}
        hint="Suporta Markdown básico (GFM)."
      />
      <div className="flex items-center gap-2 text-sm">
        <span className="opacity-70">Valor atual (markdown):</span>
        <code className="px-2 py-1 rounded bg-govbr-gray-10">{value.length} caractere(s)</code>
        <Button onClick={() => setValue("")}>Limpar</Button>
      </div>
    </div>
  );
};

export const Variants = () => {
  const [a, setA] = useState("**Negrito** e *itálico*\n\n- item 1\n- item 2");
  const [b, setB] = useState(a);
  const [c, setC] = useState(a);
  const [d, setD] = useState(a);
  const [e, setE] = useState(a);

  return (
    <div className="flex flex-col gap-10">
      <div className="w-[720px]">
        <TextEditor label="Default" value={a} onChange={setA} />
      </div>
      <div className="w-[720px]">
        <TextEditor label="Danger" variant="danger" hint="Estado de erro." value={b} onChange={setB} />
      </div>
      <div className="w-[720px]">
        <TextEditor label="Success" variant="success" hint="Tudo certo!" value={c} onChange={setC} />
      </div>
      <div className="w-[720px]">
        <TextEditor label="Warning" variant="warning" hint="Atenção necessária." value={d} onChange={setD} />
      </div>
      <div className="w-[720px] bg-govbr-blue-warm-vivid-90 p-5 rounded">
        <TextEditor label="Dark" variant="dark" value={e} onChange={setE} />
      </div>
    </div>
  );
};

export const Density = () => {
  const sample = "# Título\n\nParágrafo com **negrito** e *itálico*.\n\n- item A\n- item B";
  const [low, setLow] = useState(sample);
  const [def, setDef] = useState(sample);
  const [high, setHigh] = useState(sample);
  const [lowest, setLowest] = useState(sample);

  return (
    <div className="flex flex-col gap-8 w-[720px]">
      <TextEditor label="Lowest" density="lowest" value={lowest} onChange={setLowest} />
      <TextEditor label="Low" density="low" value={low} onChange={setLow} />
      <TextEditor label="Default" value={def} onChange={setDef} />
      <TextEditor label="High" density="high" value={high} onChange={setHigh} />
    </div>
  );
};

export const WithInitialPreview = () => {
  const [value, setValue] = useState<string>(
    `# Exemplo\n\nEste editor aceita **Markdown** com suporte a GFM.\n\n- [x] Checklists\n- Tabelas\n\n> Citações também!\n\n\`Inline code\` e trechos de código.`
  );
  return (
    <div className="flex flex-col gap-6 w-[720px]">
      <TextEditor
        label="Com pré-visualização inicial"
        value={value}
        onChange={setValue}
        previewInitially
        hint="Clique em Visualizar/Editar para alternar."
      />
    </div>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState<string>("Campo DESABILITADO");
  return (
    <div className="flex flex-col gap-6 w-[720px]">
      <TextEditor label="Disabled" value={value} onChange={setValue} disabled />
      <TextEditor label="Disabled (danger)" value={value} onChange={setValue} disabled variant="danger" />
    </div>
  );
};

export const Readonly = () => {
  const [value] = useState<string>("Campo READ ONLY\n\n- Sem edição\n- Apenas leitura");
  return (
    <div className="flex flex-col gap-6 w-[720px]">
      <TextEditor label="Read Only" value={value} onChange={() => {}} readOnly />
      <TextEditor label="Read Only (featured)" value={value} onChange={() => {}} readOnly variant="featured" />
    </div>
  );
};
