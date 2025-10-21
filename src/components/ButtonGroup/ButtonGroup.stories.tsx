import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCheck,
  faEllipsis,
  faGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "../Button";
import { ButtonGroup } from ".";

export default {
  component: ButtonGroup,
  title: "ButtonGroup",
};

const wrapper = "flex flex-col gap-6 p-6";

export const Default = () => (
  <div className={wrapper}>
    <ButtonGroup>
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  </div>
);

export const WithVariants = () => (
  <div className={wrapper}>
    <ButtonGroup variant="outline">
      <Button>Outline</Button>
      <Button>Outline</Button>
      <Button>Outline</Button>
    </ButtonGroup>

    <ButtonGroup variant="default-success" density="high">
      <Button>
        <FontAwesomeIcon icon={faCheck} /> Aprovar
      </Button>
      <Button>
        <FontAwesomeIcon icon={faUserPlus} /> Delegar
      </Button>
      <Button>
        <FontAwesomeIcon icon={faBolt} /> Automatizar
      </Button>
    </ButtonGroup>
  </div>
);

export const Vertical = () => (
  <div className={wrapper}>
    <ButtonGroup orientation="vertical" className="w-40">
      <Button density="low">Opcao A</Button>
      <Button density="low">Opcao B</Button>
      <Button density="low">Opcao C</Button>
    </ButtonGroup>
  </div>
);

export const Separated = () => (
  <div className={wrapper}>
    <ButtonGroup separated className="flex-wrap items-center">
       <ButtonGroup>
      <Button>
        <FontAwesomeIcon icon={faBolt} /> Emergencia
      </Button>
      <Button variant="outline">Avisar</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="icon" variant="ghost-danger">
          <FontAwesomeIcon icon={faEllipsis} />
        </Button>
      </ButtonGroup>
      <Button size="icon" variant="ghost-danger">
        <FontAwesomeIcon icon={faBolt} />
      </Button>
    </ButtonGroup>
  </div>
);
