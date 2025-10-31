import {
  faChevronCircleDown,
  faChevronCircleRight,
  faFileLines,
  faFolder,
  faFolderOpen,
  faGear,
  faUser,
  faUserGroup,
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
    <Tree.Branch label="Documentos" defaultExpanded>
      <Tree.Leaf label="Apresentacao.pptx" icon={faFileLines} />
      <Tree.Leaf label="Relatorio.pdf" icon={faFileLines} />
      <Tree.Branch label="Projetos" defaultExpanded>
        <Tree.Leaf label="Proposta.docx" icon={faFileLines} />
        <Tree.Leaf label="Checklist.xlsx" icon={faFileLines} />
      </Tree.Branch>
    </Tree.Branch>
    <Tree.Branch label="Imagens">
      <Tree.Leaf label="Logotipo.png" icon={faFileLines} />
      <Tree.Leaf label="Wireframe.svg" icon={faFileLines} />
    </Tree.Branch>
  </Tree>
);

export const Basic = () => <DefaultTree />;

export const CustomIcons = () => (
  <Tree
    iconClassName="text-govbr-blue-warm-vivid-60"
    branchCollapsedIcon={(className) => (
      <FontAwesomeIcon icon={faFolder} className={cn(className, "text-lg")} />
    )}
    branchExpandedIcon={(className) => (
      <FontAwesomeIcon
        icon={faFolderOpen}
        className={cn(className, "text-lg")}
      />
    )}
    renderToggleIcon={({ expanded, iconClassName }) => (
      <FontAwesomeIcon
        icon={expanded ? faChevronCircleDown : faChevronCircleRight}
        className={cn(iconClassName, "text-lg")}
      />
    )}
  >
    <Tree.Branch
      label="Servicos"
      iconCollapsed={(className) => (
        <FontAwesomeIcon
          icon={faFolder}
          className={cn(className, "text-govbr-blue-warm-vivid-80")}
        />
      )}
      iconExpanded={(className) => (
        <FontAwesomeIcon
          icon={faFolderOpen}
          className={cn(className, "text-govbr-blue-warm-vivid-60")}
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
        iconCollapsed={faUser}
        iconExpanded={faUserGroup}
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

export const CustomRender = () => (
  <Tree
    renderItem={(item) => {
      if (item.type === "branch") {
        const { className, ...containerProps } = item.containerProps;
        return (
          <li
            {...containerProps}
            className={cn(className, "mb-1")}
          >
            <article className="rounded-lg border border-govbr-gray-10 bg-govbr-pure-0 shadow-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                onClick={(event) => item.toggle(event)}
                disabled={item.disabled}
              >
                <span className="flex items-center gap-3">
                  {item.iconNode ? (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-govbr-blue-warm-20 text-govbr-blue-warm-vivid-70">
                      {item.iconNode}
                    </span>
                  ) : null}
                  <span className="font-medium text-govbr-gray-90">
                    {item.label}
                  </span>
                </span>
                <span
                  className={cn(
                    "transition-transform text-govbr-blue-warm-vivid-70",
                    item.expanded ? "rotate-180" : ""
                  )}
                >
                  {item.toggleIconNode}
                </span>
              </button>
              {item.group ? (
                <div className="border-t border-govbr-gray-10 bg-govbr-gray-2/40 px-4 py-3">
                  {item.group}
                </div>
              ) : null}
            </article>
          </li>
        );
      }

      if (item.type === "leaf") {
        const { className, ...containerProps } = item.containerProps;
        return (
          <li
            {...containerProps}
            className={cn(className, "mb-1")}
          >
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              className="flex items-center justify-between rounded-md border border-transparent px-4 py-2 text-sm transition hover:border-govbr-blue-warm-vivid-60 hover:bg-govbr-blue-warm-10/40"
            >
              <span className="flex items-center gap-3">
                {item.iconNode ? (
                  <span className="text-govbr-blue-warm-vivid-70">
                    {item.iconNode}
                  </span>
                ) : null}
                <span>{item.label}</span>
              </span>
              <span className="text-xs uppercase text-govbr-blue-warm-vivid-70">
                Visualizar
              </span>
            </a>
          </li>
        );
      }

      return item.defaultNode;
    }}
  >
    <Tree.Branch label="Equipe" defaultExpanded>
      <Tree.Branch label="Design" defaultExpanded>
        <Tree.Leaf label="Ana Ribeiro" icon={faUser} />
        <Tree.Leaf label="Henrique Santos" icon={faUser} />
      </Tree.Branch>
      <Tree.Branch label="Desenvolvimento" defaultExpanded>
        <Tree.Leaf label="API - Lucas" icon={faUser} />
        <Tree.Leaf label="Frontend - Marina" icon={faUser} />
      </Tree.Branch>
    </Tree.Branch>
  </Tree>
);

export const ControlledBranch = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Tree>
      <Tree.Branch
        label="Relatorios Gerais"
        iconCollapsed={faFolder}
        iconExpanded={faFolderOpen}
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
    <Tree.Branch label="Backlog" defaultExpanded>
      <Tree.Branch label="Sprint 10" defaultExpanded>
        <Tree.Leaf label="Corrigir fluxo de login" icon={faFileLines} />
        <Tree.Leaf label="Revisar documentacao" icon={faFileLines} />
      </Tree.Branch>
      <Tree.Branch label="Sprint 11">
        <Tree.Leaf label="Integracao API" icon={faFileLines} />
        <Tree.Leaf label="Testes de regressao" icon={faFileLines} />
      </Tree.Branch>
    </Tree.Branch>
  </Tree>
);
