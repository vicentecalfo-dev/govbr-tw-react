import React, {
  ClipboardEvent,
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { VariantProps } from "class-variance-authority";
import { cn } from "../../libs/utils";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import inputVariants from "../Input/variants";

const DEFAULT_DIGITS = 6;
const PATTERN_CHAR = "x";

type PatternToken =
  | { type: "slot"; index: number }
  | { type: "separator"; value: string; key: string };

type InputVariantProps = VariantProps<typeof inputVariants>;

const SLOT_WIDTH_BY_DENSITY: Record<
  NonNullable<InputVariantProps["density"]>,
  string
> = {
  lowest: "w-16",
  low: "w-14",
  default: "w-12",
  high: "w-10",
};

interface OtpInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  digits?: number;
  pattern?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  variant?: InputVariantProps["variant"];
  density?: InputVariantProps["density"];
  slotClassName?: string;
  separatorClassName?: string;
  inputClassName?: string;
}

const sanitize = (input: string) => input.replace(/\D/g, "");

const toValueArray = (value: string | undefined, length: number) => {
  const sanitized = sanitize(value ?? "");
  const chars = sanitized.slice(0, length).split("");
  return Array.from({ length }, (_, index) => chars[index] ?? "");
};

const parsePattern = (pattern: string) => {
  const tokens: PatternToken[] = [];
  let slotIndex = 0;
  let separatorBuffer = "";

  const pushSeparator = () => {
    if (!separatorBuffer) {
      return;
    }
    tokens.push({
      type: "separator",
      value: separatorBuffer,
      key: `separator-${slotIndex}-${tokens.length}`,
    });
    separatorBuffer = "";
  };

  for (const rawChar of pattern) {
    const char = rawChar.toLowerCase();
    if (char === PATTERN_CHAR) {
      pushSeparator();
      tokens.push({ type: "slot", index: slotIndex });
      slotIndex += 1;
    } else {
      separatorBuffer += rawChar;
    }
  }

  pushSeparator();

  return { tokens, slotCount: slotIndex };
};

