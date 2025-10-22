import React from "react";

import GroupOptions from ".";
import Checkbox from "../Checkbox";
import Radio from "../Radio";

export default {
  component: GroupOptions,
  title: "Form/GroupOptions",
};

const options = [
  "Ana Clara",
  "Bruno Silva",
  "Carlos Alberto",
  "Daniela Souza",
  "Eduardo Pereira",
  "Fernanda Lima",
  "Gabriel Costa",
  "Helena Martins",
  "Igor Ribeiro",
  "Juliana Alves",
  "Karen Monteiro",
  "Leonardo Duarte",
  "Marina Castro",
  "Natalia Gomes",
  "Otavio Rocha",
  "Paula Moreira",
  "Rafael Nunes",
  "Sabrina Carvalho",
  "Thiago Oliveira",
  "Vitoria Ramos",
];

export const WithCheckboxes = () => (
  <div className="max-w-lg">
    <GroupOptions pageSize={6}>
      {options.map((option) => (
        <Checkbox key={option} value={option}>
          {option}
        </Checkbox>
      ))}
    </GroupOptions>
  </div>
);

export const WithRadios = () => {
  const [value, setValue] = React.useState(options[0]);

  return (
    <div className="max-w-lg">
      <GroupOptions pageSize={5} filterPlaceholder="Buscar participantes">
        {options.map((option) => (
          <Radio
            key={option}
            name="participants"
            value={option}
            checked={value === option}
            onChange={() => setValue(option)}
          >
            {option}
          </Radio>
        ))}
      </GroupOptions>
    </div>
  );
};

export const CustomNavigation = () => (
  <div className="max-w-lg">
    <GroupOptions
      pageSize={4}
      previousButtonProps={{
        children: "Voltar",
        variant: "ghost",
      }}
      nextButtonProps={{
        children: (
          <span className="flex items-center gap-1">
            Avancar
            <span aria-hidden>→</span>
          </span>
        ),
        variant: "default",
      }}
      searchInputProps={{
        placeholder: "Filtrar perfis",
      }}
      clearButtonProps={{
        "aria-label": "Limpar busca",
      }}
      clearSelectionButtonProps={{
        "aria-label": "Limpar selecao",
      }}
    >
      {options.map((option, index) => (
        <Checkbox
          key={option}
          value={option}
          defaultChecked={index % 3 === 0}
        >
          {option}
        </Checkbox>
      ))}
    </GroupOptions>
  </div>
);
