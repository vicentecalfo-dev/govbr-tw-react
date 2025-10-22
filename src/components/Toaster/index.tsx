import {
  ComponentProps,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Message from "../Message";
import { cn } from "../../libs/utils";
import BASE_CLASSNAMES from "../../config/baseClassNames";

type MessageProps = ComponentProps<typeof Message>;

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface ToastItem
  extends Pick<
    MessageProps,
    "variant" | "closable" | "hasIcon" | "icon" | "timer" | "className"
  > {
  id: string;
  content: ReactNode;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
}

export interface ToasterProps extends Omit<ComponentProps<"div">, "children"> {
  toasts: ToastItem[];
  position?: ToastPosition;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
  onRemove?: (id: string) => void;
}

type ToastPhase = "entering" | "settled" | "leaving";

const EXIT_ANIMATION_DURATION = 300;
const DEFAULT_AUTO_DISMISS_DELAY = 3000;

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-6 left-6 items-start",
  "top-right": "top-6 right-6 items-end",
  "bottom-left": "bottom-6 left-6 items-start",
  "bottom-right": "bottom-6 right-6 items-end",
};

const initialTransforms: Record<ToastPosition, string> = {
  "top-left": "-translate-x-full",
  "bottom-left": "-translate-x-full",
  "top-right": "translate-x-full",
  "bottom-right": "translate-x-full",
};

interface ToastElementProps {
  toast: ToastItem;
  position: ToastPosition;
  autoDismiss: boolean;
  autoDismissDelay: number;
  onRemove?: (id: string) => void;
}

const ToastElement: FC<ToastElementProps> = ({
  toast,
  position,
  autoDismiss,
  autoDismissDelay,
  onRemove,
}) => {
  const [phase, setPhase] = useState<ToastPhase>("entering");
  const closingRef = useRef(false);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRemove = useCallback(() => {
    if (closingRef.current) {
      return;
    }
    closingRef.current = true;
    setPhase("leaving");
    exitTimeoutRef.current = setTimeout(() => {
      if (onRemove) {
        onRemove(toast.id);
      }
    }, EXIT_ANIMATION_DURATION);
  }, [onRemove, toast.id]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPhase("settled");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const shouldDismiss = toast.autoDismiss ?? autoDismiss;
    if (!shouldDismiss) {
      return;
    }
    const delay = toast.autoDismissDelay ?? autoDismissDelay;
    const timer = setTimeout(() => {
      handleRemove();
    }, delay);
    return () => clearTimeout(timer);
  }, [
    toast.autoDismiss,
    toast.autoDismissDelay,
    autoDismiss,
    autoDismissDelay,
    handleRemove,
  ]);

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  const transformClass =
    phase === "settled" ? "translate-x-0" : initialTransforms[position];

  const opacityClass = phase === "settled" ? "opacity-100" : "opacity-0";

  const { content, className, ...messageProps } = toast;

  return (
    <div
      className={cn(
        "pointer-events-auto transition-all duration-300 ease-in-out w-full max-w-sm",
        "will-change-transform",
        transformClass,
        opacityClass
      )}
    >
      <Message
        {...messageProps}
        disableAutoRemove
        onClose={handleRemove}
        className={cn(BASE_CLASSNAMES.toaster.toast, className)}
      >
        {content}
      </Message>
    </div>
  );
};

const Toaster: FC<ToasterProps> = ({
  toasts,
  position = "top-left",
  autoDismiss = false,
  autoDismissDelay = DEFAULT_AUTO_DISMISS_DELAY,
  onRemove,
  className,
  ...props
}) => {
  const renderToasts = useMemo(
    () =>
      toasts.map((toast) => (
        <ToastElement
          key={toast.id}
          toast={toast}
          position={position}
          autoDismiss={autoDismiss}
          autoDismissDelay={autoDismissDelay}
          onRemove={onRemove}
        />
      )),
    [toasts, position, autoDismiss, autoDismissDelay, onRemove]
  );

  return (
    <div
      className={cn(
        "fixed z-[9999] flex pointer-events-none gap-3 flex-col",
        positionClasses[position],
        BASE_CLASSNAMES.toaster.root,
        className
      )}
      {...props}
    >
      {renderToasts}
    </div>
  );
};

export default Toaster;
