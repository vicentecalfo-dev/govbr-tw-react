import { ComponentProps, FC, createContext, useContext, useState } from "react";
import flyoutContentVariants from "./variants";
import { VariantProps } from "class-variance-authority";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn, getUIDClassName } from "../../libs/utils";

const FlyOutContext = createContext({});

interface FlyOutProps extends ComponentProps<"div"> {}
interface FlyOutToggleProps extends ComponentProps<"span"> {}
interface FlyOutContentProps
  extends ComponentProps<"div">,
    VariantProps<typeof flyoutContentVariants> {}

const FlyOut: any = ({ children, className, ...props }: FlyOutProps) => {
  const [open, toggle] = useState(false);
  const suffixCn = getUIDClassName();
  return (
    <FlyOutContext.Provider value={{ open, toggle, suffixCn }}>
      <div className={cn(className, BASE_CLASSNAMES.flyout.root, "relative")} {...props}>
        {children}
      </div>
    </FlyOutContext.Provider>
  );
};

const FlyOutToggle: FC<FlyOutToggleProps> = ({
  children,
  className,
  ...props
}) => {
  const { open, toggle, suffixCn }: any = useContext(FlyOutContext);
  return (
    <span
      className={cn(className, BASE_CLASSNAMES.flyout.toggle)}
      onClick={() => toggle(!open)}
      role="button"
      aria-expanded={open}
      aria-controls={`${BASE_CLASSNAMES.flyout.content}-${suffixCn}`}
      {...props}
    >
      {children}
    </span>
  );
};

const FlyOutContent: FC<FlyOutContentProps> = ({
  children,
  className,
  position = "bottom-left",
  ...props
}) => {
  const { open, suffixCn }: any = useContext(FlyOutContext);
  return (
    open && (
      <div
        className={cn(
          className,
          flyoutContentVariants({ position }),
          BASE_CLASSNAMES.flyout.content
        )}
        {...props}
        id={`${BASE_CLASSNAMES.flyout.content}-${suffixCn}`}
      >
        {children}
      </div>
    )
  );
};

FlyOut.Toggle = FlyOutToggle;
FlyOut.Content = FlyOutContent;

export default FlyOut;
