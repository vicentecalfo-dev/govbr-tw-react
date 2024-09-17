import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MultiComboBox } from ".";

export default {
    component: MultiComboBox,
    title: "MultiComboBox",
};

const options = [
    { label: "Amazônia", value: "amazonia" },
    { label: "Cerrado", value: "cerrado" },
    { label: "Mata Atlântica", value: "mata_atlantica" },
    { label: "Caatinga", value: "caatinga" },
    { label: "Pampa", value: "pampa" },
    { label: "Pantanal", value: "pantanal" }
];


export const Default = () => (
    <>
        <MultiComboBox options={options} onChange={(selectedOptions) => console.log(selectedOptions)} />
    </>
);

export const DefaultValues = () => (
    <>
        <MultiComboBox options={options} onChange={(selectedOptions) => console.log(selectedOptions)} values={['amazonia', 'pantanal', 'caatinga']} />
    </>
);

export const CustomPages = () => (
    <>
        <MultiComboBox options={options} onChange={(selectedOptions) => console.log(selectedOptions)} pageSize={3} />
    </>
);