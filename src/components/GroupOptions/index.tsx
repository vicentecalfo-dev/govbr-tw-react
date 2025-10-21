import type {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from "react";
import { Children, cloneElement, useEffect, useMemo, useState } from "react";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import Input from "../Input";
import { Button } from "../Button";
import Checkbox from "../Checkbox";
import Radio from "../Radio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type InputProps = ComponentProps<typeof Input>;
type ButtonProps = ComponentProps<typeof Button>;

interface GroupOptionsProps
  extends ComponentPropsWithoutRef<"div">,
    Pick<InputProps, "hint" | "density"> {
  children: ReactNode;
  pageSize?: number;
  filterPlaceholder?: string;
  emptyMessage?: string;
  searchInputProps?: Omit<InputProps, "value" | "onChange" | "hint" | "density">;
  previousButtonProps?: Omit<ButtonProps, "onClick" | "disabled">;
  nextButtonProps?: Omit<ButtonProps, "onClick" | "disabled">;
  clearButtonProps?: Omit<ButtonProps, "onClick" | "disabled">;
  clearable?: boolean;
  clearSelectionButtonProps?: Omit<ButtonProps, "onClick" | "disabled">;
  clearSelection?: boolean;
}

const getNodeText = (node: ReactNode): string => {
  if (node === null || node === undefined) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) {
    return node.map(getNodeText).join(" ");
  }
  if ((node as ReactElement)?.props?.children) {
    return getNodeText((node as ReactElement).props.children);
  }
  return "";
};

type GroupOptionItem = {
  element: ReactElement;
  key: string;
  label: string;
  optionType: "checkbox" | "radio" | "other";
  isControlled: boolean;
  initialChecked: boolean;
};

