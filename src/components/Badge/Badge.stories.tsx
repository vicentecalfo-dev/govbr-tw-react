import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from ".";
import { Button } from "../Button";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default {
  component: Badge,
  title: "Badges",
};

export const Default = () => (
  <div className="flex gap-5">
    <Badge>Default Light</Badge>
    <Badge variant="default">Default</Badge>
    <Badge variant="success-light">Success Light</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="danger-light">Danger Light</Badge>
    <Badge variant="danger">Danger</Badge>
    <Badge variant="warning-light">Warning Light</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="neutral">Neutral</Badge>
  </div>
);

export const Sizes = () => (
  <div className="flex gap-5 items-center">
    <Badge>Small</Badge>
    <Badge size="medium">Medium</Badge>
    <Badge size="large">Large</Badge>
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
      <Badge className="bottom-full absolute right-0 -mb-3 size-6 p-0 rounded-full z-10">12</Badge>
    </Button>
    <Button variant="default-danger">
      <FontAwesomeIcon icon={faBell} />
      Notificações
      <Badge variant="danger-light">12</Badge>
    </Button>
  </div>
);
