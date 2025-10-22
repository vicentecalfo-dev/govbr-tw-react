import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breadcrumb from ".";
import { Button, buttonVariants } from "../Button";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../../libs/utils";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default {
  component: Breadcrumb,
  title: "Navigation/Breadcrumb",
};

export const Default = () => (
  <Breadcrumb className="p-6">
    <Button size="icon" variant="ghost">
      <FontAwesomeIcon icon={faHouse} />
    </Button>
    <a href="#" className={cn(buttonVariants({variant:"link"}))} >Perfil de Usuário</a>
    <>Agricultor</>
  </Breadcrumb>
);

export const Dark = () => (
  <Breadcrumb className="p-6 bg-govbr-blue-warm-vivid-90" variant="dark">
    <Button size="icon" variant="ghost-dark">
      <FontAwesomeIcon icon={faHouse} />
    </Button>
    <a href="#"className={cn(buttonVariants({variant:"link-dark"}))}>Perfil de Usuário</a>
    <>Agricultor</>
    </Breadcrumb>
);
