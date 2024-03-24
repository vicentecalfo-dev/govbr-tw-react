import { ComponentProps, FC } from "react";
import { cn } from "@/src/libs/utils";
import spinnerVariants from "./variants";
import { VariantProps } from "class-variance-authority";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";

interface SpinnerProps
  extends ComponentProps<"svg">,
    VariantProps<typeof spinnerVariants> {
      srOnlyLabel?: string;
    }

const Spinner: FC<SpinnerProps> = ({
  className,
  variant = "light",
  size = "small",
  srOnlyLabel = "Carregando dados ...",
  ...props
}) => {
  return (
    <>
    <svg
      className={cn(
        spinnerVariants({ variant, size }),
        className,
        BASE_CLASSNAMES.spinner.root
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-busy="true"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <span className="sr-only">{srOnlyLabel}</span>
    </>
  );
};

export { Spinner };
