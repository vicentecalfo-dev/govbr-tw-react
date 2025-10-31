import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Slider, { type SliderProps } from ".";

const meta: Meta<SliderProps> = {
  title: "Slider",
  component: Slider,
  args: {
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    density: "default",
    variant: "default",
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<SliderProps>;

/** 1) Slider padrão (não controlado) */
export const Default: Story = {
  render: () => {
    const sliderArgs = {
      defaultValue: 40,
      onChange: (v: number | [number, number]) => console.log("Slider value:", v),
    };
    return (
      <div className="flex w-[360px] flex-col gap-2">
        <Slider {...sliderArgs} />
      </div>
    );
  },
};

/** 2) Controlado externamente */
export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState(60);
    return (
      <div className="flex w-[360px] flex-col gap-2">
        <Slider
          {...args}
          value={val}
          onChange={(next) => {
            if (typeof next === "number") setVal(next);
          }}
        />
        <p className="text-sm opacity-70">Valor atual: {val}</p>
      </div>
    );
  },
  args: {
    min: 0,
    max: 200,
    step: 5,
  },
};

/** 3) Densidades */
export const Densities: Story = {
  render: (args) => (
    <div className="space-y-6 w-[420px]">
      <div>
        <p className="text-sm mb-1 opacity-70">lowest</p>
        <Slider {...args} density="lowest" defaultValue={30} />
      </div>
      <div>
        <p className="text-sm mb-1 opacity-70">low</p>
        <Slider {...args} density="low" defaultValue={50} />
      </div>
      <div>
        <p className="text-sm mb-1 opacity-70">default</p>
        <Slider {...args} density="default" defaultValue={70} />
      </div>
      <div>
        <p className="text-sm mb-1 opacity-70">high</p>
        <Slider {...args} density="high" defaultValue={90} />
      </div>
    </div>
  ),
};

/** 4) Variantes */
export const Variants: Story = {
  render: (args) => (
    <div className="space-y-6 w-[420px]">
      <div>
        <p className="text-sm mb-1 opacity-70">default</p>
        <Slider {...args} variant="default" defaultValue={20} />
      </div>
      <div>
        <p className="text-sm mb-1 opacity-70 text-red-600">danger</p>
        <Slider {...args} variant="danger" defaultValue={40} />
      </div>
      <div>
        <p className="text-sm mb-1 opacity-70 text-green-600">success</p>
        <Slider {...args} variant="success" defaultValue={60} />
      </div>
      <div>
        <p className="text-sm mb-1 opacity-70 text-yellow-600">warning</p>
        <Slider {...args} variant="warning" defaultValue={80} />
      </div>
    </div>
  ),
};

/** 5) Desabilitado */
export const Disabled: Story = {
  render: (args) => {
    const [val, setVal] = useState(60);
    return (
      <div className="flex w-[360px] flex-col gap-2">
        <Slider
          {...args}
          value={val}
          onChange={(next) => {
            if (typeof next === "number") setVal(next);
          }}
          disabled
        />
        <p className="text-sm opacity-70">Valor atual: {val}</p>
      </div>
    );
  },
  args: {
    min: 0,
    max: 200,
    step: 5,
  },
};

/** 6) Com cores customizadas (Tailwind classes) */
export const CustomColors: Story = {
  render: (args) => {
    const [val, setVal] = useState(60);
    return (
      <div className="flex w-[360px] flex-col gap-2">
        <Slider
          {...args}
          value={val}
          onChange={(next) => {
            if (typeof next === "number") setVal(next);
          }}
        />
        <p className="text-sm opacity-70">Valor atual: {val}</p>
      </div>
    );
  },
  args: {
    defaultValue: 65,
    colors: {
      trail: "bg-zinc-200",
      level: "bg-fuchsia-500",
      thumb: "bg-fuchsia-200 !border-fuchsia-500 shadow-lg",
    },
  },
};

/** 7) Slider controlado com integração visual */
export const DynamicDemo: Story = {
  render: () => {
    const [val, setVal] = useState(30);
    const colors = {
      trail: "bg-zinc-200",
      level: val < 30
        ? "bg-red-500"
        : val < 70
        ? "bg-yellow-400"
        : "bg-green-500",
      thumb: val < 30
        ? "!border-red-500"
        : val < 70
        ? "!border-yellow-400"
        : "!border-green-500",
    };

    return (
      <div className="w-[400px] space-y-3">
        <p className="text-sm opacity-70">Valor: {val}</p>
        <Slider
          min={0}
          max={100}
          step={5}
          value={val}
          onChange={(next) => {
            if (typeof next === "number") setVal(next);
          }}
          showValue
          colors={colors}
        />
      </div>
    );
  },
};

export const Range: Story = {
  render: (args) => {
    const [rangeValue, setRangeValue] = useState<[number, number]>([20, 70]);
    return (
      <div className="w-[400px] space-y-3">
        <p className="text-sm opacity-70">
          Intervalo: {rangeValue[0]} - {rangeValue[1]}
        </p>
        <Slider
          {...args}
          range
          min={0}
          max={100}
          step={5}
          value={rangeValue}
          onChange={(next) => {
            if (Array.isArray(next)) setRangeValue(next);
          }}
          showValue={false}
        />
      </div>
    );
  },
  args: {
    density: "default",
    variant: "default",
  },
};
