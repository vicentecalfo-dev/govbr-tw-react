import { Meta, StoryObj } from "@storybook/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFileSignature,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Step } from ".";
import { cn } from "../../libs/utils";

const meta: Meta<typeof Step> = {
  title: "Step",
  component: Step,
  parameters: {
    layout: "centered",
  },
  args: {
    orientation: "horizontal",
  },
};

export default meta;
type Story = StoryObj<typeof Step>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-[840px]">
      <Step {...args}>
        <Step.Item
          status="complete"
          label="Conta criada"
          description="Dados pessoais concluidos"
        />
        <Step.Item
          status="current"
          label="Documentos"
          description="Envie RG e comprovantes"
        />
        <Step.Item
          status="upcoming"
          label="Configuracoes"
          description="Preferencias e notificacoes"
        />
        <Step.Item
          status="upcoming"
          label="Confirmacao"
          description="Revise e finalize"
        />
      </Step>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="h-[840px]">
      <Step {...args}>
        <Step.Item
          status="complete"
          label="Envio"
          description="Arquivos recebidos"
        />
        <Step.Item
          status="current"
          label="Validacao"
          description="Equipe analisando seus dados"
        />
        <Step.Item
          status="upcoming"
          label="Aprovacao"
          description="Confirmacao do gestor responsavel"
        />
        <Step.Item
          status="upcoming"
          label="Concluido"
          description="Processo finalizado"
        />
      </Step>
    </div>
  ),
};

export const CustomContent: Story = {
  args: {
    orientation: "horizontal",
    variant: "success",
  },
  render: (args) => (
    <div className="w-[840px]">
      <Step {...args}>
        <Step.Item
          status="complete"
          icon={<FontAwesomeIcon icon={faCheck} />}
          label={
            <span className="flex flex-col">
              <span className="font-semibold text-govbr-green-cool-vivid-50">
                Cadastro
              </span>
              <span className="text-xs text-govbr-gray-60">
                Dados enviados
              </span>
            </span>
          }
        />
        <Step.Item
          status="current"
          icon={<FontAwesomeIcon icon={faUser} />}
          label={
            <span className="flex flex-col">
              <span className="font-semibold text-govbr-green-cool-vivid-50">
                Identidade
              </span>
              <span className="text-xs text-govbr-gray-60">
                Validacao em andamento
              </span>
            </span>
          }
        />
        <Step.Item
          status="upcoming"
          icon={<FontAwesomeIcon icon={faFileSignature} />}
          label={
            <span className="flex flex-col">
              <span className="font-semibold text-govbr-green-cool-vivid-50">
                Assinatura
              </span>
              <span className="text-xs text-govbr-gray-60">
                Aguardando aceite
              </span>
            </span>
          }
        />
        <Step.Item
          status="upcoming"
          icon={<FontAwesomeIcon icon={faGear} />}
          label={
            <span className="flex flex-col">
              <span className="font-semibold text-govbr-green-cool-vivid-50">
                Configuracao
              </span>
              <span className="text-xs text-govbr-gray-60">
                Defina preferencias finais
              </span>
            </span>
          }
        />
      </Step>
    </div>
  ),
};

const variantList = [
  "default",
  "success",
  "danger",
  "warning",
  "featured",
  "dark",
] as const;

export const VariantsShowcase: Story = {
  render: () => (
    <div className="flex w-[840px] flex-col gap-10">
      {variantList.map((variant) => (
        <div key={variant} className="space-y-4">
          <p className="text-sm font-semibold uppercase text-govbr-gray-70">
            {variant}
          </p>
          <div
            className={cn(
              "rounded-lg border border-govbr-gray-10 p-6",
              variant === "dark"
                ? "bg-govbr-blue-warm-vivid-90 text-govbr-pure-0"
                : "bg-govbr-gray-2/40",
            )}
          >
            <Step orientation="horizontal" variant={variant}>
              <Step.Item
                status="complete"
                label="Inicio"
                description="Preencha dados iniciais"
              />
              <Step.Item
                status="current"
                label="Detalhes"
                description="Informacoes complementares"
              />
              <Step.Item
                status="upcoming"
                label="Revisao"
                description="Confirme os dados"
              />
            </Step>
          </div>
        </div>
      ))}
    </div>
  ),
};
