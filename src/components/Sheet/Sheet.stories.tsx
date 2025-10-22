import React, { useRef } from "react";
import Sheet from ".";
import { Button } from "../Button";

export default {
  component: Sheet,
  title: "Overlay/Sheet",
};

const useSheetController = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    if (dialogRef.current.hasAttribute("open")) {
      dialogRef.current.close();
    } else {
      dialogRef.current.showModal();
    }
  };

  return { dialogRef, toggleDialog };
};

interface SheetContentProps {
  onCancel: () => void;
}

const SheetContent = ({ onCancel }: SheetContentProps) => (
  <>
    <Sheet.Header>
      <div>
        <h2 className="text-lg font-semibold">
          Configurações de acesso
        </h2>
        <p className="text-sm text-govbr-gray-60">
          Ajuste as permissões para sua aplicação.
        </p>
      </div>
    </Sheet.Header>
    <Sheet.Main className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold uppercase text-govbr-gray-60">
          Níveis de acesso
        </h3>
        <p className="text-sm leading-relaxed">
          Defina quem pode visualizar e editar os dados sensíveis da sua
          aplicação. Essas configurações entram em vigor imediatamente após
          salvar.
        </p>
      </div>
      <div className="rounded-md border border-dashed border-govbr-gray-20 p-4 text-sm text-govbr-gray-60">
        Selecione pelo menos dois administradores para garantir redundância e
        continuidade operacional.
      </div>
    </Sheet.Main>
    <Sheet.Footer>
      <Button variant="outline" onClick={onCancel}>Cancelar</Button>
      <Button>Salvar alterações</Button>
    </Sheet.Footer>
  </>
);

export const Default = () => {
  const { dialogRef, toggleDialog } = useSheetController();

  return (
    <>
      <Button onClick={toggleDialog}>Abrir sheet</Button>
      <Sheet ref={dialogRef} toggleDialog={toggleDialog}>
        <SheetContent onCancel={toggleDialog} />
      </Sheet>
    </>
  );
};

export const PrimaryOverlay = () => {
  const { dialogRef, toggleDialog } = useSheetController();

  return (
    <>
      <Button onClick={toggleDialog}>Abrir com overlay azul</Button>
      <Sheet
        ref={dialogRef}
        toggleDialog={toggleDialog}
        overlayClassName="backdrop:bg-govbr-blue-warm-vivid-70/70"
      >
        <SheetContent onCancel={toggleDialog} />
      </Sheet>
    </>
  );
};

export const RightSide = () => {
  const { dialogRef, toggleDialog } = useSheetController();

  return (
    <>
      <Button onClick={toggleDialog}>Abrir na direita</Button>
      <Sheet
        ref={dialogRef}
        toggleDialog={toggleDialog}
        side="right"
      >
        <SheetContent onCancel={toggleDialog} />
      </Sheet>
    </>
  );
};

export const TopSide = () => {
  const { dialogRef, toggleDialog } = useSheetController();

  return (
    <>
      <Button onClick={toggleDialog}>Abrir no topo</Button>
      <Sheet
        ref={dialogRef}
        toggleDialog={toggleDialog}
        side="top"
      >
        <SheetContent onCancel={toggleDialog} />
      </Sheet>
    </>
  );
};

export const BottomSide = () => {
  const { dialogRef, toggleDialog } = useSheetController();

  return (
    <>
      <Button onClick={toggleDialog}>Abrir na base</Button>
      <Sheet
        ref={dialogRef}
        toggleDialog={toggleDialog}
        side="bottom"
      >
        <SheetContent onCancel={toggleDialog} />
      </Sheet>
    </>
  );
};

