import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from ".";
import { faArrowsRotate, faCheck, faExclamation, faHouse, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "../Spinner";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default {
    component: Button,
    title: "Button",
};

const lightTheme = "flex gap-5 p-5";
const darkTheme = "flex gap-5 bg-govbr-blue-warm-vivid-90 p-5 justify-center";

export const Default = () => (
    <>
        <div className={lightTheme}>
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
        </div>
        <div className={darkTheme}>
            <Button variant="default-dark">Primary</Button>
            <Button variant="outline-dark">Outline</Button>
            <Button variant="ghost-dark">Ghost</Button>
        </div>
    </>
);

export const Density = () => (
    <div className={lightTheme}>
        <Button density="high">High</Button>
        <Button>Default</Button>
        <Button density="low">Low</Button>
    </div>
);

export const OtherColors = () => (
    <>
        <div className={lightTheme}>
            <Button variant="default-success" className="min-w-36">
                Success
            </Button>
            <Button variant="outline-success" className="min-w-36">
                Success
            </Button>
            <Button variant="ghost-success" className="min-w-36">
                Success
            </Button>
        </div>
        <div className={lightTheme}>
            <Button variant="default-danger" className="min-w-36">
                Danger
            </Button>
            <Button variant="outline-danger" className="min-w-36">
                Danger
            </Button>
            <Button variant="ghost-danger" className="min-w-36">
                Danger
            </Button>
        </div>
        <div className={lightTheme}>
            <Button variant="default-warning" className="min-w-36">
                Warning
            </Button>
            <Button variant="outline-warning" className="min-w-36">
                Warning
            </Button>
            <Button variant="ghost-warning" className="min-w-36">
                Warning
            </Button>
        </div>
        <div className={darkTheme}>
            <Button variant="default-success" className="min-w-36">
                Success
            </Button>
            <Button variant="default-danger" className="min-w-36">
                Danger
            </Button>
            <Button variant="default-warning" className="min-w-36">
                Warning
            </Button>
        </div>
    </>
);

export const OnlyIcons = () => (
    <>
        <div className={lightTheme}>
            <Button size="icon">
                <FontAwesomeIcon icon={faHouse} />
            </Button>
            <Button size="icon" variant="outline">
                <FontAwesomeIcon icon={faHouse} />
            </Button>
            <Button size="icon" variant="ghost">
                <FontAwesomeIcon icon={faHouse} />
            </Button>
            <Button size="icon" variant="default-success">
                <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button size="icon" variant="default-danger">
                <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button size="icon" variant="default-warning">
                <FontAwesomeIcon icon={faExclamation} />
            </Button>
            <Button size="icon" disabled>
                <FontAwesomeIcon icon={faArrowsRotate} className="animate-spin" />
            </Button>
        </div>
        <div className={darkTheme}>
            <Button variant="default-dark" size="icon">
                <FontAwesomeIcon icon={faHouse} />
            </Button>
            <Button size="icon" variant="outline-dark">
                <FontAwesomeIcon icon={faHouse} />
            </Button>
            <Button size="icon" variant="ghost-dark">
                <FontAwesomeIcon icon={faHouse} />
            </Button>
        </div>
    </>
);

export const WithIcons = () => (
    <>
        <div className={lightTheme}>
            <Button><FontAwesomeIcon icon={faUser} />
            Entrar com gov.br</Button>
            <Button variant="outline">Outline <FontAwesomeIcon icon={faHouse} /></Button>
            <Button variant="ghost"><FontAwesomeIcon icon={faHouse} />Ghost</Button>
        </div>
        <div className={darkTheme}>
            <Button variant="default-dark">Primary<FontAwesomeIcon icon={faHouse} /></Button>
            <Button variant="outline-dark"><FontAwesomeIcon icon={faHouse} />Outline</Button>
            <Button variant="ghost-dark">Ghost<FontAwesomeIcon icon={faHouse} /></Button>
        </div>
        <div className={lightTheme}>
            <Button density="low" disabled><FontAwesomeIcon icon={faArrowsRotate} className="animate-spin" />Primary</Button>
            <Button variant="outline">Outline <FontAwesomeIcon icon={faHouse} /></Button>
            <Button variant="outline" density="high"><FontAwesomeIcon icon={faHouse} />Ghost</Button>
        </div>
    </>
);

export const Loading = () => (
    <>
        <div className={lightTheme}>
            <Button disabled><FontAwesomeIcon icon={faArrowsRotate} className="animate-spin" />Loading</Button>
            <Button size="icon" disabled><FontAwesomeIcon icon={faArrowsRotate} className="animate-spin" /></Button>
        </div>
        <div className={lightTheme}>
            <Button disabled><Spinner size="button" variant="invert-light"/>Loading</Button>
            <Button size="icon" disabled><Spinner size="button" variant="invert-light"/></Button>
            <Button size="icon" disabled variant="outline"><Spinner size="button" /></Button>
            <Button size="icon" disabled variant="ghost"><Spinner size="button" /></Button>
        </div>
        <div className={darkTheme}>
            <Button disabled variant="default-dark"><Spinner size="button" variant="invert-dark"/>Loading</Button>
            <Button size="icon" disabled variant="default-dark"><Spinner size="button" variant="invert-dark"/></Button>
            <Button size="icon" disabled variant="outline-dark"><Spinner size="button" variant="dark"/></Button>
            <Button size="icon" disabled variant="ghost-dark"><Spinner size="button" variant="dark"/></Button>
        </div>
    </>
);

export const Magic = () => (
    <>
        <div className={lightTheme}>
            <Button variant="magic">Magic Default</Button>
            <Button variant="magic" size="icon"> <FontAwesomeIcon icon={faHouse} /></Button>
            <Button variant="magic" disabled>Disabled</Button>
        </div>
    </>
);