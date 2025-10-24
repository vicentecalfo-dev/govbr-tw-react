// Kbd.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Kbd, { type KbdProps } from ".";

const meta: Meta<KbdProps> = {
  title: "Kbd",
  component: Kbd,
  args: {
    variant: "default",
    size: "xs",
    density: "default",
    pill: false,
    muted: false,
    os: "auto",
    separator: "+",
  },
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<KbdProps>;

/** 1) Tecla única (básico) */
export const Single: Story = {
  args: { children: "Esc" },
};

/** 2) Combo Mod+K (auto-detecta: ⌘K no mac, Ctrl K no win) */
export const ComboModK: Story = {
  args: { keys: ["Mod", "K"] },
};

/** 3) Combo com três teclas + separador custom */
export const ComboTriple: Story = {
  args: { keys: ["Shift", "Mod", "P"], separator: "·" },
};

/** 4) Tamanhos */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-70 w-14">xs</span>
        <Kbd {...args} size="xs">Tab</Kbd>
        <Kbd {...args} size="xs" keys={["Mod", "K"]} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-70 w-14">sm</span>
        <Kbd {...args} size="sm">Enter</Kbd>
        <Kbd {...args} size="sm" keys={["Shift", "Enter"]} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-70 w-14">md</span>
        <Kbd {...args} size="md">Space</Kbd>
        <Kbd {...args} size="md" keys={["Alt", "ArrowUp"]} />
      </div>
    </div>
  ),
};

/** 5) Variantes visuais */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-70 w-16">default</span>
        <Kbd {...args} variant="default">Cmd</Kbd>
        <Kbd {...args} variant="default" keys={["Mod", "K"]} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-70 w-16">subtle</span>
        <Kbd {...args} variant="subtle">Esc</Kbd>
        <Kbd {...args} variant="subtle" keys={["Ctrl", "S"]} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-70 w-16">outline</span>
        <Kbd {...args} variant="outline">Tab</Kbd>
        <Kbd {...args} variant="outline" keys={["Shift", "Tab"]} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-70 w-16">ghost</span>
        <Kbd {...args} variant="ghost">Enter</Kbd>
        <Kbd {...args} variant="ghost" keys={["Mod", "P"]} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-70 w-16">dark</span>
        <div className="rounded-md p-2 bg-govbr-blue-warm-vivid-90">
          <Kbd {...args} variant="dark" size="sm">Esc</Kbd>
          <span className="mx-2" />
          <Kbd {...args} variant="dark" size="sm" keys={["Mod", "K"]} />
        </div>
      </div>
    </div>
  ),
};

/** 6) Pill + muted */
export const PillMuted: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Kbd {...args} pill>Esc</Kbd>
      <Kbd {...args} pill keys={["Mod", "K"]} />
      <Kbd {...args} pill muted>Enter</Kbd>
    </div>
  ),
  args: { variant: "subtle", size: "sm" },
};

/** 7) OS fixo: mac ou win */
export const FixedOs: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-xs opacity-70 mb-1">os="mac"</p>
        <Kbd {...args} os="mac" keys={["Mod", "K"]} />
      </div>
      <div>
        <p className="text-xs opacity-70 mb-1">os="win"</p>
        <Kbd {...args} os="win" keys={["Mod", "K"]} />
      </div>
    </div>
  ),
};

/** 8) Cores custom (Tailwind overrides) */
export const CustomColors: Story = {
  args: {
    keys: ["Shift", "Mod", "S"],
    colors: {
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-300",
      shadow: "shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.02),0_1px_0_0_rgba(0,0,0,0.05)]",
    },
  },
};

/** 9) Setas e teclas especiais */
export const ArrowsAndSpecials: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Kbd {...args}>ArrowUp</Kbd>
      <Kbd {...args}>ArrowDown</Kbd>
      <Kbd {...args}>ArrowLeft</Kbd>
      <Kbd {...args}>ArrowRight</Kbd>
      <Kbd {...args}>Backspace</Kbd>
      <Kbd {...args}>Delete</Kbd>
      <Kbd {...args}>Return</Kbd>
      <Kbd {...args}>Space</Kbd>
    </div>
  ),
};