export const ScrollableContent = () => {
  const { dialogRef, toggleDialog } = useSheetController();

  const sections = Array.from({ length: 24 }, (_, index) => (
    <p
      key={index}
      className="text-sm leading-relaxed text-govbr-gray-70"
    >
      {`Secao ${index + 1}: Este e um bloco de texto ficticio usado para demonstrar um painel com muito conteudo. Cada paragrafo reforca que apenas o corpo do sheet deve rolar enquanto o conteiner permanece fixo.`}
    </p>
  ));

  return (
    <>
      <Button onClick={toggleDialog}>Abrir com muito conteudo</Button>
      <Sheet ref={dialogRef} toggleDialog={toggleDialog}>
        <Sheet.Main className="space-y-4">
          <h2 className="text-base font-semibold text-govbr-gray-90">
            Conteudo extenso apenas no corpo
          </h2>
          <div className="space-y-3">{sections}</div>
        </Sheet.Main>
      </Sheet>
    </>
  );
};

export const LowDensity = () => {
  const { dialogRef, toggleDialog } = useSheetController();

  return (
    <>
      <Button onClick={toggleDialog}>Abrir baixa densidade</Button>
      <Sheet ref={dialogRef} toggleDialog={toggleDialog} density="relaxed">
        <SheetContent onCancel={toggleDialog} />
      </Sheet>
    </>
  );
};

export const HighDensity = () => {
  const { dialogRef, toggleDialog } = useSheetController();

  return (
    <>
      <Button onClick={toggleDialog}>Abrir alta densidade</Button>
      <Sheet ref={dialogRef} toggleDialog={toggleDialog} density="compact">
        <SheetContent onCancel={toggleDialog} />
      </Sheet>
    </>
  );
};

export const NoPadding = () => {
  const { dialogRef, toggleDialog } = useSheetController();

  return (
    <>
      <Button onClick={toggleDialog}>Abrir sem padding</Button>
      <Sheet ref={dialogRef} toggleDialog={toggleDialog} density="none">
        <Sheet.Main>
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-govbr-gray-90">
              Layout sem margens internas
            </h2>
            <p className="text-sm text-govbr-gray-70">
              Use a variante de densidade para remover todo o espacamento interno do painel e ter um layout realmente encostado nas bordas.
            </p>
            <div className="rounded border border-dashed border-govbr-gray-30 p-4 text-sm text-govbr-gray-80">
              Aqui o conteudo e renderizado sem nenhum padding promovido pelo componente. Esse comportamento e util para incorporar elementos que ja controlam o proprio espacamento, como tabelas ou grids customizados.
            </div>
          </div>
        </Sheet.Main>
      </Sheet>
    </>
  );
};

export const DarkTheme = () => {
  const { dialogRef, toggleDialog } = useSheetController();

  return (
    <>
      <Button onClick={toggleDialog}>Abrir tema escuro</Button>
      <Sheet
        ref={dialogRef}
        toggleDialog={toggleDialog}
        variant="dark"
        overlayClassName="backdrop:bg-black/80"
        closeButtonProps={{ variant: "ghost-dark" }}
      >
        <Sheet.Header className="border-govbr-blue-warm-20 text-govbr-blue-warm-20">
          <div>
            <h2 className="text-lg font-semibold text-govbr-pure-0">
              Atalhos do painel
            </h2>
            <p className="text-sm text-govbr-blue-warm-20/80">
              Acesse rapidamente os recursos essenciais da plataforma.
            </p>
          </div>
        </Sheet.Header>
        <Sheet.Main className="space-y-4 text-govbr-pure-0">
          <div className="grid gap-3">
            <Button variant="outline-dark">Relatórios</Button>
            <Button variant="outline-dark">Gerenciar usuários</Button>
            <Button variant="outline-dark">Logs de auditoria</Button>
          </div>
        </Sheet.Main>
        <Sheet.Footer className="border-govbr-blue-warm-20 text-govbr-blue-warm-20">
          <Button variant="ghost-dark" onClick={toggleDialog}>
            Fechar
          </Button>
        </Sheet.Footer>
      </Sheet>
    </>
  );
};
