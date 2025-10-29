import React, {
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";

type CopyActionStatus = "idle" | "success" | "error";

interface CopyActionRenderProps {
  status: CopyActionStatus;
  copied: boolean;
  copy: () => Promise<void>;
  reset: () => void;
  error: Error | null;
  target: HTMLElement | null;
}

type CopyActionChild =
  | ReactNode
  | ((props: CopyActionRenderProps) => ReactNode);

export interface CopyActionProps {
  targetRef: React.RefObject<HTMLElement | null>;
  children: CopyActionChild;
  disabled?: boolean;
  feedbackDuration?: number;
  onCopy?: (value: string) => void;
  onError?: (error: Error) => void;
  getText?: (target: HTMLElement) => string;
  className?: string;
}

const copyWithFallback = async (value: string) => {
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    await navigator.clipboard.writeText(value);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard API is not available in this environment.");
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  textarea.style.top = "0";
  textarea.style.left = "0";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  const successful = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!successful) {
    throw new Error("Unable to copy text to the clipboard.");
  }
};

const composeEventHandlers =
  <E extends React.SyntheticEvent>(
    theirHandler: ((event: E) => void) | undefined,
    ourHandler: (event: E) => void
  ) =>
  (event: E) => {
    theirHandler?.(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };

const CopyAction = ({
  targetRef,
  children,
  disabled = false,
  feedbackDuration = 2000,
  onCopy,
  onError,
  getText,
  className,
}: CopyActionProps) => {
  const [status, setStatus] = useState<CopyActionStatus>("idle");
  const [error, setError] = useState<Error | null>(null);
  const resetTimerRef = useRef<number>();

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = undefined;
    }
  }, []);

  const reset = useCallback(() => {
    clearResetTimer();
    setStatus("idle");
    setError(null);
  }, [clearResetTimer]);

  useEffect(
    () => () => {
      clearResetTimer();
    },
    [clearResetTimer]
  );

  useEffect(() => {
    if (status === "idle" || feedbackDuration <= 0) {
      return;
    }

    resetTimerRef.current = window.setTimeout(() => {
      setStatus("idle");
      setError(null);
    }, feedbackDuration);

    return () => {
      clearResetTimer();
    };
  }, [status, feedbackDuration, clearResetTimer]);

  const copy = useCallback(async () => {
    if (disabled) {
      return;
    }

    clearResetTimer();

    try {
      const target = targetRef.current;
      if (!target) {
        throw new Error("CopyAction target element is not available.");
      }

      const resolvedText = (() => {
        if (getText) {
          const result = getText(target);
          if (typeof result !== "string") {
            throw new Error("CopyAction getText must return a string value.");
          }
          return result;
        }

        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement
        ) {
          return target.value;
        }

        const datasetValue = target.getAttribute("data-copy-value");
        if (datasetValue !== null) {
          return datasetValue;
        }

        return target.textContent ?? "";
      })();

      await copyWithFallback(resolvedText);

      setStatus("success");
      setError(null);
      onCopy?.(resolvedText);
    } catch (cause) {
      const copyError =
        cause instanceof Error
          ? cause
          : new Error(
              typeof cause === "string" ? cause : "Failed to copy text value."
            );
      setStatus("error");
      setError(copyError);
      onError?.(copyError);
      throw copyError;
    }
  }, [clearResetTimer, disabled, getText, onCopy, onError, targetRef]);

  const target = targetRef.current ?? null;

  const context = useMemo<CopyActionRenderProps>(
    () => ({
      status,
      copied: status === "success",
      copy,
      reset,
      error,
      target,
    }),
    [status, copy, reset, error, target]
  );

  if (typeof children === "function") {
    return (
      <span
        className={cn(
          BASE_CLASSNAMES.copyAction?.root,
          className
        )}
        data-copy-status={status}
        aria-live="polite"
      >
        {children(context)}
      </span>
    );
  }

  if (isValidElement(children)) {
    const child = children as ReactElement;
    const isButtonElement =
      typeof child.type === "string" && child.type.toLowerCase() === "button";

    const mergedProps: Record<string, unknown> = {
      onClick: composeEventHandlers(
        child.props.onClick,
        (event: React.SyntheticEvent) => {
          if (disabled || child.props.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          void copy().catch(() => undefined);
        }
      ),
      className: cn(
        BASE_CLASSNAMES.copyAction?.root,
        BASE_CLASSNAMES.copyAction?.trigger,
        child.props.className,
        className
      ),
      "data-copy-status": status,
      "aria-disabled": disabled || child.props.disabled ? true : undefined,
    };

    if (isButtonElement) {
      mergedProps.type = child.props.type ?? "button";
      mergedProps.disabled = child.props.disabled ?? disabled;
    }

    return cloneElement(child, mergedProps);
  }

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-transparent bg-govbr-blue-warm-vivid-80 px-3 py-2 text-sm font-medium text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-govbr-blue-warm-vivid-60 hover:bg-govbr-blue-warm-vivid-70 disabled:cursor-not-allowed disabled:opacity-70",
        BASE_CLASSNAMES.copyAction?.root,
        BASE_CLASSNAMES.copyAction?.trigger,
        className
      )}
      onClick={() => {
        void copy().catch(() => undefined);
      }}
      data-copy-status={status}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

CopyAction.displayName = "CopyAction";

export { CopyAction };
