import {
  faChevronCircleDown,
  faChevronCircleRight,
  faFileLines,
  faFolder,
  faFolderOpen,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { Tree } from ".";
import { cn } from "../../libs/utils";

export default {
  component: Tree,
  title: "Tree",
};

const DefaultTree = () => (
  <Tree>
    <Tree.Branch label="Documentos" icon={faFolderOpen} defaultExpanded>
      <Tree.Leaf label="Apresentacao.pptx" icon={faFileLines} />
      <Tree.Leaf label="Relatorio.pdf" icon={faFileLines} />
      <Tree.Branch label="Projetos" icon={faFolder} defaultExpanded>
        <Tree.Leaf label="Proposta.docx" icon={faFileLines} />
        <Tree.Leaf label="Checklist.xlsx" icon={faFileLines} />
      </Tree.Branch>
    </Tree.Branch>
    <Tree.Branch label="Imagens" icon={faFolder}>
      <Tree.Leaf label="Logotipo.png" icon={faFileLines} />
      <Tree.Leaf label="Wireframe.svg" icon={faFileLines} />
    </Tree.Branch>
  </Tree>
);

export const Basic = () => <DefaultTree />;

export const CustomIcons = () => (
  <Tree
    iconClassName="text-govbr-blue-warm-vivid-60"
    renderToggleIcon={({ expanded, iconClassName }) => (
      <FontAwesomeIcon
        icon={expanded ? faChevronCircleDown : faChevronCircleRight}
        className={cn(iconClassName, "text-lg")}
      />
    )}
  >
    <Tree.Branch
      label="Servicos"
      icon={(className) => (
        <FontAwesomeIcon
          icon={faFolderOpen}
          className={cn(className, "text-govbr-blue-warm-vivid-70")}
        />
      )}
      defaultExpanded
      toggleIcon={({ expanded, iconClassName }) => (
        <FontAwesomeIcon
          icon={expanded ? faChevronCircleDown : faChevronCircleRight}
          className={cn(iconClassName, "text-xl")}
        />
      )}
    >
      <Tree.Branch
        label="Usuarios"
        icon={faUser}
        iconClassName="text-govbr-green-warm-vivid-60"
      >
        <Tree.Leaf
          label="Perfis"
          icon={faGear}
          iconClassName="text-govbr-green-warm-vivid-60"
        />
        <Tree.Leaf
          label="Permissoes"
          icon={faGear}
          iconClassName="text-govbr-green-warm-vivid-60"
        />
      </Tree.Branch>
      <Tree.Leaf
        label="Configuracoes gerais"
        icon={faGear}
        iconClassName="text-govbr-blue-warm-vivid-60"
      />
    </Tree.Branch>
  </Tree>
);

export const ControlledBranch = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Tree>
      <Tree.Branch
        label="Relatorios Gerais"
        icon={faFolder}
        expanded={expanded}
        onExpandedChange={setExpanded}
        onToggle={(next) => console.log("Toggled Relatorios Gerais:", next)}
        onSelect={() => alert("Selecionado Relatorios Gerais")}
      >
        <Tree.Leaf label="Indicadores mensais" icon={faFileLines} />
        <Tree.Leaf label="Series historicas" icon={faFileLines} />
      </Tree.Branch>
      <Tree.Leaf label="Planejamento 2025" icon={faFileLines} />
    </Tree>
  );
};

export const DenseTree = () => (
  <Tree density="high">
    <Tree.Branch label="Backlog" icon={faFolderOpen} defaultExpanded>
      <Tree.Branch label="Sprint 10" icon={faFolderOpen} defaultExpanded>
        <Tree.Leaf label="Corrigir fluxo de login" icon={faFileLines} />
        <Tree.Leaf label="Revisar documentacao" icon={faFileLines} />
      </Tree.Branch>
      <Tree.Branch label="Sprint 11" icon={faFolder}>
        <Tree.Leaf label="Integracao API" icon={faFileLines} />
        <Tree.Leaf label="Testes de regressao" icon={faFileLines} />
      </Tree.Branch>
    </Tree.Branch>
  </Tree>
);
