import { useState } from "react";
import Checkbox from ".";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

export default {
  component: Checkbox,
  title: "Checkbox",
};

export const Default = () => {
  const items: any = [
    {
      value: "A",
      label: "Default",
      variant: "default",
      name: "opt-a",
    },
    {
      value: "B",
      label: "Default Solid",
      variant: "default-solid",
      name: "pot-b",
    },
    {
      value: "A",
      label: "Dot",
      variant: "default",
      name: "opt-a",
      checkType: "dot",
    },
    {
      value: "B",
      label: "Dot Solid",
      variant: "default-solid",
      name: "pot-b",
      checkType: "dot",
    },
    {
      value: "A",
      label: "Default Custom Check",
      variant: "default",
      name: "opt-a",
      icon: faSquareCheck,
    },
    {
      value: "B",
      label: "Default Solid Custom Check",
      variant: "default-solid",
      name: "pot-b",
      icon: faSquareCheck,
    },
    {
      value: "B",
      label: "Disabled",
      variant: "default-solid",
      name: "pot-b",
      icon: faSquareCheck,
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(
        (
          { value, label, variant, name, checkType, icon, disabled }: any,
          index: number
        ) => (
          <Checkbox
            name={name}
            variant={variant}
            value={value}
            key={index}
            checkType={checkType ? checkType : undefined}
            icon={icon ? icon : undefined}
            disabled={disabled ? disabled : false}
          >
            {label}
          </Checkbox>
        )
      )}
    </div>
  );
};

export const Success = () => {
  const items: any = [
    {
      value: "A",
      label: "Default",
      variant: "success",
      name: "opt-a",
    },
    {
      value: "B",
      label: "Default Solid",
      variant: "success-solid",
      name: "pot-b",
    },
    {
      value: "A",
      label: "Dot",
      variant: "success",
      name: "opt-a",
      checkType: "dot",
    },
    {
      value: "B",
      label: "Dot Solid",
      variant: "success-solid",
      name: "pot-b",
      checkType: "dot",
    },
    {
      value: "A",
      label: "Default Custom Check",
      variant: "success",
      name: "opt-a",
      icon: faSquareCheck,
    },
    {
      value: "B",
      label: "Default Solid Custom Check",
      variant: "success-solid",
      name: "pot-b",
      icon: faSquareCheck,
    },
    {
      value: "B",
      label: "Disabled",
      variant: "success-solid",
      name: "pot-b",
      icon: faSquareCheck,
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(
        (
          { value, label, variant, name, checkType, icon, disabled }: any,
          index: number
        ) => (
          <Checkbox
            name={name}
            variant={variant}
            value={value}
            key={index}
            checkType={checkType ? checkType : undefined}
            icon={icon ? icon : undefined}
            disabled={disabled ? disabled : false}
          >
            {label}
          </Checkbox>
        )
      )}
    </div>
  );
};

export const Danger = () => {
  const items: any = [
    {
      value: "A",
      label: "Default",
      variant: "danger",
      name: "opt-a",
    },
    {
      value: "B",
      label: "Default Solid",
      variant: "danger-solid",
      name: "pot-b",
    },
    {
      value: "A",
      label: "Dot",
      variant: "danger",
      name: "opt-a",
      checkType: "dot",
    },
    {
      value: "B",
      label: "Dot Solid",
      variant: "danger-solid",
      name: "pot-b",
      checkType: "dot",
    },
    {
      value: "A",
      label: "Default Custom Check",
      variant: "danger",
      name: "opt-a",
      icon: faSquareCheck,
    },
    {
      value: "B",
      label: "Default Solid Custom Check",
      variant: "danger-solid",
      name: "pot-b",
      icon: faSquareCheck,
    },
    {
      value: "B",
      label: "Disabled",
      variant: "danger-solid",
      name: "pot-b",
      icon: faSquareCheck,
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(
        (
          { value, label, variant, name, checkType, icon, disabled }: any,
          index: number
        ) => (
          <Checkbox
            name={name}
            variant={variant}
            value={value}
            key={index}
            checkType={checkType ? checkType : undefined}
            icon={icon ? icon : undefined}
            disabled={disabled ? disabled : false}
          >
            {label}
          </Checkbox>
        )
      )}
    </div>
  );
};

