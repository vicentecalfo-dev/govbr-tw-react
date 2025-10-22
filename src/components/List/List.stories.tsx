import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from ".";
import {
  faEllipsisVertical,
  faFolder,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import React from "react";

export default {
  component: List,
  title: "Layout/List",
};

const list = [
  { label: "Celular Seguro", locator: "Justiça e Segurança" },
  { label: "Obter Financiamento FIES", locator: "Educação e Pesquisa" },
  { label: "Negociar Dívidas Faixa I", locator: "Desenrola Brasil" },
  { label: "Faça sua Reclamação", locator: "Ouvidoria" },
];

const folders = [
  {
    name: "Photos",
    locator: new Date("1/1/16"),
  },
  {
    name: "Recipes",
    locator: new Date("1/17/16"),
  },
  {
    name: "Work",
    locator: new Date("1/28/16"),
  },
];

const people = [
  {
    src: "https://media.licdn.com/dms/image/D4D03AQGZ7hKGRT_Aqw/profile-displayphoto-shrink_800_800/0/1696216951627?e=2147483647&v=beta&t=vYhSp05unvUDN_Np-GDfCq8ELlpECHu6AnuQySGrib8",
    title: "Vicente Calfo",
    position: "Coordenador de TI",
  },
  {
    src: "https://lsbjordao.netlify.app/author/admin/avatar_hu2be63e1607ba32c3eebd0209533da7ac_2526962_250x250_fill_q90_lanczos_center.jpg",
    title: "Lucas Jordão",
    position: "Analista de Dados",
  },
  {
    src: "https://media.licdn.com/dms/image/D4D03AQG-qVYCg_SOYw/profile-displayphoto-shrink_800_800/0/1670503044683?e=2147483647&v=beta&t=1kft_vfzLVoAJlpNDTQP0SXfHe9qDvHrPUc3uTMh9Ag",
    title: "André Eppinghaus",
    position: "Analista de Sistemas Sênior",
  },
];

export const Default = () => (
  <div className="flex gap-5">
    <List>
      {list.map(({ label, locator }, index) => (
        <List.Item key={index}>
          <a href="#">{label}</a>
        </List.Item>
      ))}
    </List>
    <List variant="dark" className="bg-govbr-blue-warm-vivid-90">
      {list.map(({ label, locator }, index) => (
        <List.Item key={index}>
          <a href="#">{label}</a>
        </List.Item>
      ))}
    </List>
  </div>
);

export const WithLocator = () => (
  <div className="flex gap-5">
    <List>
      {list.map(({ label, locator }, index) => (
        <List.Item key={index}>
          <List.Label locator={locator}>
            <a href="#">{label}</a>
          </List.Label>
        </List.Item>
      ))}
    </List>
    <List variant="dark" className="bg-govbr-blue-warm-vivid-90">
      {list.map(({ label, locator }, index) => (
        <List.Item key={index}>
          <List.Label locator={locator}>
            <a href="#">{label}</a>
          </List.Label>
        </List.Item>
      ))}
    </List>
  </div>
);

export const WithIcons = () => (
  <div className="flex gap-5">
    <List className="w-[320px]" locatorPosition="bottom">
      {folders.map(({ name, locator }, index) => (
        <List.Item key={index}>
          <FontAwesomeIcon icon={faFolder} />
          <List.Label locator={locator.toLocaleString("pt-BR")}>
            <a href="#">{name}</a>
          </List.Label>
          <Button size="icon" variant="ghost">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
        </List.Item>
      ))}
    </List>
    <List
      className="w-[320px] bg-govbr-blue-warm-vivid-90"
      locatorPosition="bottom"
      variant="dark"
    >
      {folders.map(({ name, locator }, index) => (
        <List.Item key={index}>
          <FontAwesomeIcon icon={faFolder} />
          <List.Label locator={locator.toLocaleString("pt-BR")}>
            <a href="#">{name}</a>
          </List.Label>
          <Button size="icon" variant="ghost-dark">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
        </List.Item>
      ))}
    </List>
  </div>
);

export const WithAvatar = () => (
  <div className="flex gap-5">
    <List>
      {people.map(({ src, title, position }, index) => (
        <List.Item key={index}>
          <button className="flex gap-3">
            <Avatar src={src} title={title} variant="image" />
            <List.Label locator={position}>{title}</List.Label>
          </button>
        </List.Item>
      ))}
    </List>
    <List variant="dark" className="bg-govbr-blue-warm-vivid-90">
      {people.map(({ src, title, position }, index) => (
        <List.Item key={index}>
          <button className="flex gap-3 text-left">
            <Avatar src={src} title={title} variant="image" />
            <List.Label locator={position}>{title}</List.Label>
          </button>
        </List.Item>
      ))}
    </List>
  </div>
);
