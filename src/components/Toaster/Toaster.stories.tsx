import React, { useCallback, useRef, useState } from "react";
import Toaster, { ToastItem, ToastPosition } from ".";
import { Button } from "../Button";

export default {
  component: Toaster,
  title: "Toaster",
};

const toastVariants: NonNullable<ToastItem["variant"]>[] = [
  "info",
  "success",
  "warning",
  "danger",
];

export const Default = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const makeId = useCallback(() => {
    counterRef.current += 1;
    return `toast-default-${counterRef.current}`;
  }, []);

  const addToast = useCallback(
    (variant: ToastItem["variant"]) => {
      const id = makeId();
      setToasts((prev) => [
        {
          id,
          variant,
          content: (
            <span>
              <strong>Notificacao {variant}</strong> - Esta mensagem demonstra o
              empilhamento deste canto.
            </span>
          ),
        },
        ...prev,
      ]);
    },
    [makeId]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p>
        Clique em um dos botoes para criar mensagens. As notificacoes mais novas
        aparecem acima e empurram as anteriores para baixo.
      </p>
      <div className="flex flex-wrap gap-2">
        {toastVariants.map((variant) => (
          <Button key={variant} onClick={() => addToast(variant)}>
            Nova {variant}
          </Button>
        ))}
        <Button
          variant="ghost"
          onClick={() => setToasts([])}
          className="ml-auto"
        >
          Limpar
        </Button>
      </div>
      <Toaster toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export const AutoDismiss = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const makeId = useCallback(() => {
    counterRef.current += 1;
    return `toast-auto-${counterRef.current}`;
  }, []);

  const addToast = useCallback(() => {
    const id = makeId();
    const variant =
      toastVariants[Math.floor(Math.random() * toastVariants.length)];
    setToasts((prev) => [
      {
        id,
        variant,
        autoDismiss: true,
        content: (
          <span>
            <strong>Auto dismiss</strong> - Esta mensagem desaparece apos tres
            segundos.
          </span>
        ),
      },
      ...prev,
    ]);
  }, [makeId]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p>
        As notificacoes utilizam a animacao de saida antes de desaparecerem
        automaticamente em tres segundos.
      </p>
      <div className="flex gap-2">
        <Button onClick={addToast}>Adicionar notificacao</Button>
        <Button variant="ghost" onClick={() => setToasts([])}>
          Limpar
        </Button>
      </div>
      <Toaster
        toasts={toasts}
        onRemove={removeToast}
        autoDismiss
        autoDismissDelay={3000}
      />
    </div>
  );
};

export const WithTimerBar = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const makeId = useCallback(() => {
    counterRef.current += 1;
    return `toast-timer-${counterRef.current}`;
  }, []);

  const addToast = useCallback(() => {
    const id = makeId();
    setToasts((prev) => [
      {
        id,
        variant: "warning",
        closable: "both",
        timer: 5,
        content: (
          <span>
            <strong>Timer de 5 segundos</strong> - A barra indica o tempo
            restante. Voce tambem pode fechar manualmente.
          </span>
        ),
      },
      ...prev,
    ]);
  }, [makeId]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p>
        Demonstracao do uso do temporizador nativo do componente Message. As
        notificacoes tambem podem ser fechadas pelo botao.
      </p>
      <div className="flex gap-2">
        <Button onClick={addToast}>Adicionar notificacao com timer</Button>
        <Button variant="ghost" onClick={() => setToasts([])}>
          Limpar
        </Button>
      </div>
      <Toaster toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export const PositionsShowcase = () => {
  const counterRef = useRef(0);
  const makeId = useCallback((prefix: string) => {
    counterRef.current += 1;
    return `${prefix}-${counterRef.current}`;
  }, []);
  const createInitialToasts = useCallback((): Record<
    ToastPosition,
    ToastItem[]
  > => ({
    "top-left": [
      {
        id: makeId("pos-top-left"),
        variant: "info",
        closable: "timer",
        timer: 6,
        content: (
          <span>
            <strong>Topo esquerdo</strong> - Some em seis segundos.
          </span>
        ),
      },
    ],
    "top-right": [
      {
        id: makeId("pos-top-right"),
        variant: "success",
        closable: "timer",
        timer: 6,
        content: (
          <span>
            <strong>Topo direito</strong> - Some em seis segundos.
          </span>
        ),
      },
    ],
    "bottom-left": [
      {
        id: makeId("pos-bottom-left"),
        variant: "warning",
        closable: "timer",
        timer: 6,
        content: (
          <span>
            <strong>Base esquerda</strong> - Some em seis segundos.
          </span>
        ),
      },
    ],
    "bottom-right": [
      {
        id: makeId("pos-bottom-right"),
        variant: "danger",
        closable: "timer",
        timer: 6,
        content: (
          <span>
            <strong>Base direita</strong> - Some em seis segundos.
          </span>
        ),
      },
    ],
  }), [makeId]);

  const [toastsByPosition, setToastsByPosition] = useState<
    Record<ToastPosition, ToastItem[]>
  >(() => createInitialToasts());

  const resetToasts = useCallback(() => {
    setToastsByPosition(createInitialToasts());
  }, [createInitialToasts]);

  const handleRemove = useCallback(
    (position: ToastPosition) => (id: string) => {
      setToastsByPosition((prev) => ({
        ...prev,
        [position]: prev[position].filter((toast) => toast.id !== id),
      }));
    },
    []
  );

  const positions: ToastPosition[] = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ];

  return (
    <div className="min-h-[50vh] flex flex-col gap-4">
      <p>
        Os exemplos abaixo exibem o temporizador do componente Message e se
        escondem automaticamente em seis segundos.
      </p>
      <div className="flex gap-2">
        <Button onClick={resetToasts}>Mostrar novamente</Button>
      </div>
      {positions.map((position) => (
        <Toaster
          key={position}
          toasts={toastsByPosition[position]}
          position={position}
          onRemove={handleRemove(position)}
        />
      ))}
    </div>
  );
};
