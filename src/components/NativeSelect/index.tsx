import { VariantProps } from "class-variance-authority";
import selectVariants from "./variants";
import selectIconVariants from "./icon-variants";
import { ComponentProps, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/src/libs/utils";

interface NativeSelectProps
  extends ComponentProps<"select">,
    VariantProps<typeof selectVariants> {}

const NativeSelect: FC<NativeSelectProps> = ({
  className,
  children,
  variant = "default",
  density = "default",
  ...props
}) => {
  return (
    <div className="relative flex items-center">
      <select
        id="countries"
        className={cn(selectVariants({ variant, density }))}
      >
        <option selected>Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={cn(selectIconVariants({variant, density}))}
      />
    </div>
  );
};

export default NativeSelect;
