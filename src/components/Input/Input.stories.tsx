import Input from ".";
import { Button } from "../Button";

export default {
  component: Input,
  title: "Input",
};

export const Default = () => (
  <div className="flex gap-2">
    <Input type="text" placeholder="Placeholder" /> <Button>Enviar</Button>
  </div>
);
