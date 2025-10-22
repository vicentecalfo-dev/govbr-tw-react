import React from "react";
import { faBell, faFileLines, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Item from ".";
import { Button } from "../Button";

export default {
  component: Item,
  title: "Layout/Item",
};

const content = {
  title: "Atualização importante",
  description:
    "Consulte os detalhes completos do processo antes de prosseguir com a aprovação.",
  meta: "Atualizado há 2 horas • Responsável: João Martins",
};

export const Default = () => (
  <div className="max-w-3xl space-y-4 p-6">
    <Item
      icon={<FontAwesomeIcon icon={faBell} />}
      meta={content.meta}
      actions={
        <Button size="auto" variant="ghost">
          Ver detalhes
        </Button>
      }
    >
      <h3 className="text-base font-semibold">{content.title}</h3>
      <p className="text-sm opacity-80">{content.description}</p>
    </Item>

    <Item
      variant="subtle"
      icon={<FontAwesomeIcon icon={faFileLines} />}
      meta="Documento nº 421/2024 • Alterado em 08/10/2024"
      actions={
        <div className="flex gap-2">
          <Button size="auto" variant="outline">
            Baixar
          </Button>
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
      variant="dark"
      density="compact"
      icon={<FontAwesomeIcon icon={faUser} />}
      meta="Acesso concedido • Papel: Administrador"
      actions={<Button size="auto" variant="ghost-dark">Gerenciar</Button>}
    >
      <h3 className="text-base font-semibold text-govbr-pure-0">
        Novo colaborador
      </h3>
      <p className="text-sm text-govbr-blue-warm-20/80">
        Maria Silva foi adicionada ao projeto GovBR Design System.
      </p>
    </Item>
  </div>
);

export const WithoutIcon = () => (
  <div className="max-w-3xl space-y-3 p-6">
    <Item
      meta="Processo nº 10223/2024"
      actions={<Button size="auto">Abrir</Button>}
    >
      <h3 className="text-base font-semibold">Homologar credenciamento</h3>
      <p className="text-sm opacity-80">
        Verifique os documentos anexados antes de homologar o fornecedor.
      </p>
    </Item>

    <Item
      variant="subtle"
      density="compact"
      actions={
        <div className="flex gap-2">
          <Button size="auto" variant="ghost">
            Ignorar
          </Button>
          <Button size="auto">Ver agora</Button>
        </div>
      }
    >
      <h3 className="text-base font-semibold">Revisar checklist de lançamento</h3>
      <p className="text-sm opacity-80">
        Conclua a verificação das etapas obrigatórias antes de liberar o conteúdo.
      </p>
    </Item>
  </div>
);
