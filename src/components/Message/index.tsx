import BASE_CLASSNAMES from "@/src/config/baseClassNames";
import { cn } from "@/src/libs/utils";
import { VariantProps } from "class-variance-authority";
import messageVariants from "./variants";
import { ComponentProps, FC, createRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faInfoCircle,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";

interface MessagesProps
  extends ComponentProps<"span">,
    VariantProps<typeof messageVariants> {
  closable?: "button" | "timer" | "both" | "none";
  timer?: number;
  hasIcon?: boolean;
  icon?: any;
}

const Message: FC<MessagesProps> = ({
  className,
  children,
  variant = "info",
  closable = "button",
  hasIcon = true,
  timer = 5,
  icon = "",
  ...props
}) => {
  const myRef: any = createRef();
  const handleDestory = () => myRef.current.remove();
  const closeButtonVariant: any = {
    info: "ghost",
    danger: "ghost-danger",
    success: "ghost-success",
    warning: "ghost-warning",
  };
  const icons: any = {
    danger: faCircleXmark,
    success: faCircleCheck,
    warning: faTriangleExclamation,
    info: faInfoCircle,
  };
  const [iconStyle, messageStyle]: any = messageVariants({ variant }).split(
    " "
  );
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (closable === "timer" || closable === "both") {
      if (counter <= timer) {
        const timerFn = setInterval(() => {
          setCounter((prevCounter) => prevCounter + 1);
        }, 1000);

        return () => clearInterval(timerFn);
      } else {
        handleDestory();
      }
    }
  }, [counter, timer]);

  icon = icon !== "" ? icon : icons[variant as any];
  return (
    <span
      className={cn(
        "flex flex-col",
        messageStyle,
        className,
        BASE_CLASSNAMES.message.root,
        BASE_CLASSNAMES.message[variant as any]
      )}
      {...props}
      ref={myRef}
    >
      <span className="flex gap-3 items-center p-6">
        {hasIcon ? (
          <span className="size-10 flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className={cn(iconStyle, "size-6")} />
          </span>
        ) : (
          ""
        )}
        <span className="flex-1">{children}</span>
        {closable === "button" || closable === "both" ? (
          <span>
            <Button
              onClick={handleDestory}
              size="icon"
              variant={closeButtonVariant[variant as any]}
              className="hover:!bg-black/5 "
            >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </span>
        ) : (
          ""
        )}
      </span>
      {closable === "timer" || closable === "both" ? (
        <span className={cn("flex w-full -mt-2")}>
          <span
            className={cn("h-2", "bg-black/5")}
            style={{
              width: (counter / timer) * 100 + "%",
              transition: `all 1s linear`,
            }}
          ></span>
        </span>
      ) : (
        ""
      )}
    </span>
  );
};

export default Message;
