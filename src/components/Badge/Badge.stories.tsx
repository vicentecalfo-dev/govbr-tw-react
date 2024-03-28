import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from ".";
import { Button } from "../Button";
import {
  faBell,
  faCircleCheck,
  faExclamationCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

export default {
  component: Badge,
  title: "Badges",
};

export const Default = () => (
  <div className="flex gap-5">
    <Badge>Default Light</Badge>
    <Badge variant="default">Default</Badge>
    <Badge variant="default">
      <FontAwesomeIcon icon={faBell} /> Default
    </Badge>
    <Badge variant="success-light">Success Light</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="success">
      <FontAwesomeIcon icon={faCircleCheck} /> Default
    </Badge>
    <Badge variant="danger-light">Danger Light</Badge>
    <Badge variant="danger">Danger</Badge>
    <Badge variant="danger">
      <FontAwesomeIcon icon={faExclamationCircle} /> Default
    </Badge>
    <Badge variant="warning-light">Warning Light</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="warning">
      <FontAwesomeIcon icon={faExclamationTriangle} /> Default
    </Badge>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="neutral">
      <FontAwesomeIcon icon={faBell} /> Default
    </Badge>
  </div>
);

export const Sizes = () => (
  <div className="flex gap-5 items-center">
    <Badge>Small</Badge>
    <Badge size="medium">Medium</Badge>
    <Badge size="large">Large</Badge>
    <Badge>
      <FontAwesomeIcon icon={faBell} />
      Small
    </Badge>
    <Badge size="medium">
      <FontAwesomeIcon icon={faBell} />
      Medium
    </Badge>
    <Badge size="large">
      <FontAwesomeIcon icon={faBell} />
      Large
    </Badge>
  </div>
);

export const CustomSize = () => (
  <div className="flex gap-5 items-center">
    <Badge className="py-3 px-7 text-2xl font-bold">Custom Size</Badge>
  </div>
);

export const CustomColor = () => (
  <div className="flex gap-5 items-center">
    <Badge className="bg-purple-300 text-purple-900">Custom Color</Badge>
  </div>
);

export const CustomStyle = () => (
  <div className="flex gap-5 items-center">
    <Button>
      <FontAwesomeIcon icon={faBell} />
      Notificações
      <Badge className="bottom-full absolute right-0 -mb-3 size-6 p-0 rounded-full z-10">
        12
      </Badge>
    </Button>
    <Button variant="default-danger">
      <FontAwesomeIcon icon={faBell} />
      Notificações
      <Badge variant="danger-light">12</Badge>
    </Button>
  </div>
);

export const Types = () => (
  <div className="flex gap-5">
    <Badge>Default Light</Badge>
    <Badge variant="default" type="square">Default</Badge>
    <Badge variant="danger" type="pill">
      99+
    </Badge>
  </div>
);
