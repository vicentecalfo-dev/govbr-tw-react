import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCheck,
  faClone,
  faEnvelope,
  faFilePdf,
  faFolder,
  faLink,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from ".";

type DropdownStoryProps = {
  contentSide: "top" | "right" | "bottom" | "left";
  subPlacement: "top" | "right" | "bottom" | "left";
  insetItems: boolean;
  showSelection?: boolean;
  withIcons?: boolean;
};

const MenuExample = ({
  contentSide,
  subPlacement,
  insetItems,
  showSelection,
  withIcons = false,
}: DropdownStoryProps) => {
  const [statusBar, setStatusBar] = React.useState(true);
  const [notifications, setNotifications] = React.useState<"push" | "email" | "none">("push");
  const resolvedInset = insetItems || withIcons;

  const menu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Abrir menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={contentSide} className="w-56">
        <DropdownMenuLabel inset={resolvedInset}>Conta</DropdownMenuLabel>
        <DropdownMenuItem inset={resolvedInset}>
          {withIcons && (
            <FontAwesomeIcon
              icon={faPen}
              className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
            />
          )}
          Perfil
          <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem inset={resolvedInset}>
          {withIcons && (
            <FontAwesomeIcon
              icon={faFolder}
              className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
            />
          )}
          Projetos
          <DropdownMenuShortcut>Ctrl+Shift+P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger inset={resolvedInset}>Notificacoes</DropdownMenuSubTrigger>
          <DropdownMenuSubContent placement={subPlacement}>
            <DropdownMenuRadioGroup value={notifications} onValueChange={setNotifications}>
              <DropdownMenuRadioItem inset={resolvedInset} value="push">
                {withIcons && (
                  <FontAwesomeIcon
                    icon={faBell}
                    className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
                  />
                )}
                Push
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem inset={resolvedInset} value="email">
                {withIcons && (
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
                  />
                )}
                Email
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem inset={resolvedInset} value="none">
                Desativadas
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuCheckboxItem
          inset={resolvedInset}
          checked={statusBar}
          onCheckedChange={(value) => setStatusBar(Boolean(value))}
        >
          {withIcons && (
            <FontAwesomeIcon
              icon={faCheck}
              className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
            />
          )}
          Mostrar barra de status
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem inset={resolvedInset} className="text-govbr-red-vivid-50">
          {withIcons && (
            <FontAwesomeIcon
              icon={faTrash}
              className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
            />
          )}
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (!showSelection) {
    return menu;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {menu}
      <span className="text-sm text-govbr-gray-60">
        Notificacoes: <span className="font-semibold">{notifications}</span>
      </span>
      <span className="text-sm text-govbr-gray-60">
        Barra de status:{" "}
        <span className="font-semibold">{statusBar ? "Ativa" : "Desativada"}</span>
      </span>
    </div>
  );
};

const meta: Meta<typeof MenuExample> = {
  title: "DropdownMenu",
  component: MenuExample,
  argTypes: {
    contentSide: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Lado onde o menu principal aparece",
      defaultValue: "bottom",
    },
    subPlacement: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Lado onde o submenu aparece em relação ao item pai",
      defaultValue: "right",
    },
    insetItems: {
      control: "boolean",
      description: "Ativa padding adicional para alinhar indicadores de seleção",
      defaultValue: false,
    },
    showSelection: {
      control: "boolean",
      description: "Mostra o estado atual das seleções para facilitar testes",
      defaultValue: false,
    },
    withIcons: {
      control: "boolean",
      description: "Adiciona ícones aos itens do menu",
      defaultValue: false,
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof MenuExample>;

export const Playground: Story = {
  args: {
    contentSide: "bottom",
    subPlacement: "right",
    insetItems: false,
    showSelection: true,
    withIcons: false,
  },
  render: (args) => (
    <div className="flex h-80 items-center justify-center bg-govbr-gray-2 p-6">
      <MenuExample {...args} />
    </div>
  ),
};

export const Sides: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-start justify-center gap-6 bg-govbr-gray-2 p-6">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <div key={side} className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold uppercase">{side}</span>
          <MenuExample {...args} contentSide={side} />
        </div>
      ))}
    </div>
  ),
  args: {
    contentSide: "bottom",
    subPlacement: "right",
    insetItems: false,
    showSelection: false,
    withIcons: false,
  },
};

export const SubmenuPlacements: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-start justify-center gap-6 bg-govbr-gray-2 p-6">
      {(["top", "right", "bottom", "left"] as const).map((placement) => (
        <div key={placement} className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold uppercase">{placement}</span>
          <MenuExample {...args} subPlacement={placement} />
        </div>
      ))}
    </div>
  ),
  args: {
    contentSide: "bottom",
    subPlacement: "right",
    insetItems: false,
    showSelection: false,
    withIcons: false,
  },
};

export const WithInsetItems: Story = {
  args: {
    contentSide: "bottom",
    subPlacement: "right",
    insetItems: true,
    showSelection: false,
    withIcons: false,
  },
  render: (args) => (
    <div className="flex h-64 items-center justify-center bg-govbr-gray-2 p-6">
      <MenuExample {...args} />
    </div>
  ),
};

export const SubmenuWithItems: Story = {
  render: () => (
    <div className="flex h-64 items-center justify-center bg-govbr-gray-2 p-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Acoes</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-52">
          <DropdownMenuItem>
            <FontAwesomeIcon
              icon={faPen}
              className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
            />
            Renomear
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FontAwesomeIcon
              icon={faClone}
              className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
            />
            Duplicar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Compartilhar</DropdownMenuSubTrigger>
            <DropdownMenuSubContent placement="right">
              <DropdownMenuItem>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
                />
                Por e-mail
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FontAwesomeIcon
                  icon={faLink}
                  className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
                />
                Gerar link público
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FontAwesomeIcon
                  icon={faFilePdf}
                  className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
                />
                Exportar PDF
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-govbr-red-vivid-50">
            <FontAwesomeIcon
              icon={faTrash}
              className="mr-2 h-4 w-4 text-govbr-blue-warm-vivid-70"
            />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};
