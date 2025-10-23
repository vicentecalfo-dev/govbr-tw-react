import { useEffect, useRef, useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Input from ".";
import { Button } from "../Button";
import {
  faEnvelope,
  faEyeSlash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default {
  component: Input,
  title: "Input",
};

export const Default = () => {
  const [value, setValue] = useState("");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 w-[400px]">
        <Input
          placeholder="nome@email.com.br"
          type="text"
          value={value}
          onChange={handleChange}
          hint="Informe seu melhor e-mail."
        />
        <Button>Enviar</Button>
      </div>
    </div>
  );
};

export const Error = () => {
  const [value, setValue] = useState("teste@123");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 w-[400px]">
        <Input
          placeholder="nome@email.com.br"
          type="email"
          value={value}
          onChange={handleChange}
          hint="E-mail inválido."
          variant="danger"
        />
        <Button>Enviar</Button>
      </div>
    </div>
  );
};

export const Success = () => {
  const [value, setValue] = useState("usuario@gov.br");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 w-[400px]">
        <Input
          placeholder="nome@email.com.br"
          type="email"
          value={value}
          onChange={handleChange}
          hint="E-mail disponível."
          variant="success"
        />
        <Button>Enviar</Button>
      </div>
    </div>
  );
};

export const Warning = () => {
  const [value, setValue] = useState("usuario@gov.br");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 w-[400px]">
        <Input
          placeholder="nome@email.com.br"
          type="email"
          value={value}
          onChange={handleChange}
          hint="Mensagem de alerta."
          variant="warning"
        />
        <Button>Enviar</Button>
      </div>
    </div>
  );
};

export const Density = () => {
  const [value, setValue] = useState("");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 w-[400px]">
        <Input
          placeholder="Densidade Baixa"
          type="text"
          value={value}
          onChange={handleChange}
          hint="Informe seu melhor e-mail."
          density="low"
        />
        <Button density="low">Enviar</Button>
      </div>
      <div className="flex gap-2 w-[400px]">
        <Input
          placeholder="Densidade Padrão"
          type="text"
          value={value}
          onChange={handleChange}
          hint="Informe seu melhor e-mail."
        />
        <Button>Enviar</Button>
      </div>
      <div className="flex gap-2 w-[400px]">
        <Input
          placeholder="Densidade Alta"
          type="text"
          value={value}
          onChange={handleChange}
          hint="Informe seu melhor e-mail."
          density="high"
        />
        <Button density="high">Enviar</Button>
      </div>
    </div>
  );
};

export const WithIcons = () => {
  const [value, setValue] = useState("");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 w-[400px]">
        <div className="flex-1">
          <Input
            placeholder="Left"
            type="text"
            value={value}
            onChange={handleChange}
            hint="Informe seu melhor e-mail."
            iconPosition="left"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </Input>
        </div>
        <Button>Enviar</Button>
      </div>
      <div className="flex gap-2 w-[400px]">
        <div className="flex-1">
          <Input
            placeholder="Right"
            type="text"
            value={value}
            onChange={handleChange}
            hint="Informe seu melhor e-mail."
            iconPosition="right"
          >
            <Button size="icon" variant="ghost" density="high">
              <FontAwesomeIcon icon={faEyeSlash} />
            </Button>
          </Input>
        </div>
        <Button>Enviar</Button>
      </div>
      <div className="flex gap-2 w-[400px]">
        <div className="flex-1">
          <Input
            placeholder="Both"
            type="text"
            value={value}
            onChange={handleChange}
            iconPosition="both"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <Button size="icon" variant="ghost" density="high">
              <FontAwesomeIcon icon={faEyeSlash} />
            </Button>
          </Input>
        </div>
      </div>
      <div className="flex gap-2 w-[400px]">
        <div className="flex-1">
          <Input
            placeholder="Both"
            type="text"
            value={value}
            onChange={handleChange}
            iconPosition="both"
            variant="danger"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <Button size="icon" variant="ghost-danger" density="high">
              <FontAwesomeIcon icon={faEyeSlash} />
            </Button>
          </Input>
        </div>
      </div>
      <div className="flex gap-2 w-[400px]">
        <div className="flex-1">
          <Input
            placeholder="Both"
            type="text"
            value={value}
            onChange={handleChange}
            iconPosition="both"
            variant="success"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <Button size="icon" variant="ghost-success" density="high">
              <FontAwesomeIcon icon={faEyeSlash} />
            </Button>
          </Input>
        </div>
      </div>
      <div className="flex gap-2 w-[400px]">
        <div className="flex-1">
          <Input
            placeholder="Both"
            type="text"
            value={value}
            onChange={handleChange}
            iconPosition="both"
            variant="warning"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <Button size="icon" variant="ghost-warning" density="high">
              <FontAwesomeIcon icon={faEyeSlash} />
            </Button>
          </Input>
        </div>
      </div>
    </div>
  );
};

