import { useState } from "react";
import Switch from ".";

export default {
  component: Switch,
  title: "Switch",
};

export const Default = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex gap-5 items-center">
      <Switch
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
        density="high"
      />
      <Switch
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />
      <Switch
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
        density="low"
      />
    </div>
  );
};

export const Disabled = () => {
    return (
      <div className="flex gap-5 items-center">
        <Switch
          disabled
        />
         <Switch
         checked
          disabled
        />
      </div>
    );
  };
  

  export const Labels = () => {
    const [enabled, setEnabled] = useState(false);
    return (
      <div className="flex gap-5 items-center">
        <Switch
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        > Esquerda </Switch>
        <Switch
          onChange={(e) => setEnabled(e.target.checked)}
          disabled
        > Esquerda </Switch>
         <Switch
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          labelPosition="right"
        > Direita </Switch>
         <Switch
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          labelPosition="top"
        > Topo </Switch>
      </div>
    );
  };