const focusInput = (
  ref: MutableRefObject<Array<HTMLInputElement | null>>,
  index: number
) => {
  const instance = ref.current[index];
  if (instance) {
    instance.focus();
    instance.select();
  }
};

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  defaultValue,
  onChange,
  onComplete,
  digits,
  pattern,
  name,
  disabled,
  readOnly,
  autoFocus,
  placeholder,
  variant = "default",
  density = "default",
  className,
  slotClassName,
  separatorClassName,
  inputClassName,
  ...rest
}) => {
  const patternInfo = useMemo(() => {
    if (!pattern) {
      return null;
    }
    return parsePattern(pattern);
  }, [pattern]);

  const slotCount = useMemo(() => {
    if (patternInfo) {
      return patternInfo.slotCount;
    }
    if (digits && digits > 0) {
      return digits;
    }
    return DEFAULT_DIGITS;
  }, [patternInfo, digits]);

  useEffect(() => {
    if (!patternInfo || digits === undefined) {
      return;
    }
    if (digits === patternInfo.slotCount) {
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `[OtpInput] The provided digits prop (${digits}) does not match the number of slots inferred from the pattern (${patternInfo.slotCount}). Using the pattern derived value.`
      );
    }
  }, [digits, patternInfo]);

  const tokens: PatternToken[] = useMemo(() => {
    if (patternInfo) {
      return patternInfo.tokens;
    }
    return Array.from({ length: slotCount }, (_, index) => ({
      type: "slot",
      index,
    }));
  }, [patternInfo, slotCount]);

  const slotWidthClass =
    SLOT_WIDTH_BY_DENSITY[
      (density ?? "default") as NonNullable<InputVariantProps["density"]>
    ] ?? SLOT_WIDTH_BY_DENSITY["default"];

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const isControlled = value !== undefined;

  const [internalValues, setInternalValues] = useState<string[]>(() =>
    toValueArray(defaultValue, slotCount)
  );

  useEffect(() => {
    inputRefs.current = Array.from(
      { length: slotCount },
      (_, index) => inputRefs.current[index] ?? null
    );
  }, [slotCount]);

  useEffect(() => {
    if (isControlled) {
      return;
    }
    setInternalValues((previous) => {
      const next = toValueArray(previous.join(""), slotCount);
      return next;
    });
  }, [isControlled, slotCount]);

  useEffect(() => {
    if (isControlled || defaultValue === undefined) {
      return;
    }
    setInternalValues(toValueArray(defaultValue, slotCount));
  }, [defaultValue, isControlled, slotCount]);

  const valueArray = useMemo(() => {
    if (isControlled) {
      return toValueArray(value, slotCount);
    }
    return internalValues;
  }, [isControlled, value, slotCount, internalValues]);

  const emitValue = useCallback(
    (next: string[]) => {
      if (!isControlled) {
        setInternalValues(next);
      }
      const nextValue = next.join("");
      onChange?.(nextValue);
      if (next.length === slotCount && next.every((char) => char)) {
        onComplete?.(nextValue);
      }
    },
    [isControlled, onChange, onComplete, slotCount]
  );

  const setValueAtIndex = useCallback(
    (index: number, nextChars: string[]) => {
      const next = valueArray.slice();
      let cursor = index;

      for (const char of nextChars) {
        if (cursor >= slotCount) {
          break;
        }
        next[cursor] = char;
        cursor += 1;
      }

      emitValue(next);

      if (cursor <= slotCount - 1) {
        focusInput(inputRefs, cursor);
      } else {
        focusInput(inputRefs, slotCount - 1);
      }
    },
    [emitValue, slotCount, valueArray]
  );

  const clearValueAtIndex = useCallback(
    (index: number) => {
      const next = valueArray.slice();
      next[index] = "";
      emitValue(next);
    },
    [emitValue, valueArray]
  );

  const handleSlotChange = useCallback(
    (slotIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        return;
      }
      const nextChars = sanitize(event.target.value).split("");
      if (nextChars.length === 0) {
        clearValueAtIndex(slotIndex);
        return;
      }
      setValueAtIndex(slotIndex, nextChars);
    },
    [clearValueAtIndex, disabled, readOnly, setValueAtIndex]
  );

  const handleSlotFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    event.target.select();
  }, []);

  const focusPrevious = useCallback(
    (current: number) => {
      const previous = current - 1;
      if (previous >= 0) {
        focusInput(inputRefs, previous);
        return previous;
      }
      return current;
    },
    []
  );

  const focusNext = useCallback(
    (current: number) => {
      const next = current + 1;
      if (next < slotCount) {
        focusInput(inputRefs, next);
        return next;
      }
      return current;
    },
    [slotCount]
  );

  const handleKeyDown = useCallback(
    (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        if (valueArray[index]) {
          clearValueAtIndex(index);
        } else {
          const previous = focusPrevious(index);
          if (valueArray[previous]) {
            clearValueAtIndex(previous);
          }
        }
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        focusPrevious(index);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        focusNext(index);
      } else if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
      }
    },
    [
      clearValueAtIndex,
      disabled,
      focusNext,
      focusPrevious,
      readOnly,
      valueArray,
    ]
  );

  const handlePaste = useCallback(
    (index: number) => (event: ClipboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        return;
      }
      event.preventDefault();
      const pasted = sanitize(event.clipboardData?.getData("text") ?? "");
      if (!pasted) {
        return;
      }
      setValueAtIndex(index, pasted.split(""));
    },
    [disabled, readOnly, setValueAtIndex]
  );

  useEffect(() => {
    if (!autoFocus || disabled) {
      return;
    }
    focusInput(inputRefs, 0);
  }, [autoFocus, disabled, slotCount]);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        BASE_CLASSNAMES.otpInput.root,
        className
      )}
      {...rest}
    >
      {name ? <input type="hidden" name={name} value={valueArray.join("")} /> : null}
      {tokens.map((token) => {
        if (token.type === "separator") {
          return (
            <span
              key={token.key}
              className={cn(
                "text-sm font-medium text-govbr-gray-80",
                BASE_CLASSNAMES.otpInput.separator,
                separatorClassName
              )}
            >
              {token.value}
            </span>
          );
        }

        const index = token.index;

        return (
          <input
            key={`slot-${index}`}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            className={cn(
              inputVariants({ variant, density, iconPosition: "none" }),
              slotWidthClass,
              "flex-shrink-0 px-0 text-center",
              BASE_CLASSNAMES.input.root,
              BASE_CLASSNAMES.otpInput.slot,
              slotClassName,
              inputClassName
            )}
            value={valueArray[index]}
            onChange={handleSlotChange(index)}
            onKeyDown={handleKeyDown(index)}
            onPaste={handlePaste(index)}
            onFocus={handleSlotFocus}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={1}
            data-filled={valueArray[index] ? "true" : "false"}
            aria-label={`Codigo OTP digito ${index + 1}`}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
