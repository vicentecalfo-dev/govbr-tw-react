import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VariantProps } from "class-variance-authority";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import Input from "../Input";
import type inputVariants from "../Input/variants";
import {
  searchBoxMessageVariants,
  searchBoxOptionVariants,
  searchBoxPanelVariants,
  searchBoxRootVariants,
} from "./variants";

type SearchBoxItem = Record<string, unknown>;

type KeySelector =
  | string
  | ((item: SearchBoxItem) => string | undefined | null);

interface SearchBoxOptionState {
  index: number;
  isActive: boolean;
  label: string;
}

interface SearchBoxRenderProps {
  items: SearchBoxItem[];
  loading: boolean;
  error: string | null;
  query: string;
  select: (item: SearchBoxItem) => void;
  close: () => void;
  getLabel: (item: SearchBoxItem) => string;
}

export interface SearchBoxProps
  extends Omit<ComponentPropsWithoutRef<"input">, "children" | "value">,
    Pick<VariantProps<typeof inputVariants>, "density" | "variant"> {
  value?: string;
  defaultValue?: string;
  minChars?: number;
  debounce?: number;
  data?: SearchBoxItem[];
  fetchUrl?: string;
  fetchOptions?: RequestInit;
  queryParam?: string;
  labelKey?: KeySelector;
  valueKey?: KeySelector;
  transformResponse?: (response: unknown) => SearchBoxItem[];
  renderOption?: (
    item: SearchBoxItem,
    state: SearchBoxOptionState
  ) => ReactNode;
  renderSuggestions?: (props: SearchBoxRenderProps) => ReactNode;
  onSearchChange?: (query: string) => void;
  onOptionSelect?: (item: SearchBoxItem) => void;
  getOptionKey?: (item: SearchBoxItem, index: number) => React.Key;
  emptyMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
}

const DEFAULT_MIN_CHARS = 2;
const DEFAULT_DEBOUNCE = 400;

const resolveKey = (
  item: SearchBoxItem,
  key: KeySelector | undefined,
  fallbackKey: string
) => {
  if (typeof key === "function") {
    const result = key(item);
    return result ?? "";
  }
  const path = (key ?? fallbackKey).split(".");
  let cursor: unknown = item;
  for (const part of path) {
    if (
      cursor !== null &&
      typeof cursor === "object" &&
      part in (cursor as Record<string, unknown>)
    ) {
      cursor = (cursor as Record<string, unknown>)[part];
    } else {
      return "";
    }
  }
  if (typeof cursor === "number") {
    return cursor.toString();
  }
  return typeof cursor === "string" ? cursor : "";
};

const defaultRenderOption = (
  item: SearchBoxItem,
  state: SearchBoxOptionState
) => (
  <div
    className={cn(
      "flex flex-col text-left",
      state.isActive ? "text-govbr-blue-warm-vivid-70" : "text-govbr-gray-90"
    )}
  >
    <span className="text-sm font-medium">{state.label}</span>
  </div>
);

