import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Persona } from ".";

export default {
  component: Persona,
  title: "Persona",
};

const people = [
  {
    id: 1,
    name: "Ana Souza",
    role: "Analista de Sistemas",
    imageId: 3,
  },
  {
    id: 2,
    name: "Bruno Rocha",
    role: "Product Owner",
    imageId: 5,
  },
  {
    id: 3,
    name: "Carla Nunes",
    role: "Líder Técnica",
    imageId: 7,
  },
];

export const Basic = () => (
  <div className="flex flex-col gap-4">
    {people.map((person) => (
      <Persona key={person.id} >
        <Persona.Avatar>
          <Avatar
            size="small"
            variant="image"
            src={`https://i.pravatar.cc/150?img=${person.imageId}`}
            title={person.name}
          />
        </Persona.Avatar>
        <Persona.Info primaryText={person.name} secondaryText={person.role} />
        <Persona.Action>
          <Button variant="ghost" size="icon" aria-label="Abrir opções">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
        </Persona.Action>
      </Persona>
    ))}
  </div>
);

export const WithoutAction = () => (
  <Persona className="rounded-lg border border-govbr-gray-20 bg-white p-3 shadow-sm">
    <Persona.Avatar>
      <Avatar
        size="small"
        variant="initials"
        title="Diego Martins"
      />
    </Persona.Avatar>
    <Persona.Info
      primaryText="Diego Martins"
      secondaryText="Consultor Externo"
    />
  </Persona>
);

export const CustomAction = () => (
  <Persona className="rounded-lg border border-govbr-gray-20 bg-white p-3 shadow-sm">
    <Persona.Avatar>
      <Avatar
        size="small"
        variant="image"
        src="https://i.pravatar.cc/150?img=12"
        title="Henrique Silva"
      />
    </Persona.Avatar>
    <Persona.Info
      primaryText="Henrique Silva"
      secondaryText="Gestor de Projetos"
    />
    <Persona.Action>
      <span className="rounded-full bg-govbr-green-warm-vivid-20 px-3 py-1 text-xs font-semibold uppercase text-govbr-green-warm-vivid-80">
        ativo
      </span>
    </Persona.Action>
  </Persona>
);
