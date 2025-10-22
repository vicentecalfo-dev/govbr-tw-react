import { ComponentProps, createContext, forwardRef, useContext, useEffect } from "react";
import dialogVariants from "./variants";
import dialogContentVariants from "./content-variants";
import dialogInnerContentVariants from "./inner-content-variants";
import dialogHeaderVariants from "./header-variants";
import dialogFooterVariants from "./footer-variants";
import { VariantProps } from "class-variance-authority";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";


interface DialogProps
  extends ComponentProps<"dialog">,
    VariantProps<typeof dialogVariants> {
  toggleDialog: () => void;
  persist?: boolean;
  closeOnEsc?: boolean;
  rootClassName?: string;
}

interface DialogComponent extends React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDialogElement>>{
  Header: typeof DialogHeader;
  Main: typeof DialogMain;
  Footer: typeof DialogFooter;
}

const DialogContext: any = createContext(null);

const DialogForwardRef = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      children,
      className,
      toggleDialog,
      variant = "default",
      padding = true,
      persist = false,
      closeOnEsc = true,
      rootClassName,
      ...props
    }:DialogProps,
    ref
  ) => {
    useEffect(()=>{
      if (!closeOnEsc) {
        (ref as any).current.addEventListener("keydown", (e: any) => {
          if (e.keyCode === 27) e.preventDefault();
        });
      }
    }, [])

    return (
      <DialogContext.Provider value={{ variant, padding }}>
        <dialog
          className={cn(
            dialogVariants({ variant }),
            BASE_CLASSNAMES.dialog.root,
            rootClassName
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
const DialogMain: any = ({ children, className }: any) => {
  const { variant, padding }: VariantProps<typeof dialogVariants> =
    useContext(DialogContext);
  return <main className={cn(dialogInnerContentVariants({variant, padding}),className)}>{children}</main>;
};
const DialogFooter: any = ({ children, className }: any) => {
  const { variant, padding }: VariantProps<typeof dialogVariants> =
    useContext(DialogContext);
  return <footer className={cn(dialogFooterVariants({variant, padding}),className)}>{children}</footer>;
};


const Dialog = {
  ...DialogForwardRef,
  Header:DialogHeader,
  Main:DialogMain,
  Footer:DialogFooter,

} as DialogComponent;

export default Dialog;