const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  (
    {
      value,
      defaultValue = "",
      minChars = DEFAULT_MIN_CHARS,
      debounce = DEFAULT_DEBOUNCE,
      data,
      fetchUrl,
      fetchOptions,
      queryParam = "q",
      labelKey,
      valueKey,
      transformResponse,
      renderOption = defaultRenderOption,
      renderSuggestions,
      onSearchChange,
      onOptionSelect,
      getOptionKey,
      emptyMessage = "Nenhum resultado encontrado",
      loadingMessage = "Carregando...",
      errorMessage = "Não foi possível carregar os resultados",
      density = "default",
      variant = "default",
      className,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      ...inputProps
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const inputValue = isControlled ? value ?? "" : internalValue;
    const [query, setQuery] = useState(inputValue ?? "");
    const [suggestions, setSuggestions] = useState<SearchBoxItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const fetchIdRef = useRef(0);

    useEffect(() => {
      setQuery(inputValue ?? "");
    }, [inputValue]);

    const getLabel = useCallback(
      (item: SearchBoxItem) => resolveKey(item, labelKey, "label"),
      [labelKey]
    );

    const getValueFromItem = useCallback(
      (item: SearchBoxItem) =>
        valueKey ? resolveKey(item, valueKey, "value") : getLabel(item),
      [valueKey, getLabel]
    );

    const closePanel = useCallback(() => {
      setOpen(false);
      setHighlightedIndex(-1);
    }, []);

    const selectItem = useCallback(
      (item: SearchBoxItem) => {
        const nextValue = getValueFromItem(item);
        if (!isControlled) {
          setInternalValue(nextValue);
        }
        setQuery(nextValue);
        onOptionSelect?.(item);
        closePanel();
      },
      [closePanel, getValueFromItem, isControlled, onOptionSelect]
    );

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (!containerRef.current) {
          return;
        }
        if (!containerRef.current.contains(event.target as Node)) {
          closePanel();
        }
      },
      [closePanel]
    );

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    useEffect(() => {
      if (query.length < minChars) {
        setSuggestions([]);
        setOpen(false);
        setLoading(false);
        setError(null);
        return;
      }

      const currentFetchId = ++fetchIdRef.current;
      setLoading(true);
      setError(null);
      let controller: AbortController | null = null;

      const timeoutId = window.setTimeout(async () => {
        try {
          if (fetchUrl) {
            controller = new AbortController();
            const method = (fetchOptions?.method ?? "GET").toUpperCase();
            const isPost = method === "POST";
            let requestUrl = fetchUrl;
            let requestInit: RequestInit = {
              ...fetchOptions,
              method,
              signal: controller.signal,
            };

            if (isPost) {
              if (!requestInit.body) {
                requestInit = {
                  ...requestInit,
                  headers: {
                    "Content-Type": "application/json",
                    ...(requestInit.headers ?? {}),
                  },
                  body: JSON.stringify({ [queryParam]: query }),
                };
              }
            } else {
              const params = new URLSearchParams([[queryParam, query]]);
              requestUrl = `${fetchUrl}${
                fetchUrl.includes("?") ? "&" : "?"
              }${params.toString()}`;
            }

            const response = await fetch(requestUrl, requestInit);
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`);
            }

            const result = await response.json();
            const mapped = transformResponse
              ? transformResponse(result)
              : Array.isArray(result)
              ? result
              : Array.isArray(
                  (result as { data?: unknown })?.data as SearchBoxItem[]
                )
              ? ((result as { data?: unknown }).data as SearchBoxItem[])
              : [];

            if (fetchIdRef.current === currentFetchId) {
              setSuggestions(mapped);
              setOpen(true);
              setHighlightedIndex(mapped.length > 0 ? 0 : -1);
            }
          } else if (Array.isArray(data)) {
            const lowered = query.toLowerCase();
            const filtered = data.filter((item) =>
              getLabel(item).toLowerCase().includes(lowered)
            );
            if (fetchIdRef.current === currentFetchId) {
              setSuggestions(filtered);
              setOpen(true);
              setHighlightedIndex(filtered.length > 0 ? 0 : -1);
            }
          } else {
            setSuggestions([]);
            setOpen(false);
            setHighlightedIndex(-1);
          }
        } catch (cause) {
          if (fetchIdRef.current === currentFetchId) {
            setError(cause instanceof Error ? cause.message : String(cause));
            setSuggestions([]);
            setOpen(true);
            setHighlightedIndex(-1);
          }
        } finally {
          if (fetchIdRef.current === currentFetchId) {
            setLoading(false);
          }
        }
      }, debounce);

      return () => {
        window.clearTimeout(timeoutId);
        controller?.abort();
      };
    }, [
      data,
      debounce,
      fetchOptions,
      fetchUrl,
      getLabel,
      minChars,
      query,
      queryParam,
      transformResponse,
    ]);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      const inputText = event.target.value;
      if (!isControlled) {
        setInternalValue(inputText);
      }
      setQuery(inputText);
      onSearchChange?.(inputText);
      closePanel();
      onChange?.(event);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
      if (query.length >= minChars && suggestions.length > 0) {
        setOpen(true);
      }
      onFocus?.(event);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      onBlur?.(event);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
      event
    ) => {
      if (!open) {
        onKeyDown?.(event);
        return;
      }

      if (suggestions.length === 0) {
        onKeyDown?.(event);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev + 1 >= suggestions.length ? 0 : prev + 1
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev - 1 < 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          selectItem(suggestions[highlightedIndex]);
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      } else {
        onKeyDown?.(event);
      }
    };

    const suggestionsContent = useMemo(() => {
      if (!open) {
        return null;
      }

      if (renderSuggestions) {
        return renderSuggestions({
          items: suggestions,
          loading,
          error,
          query,
          select: selectItem,
          close: closePanel,
          getLabel,
        });
      }

      return (
        <div
          className={cn(
            searchBoxPanelVariants({ variant }),
            BASE_CLASSNAMES.searchBox.panel
          )}
        >
          {loading ? (
            <div
              className={cn(
                searchBoxMessageVariants({ state: "loading", variant })
              )}
            >
              {loadingMessage}
            </div>
          ) : error ? (
            <div
              className={cn(
                searchBoxMessageVariants({ state: "error", variant })
              )}
            >
              {errorMessage}
            </div>
          ) : suggestions.length === 0 ? (
            <div
              className={cn(
                searchBoxMessageVariants({ state: "empty", variant })
              )}
            >
              {emptyMessage}
            </div>
          ) : (
            suggestions.map((item, index) => {
              const label = getLabel(item);
              const optionKey = getOptionKey
                ? getOptionKey(item, index)
                : `${label}-${index}`;
              const isActive = highlightedIndex === index;
              return (
                <button
                  key={optionKey}
                  type="button"
                  className={cn(
                    searchBoxOptionVariants({
                      density,
                      variant,
                      active: isActive,
                    }),
                    BASE_CLASSNAMES.searchBox.option
                  )}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    selectItem(item);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {renderOption(item, {
                    index,
                    isActive,
                    label,
                  })}
                </button>
              );
            })
          )}
        </div>
      );
    }, [
      closePanel,
      emptyMessage,
      error,
      errorMessage,
      getLabel,
      getOptionKey,
      highlightedIndex,
      loading,
      loadingMessage,
      open,
      query,
      renderOption,
      renderSuggestions,
      selectItem,
      suggestions,
    ]);

    return (
      <div
        ref={containerRef}
        className={cn(
          searchBoxRootVariants({ density, variant }),
          BASE_CLASSNAMES.searchBox.root
        )}
      >
        <Input
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          density={density}
          variant={variant}
          iconPosition="left"
          className={className}
          {...inputProps}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={cn(
              "text-govbr-gray-50",
              BASE_CLASSNAMES.searchBox.icon
            )}
          />
        </Input>
        {suggestionsContent}
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";

export { SearchBox };
