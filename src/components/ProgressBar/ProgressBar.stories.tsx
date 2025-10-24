import React, { useEffect, useState } from "react";
import ProgressBar from "."; // ajuste o caminho, se necessário

export default {
  component: ProgressBar,
  title: "ProgressBar",
};

export const Default = () => {
  const [value, setValue] = useState(35);
  return (
    <div className="flex flex-col gap-4 w-[720px]">
      <div className="flex items-center gap-3 text-sm">
        <label htmlFor="range-default" className="min-w-24 opacity-80">
          Valor
        </label>
        <input
          id="range-default"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value, 10))}
          className="w-full"
        />
        <span className="w-12 text-right tabular-nums">{value}%</span>
      </div>

      <ProgressBar value={value} />

      <br />

      <ProgressBar value={value} hideLabelOnComplete={false} />
    </div>
  );
};

export const Variants = () => {
  const [value, setValue] = useState(60);
  const common = (
    <div className="flex items-center gap-3 text-sm">
      <label htmlFor="range-variants" className="min-w-24 opacity-80">
        Valor
      </label>
      <input
        id="range-variants"
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        className="w-full"
      />
      <span className="w-12 text-right tabular-nums">{value}%</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-[720px]">
      {common}
      <ProgressBar value={value} variant="default" label="Carregando ..." />
      <ProgressBar value={value} variant="success" label="Sucesso" />
      <ProgressBar value={value} variant="danger" label="Atenção" />
      <ProgressBar value={value} variant="warning" label="Aviso" />
      <ProgressBar value={value} variant="info" label="Informação" />
    </div>
  );
};

export const Dark = () => {
  const [value, setValue] = useState(45);
  return (
    <div className="flex flex-col gap-4 w-[720px] bg-govbr-blue-warm-vivid-90 p-6 rounded">
      <div className="flex items-center gap-3 text-sm text-govbr-pure-0">
        <label htmlFor="range-dark" className="min-w-24 opacity-80">
          Valor
        </label>
        <input
          id="range-dark"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value, 10))}
          className="w-full"
        />
        <span className="w-12 text-right tabular-nums">{value}%</span>
      </div>

      <ProgressBar value={value} theme="dark" />
      <ProgressBar
        value={value}
        theme="dark"
        variant="success"
        label="Processando"
      />
      <ProgressBar value={value} theme="dark" variant="danger" label="Falha" />
    </div>
  );
};

export const Density = () => {
  const [value, setValue] = useState(70);
  return (
    <div className="flex flex-col gap-4 w-[720px]">
      <div className="flex items-center gap-3 text-sm">
        <label htmlFor="range-density" className="min-w-24 opacity-80">
          Valor
        </label>
        <input
          id="range-density"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value, 10))}
          className="w-full"
        />
        <span className="w-12 text-right tabular-nums">{value}%</span>
      </div>

      <ProgressBar value={value} density="lowest" label="lowest" />
      <ProgressBar value={value} density="low" label="low" />
      <ProgressBar value={value} density="default" label="default" />
      <ProgressBar value={value} density="high" label="high" />
    </div>
  );
};

export const CustomColors = () => {
  const [value, setValue] = useState(55);
  return (
    <div className="flex flex-col gap-4 w-[720px]">
      <div className="flex items-center gap-3 text-sm">
        <label htmlFor="range-custom" className="min-w-24 opacity-80">
          Valor
        </label>
        <input
          id="range-custom"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value, 10))}
          className="w-full"
        />
        <span className="w-12 text-right tabular-nums">{value}%</span>
      </div>

      {/* Trilho e barra customizados via Tailwind */}
      <ProgressBar
        value={value}
        trackClassName="bg-teal-100"
        progressClassName="bg-teal-500"
        label="Teal - Loading ..."
      />

      <ProgressBar
        value={value}
        trackClassName="bg-pink-500/20"
        progressClassName="bg-pink-500"
        label="Pink - Carregando ..."
      />
    </div>
  );
};

export const WithoutLabels = () => {
  const [value, setValue] = useState(30);
  return (
    <div className="flex flex-col gap-4 w-[720px]">
      <div className="flex items-center gap-3 text-sm">
        <label htmlFor="range-nolabels" className="min-w-24 opacity-80">
          Valor
        </label>
        <input
          id="range-nolabels"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value, 10))}
          className="w-full"
        />
        <span className="w-12 text-right tabular-nums">{value}%</span>
      </div>

      <ProgressBar value={value} showLabels={false} />
    </div>
  );
};

export const SatisfactionScale = () => {
  return (
    <div className="flex flex-col gap-4 w-[720px]">
      {/* Trilho e barra customizados via Tailwind */}
      <ProgressBar
        value={20}
        progressClassName="bg-red-600"
        label="Escala de Satisfação"
        progresslabel="2/10"
        hideLabelOnComplete={false}
      />

      <ProgressBar
        value={50}
        progressClassName="bg-yellow-500"
        label="Escala de Satisfação"
        progresslabel="5/10"
        hideLabelOnComplete={false}
      />

      <ProgressBar
        value={100}
        progressClassName="bg-green-700"
        label="Escala de Satisfação"
        progresslabel="10/10"
        hideLabelOnComplete={false}
      />
    </div>
  );
};