export const Warning = () => {
  const items: any = [
    {
      value: "A",
      label: "Default",
      variant: "warning",
      name: "opt-a",
    },
    {
      value: "B",
      label: "Default Solid",
      variant: "warning-solid",
      name: "pot-b",
    },
    {
      value: "A",
      label: "Dot",
      variant: "warning",
      name: "opt-a",
      checkType: "dot",
    },
    {
      value: "B",
      label: "Dot Solid",
      variant: "warning-solid",
      name: "pot-b",
      checkType: "dot",
    },
    {
      value: "A",
      label: "Default Custom Check",
      variant: "warning",
      name: "opt-a",
      icon: faSquareCheck,
    },
    {
      value: "B",
      label: "Default Solid Custom Check",
      variant: "warning-solid",
      name: "pot-b",
      icon: faSquareCheck,
    },
    {
      value: "B",
      label: "Disabled",
      variant: "warning-solid",
      name: "pot-b",
      icon: faSquareCheck,
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(
        (
          { value, label, variant, name, checkType, icon, disabled }: any,
          index: number
        ) => (
          <Checkbox
            name={name}
            variant={variant}
            value={value}
            key={index}
            checkType={checkType ? checkType : undefined}
            icon={icon ? icon : undefined}
            disabled={disabled ? disabled : false}
          >
            {label}
          </Checkbox>
        )
      )}
    </div>
  );
};