const GroupOptions = ({
  children,
  pageSize = 8,
  filterPlaceholder = "Filtrar opcoes",
  emptyMessage = "Nenhuma opcao encontrada.",
  className,
  hint,
  density = "default",
  searchInputProps,
  previousButtonProps,
  nextButtonProps,
  clearButtonProps,
  clearable = true,
  clearSelectionButtonProps,
  clearSelection = true,
  ...props
}: GroupOptionsProps) => {
  const [selection, setSelection] = useState<Record<string, boolean>>({});

  const allItems = useMemo<GroupOptionItem[]>(() => {
    return Children.toArray(children)
      .filter(Boolean)
      .map((child, index) => {
        const element = child as ReactElement;
        const key = String(element.key ?? `group-option-${index}`);
        const label = getNodeText(element.props?.children);
        const optionType =
          element.type === Checkbox
            ? "checkbox"
            : element.type === Radio
            ? "radio"
            : "other";
        const isControlled = element.props?.checked !== undefined;
        const initialChecked =
          optionType === "checkbox"
            ? Boolean(
                element.props?.checked ?? element.props?.defaultChecked ?? false
              )
            : false;
        return { element, key, label, optionType, isControlled, initialChecked };
      });
  }, [children]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return allItems;
    return allItems.filter(({ label }) => {
      return label.toLowerCase().includes(normalized);
    });
  }, [allItems, search]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (safePage - 1) * pageSize;
    return filteredItems.slice(startIndex, startIndex + pageSize);
  }, [filteredItems, pageSize, safePage]);

  const hasItems = filteredItems.length > 0;
  const displayCurrentPage = hasItems ? safePage : 0;
  const displayTotalPages = hasItems ? totalPages : 0;
  const selectionCount = useMemo(() => {
    return allItems.reduce((count, item) => {
      if (item.optionType === "checkbox") {
        if (item.isControlled) {
          return item.element.props?.checked ? count + 1 : count;
        }
        return selection[item.key] ? count + 1 : count;
      }
      if (item.optionType === "radio") {
        if (item.isControlled) {
          return item.element.props?.checked ? count + 1 : count;
        }
      }
      return count;
    }, 0);
  }, [allItems, selection]);

  useEffect(() => {
    setSelection((prev) => {
      const next = { ...prev };
      let changed = false;
      const keys = new Set(allItems.map((item) => item.key));

      allItems.forEach((item) => {
        if (item.optionType !== "checkbox" || item.isControlled) {
          return;
        }

        if (!(item.key in next)) {
          next[item.key] = item.initialChecked;
          changed = true;
        }
      });

      Object.keys(next).forEach((key) => {
        if (!keys.has(key)) {
          delete next[key];
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [allItems]);

  useEffect(() => {
    setPage(1);
  }, [search, pageSize]);

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }
  }, [page, safePage]);

  const createSyntheticEvent = (
    checked: boolean,
    item: GroupOptionItem
  ): ChangeEvent<HTMLInputElement> => {
    const target = {
      checked,
      value: item.element.props?.value,
      name: item.element.props?.name,
    } as HTMLInputElement;

    return {
      target,
      currentTarget: target,
    } as unknown as ChangeEvent<HTMLInputElement>;
  };

  const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setPage((prev) => Math.min(totalPages, prev + 1));
  const handleClearSelection = () => {
    const nextSelection = { ...selection };
    let shouldUpdateState = false;

    allItems.forEach((item) => {
      if (item.optionType === "checkbox") {
        if (item.isControlled) {
          if (item.element.props?.checked && item.element.props?.onChange) {
            item.element.props.onChange(createSyntheticEvent(false, item));
          }
        } else if (item.key in nextSelection) {
          if (nextSelection[item.key]) {
            nextSelection[item.key] = false;
            shouldUpdateState = true;
          }
        }
      } else if (item.optionType === "radio") {
        if (
          item.isControlled &&
          item.element.props?.checked &&
          item.element.props?.onChange
        ) {
          item.element.props.onChange(createSyntheticEvent(false, item));
        }
      }
    });

    if (shouldUpdateState) {
      setSelection(nextSelection);
    }
  };

  const { children: previousChildren, ...previousRest } =
    previousButtonProps ?? {};
  const { children: nextChildren, ...nextRest } = nextButtonProps ?? {};
  const { children: clearChildren, ...clearRest } = clearButtonProps ?? {};
  const { children: clearSelectionChildren, ...clearSelectionRest } =
    clearSelectionButtonProps ?? {};
  const buttonDensity = (density === "lowest" ? "low" : density) as
    | ButtonProps["density"]
    | undefined;

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4",
        BASE_CLASSNAMES.groupOptions?.root,
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={filterPlaceholder}
            density={density}
            hint={hint}
            {...searchInputProps}
          />
        </div>
        <div className="flex items-center gap-2">
          {clearable && (
            <Button
              size="icon"
              variant="ghost"
            density={buttonDensity}
            onClick={() => setSearch("")}
            disabled={search.length === 0}
            aria-label="Limpar filtro"
            {...clearRest}
          >
              {clearChildren ?? <FontAwesomeIcon icon={faXmark} />}
            </Button>
          )}
          {clearSelection && (
            <div className="relative">
              <Button
                size="icon"
                variant="ghost"
                density={buttonDensity}
                onClick={handleClearSelection}
                disabled={selectionCount === 0}
                aria-label="Limpar selecao"
                {...clearSelectionRest}
              >
                {clearSelectionChildren ?? <FontAwesomeIcon icon={faTrash} />}
              </Button>
              {selectionCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[1.25rem] items-center justify-center rounded-full bg-govbr-red-vivid-50 px-1 text-[0.625rem] font-semibold text-govbr-pure-0">
                  {selectionCount > 99 ? "99+" : selectionCount}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex max-h-80 flex-col gap-3 overflow-y-auto pr-1",
          BASE_CLASSNAMES.groupOptions?.list
        )}
      >
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => {
            const { element, key, optionType, isControlled } = item;

            const shouldControl =
              optionType === "checkbox" && !isControlled && key in selection;

            const augmentedElement = shouldControl
              ? cloneElement(element, {
                  checked: selection[key] ?? false,
                  defaultChecked: undefined,
                  onChange: (event: ChangeEvent<HTMLInputElement>) => {
                    setSelection((prev) => ({
                      ...prev,
                      [key]: event.target.checked,
                    }));
                    element.props?.onChange?.(event);
                  },
                })
              : element;

            return (
              <div key={key} className="w-full">
                {augmentedElement}
              </div>
            );
          })
        ) : (
          <span className="text-sm text-govbr-gray-60">{emptyMessage}</span>
        )}
      </div>

      <div
        className={cn(
          "flex items-center justify-between gap-3",
          BASE_CLASSNAMES.groupOptions?.footer
        )}
      >
        <span className="text-xs text-govbr-gray-60">
          Pagina {displayCurrentPage} de {displayTotalPages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            density={buttonDensity}
            onClick={handlePrev}
            disabled={safePage === 1 || filteredItems.length === 0}
            {...previousRest}
          >
            {previousChildren ?? <FontAwesomeIcon icon={faChevronLeft} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            density={buttonDensity}
            onClick={handleNext}
            disabled={safePage === totalPages || filteredItems.length === 0}
            {...nextRest}
          >
            {nextChildren ?? <FontAwesomeIcon icon={faChevronRight} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupOptions;
