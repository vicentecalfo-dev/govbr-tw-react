import React, { useMemo, useState } from "react";

import { SearchBox } from ".";

export default {
  component: SearchBox,
  title: "SearchBox",
};

const staticCities = [
  { id: 1, name: "Brasilia", state: "DF" },
  { id: 2, name: "Sao Paulo", state: "SP" },
  { id: 3, name: "Rio de Janeiro", state: "RJ" },
  { id: 4, name: "Belo Horizonte", state: "MG" },
  { id: 5, name: "Salvador", state: "BA" },
  { id: 6, name: "Fortaleza", state: "CE" },
  { id: 7, name: "Curitiba", state: "PR" },
  { id: 8, name: "Recife", state: "PE" },
  { id: 9, name: "Manaus", state: "AM" },
  { id: 10, name: "Porto Alegre", state: "RS" },
];

export const StaticData = () => {
  const [selection, setSelection] = useState<string>("");

  return (
    <div className="flex flex-col gap-4">
      <SearchBox
        placeholder="Busque uma cidade"
        data={staticCities}
        labelKey="name"
        renderOption={(item, { label, isActive }) => {
          const city = item as { state?: string };
          return (
            <div className="flex w-full items-center justify-between">
              <span className={isActive ? "font-semibold" : "font-medium"}>
                {label}
              </span>
              <span className="text-xs uppercase text-govbr-gray-70">
                {city.state}
              </span>
            </div>
          );
        }}
        onOptionSelect={(item) => {
          const city = item as { name?: string; state?: string };
          setSelection(`${city.name ?? ""} - ${city.state ?? ""}`);
        }}
      />
      <div className="text-sm text-govbr-gray-90">
        Selecionado:{" "}
        <span className="font-semibold">
          {selection || "Nenhuma cidade selecionada"}
        </span>
      </div>
    </div>
  );
};

export const RemoteData = () => {
  const [selection, setSelection] = useState<string>("");
  const fetchUrl = "https://api.inaturalist.org/v1/taxa/autocomplete";

  return (
    <div className="flex flex-col gap-4">
      <SearchBox
        placeholder="Buscar no iNaturalist"
        minChars={3}
        fetchUrl={fetchUrl}
        queryParam="q"
        transformResponse={(response: any) =>
          (response?.results ?? []).map((t: any) => ({ id: t.id, name: t.name, preferred_common_name: t.preferred_common_name }))
        }
        labelKey="taxon"
        renderOption={(item:any, { isActive }) => {
          return (
            <div className="flex flex-col">
              <span className={isActive ? "font-semibold" : "font-medium"}>
                {item.name}
              </span>
              <span className="text-xs text-govbr-gray-60">
                {item.id}
              </span>
            </div>
          );
        }}
        onOptionSelect={(item:any) => {
          setSelection(item.id ?? "");
        }}
        emptyMessage="Nenhuma espécie encontrada"
      />
      <div className="text-sm text-govbr-gray-90">
        Selecionado:{" "}
        <span className="font-semibold">
          {selection || "Nenhuma espécie selecionada"}
        </span>
      </div>
    </div>
  );
};

export const CustomList = () => {
  const [history, setHistory] = useState<string[]>([]);

  const services = useMemo(
    () => [
      {
        id: 1,
        title: "Portal Gov.br",
        description: "Acesse servicos digitais do governo.",
      },
      {
        id: 2,
        title: "Meu INSS",
        description: "Consulte beneficios e extratos do INSS.",
      },
      {
        id: 3,
        title: "Receita Federal",
        description: "Regularize CPF, IRPF e outras demandas.",
      },
      {
        id: 4,
        title: "Carteira de Trabalho Digital",
        description: "Verifique contratos e beneficios trabalhistas.",
      },
      {
        id: 5,
        title: "Portal do Empreendedor",
        description: "Servicos para MEI e pequenas empresas.",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-6">
      <SearchBox
        placeholder="Buscar servicos"
        data={services}
        labelKey="title"
        renderSuggestions={({ items, loading, error, select, query, getLabel }) => (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-lg border border-govbr-gray-20 bg-white shadow-lg">
            <div className="border-b border-govbr-gray-10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-govbr-gray-60">
              Resultados para "{query}"
            </div>
            {loading ? (
              <div className="px-4 py-4 text-sm text-govbr-gray-70">
                Procurando servicos...
              </div>
            ) : error ? (
              <div className="px-4 py-4 text-sm text-govbr-danger-60">
                Algo deu errado. Tente novamente.
              </div>
            ) : items.length === 0 ? (
              <div className="px-4 py-4 text-sm text-govbr-gray-70">
                Nada encontrado.
              </div>
            ) : (
              <ul className="divide-y divide-govbr-gray-10">
                {items.map((item, index) => {
                  const service = item as {
                    id?: number;
                    description?: string;
                    title?: string;
                  };
                  return (
                    <li key={service.id ?? index}>
                      <button
                        type="button"
                        className="flex w-full flex-col gap-1 px-4 py-3 text-left hover:bg-govbr-gray-10"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          select(service);
                        }}
                      >
                        <span className="text-sm font-semibold text-govbr-blue-warm-vivid-70">
                          {getLabel(service)}
                        </span>
                        <span className="text-xs text-govbr-gray-70">
                          {service.description}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
        onOptionSelect={(item) => {
          const service = item as { title?: string };
          setHistory((prev) =>
            [service.title ?? "", ...prev.filter(Boolean)].slice(0, 5)
          );
        }}
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-70">
          Historico
        </p>
        <ul className="mt-2 flex flex-wrap gap-2 text-sm text-govbr-gray-90">
          {history.length === 0
            ? "Nenhuma busca ainda."
            : history.map((entry, index) => (
                <li
                  key={index}
                  className="rounded-full bg-govbr-gray-10 px-3 py-1"
                >
                  {entry}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export const Densities = () => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-70">
        density = lowest
      </span>
      <SearchBox
        placeholder="Buscar servicos"
        data={staticCities}
        labelKey="name"
        density="lowest"
      />
    </div>
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-70">
        density = low
      </span>
      <SearchBox
        placeholder="Buscar servicos"
        data={staticCities}
        labelKey="name"
        density="low"
      />
    </div>
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-70">
        density = default
      </span>
      <SearchBox
        placeholder="Buscar servicos"
        data={staticCities}
        labelKey="name"
        density="default"
      />
    </div>
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-70">
        density = high
      </span>
      <SearchBox
        placeholder="Buscar servicos"
        data={staticCities}
        labelKey="name"
        density="high"
      />
    </div>
  </div>
);