export const Dark = () => {
  const items: any = [
    {
      value: "A",
      label: "Default",
      variant: "dark",
      name: "opt-a",
    },
    {
      value: "B",
      label: "Default Solid",
      variant: "dark-solid",
      name: "pot-b",
    },
    {
      value: "A",
      label: "Dot",
      variant: "dark",
      name: "opt-a",
      checkType: "dot",
    },
    {
      value: "B",
      label: "Dot Solid",
      variant: "dark-solid",
      name: "pot-b",
      checkType: "dot",
    },
    {
      value: "A",
      label: "Default Custom Check",
      variant: "dark",
      name: "opt-a",
      icon: faSquareCheck,
    },
    {
      value: "B",
      label: "Default Solid Custom Check",
      variant: "dark-solid",
      name: "pot-b",
      icon: faSquareCheck,
    },
    {
      value: "B",
      label: "Disabled",
      variant: "dark-solid",
      name: "pot-b",
      icon: faSquareCheck,
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-col gap-3 bg-govbr-blue-warm-vivid-90 p-3">
      {items.map(
        (
          { value, label, variant, name, checkType, icon, disabled }: any,
          index: number
        ) => (
          <Checkbox
            name={name}
            variant={variant}
            value={value}
            key={index}
            checkType={checkType ? checkType : undefined}
            icon={icon ? icon : undefined}
            disabled={disabled ? disabled : false}
          >
            {label}
          </Checkbox>
        )
      )}
    </div>
  );
};

// export const CheckTypes = () => {
//   const items: any = [
//     {
//       value: "A",
//       label: "Check Dot",
//       variant: "default",
//       name: "opt-a",
//       checkType: "dot",
//       icon: null,
//     },
//     {
//       value: "B",
//       label: "Check Icon Default",
//       variant: "default",
//       name: "pot-b",
//       checkType: "icon",
//       icon: undefined,
//     },
//     {
//       value: "C",
//       label: "Check Custom Icon",
//       variant: "default",
//       name: "pot-c",
//       checkType: "icon",
//       icon: faSquareCheck,
//     },
//   ];
//   return (
//     <div className="flex flex-col gap-3">
//       {items.map(
//         (
//           { value, label, variant, name, checkType, icon }: any,
//           index: number
//         ) => (
//           <Checkbox
//             name={name}
//             variant={variant}
//             value={value}
//             key={index}
//             checkType={checkType}
//             icon={icon}
//           >
//             {label}
//           </Checkbox>
//         )
//       )}
//     </div>
//   );
// };

// export const States = () => {
//   const items: any = [
//     { value: "A", label: "Default", variant: "default", name: "opt-a" },
//     { value: "B", label: "Success", variant: "success", name: "pot-b" },
//     { value: "C", label: "Danger", variant: "danger", name: "pot-c" },
//     { value: "D", label: "Warning", variant: "warning", name: "pot-d" },
//   ];
//   return (
//     <div className="flex flex-col gap-3">
//       {items.map(({ value, label, variant, name }: any, index: number) => (
//         <Checkbox name={name} variant={variant} value={value} key={index}>
//           {label}
//         </Checkbox>
//       ))}
//     </div>
//   );
// };

// export const SolidVariant = () => {
//   const items: any = [
//     {
//       value: "A",
//       label: "Default Dot",
//       variant: "default-solid",
//       name: "opt-a",
//       checkType: "dot",
//     },
//     {
//       value: "B",
//       label: "Success Dot",
//       variant: "success-solid",
//       name: "pot-b",
//       checkType: "dot",
//     },
//     {
//       value: "C",
//       label: "Danger Dot",
//       variant: "danger-solid",
//       name: "pot-c",
//       checkType: "dot",
//     },
//     {
//       value: "D",
//       label: "Warning Dot",
//       variant: "warning-solid",
//       name: "pot-d",
//       checkType: "dot",
//     },
//     {
//       value: "A",
//       label: "Default Icon",
//       variant: "default-solid",
//       name: "opt-a",
//       checkType: "icon",
//     },
//     {
//       value: "B",
//       label: "Success Icon",
//       variant: "success-solid",
//       name: "pot-b",
//       checkType: "icon",
//     },
//     {
//       value: "C",
//       label: "Danger Icon",
//       variant: "danger-solid",
//       name: "pot-c",
//       checkType: "icon",
//     },
//     {
//       value: "D",
//       label: "Warning Icon",
//       variant: "warning-solid",
//       name: "pot-d",
//       checkType: "icon",
//     },
//   ];
//   return (
//     <div className="flex flex-col gap-3">
//       {items.map(
//         ({ value, label, variant, name, checkType }: any, index: number) => (
//           <Checkbox
//             name={name}
//             variant={variant}
//             value={value}
//             key={index}
//             checkType={checkType}
//           >
//             {label}
//           </Checkbox>
//         )
//       )}
//     </div>
//   );
// };

// export const Dark = () => {
//   const items: any = [
//     {
//       value: "A",
//       label: "Dot",
//       variant: "dark",
//       name: "opt-a",
//       disabled: false,
//       checkType: "dot",
//     },
//     {
//       value: "B",
//       label: "Dot Solid",
//       variant: "dark-solid",
//       name: "pot-b",
//       disabled: false,
//       checkType: "dot",
//     },
//     {
//       value: "B",
//       label: "Default",
//       variant: "dark",
//       name: "pot-b",
//       disabled: false,
//       checkType: "icon",
//     },
//     {
//       value: "B",
//       label: "Default Solid",
//       variant: "dark-solid",
//       name: "pot-b",
//       disabled: false,
//       checkType: "icon",
//     },
//     {
//       value: "D",
//       label: "Warning",
//       variant: "dark",
//       name: "pot-d",
//       disabled: true,
//       checkType: "icon",
//     },
//   ];
//   return (
//     <div className="flex flex-col gap-3 bg-govbr-blue-warm-vivid-90 p-6">
//       {items.map(
//         (
//           { value, label, variant, name, disabled, checkType }: any,
//           index: number
//         ) => (
//           <Checkbox
//             name={name}
//             variant={variant}
//             value={value}
//             key={index}
//             disabled={disabled}
//             checkType={checkType}
//           >
//             {label}
//           </Checkbox>
//         )
//       )}
//     </div>
//   );
// };
