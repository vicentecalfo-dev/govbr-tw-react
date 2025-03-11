import React, { useState } from "react";
import { Header } from ".";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons/faCookieBite";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons/faCircleHalfStroke";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input";

export default {
  component: Header,
  title: "Header",
};

const menu = [
  {
    title: "Assuntos",
    link: "/menu1",
    subLinks: [
      {
        title: "Notícias",
        link: "/menu2",
      },
      {
        title: "Biodiversidade e Biomas",
        link: "/menu1/sub1",
        subLinks: [
          {
            title: "Áreas Protegidas",
            link: "/menu1/sub1/sub1",
          },
          {
            title: "Biodiversidade",
            link: "/menu1/sub1/sub1",
          },
          {
            title: "Direitos Animais",
            link: "/menu1/sub1/sub1",
          },
        ],
      },
    ],
  },
  {
    title: "Canais de Atendimento",
    link: "/menu3",
    subLinks: [
      {
        title: "Endereços Importantes",
        link: "/menu3/sub1",
      },
      {
        title: "Ouvidoria",
        link: "/menu1/sub1",
        subLinks: [
          {
            title: "Fala.BR",
            link: "/menu1/sub1/sub1",
          },
          {
            title: "Fale Conosco",
            link: "/menu1/sub1/sub1",
          },
          {
            title: "Legislação",
            link: "/menu1/sub1/sub1",
          },
        ],
      },
    ],
  },
  {
    type: "divisor",
  },
  {
    title: "Navegação",
    link: "/menu3",
    subLinks: [
      {
        title: "Acessibilidade",
        link: "/menu3/sub1",
      },
      {
        title: "Mapa do Site",
        link: "/menu3/sub1",
      },
      {
        title: "Termo de Uso e Aviso de Privacidade",
        link: "/menu3/sub1",
      },
    ],
  },
];


export const Default = () => {
  
  
  const [searchValue, setSearchValue] = useState("");
  function handleOnChangeSearchInput(event: any) {
    const value = event.target.value;
    setSearchValue(value);
  }


  return (<div className="w-full">
    <Header
      locator={[
        "Ministério do Meio Ambiente",
        "Instituto de Pesquisas Jardim Botânico do Rio de Janeiro",
      ]}
      headerTitle="CNCFlora &bull; Centro Nacional de Conservação da Flora"
      menu={menu}
      searchInput={
        <Input
          placeholder="O que você procura"
          type="text"
          iconPosition="right"
          variant="featured"
          density="lowest"
          className="w-full"
          value={searchValue}
          onChange={handleOnChangeSearchInput}
        >
          <Button
            size="icon"
            variant="ghost"
            density="high"
            onClick={() => console.log(searchValue)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Input>
      }
    >
      <Header.PrimaryMenu>
        <a href="#">Órgãos do Governo</a>
        <a href="#">Acesso à Informação</a>
        <a href="#">Legislação</a>
        <a href="#">Acessibilidade</a>
      </Header.PrimaryMenu>
      <Header.IconMenu>
        <Button variant="ghost" size="icon">
          <FontAwesomeIcon icon={faCookieBite} />
        </Button>
        <Button variant="ghost" size="icon">
          <FontAwesomeIcon icon={faCircleHalfStroke} />
        </Button>
      </Header.IconMenu>
    </Header>
  </div>
)

};
