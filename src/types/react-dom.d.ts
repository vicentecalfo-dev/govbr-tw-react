import type { ReactNode, ReactPortal } from "react";

declare module "react-dom" {
  export function createPortal(
    children: ReactNode,
    container: Element | DocumentFragment | null,
    key?: null | string,
  ): ReactPortal;
}
