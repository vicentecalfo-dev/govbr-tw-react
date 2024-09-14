import { VariantProps } from "class-variance-authority";
import selectVariants from "./variants";
import selectIconVariants from "./icon-variants";
import { ComponentProps, FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { v4 as uuidv4 } from "uuid";
import { cn } from "../../libs/utils";

interface NativeSelectProps
  extends ComponentProps<"select">,
    VariantProps<typeof selectVariants> {
  options?: any[];
  firstOption?: string;
  selected?: any;
  mapTo?: {
    label: string;
    value: string;
  };
}

const NativeSelect: FC<NativeSelectProps> = ({
  className,
  children,
  options = [],
  firstOption = "Escolha ...",
  selected = "",
  mapTo = {
    label: "label",
    value: "value",
  },
  variant = "default",
  density = "default",
  ...props
}) => {
  return (
    <div className="relative flex items-center">
      <select
        className={cn(selectVariants({ variant, density }), className)}
        value={selected}
        {...props}
      >
        <option>{firstOption}</option>
        {options.map((item) => (
          <option value={item[mapTo.value]} key={uuidv4()}>
            {item[mapTo.label]}
          </option>
        ))}
      </select>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={cn(selectIconVariants({ variant, density }))}
      />
    </div>
  );
};

export default NativeSelect;
