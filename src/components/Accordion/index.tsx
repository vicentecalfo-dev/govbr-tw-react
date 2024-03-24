import BASE_CLASSNAMES from "@/src/config/baseClassNames";
import { getUIDClassName, cn } from "@/src/libs/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ComponentProps, FC, useRef } from "react";
import accordionVariants from "./variants";
import { VariantProps } from "class-variance-authority";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

interface AccordionProps
  extends ComponentProps<"ul">,
    VariantProps<typeof accordionVariants> {
  value: string | Array<string>;
  multi?: boolean;
  icons?: Array<IconDefinition>;
  iconPosition?: "left" | "right";
  fixedHeight?: string;
}

interface AccordionItemProps extends ComponentProps<"li"> {
  value: string;
}

const AccordianContext: any = createContext(null);

const Accordion: any = ({
  className,
  children,
  value,
  onChange,
  variant = "default",
  multi = false,
  iconPosition = "right",
  fixedHeight = "",
  icons = [faChevronDown, faChevronUp],
  ...props
}: AccordionProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [selected, setSelected]: any = useState(value);

  useEffect(() => {
    onChange?.(selected);
  }, [selected]);

  return (
    <AccordianContext.Provider
      value={{
        selected,
        setSelected,
        variant,
        multi,
        icons,
        iconPosition,
        fixedHeight,
      }}
    >
      <ul
        className={cn(BASE_CLASSNAMES.accordion.root, className)}
        {...props}
        ref={listRef}
      >
        {children}
      </ul>
    </AccordianContext.Provider>
  );
};

const AccordionItem: FC<AccordionItemProps> = ({
  className,
  children,
  value,
  id,
  role,
  ...props
}) => {
  const {
    selected,
    setSelected,
    variant,
    multi,
    icons,
    iconPosition,
    fixedHeight,
  }: any = useContext(AccordianContext);
  const [iconClose, iconOpen] = icons;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const openStatus = Array.isArray(selected)
      ? selected.includes(value)
      : selected === value;
    setOpen(openStatus);
  }, [selected]);

  const toggleAccordion = () => {
    if (multi) {
      setSelected((prevSelected: string[]) => {
        prevSelected = Array.isArray(prevSelected) ? prevSelected : [];
        return prevSelected.includes(value)
          ? prevSelected.filter((item: string) => item !== value)
          : [...prevSelected, value];
      });
    } else {
      setSelected(open ? null : value);
    }
  };

  const listItemRef = useRef<HTMLLIElement>(null);
  const listTriggerRef = useRef<HTMLButtonElement>(null);
  const listContentRef = useRef<HTMLDivElement>(null);
  const [listTrigger, listContent] = React.Children.toArray(children);
  const suffixCn = getUIDClassName();
  const triggerId = `${BASE_CLASSNAMES.accordion.trigger}-${id === undefined ? suffixCn : id}`;
  const contentId = `${BASE_CLASSNAMES.accordion.content}-${id === undefined ? suffixCn : id}`;
  const contenTextStyle: any = {
    default: "text-govbr-pure-100",
    dark: "text-govbr-pure-0",
  };
  const iconPositionStyle: any = {
    left: "flex-row-reverse",
    right: "flex-row",
  };

  return (
    <li
      className={cn(BASE_CLASSNAMES.accordion.item)}
      {...props}
      ref={listItemRef}
    >
      <header
        className={cn(
          BASE_CLASSNAMES.accordion.trigger,
          accordionVariants({ variant }),
          iconPositionStyle[iconPosition],
          "py-3 px-6 border-b font-semibold flex justify-start items-center gap-6"
        )}
        ref={listTriggerRef}
        id={triggerId}
        role="button"
        aria-controls={contentId}
        aria-expanded={open}
        onClick={toggleAccordion}
      >
        <span className="flex-1">{listTrigger}</span>
        <FontAwesomeIcon icon={open ? iconOpen : iconClose} />
      </header>
      <div
        className={cn(
          "transition-all",
          fixedHeight,
          fixedHeight !== "" ? "overflow-auto" : "overflow-hidden"
        )}
        style={{ height: open ? listContentRef.current?.offsetHeight || 0 : 0 }}
      >
        <div
          className={cn(
            BASE_CLASSNAMES.accordion.content,
            contenTextStyle[variant],
            "py-3 px-6"
          )}
          ref={listContentRef}
          id={contentId}
          aria-labelledby={triggerId}
        >
          {listContent}
        </div>
      </div>
    </li>
  );
};

Accordion.Item = AccordionItem;

export default Accordion;
