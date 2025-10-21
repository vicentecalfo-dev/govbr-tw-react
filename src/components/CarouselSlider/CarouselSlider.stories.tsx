import React, { useMemo, useState } from "react";

import CarouselSlider from ".";
import { Button } from "../Button";

const cards = Array.from({ length: 12 }).map((_, index) => ({
  title: `Card ${index + 1}`,
  description:
    "Exemplo de conteudo que pode ser exibido dentro do slide. Utilize para resumos curtos.",
}));

export default {
  component: CarouselSlider,
  title: "CarouselSlider",
};

export const SingleItem = () => (
  <div className="max-w-3xl p-6">
    <CarouselSlider itemsPerView={1}>
      {cards.slice(0, 4).map((card) => (
        <article key={card.title} className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-sm opacity-70">{card.description}</p>
          <Button size="auto">Saiba mais</Button>
        </article>
      ))}
    </CarouselSlider>
  </div>
);

export const MultipleItems = () => (
  <div className="max-w-5xl p-6">
    <CarouselSlider itemsPerView={2}>
      {cards.map((card) => (
        <article key={card.title} className="flex h-full flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-govbr-blue-warm-vivid-70">
            Destaque
          </span>
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="flex-1 text-sm opacity-70">{card.description}</p>
          <Button variant="ghost" className="self-start">
            Ver detalhes
          </Button>
        </article>
      ))}
    </CarouselSlider>
  </div>
);

export const SixItems = () => (
  <div className="max-w-6xl p-6">
    <CarouselSlider itemsPerView={6} showIndicators={false}>
      {cards.map((card) => (
        <article key={card.title} className="flex h-full flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-govbr-yellow-vivid-20">
            Sprint
          </span>
          <h3 className="text-sm font-semibold">{card.title}</h3>
          <p className="text-xs opacity-70">{card.description}</p>
        </article>
      ))}
    </CarouselSlider>
  </div>
);

export const DarkTheme = () => (
  <div className="max-w-5xl bg-govbr-blue-warm-vivid-90 p-6">
    <CarouselSlider itemsPerView={3} variant="dark" loop density="compact">
      {cards.map((card) => (
        <article key={card.title} className="flex h-full flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-govbr-blue-warm-20">
            Sugestao
          </span>
          <h3 className="text-lg font-semibold text-govbr-pure-0">
            {card.title}
          </h3>
          <p className="flex-1 text-sm text-govbr-blue-warm-20/80">
            {card.description}
          </p>
          <Button variant="ghost-dark" className="self-start">
            Acessar
          </Button>
        </article>
      ))}
    </CarouselSlider>
  </div>
);

export const ControlledItems = () => {
  const [itemsPerView, setItemsPerView] = useState<number>(1);

  const buttons = useMemo(
    () => [
      { label: "1 item", value: 1 },
      { label: "2 itens", value: 2 },
      { label: "3 itens", value: 3 },
      { label: "6 itens", value: 6 },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap gap-2">
        {buttons.map((option) => (
          <Button
            key={option.value}
            variant={itemsPerView === option.value ? "default" : "ghost"}
            onClick={() => setItemsPerView(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <CarouselSlider itemsPerView={itemsPerView} showIndicators>
        {cards.map((card) => (
          <article key={card.title} className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-sm opacity-80">{card.description}</p>
            <Button size="auto">Visitar</Button>
          </article>
        ))}
      </CarouselSlider>
    </div>
  );
};
