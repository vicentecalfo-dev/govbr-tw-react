import React from "react";
import { Header } from ".";

export default {
  component: Header,
  title: "Header",
};

export const Default = () => (
    <div className="w-full">

        <Header links={
          [
              {href:"",label:"Órgãos do Governo"},
              {href:"",label:"Acesso à Informação"},
              {href:"",label:"Legislação"},
              {href:"",label:"Acessibilidade"}
          ]
        }/>
    </div>
);