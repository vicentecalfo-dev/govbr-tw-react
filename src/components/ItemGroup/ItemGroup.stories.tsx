// ItemGroup.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ItemGroup from ".";
import Item from "../Item";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFileLines, faUser } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof ItemGroup> = {
  title: "ItemGroup",
  component: ItemGroup,
  args: {
    variant: "default",
    density: "comfortable",
    bordered: true,
    divided: true,
    propagateVariant: true,
    stripChildBorders: true,
  },
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof ItemGroup>;

const lorem =
  "Consulte os detalhes completos do processo antes de prosseguir com a aprovação.";

export const Default: Story = {
  render: (args) => (
    <div className="w-[720px] max-w-full p-6">
      <ItemGroup {...args}>
        <Item
          icon={<FontAwesomeIcon icon={faBell} />}
          meta="Atualizado há 2 horas • Responsável: João"
          actions={<Button size="auto" variant="ghost">Ver detalhes</Button>}
        >
          <h3 className="text-base font-semibold">Atualização importante</h3>
          <p className="text-sm opacity-80">{lorem}</p>
        </Item>

        <Item
          icon={<FontAwesomeIcon icon={faFileLines} />}
          meta="Documento nº 421/2025 • Alterado em 22/10/2025"
          actions={
            <div className="flex gap-2">
              <Button size="auto" variant="outline">Baixar</Button>
              <Button size="auto">Assinar</Button>
            </div>
          }
        >
          <h3 className="text-base font-semibold">Revisão de contrato</h3>
          <p className="text-sm opacity-80">
            Última versão revisada pelo jurídico. Assine para concluir o fluxo.
          </p>
        </Item>

        <Item
          icon={<FontAwesomeIcon icon={faUser} />}
          meta="Acesso concedido • Papel: Administrador"
          actions={<Button size="auto" variant="ghost-dark">Gerenciar</Button>}
        >
          <h3 className="text-base font-semibold">Novo colaborador</h3>
          <p className="text-sm opacity-80">
            Maria Silva foi adicionada ao projeto.
          </p>
        </Item>
      </ItemGroup>
    </div>
  ),
};

export const SubtleDivided: Story = {
  args: { variant: "subtle", divided: true },
  render: (args) => (
    <div className="w-[720px] max-w-full p-6">
      <ItemGroup {...args}>
        <Item
          meta="Processo nº 10223/2025"
          actions={<Button size="auto">Abrir</Button>}
        >
          <h3 className="text-base font-semibold">Homologar credenciamento</h3>
          <p className="text-sm opacity-80">
            Verifique os documentos anexados antes de homologar o fornecedor.
          </p>
        </Item>
        <Item actions={<Button size="auto" variant="ghost">Ignorar</Button>}>
          <h3 className="text-base font-semibold">Revisar checklist</h3>
          <p className="text-sm opacity-80">
            Conclua as etapas obrigatórias antes de liberar o conteúdo.
          </p>
        </Item>
      </ItemGroup>
    </div>
  ),
};

export const DarkNoDividers: Story = {
  args: { variant: "dark", divided: false },
  parameters: { backgrounds: { default: "dark" } },
  render: (args) => (
    <div className="w-[720px] max-w-full p-6">
      <ItemGroup {...args}>
        <Item
          meta="Permissões alteradas em 21/10/2025"
          actions={<Button size="auto" variant="ghost-dark">Gerenciar</Button>}
        >
          <h3 className="text-base font-semibold text-govbr-pure-0">
            Ajustes de acesso
          </h3>
          <p className="text-sm text-govbr-blue-warm-20/80">
            O grupo de administradores foi atualizado.
          </p>
        </Item>
        <Item
          meta="Acesso concedido • Papel: Administrador"
          actions={<Button size="auto" variant="ghost-dark">Abrir</Button>}
        >
          <h3 className="text-base font-semibold text-govbr-pure-0">
            Novo colaborador
          </h3>
          <p className="text-sm text-govbr-blue-warm-20/80">
            Maria Silva foi adicionada ao projeto.
          </p>
        </Item>
      </ItemGroup>
    </div>
  ),
};

export const CompactDensity: Story = {
  args: { density: "compact" },
  render: (args) => (
    <div className="w-[640px] max-w-full p-6">
      <ItemGroup {...args}>
        <Item meta="Item 1" actions={
         <Avatar title="André Eppinghaus" initialsSize={2} src="https://media.licdn.com/dms/image/v2/D4D03AQG-qVYCg_SOYw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1670503044683?e=2147483647&v=beta&t=ByDXalsPU6I6HRQ2pwnq_nTlTowenH2fQz-Lkkujeeo"/>
        }>Conteúdo do item 1</Item>
        <Item meta="Item 2">Conteúdo do item 2</Item>
        <Item meta="Item 3">Conteúdo do item 3</Item>
      </ItemGroup>
    </div>
  ),
};

export const WithoutBorders: Story = {
  args: { bordered: false, divided: true },
  render: (args) => (
    <div className="w-[640px] max-w-full p-6">
      <ItemGroup {...args}>
        <Item meta="Sem borda externa 1">Conteúdo do item 1</Item>
        <Item meta="Sem borda externa 2">Conteúdo do item 2</Item>
      </ItemGroup>
    </div>
  ),
};

export const MixedChildren: Story = {
  args: { variant: "default", divided: true },
  render: (args) => (
    <div className="w-[720px] max-w-full p-6">
      <ItemGroup {...args}>
        <Item meta="Item do tipo componente">Primeiro item (Item)</Item>
        {/* Também pode receber children que NÃO são <Item/> */}
        <div className="p-4">
          <h4 className="text-sm font-semibold">Child não-Item</h4>
          <p className="text-sm opacity-80">Este conteúdo foi renderizado como parte do grupo.</p>
        </div>
        <Item actions={<Button size="auto" variant="outline">Ação</Button>}>
          Último item do grupo
        </Item>
      </ItemGroup>
    </div>
  ),
};
