import React, {
  ComponentProps,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { VariantProps } from "class-variance-authority";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button, type ButtonProps } from "../Button";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import {
  sheetViewportVariants,
  sheetContentVariants,
  sheetHeaderVariants,
  sheetBodyVariants,
  sheetFooterVariants,
} from "./variants";

const TRANSITION_DURATION = 300;

type SheetVariant = NonNullable<
  VariantProps<typeof sheetContentVariants>["variant"]
>;
type SheetSide = NonNullable<
  VariantProps<typeof sheetContentVariants>["side"]
>;
type SheetDensity = "relaxed" | "comfortable" | "compact" | "none";

interface SheetContextValue {
  variant: SheetVariant;
  side: SheetSide;
  density: SheetDensity;
  toggleDialog: () => void;
}

const SheetContext = createContext<SheetContextValue | null>(null);

const useSheetContext = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet compound components must be used within Sheet.");
  }
  return context;
};

const closeButtonVariantByTheme: Record<SheetVariant, ButtonProps["variant"]> = {
  default: "ghost",
  dark: "ghost-dark",
};

const overlayFallbackClassByVariant: Record<SheetVariant, string> = {
  default: "backdrop:bg-black/50",
  dark: "backdrop:bg-govbr-blue-warm-vivid-90/80", // exemplo de overlay customizado usando Tailwind
};

type SheetCloseProps = Omit<ButtonProps, "size">;

const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(
  (
    {
      className,
      variant,
      onClick,
      type,
      ...props
    },
    ref
  ) => {
    const { toggleDialog, variant: sheetVariant } = useSheetContext();

    return (
      <Button
        ref={ref}
        type={type ?? "button"}
        size="icon"
        variant={variant ?? closeButtonVariantByTheme[sheetVariant]}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) {
            return;
          }
          toggleDialog();
        }}
        className={cn(BASE_CLASSNAMES.sheet.close, className)}
        {...props}
      >
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    );
  }
);

SheetClose.displayName = "SheetClose";

interface SheetProps
  extends Omit<ComponentProps<"dialog">, "className">,
    VariantProps<typeof sheetContentVariants> {
  toggleDialog: () => void;
  persist?: boolean;
  closeOnEsc?: boolean;
  padding?: boolean;
  density?: SheetDensity;
  showCloseButton?: boolean;
  containerClassName?: string;
  className?: string;
  overlayClassName?: string;
  closeButtonLabel?: string;
  closeButtonProps?: Omit<ButtonProps, "size">;
  children: React.ReactNode;
}

