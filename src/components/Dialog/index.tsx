import { ComponentProps, createContext, forwardRef, useContext } from "react";
import dialogVariants from "./variants";
import dialogContentVariants from "./content-variants";
import dialogInnerContentVariants from "./inner-content-variants";
import dialogHeaderVariants from "./header-variants";
import dialogFooterVariants from "./footer-variants";
import { cn } from "@/src/libs/utils";
import { VariantProps } from "class-variance-authority";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";

interface DialogProps
  extends ComponentProps<"dialog">,
    VariantProps<typeof dialogVariants> {
  toggleDialog: () => void;
  persist?: boolean;
  closeOnEsc?: boolean;
}

const DialogContext: any = createContext(null);

const Dialog: any = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      children,
      className,
      toggleDialog,
      variant = "default",
      padding = true,
      persist = false,
      closeOnEsc = true,
      ...props
    },
    ref
  ) => {
    if (!closeOnEsc) {
      (ref as any).current.addEventListener("keydown", (e: any) => {
        if (e.keyCode === 27) e.preventDefault();
      });
    }

    return (
      <DialogContext.Provider value={{ variant, padding }}>
        <dialog
          className={cn(
            dialogVariants({ variant }),
            BASE_CLASSNAMES.dialog.root
          )}
          ref={ref}
          onClick={(e) => {
            if (!persist) {
              if (e.currentTarget === e.target) {
                toggleDialog();
              }
            }
          }}
          {...props}
        >
          <div
            className={cn(
              dialogContentVariants({ variant, padding }),
              className,
              BASE_CLASSNAMES.dialog.content
            )}
          >
            {children}
          </div>
        </dialog>
      </DialogContext.Provider>
    );
  }
);

const DialogHeader: any = ({ children, className }: any) => {
  const { variant, padding }: VariantProps<typeof dialogVariants> =
    useContext(DialogContext);
  return <header className={cn(dialogHeaderVariants({variant, padding}),className)}>{children}</header>;
};
const DialogContent: any = ({ children, className }: any) => {
  const { variant, padding }: VariantProps<typeof dialogVariants> =
    useContext(DialogContext);
  return <main className={cn(dialogInnerContentVariants({variant, padding}),className)}>{children}</main>;
};
const DialogFooter: any = ({ children, className }: any) => {
  const { variant, padding }: VariantProps<typeof dialogVariants> =
    useContext(DialogContext);
  return <footer className={cn(dialogFooterVariants({variant, padding}),className)}>{children}</footer>;
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;

export default Dialog;
