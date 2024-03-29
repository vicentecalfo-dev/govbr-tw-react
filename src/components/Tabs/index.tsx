import { cn, getUIDClassName } from "@/src/libs/utils";
import { VariantProps } from "class-variance-authority";
import {
  ComponentProps,
  useRef,
  useState,
} from "react";
import tabsVariants from "./variants";
import tabVariants from "./tab-variants";
import tabButtonGroupVariants from "./button-group-variants";
import tabButtonVariants from "./button-variants";
import tabContentVariants from "./content-variants";
import React from "react";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";

interface TabsProps
  extends ComponentProps<"div">,
    VariantProps<typeof tabsVariants> {
  value: string;
  contentHeight?: string;
}

interface TabsTriggerProps
  extends ComponentProps<any>,
    VariantProps<typeof tabVariants> {
  value: string;
}

interface TabsContentProps
  extends ComponentProps<any>,
    VariantProps<typeof tabVariants> {
  value: string;
}

const Tabs = ({
  className,
  children,
  variant = "default",
  density = "default",
  contentHeight = "h-auto",
  onChange,
  value,
  ref,
  ...props
}: TabsProps) => {
  ref = ref === undefined ? useRef<HTMLDivElement>(null) : ref;
  const [selected, setSelected]: any = useState(value);

  const [tabsTrigger, ...tabContent]: any = React.Children.toArray(children);
  const tabId = (value: any) => `${BASE_CLASSNAMES.tabs.button}-${value}`;
  const tabContentId = (value: any) =>
    `${BASE_CLASSNAMES.tabs.content}-${value}`;

  return (
    <div
      className={cn(
        tabsVariants({ variant }),
        className,
        BASE_CLASSNAMES.tabs.root
      )}
      {...props}
    >
      <ul className={cn(tabButtonGroupVariants({ variant, density }))}>
        {tabsTrigger.props.children.map(({ props }: TabsTriggerProps) => (
          <li key={getUIDClassName()}>
            <button
              className={cn(tabButtonVariants({ variant, density }))}
              role="tablist"
              id={tabId(props.value)}
              aria-controls={tabContentId(value)}
              aria-selected={selected === props.value}
              onClick={() => setSelected(props.value)}
            >
              {props.children}
            </button>
          </li>
        ))}
      </ul>

      {tabContent.map(({ props }: TabsContentProps) => (
        <div
          key={getUIDClassName()}
          role="tabpanel"
          id={tabContentId(props.value)}
          aria-labelledby={tabId(props.value)}
          className={cn(
            tabContentVariants({ variant, density }),
            selected === props.value ? "block" : "hidden",
            contentHeight
          )}
        >
          {props.children}
        </div>
      ))}
    </div>
  );
};

const TabsTrigger: any = ({ children }: any) => children;
const TabsContent: any = ({ children }: any) => children;

Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
