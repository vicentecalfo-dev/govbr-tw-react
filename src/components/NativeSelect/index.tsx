import { VariantProps } from "class-variance-authority";
import selectVariants from "./variants";
import selectIconVariants from "./icon-variants";
import { ComponentProps, FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import BASE_CLASSNAMES from "../../config/baseClassNames";
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
        id="countries"
        className={cn(selectVariants({ variant, density }))}
        {...props}
      >
        <option selected={selected === "" ? true : false}>
          {firstOption}
        </option>
        {options.map((item) => (
          <option
            value={item[mapTo.value]}
            selected={item[mapTo.value] === selected}
          >
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
