import React, { useState } from "react";

import FormLabel from ".";
import Input from "../Input";

export default {
  component: FormLabel,
  title: "FormLabel",
};

export const Default = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="w-[420px]">
      <FormLabel>
        <span>E-mail</span>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          id="email"
        />
        <span>Texto auxiliar. Funcao de prevenir erros.</span>
      </FormLabel>
    </div>
  );
};

export const WithoutLabel = () => {
  const [cpf, setCpf] = useState("");

  return (
    <div className="w-[420px]">
      <FormLabel>
        <Input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={cpf}
          onChange={(event) => setCpf(event.target.value)}
          id="cpf"
        />
        <span>Digite apenas os numeros.</span>
      </FormLabel>
    </div>
  );
};

export const WithoutHint = () => {
  const [name, setName] = useState("");

  return (
    <div className="w-[420px]">
      <FormLabel>
        <span>Nome completo</span>
        <Input
          type="text"
          name="name"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          id="name"
        />
      </FormLabel>
    </div>
  );
};

export const OnlyControl = () => {
  const [nickname, setNickname] = useState("");

  return (
    <div className="w-[420px]">
      <FormLabel>
        <Input
          type="text"
          name="nickname"
          placeholder="Apelido"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          id="nickname"
        />
      </FormLabel>
    </div>
  );
};
