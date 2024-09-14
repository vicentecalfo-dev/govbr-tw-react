import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlyOut from ".";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import {
  faCopy,
  faDownload,
  faHouse,
  faPlus,
  faPrint,
  faShareNodes,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../Tooltip";
import { useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default {
  component: FlyOut,
  title: "FlyOut",
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
  <FlyOut>
    <FlyOut.Toggle>
      <Button>Bottom Left</Button>
    </FlyOut.Toggle>
    <FlyOut.Content>
      <span className="flex gap-0 p-6 border border-gray-200 rounded-md">
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
    </FlyOut.Content>
  </FlyOut>
);

export const BottomRight = () => (
  <FlyOut>
    <FlyOut.Toggle>
      <Button>Bottom Right</Button>
    </FlyOut.Toggle>
    <FlyOut.Content position="bottom-right">
      <span className="flex gap-0 p-6 border border-gray-200 rounded-md">
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
    </FlyOut.Content>
  </FlyOut>
);

export const TopLeft = () => (
  <FlyOut>
    <FlyOut.Toggle>
      <Button>Top Left</Button>
    </FlyOut.Toggle>
    <FlyOut.Content position="top-left">
      <span className="flex gap-0 p-6 border border-gray-200 rounded-md">
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
    </FlyOut.Content>
  </FlyOut>
);

export const TopRight = () => (
  <FlyOut>
    <FlyOut.Toggle>
      <Button>Top Right</Button>
    </FlyOut.Toggle>
    <FlyOut.Content position="top-right">
      <span className="flex gap-0 p-6 border border-gray-200 rounded-md">
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
    </FlyOut.Content>
  </FlyOut>
);

export const Right = () => (
  <FlyOut>
    <FlyOut.Toggle>
      <Button>Right</Button>
    </FlyOut.Toggle>
    <FlyOut.Content position="right">
      <span className="flex gap-0 p-6 border border-gray-200 rounded-md">
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
    </FlyOut.Content>
  </FlyOut>
);

export const Left = () => (
  <FlyOut>
    <FlyOut.Toggle>
      <Button>Left</Button>
    </FlyOut.Toggle>
    <FlyOut.Content position="left">
      <span className="flex gap-0 p-6 border border-gray-200 rounded-md">
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
    </FlyOut.Content>
  </FlyOut>
);

export const SpeedDial = () => {
  const [open, setOpen] = useState(false)
  return (
    <FlyOut className="bt-0 absolute">
      <FlyOut.Toggle>
        <Button size="icon" onClick={()=>setOpen(!open)}>
          {open ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faPlus} /> }
        </Button>
      </FlyOut.Toggle>
      <FlyOut.Content
        position="top-right"
        className="flex gap-3 flex-col-reverse"
      >
        <Tooltip position="left">
          <Button size="icon" variant="outline">
            <FontAwesomeIcon icon={faCopy} />
          </Button>
          <span>Copy</span>
        </Tooltip>
        <Tooltip position="left">
          <Button size="icon" variant="outline">
            <FontAwesomeIcon icon={faDownload} />
          </Button>
          <span>Download</span>
        </Tooltip>
        <Tooltip position="left">
          <Button size="icon" variant="outline">
            <FontAwesomeIcon icon={faPrint} />
          </Button>
          <span>Print</span>
        </Tooltip>
        <Tooltip position="left">
          <Button size="icon" variant="outline">
            <FontAwesomeIcon icon={faShareNodes} />
          </Button>
          <span>Share</span>
        </Tooltip>
      </FlyOut.Content>
    </FlyOut>
  );
};
