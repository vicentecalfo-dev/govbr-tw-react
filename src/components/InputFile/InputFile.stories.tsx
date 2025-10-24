// InputFile.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React, { useCallback, useState } from "react";
import InputFile, { type InputFileProps, type InputFileLabels } from ".";

const meta: Meta<InputFileProps> = {
  title: "InputFile",
  component: InputFile,
  args: {
    preview: true,
    multiple: false,
    accept: undefined,
    theme: "light",
    density: "comfy",
    disabled: false,
    itemsPerPage: 8,
    labels: {
      pick: "Selecionar arquivo",
      upload: "Upload",
      acceptedHint: "Aceita:",
      removeAria: "Remover",
      prevPageAria: "Página anterior",
      nextPageAria: "Próxima página",
      pageXofY: (x, y) => `Página ${x} de ${y}`,
    },
  },
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<InputFileProps>;

const fakeUpload = async (files: File[]) => {
  // eslint-disable-next-line no-console
  console.log("Uploading...", files);
  await new Promise((r) => setTimeout(r, 800));
  // eslint-disable-next-line no-console
  console.log("Upload done!");
};

/** Wrapper controlado genérico (sem pré-carregar itens) */
function ControlledWrapper(props: Omit<InputFileProps, "value" | "setValue">) {
  const [files, setFiles] = useState<File[]>([]);
  const onUpload = useCallback(async () => {
    await fakeUpload(files);
    // exemplo: limpar após upload
    // setFiles([]);
  }, [files]);

  return (
    <div className="max-w-[900px]">
      <InputFile
        {...props}
        value={files}
        setValue={setFiles}
        onUpload={onUpload}
      />
      <p className="mt-2 text-xs opacity-70">
        <strong>Arquivos no estado:</strong> {files.length}
      </p>
    </div>
  );
}

/** 1) Story básico: sem restrições, preview ativo */
export const Default: Story = {
  args: { onUpload: fakeUpload },
};

/** 2) Imagem única com preview (miniatura) */
export const SingleImagePreview: Story = {
  args: {
    accept: "image/*",
    onUpload: fakeUpload,
  },
};

/** 3) Múltiplas imagens com preview */
export const MultipleImagesPreview: Story = {
  args: {
    accept: "image/*",
    multiple: true,
    onUpload: fakeUpload,
  },
};

/** 4) Múltiplos CSV/TSV sem preview (lista simples) */
export const MultipleCSVsNoPreview: Story = {
  args: {
    accept: ".csv,.tsv",
    multiple: true,
    preview: false,
    onUpload: fakeUpload,
  },
};

/** 5) PDF ou Imagem (ambos), múltiplos */
export const PdfOrImage: Story = {
  args: {
    accept: "application/pdf,image/*",
    multiple: true,
    onUpload: fakeUpload,
  },
};

/** 6) Dark Theme + densidade compacta */
export const DarkCompact: Story = {
  args: {
    accept: ".pdf,.png,.jpg,.jpeg",
    multiple: true,
    theme: "dark",
    density: "compact",
    onUpload: fakeUpload,
  },
  parameters: { backgrounds: { default: "dark" } },
};

/** 7) Desabilitado (para ver estados visuais) */
export const Disabled: Story = {
  args: {
    accept: ".txt",
    multiple: true,
    disabled: true,
    onUpload: fakeUpload,
  },
};

/** 8) Controlado externamente (value/setValue) */
export const Controlled: Story = {
  render: (args) => (
    <ControlledWrapper
      {...args}
      accept=".pdf,.docx,image/*"
      multiple
    />
  ),
};

/** 9) Aceita apenas DOCX/CSV e sem preview */
export const DocxAndCsvNoPreview: Story = {
  args: {
    accept: ".docx,.csv",
    preview: false,
    multiple: true,
    onUpload: fakeUpload,
  },
};

/** 10) Exemplo com callbacks de mudança */
export const WithOnChange: Story = {
  args: {
    accept: ".json,.yaml,.yml",
    multiple: true,
    preview: true,
    onChange: (files: any) => {
      // eslint-disable-next-line no-console
      console.log("onChange files:", files);
    },
    onUpload: fakeUpload,
  },
};

/** 11) i18n: labels em EN (inclui "Page X of Y") */
export const WithLabelsEN: Story = {
  args: {
    labels: {
      pick: "Choose file",
      upload: "Upload",
      acceptedHint: "Accepted:",
      removeAria: "Remove",
      prevPageAria: "Previous page",
      nextPageAria: "Next page",
      pageXofY: (x, y) => `Page ${x} of ${y}`,
    } as InputFileLabels,
    multiple: true,
    accept: "image/*,application/pdf",
    onUpload: fakeUpload,
  },
};

/** 12) onlyIcon = true (botões principais só com ícone) */
export const OnlyIconsButtons: Story = {
  args: {
    onlyIcon: true,
    multiple: true,
    accept: "image/*,.csv,.pdf",
    onUpload: fakeUpload,
     pickVariant: "default",
  uploadVariant: "outline"
  },
};

/** 13) Paginação (preview) — sem itens por padrão (vazio) */
export const PaginationPreviewEmpty: Story = {
  render: (args) => (
    <ControlledWrapper
      {...args}
      preview
      multiple
      itemsPerPage={6}
      accept="image/*,application/pdf,.csv"
    />
  ),
  parameters: { docs: { description: { story: "Paginação com preview; inicia vazio (sem arquivos pré-carregados)." } } },
};

/** 14) Paginação + lista simples (preview=false) — vazio por padrão */
export const PaginationListSimpleEmpty: Story = {
  render: (args) => (
    <ControlledWrapper
      {...args}
      preview={false}
      multiple
      itemsPerPage={5}
      accept=".csv,.yml,.yaml,application/pdf"
    />
  ),
  parameters: { docs: { description: { story: "Paginação em lista simples; inicia vazio (sem arquivos pré-carregados)." } } },
};

/** 15) Dark + onlyIcon + EN + compact — vazio por padrão */
export const DarkOnlyIconsENCompact: Story = {
  render: (args) => (
    <ControlledWrapper
      {...args}
      onlyIcon
      theme="dark"
      density="compact"
      itemsPerPage={8}
      labels={{
        pick: "Choose",
        upload: "Send",
        acceptedHint: "Accepted:",
        removeAria: "Remove",
        prevPageAria: "Previous",
        nextPageAria: "Next",
        pageXofY: (x, y) => `${x}/${y}`,
      }}
      accept="image/*,application/pdf"
    />
  ),
  parameters: { backgrounds: { default: "dark" } },
};

/** 16) Demonstração de variantes/densidade do seu <Button/> — vazio por padrão */
export const ButtonVariantsDemo: Story = {
  render: (args) => (
    <ControlledWrapper
      {...args}
      multiple
      itemsPerPage={4}
      // Ex.: se seu Button aceitar essas props, descomente e teste:
      // pickVariant="outline"
      // uploadVariant="default"
      // buttonDensity="high"
    />
  ),
};
