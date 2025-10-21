import { createContext, useContext } from "react";
import type { VariantProps } from "class-variance-authority";

import buttonVariants from "../Button/variants";
import buttonGroupVariants from "./variants";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type ButtonGroupVariantProps = VariantProps<typeof buttonGroupVariants>;

export type ButtonGroupContextValue = {
  variant?: ButtonVariantProps["variant"];
  density?: ButtonVariantProps["density"];
  size?: ButtonVariantProps["size"];
  disabled?: boolean;
  separated: boolean;
  orientation: NonNullable<ButtonGroupVariantProps["orientation"]>;
  level: number;
};

const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

export const ButtonGroupProvider = ButtonGroupContext.Provider;

export const useButtonGroupContext = () => useContext(ButtonGroupContext);
