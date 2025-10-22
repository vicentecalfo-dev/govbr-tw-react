import { useState } from "react";
import Checkbox from ".";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default {
  component: Checkbox,
  title: "Form/Checkbox",
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