export const Dark = () => {
  const [value, setValue] = useState("");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-10 bg-govbr-blue-warm-vivid-90 p-5">
      <div className="flex gap-2">
        <Input
          placeholder="nome@email.com.br"
          type="text"
          value={value}
          onChange={handleChange}
          hint="Informe seu melhor e-mail."
          variant="dark"
        />
        <Button variant="default-dark">Enviar</Button>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="nome@email.com.br"
          type="text"
          value={value}
          onChange={handleChange}
          hint="Informe seu melhor e-mail."
          variant="dark"
          iconPosition="both"
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <Button size="icon" variant="ghost-dark" density="high">
            <FontAwesomeIcon icon={faEyeSlash} />
          </Button>
        </Input>
        <Button variant="default-dark">Enviar</Button>
      </div>
    </div>
  );
};

export const Featured = () => {
  const [value, setValue] = useState("");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2">
        <Input
          placeholder="Busque por ..."
          type="text"
          value={value}
          onChange={handleChange}
          iconPosition="right"
          variant="featured"
          density="lowest"
          className="w-[300px]"
        >
          <Button size="icon" variant="ghost" density="high">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Input>
      </div>
    </div>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState("Campo DISABLED");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-10">
      <Input
        placeholder="Campo desabilitado"
        type="text"
        value={value}
        onChange={handleChange}
        disabled
      />

      <Input
        placeholder="Campo desabilitado"
        type="text"
        value={value}
        onChange={handleChange}
        disabled
        variant="danger"
      />

      <Input
        placeholder="Campo desabilitado"
        type="text"
        value={value}
        onChange={handleChange}
        disabled
        variant="success"
      />

      <Input
        placeholder="Campo desabilitado"
        type="text"
        value={value}
        onChange={handleChange}
        disabled
        variant="warning"
      />
      <Input
        placeholder="Campo desabilitado"
        type="text"
        value={value}
        onChange={handleChange}
        disabled
        variant="featured"
      />

      <div className="bg-govbr-blue-warm-vivid-90 p-5">
        <Input
          placeholder="Campo desabilitado"
          type="text"
          value={value}
          onChange={handleChange}
          disabled
          variant="dark"
        />
      </div>
    </div>
  );
};

export const Readonly = () => {
  const [value, setValue] = useState("Campo READ ONLY");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div className="flex flex-col gap-10">
      <Input
        placeholder="Campo desabilitado"
        type="text"
        value={value}
        onChange={handleChange}
        readOnly
      />

      <Input
        placeholder="Campo desabilitado"
        type="text"
        value={value}
        onChange={handleChange}
        readOnly
        variant="danger"
      />

      <Input
        placeholder="Campo desabilitado"
        type="text"
        value={value}
        onChange={handleChange}
        readOnly
        variant="success"
      />

      <Input
        placeholder="Campo desabilitado"
        type="text"
        value={value}
        onChange={handleChange}
        readOnly
        variant="warning"
      />
      <Input
        placeholder="Campo desabilitado"
        type="text"
        value={value}
        onChange={handleChange}
        readOnly
        variant="featured"
      />
      <div className="bg-govbr-blue-warm-vivid-90 p-5">
        <Input
          placeholder="Campo desabilitado"
          type="text"
          value={value}
          onChange={handleChange}
          readOnly
          variant="dark"
        />
      </div>
    </div>
  );
};
