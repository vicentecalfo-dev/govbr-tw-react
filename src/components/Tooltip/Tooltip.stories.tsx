import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from ".";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default {
  component: Tooltip,
  title: "Tooltip",
};

const avatar = {
  vicente: {
    src: "https://media.licdn.com/dms/image/D4D03AQGZ7hKGRT_Aqw/profile-displayphoto-shrink_800_800/0/1696216951627?e=2147483647&v=beta&t=vYhSp05unvUDN_Np-GDfCq8ELlpECHu6AnuQySGrib8",
    title: "Vicente Calfo",
  },
  lucas: {
    src: "https://lsbjordao.netlify.app/author/admin/avatar_hu2be63e1607ba32c3eebd0209533da7ac_2526962_250x250_fill_q90_lanczos_center.jpg",
    title: "Lucas Jordão",
  },
  andre: {
    src: "https://media.licdn.com/dms/image/D4D03AQG-qVYCg_SOYw/profile-displayphoto-shrink_800_800/0/1670503044683?e=2147483647&v=beta&t=1kft_vfzLVoAJlpNDTQP0SXfHe9qDvHrPUc3uTMh9Ag",
    title: "André Eppinghaus",
  },
};

export const Default = () => (
  <Tooltip>
    <span>Vicente Calfo</span>
    <span className="flex flex-col gap-0">
      <span className="font-semibold">CNCFlora</span>
      <span className="text-sm">Coordenação do NuTI</span>
    </span>
  </Tooltip>
);

export const Options = () => (
  <div className="flex gap-5">
    <Tooltip position="bottom" variant="success">
      <span>Tooltip de sucesso</span>
      <span className="flex flex-col gap-0">
        <span className="font-semibold">Incluído com sucesso.</span>
        <span className="text-sm">Protocolo 100.22.345-2024</span>
      </span>
    </Tooltip>

    <Tooltip position="top" variant="danger">
      <span>Tooltip de erro</span>
      <span className="flex flex-col gap-0">
        <span className="font-semibold">Agendamento não realizado.</span>
        <span className="text-sm">Indisponibilidade de data</span>
      </span>
    </Tooltip>

    <Tooltip position="bottom" variant="warning">
      <span>Tooltip de alerta</span>
      <span className="flex flex-col gap-0">
        <span className="font-semibold">O CAPS LOCK está ativado.</span>
        <span className="text-sm">Desative antes de continuar</span>
      </span>
    </Tooltip>
  </div>
);

export const Position = () => (
  <div className="flex gap-5">
    <Tooltip position="top">
      <span>Vicente Calfo (topo)</span>
      <span className="flex flex-col gap-0">
        <span className="font-semibold">CNCFlora</span>
        <span className="text-sm">Coordenação do NuTI</span>
      </span>
    </Tooltip>

    <Tooltip position="right">
      <span>Vicente Calfo (direita)</span>
      <span className="flex flex-col gap-0">
        <span className="font-semibold">CNCFlora</span>
        <span className="text-sm">Coordenação do NuTI</span>
      </span>
    </Tooltip>

    <Tooltip position="bottom">
      <span>Vicente Calfo (abaixo)</span>
      <span className="flex flex-col gap-0">
        <span className="font-semibold">CNCFlora</span>
        <span className="text-sm">Coordenação do NuTI</span>
      </span>
    </Tooltip>
    <Tooltip position="left">
      <span>Vicente Calfo (esquerda)</span>
      <span className="flex flex-col gap-0">
        <span className="font-semibold">CNCFlora</span>
        <span className="text-sm">Coordenação do NuTI</span>
      </span>
    </Tooltip>
  </div>
);

export const InnerComponent = () => (
  <Tooltip position="right">
    <Button className="pl-1">
      <Avatar
        src={avatar.vicente.src}
        title={avatar.vicente.title}
        variant="image"
        className="size-8"
      />
      Vicente Calfo
    </Button>
    <span className="flex flex-col gap-0">
      <span className="font-semibold">CNCFlora</span>
      <span className="text-sm">Coordenação do NuTI</span>
    </span>
  </Tooltip>
);

export const CustomColor = () => (
  <Tooltip className="bg-violet-800 text-govbr-pure-0 after:border-violet-800">
    <span>Vicente Calfo</span>
    <span className="flex flex-col gap-0">
      <span className="font-semibold">CNCFlora</span>
      <span className="text-sm">Coordenação do NuTI</span>
    </span>
  </Tooltip>
);

export const Popover = () => (
  <Tooltip position="top">
    <Button>User profile</Button>
    <span className="flex gap-0">
      <div className="flex gap-3 items-center">
        <span>
          <Avatar
            src={avatar.vicente.src}
            title={avatar.vicente.title}
            variant="image"
          />
        </span>
        <span>
          <h1 className="font-semibold">Vicente Calfo</h1>
          <h2 className="text-sm">vicentecalfo@jbrj.gov.br</h2>
        </span>
      </div>
    </span>
  </Tooltip>
);