const SheetForwardRef = forwardRef<HTMLDialogElement, SheetProps>(
  (
    {
      children,
      toggleDialog,
      side,
      variant,
      padding = true,
      density,
      persist,
      closeOnEsc,
      showCloseButton = true,
      containerClassName,
      className,
      overlayClassName,
      closeButtonLabel = "Fechar painel",
      closeButtonProps,
      ...dialogProps
    },
    ref
  ) => {
    const resolvedVariant = (variant ?? "default") as SheetVariant;
    const resolvedSide = (side ?? "left") as SheetSide;
    const resolvedDensity: SheetDensity =
      density ?? (padding ? "relaxed" : "none");
    const resolvedOverlayClassName = cn(
      "bg-transparent",
      overlayFallbackClassByVariant[resolvedVariant],
      overlayClassName
    );

    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement, []);

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const handleCancel = (event: Event) => {
        if (closeOnEsc === false) {
          event.preventDefault();
        }
      };

      dialog.addEventListener("cancel", handleCancel);

      return () => {
        dialog.removeEventListener("cancel", handleCancel);
      };
    }, [closeOnEsc]);

    useLayoutEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const marker = "__govbr_sheet_patched__";

      if ((dialog as any)[marker]) {
        return;
      }

      (dialog as any)[marker] = true;

      const originalShowModal = dialog.showModal.bind(dialog);
      const originalClose = dialog.close.bind(dialog);
      let closeTimer: number | null = null;

      dialog.showModal = (...args) => {
        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = null;
        }
        const panel = panelRef.current;
        if (panel) {
          panel.dataset.motion = "opening";
          void panel.getBoundingClientRect();
        }

        const result = originalShowModal(...args);

        requestAnimationFrame(() => {
          const currentPanel = panelRef.current;
          if (currentPanel) {
            currentPanel.dataset.motion = "open";
          }
        });

        return result;
      };

      dialog.close = (returnValue?: string) => {
        const panel = panelRef.current;
        if (!panel) {
          originalClose(returnValue);
          return;
        }

        if (panel.dataset.motion === "closing") {
          return;
        }

        panel.dataset.motion = "closing";

        if (closeTimer) {
          window.clearTimeout(closeTimer);
        }

        closeTimer = window.setTimeout(() => {
          panel.dataset.motion = "closed";
          originalClose(returnValue);
          closeTimer = null;
        }, TRANSITION_DURATION);
      };

      return () => {
        if (closeTimer) {
          window.clearTimeout(closeTimer);
        }
        dialog.showModal = originalShowModal;
        dialog.close = originalClose;
        delete (dialog as any)[marker];
      };
    }, []);

    useLayoutEffect(() => {
      const panel = panelRef.current;
      if (!panel) {
        return;
      }
      if (!panel.dataset.motion) {
        panel.dataset.motion = "closed";
      }
      if (dialogRef.current?.open) {
        panel.dataset.motion = "open";
      }
    }, []);

    const { className: closeButtonClassName, ...closeButtonRest } =
      closeButtonProps ?? {};

    const { onClick: dialogOnClick, ...restDialogProps } = dialogProps;

    return (
      <dialog
        ref={dialogRef}
        className={resolvedOverlayClassName}
        onClick={(event) => {
          dialogOnClick?.(event);
          if (event.defaultPrevented) {
            return;
          }

          if (!persist && event.currentTarget === event.target) {
            toggleDialog();
          }
        }}
        {...restDialogProps}
      >
        <SheetContext.Provider
          value={{ variant: resolvedVariant, side: resolvedSide, density: resolvedDensity, toggleDialog }}
        >
          <div
            className={cn(
              sheetViewportVariants({ side: resolvedSide }),
              containerClassName,
              BASE_CLASSNAMES.sheet.root,
              BASE_CLASSNAMES.sheet.container
            )}
          >
            <div
              ref={(node) => {
                panelRef.current = node;
              }}
              className={cn(
                sheetContentVariants({ side: resolvedSide, variant: resolvedVariant }),
                className,
                BASE_CLASSNAMES.sheet.panel
              )}
              data-side={resolvedSide}
            >
              {showCloseButton ? (
                <SheetClose
                  aria-label={closeButtonLabel}
                  className={cn(
                    "absolute right-4 top-4",
                    closeButtonClassName
                  )}
                  {...closeButtonRest}
                />
              ) : null}
              <div className="flex h-full flex-col" data-side={resolvedSide}>
                {children}
              </div>
            </div>
          </div>
        </SheetContext.Provider>
      </dialog>
    );
  }
);

SheetForwardRef.displayName = "Sheet";

type SheetSectionProps<T extends HTMLElement> = React.HTMLAttributes<T>;

const SheetHeader = forwardRef<HTMLDivElement, SheetSectionProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { variant, density } = useSheetContext();
    return (
      <header
        ref={ref}
        className={cn(
          sheetHeaderVariants({ variant, density }),
          className,
          BASE_CLASSNAMES.sheet.header
        )}
        {...props}
      />
    );
  }
);

SheetHeader.displayName = "SheetHeader";

const SheetMain = forwardRef<HTMLElement, SheetSectionProps<HTMLElement>>(
  ({ className, ...props }, ref) => {
    const { density } = useSheetContext();
    return (
      <main
        ref={ref}
        className={cn(
          sheetBodyVariants({ density }),
          className,
          BASE_CLASSNAMES.sheet.main
        )}
        {...props}
      />
    );
  }
);

SheetMain.displayName = "SheetMain";

const SheetFooter = forwardRef<HTMLDivElement, SheetSectionProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { variant, density } = useSheetContext();
    return (
      <footer
        ref={ref}
        className={cn(
          sheetFooterVariants({ variant, density }),
          className,
          BASE_CLASSNAMES.sheet.footer
        )}
        {...props}
      />
    );
  }
);

SheetFooter.displayName = "SheetFooter";

interface SheetComponent
  extends React.ForwardRefExoticComponent<
    SheetProps & React.RefAttributes<HTMLDialogElement>
  > {
  Header: typeof SheetHeader;
  Main: typeof SheetMain;
  Footer: typeof SheetFooter;
  Close: typeof SheetClose;
}

const Sheet = {
  ...SheetForwardRef,
  Header: SheetHeader,
  Main: SheetMain,
  Footer: SheetFooter,
  Close: SheetClose,
} as SheetComponent;

export default Sheet;
