import React, { ComponentProps, useState } from "react";
import { GovBRLogo } from "../GovBRLogo";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn, getUIDClassName } from "../../libs/utils";
import {
  faBars,
  faChevronRight,
  faMagnifyingGlass,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import Input from "../Input";

interface MenuItem {
  title?: string;
  link?: string;
  subLinks?: MenuItem[];
  type?: string;
}

interface HeaderProps extends ComponentProps<"header"> {
  locator?: string[];
  headerTitle?: string;
  login?: boolean;
  loginLabel?: string;
  searchInput?: any;
  menu?: MenuItem[];
}

const Header = ({
  children,
  locator,
  headerTitle,
  login = true,
  loginLabel = "Entrar com gov.br",
  searchInput,
  menu = [],
}: HeaderProps) => {
  const [menuVisibility, setMenuVisibility] = useState(false);

  // Estado para rastrear item selecionado e sublink selecionado
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(
    null
  );
  const [selectedSubMenuIndex, setSelectedSubMenuIndex] = useState<
    number | null
  >(null);

  function handleMenuMouseLeave() {
    setSelectedMenuIndex(null);
    setSelectedSubMenuIndex(null);
  }

  return (
    <>
      <header
        className={cn(
          "grid grid-rows-[auto_auto] w-full gap-6 py-6",
          BASE_CLASSNAMES.header.root
        )}
      >
        <div className="flex gap-3  items-center">
          <div className="flex gap-6 items-center">
            <div className="w-[110px]">
              <GovBRLogo />
            </div>
            <div className="grid gap-1">
              {locator && (
                <h1 className="text-sm text-govbr-gray-80 max-w-[300px]">
                  {locator[0]}
                </h1>
              )}
              {locator && locator[1] && (
                <h2 className="text-xs text-govbr-gray-60 max-w-[300px]">
                  {locator[1]}
                </h2>
              )}
            </div>
          </div>

          <div className="flex-1"></div>
          {children}
          {login && (
            <div>
              <Button className="break-normal">
                <FontAwesomeIcon icon={faUser} />
                {loginLabel}
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-6">
          <div className="ml-[-10px] flex gap-2 items-center w-3/5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuVisibility(!menuVisibility)}
            >
              <FontAwesomeIcon icon={menuVisibility ? faXmark : faBars} />
            </Button>
            {headerTitle && (
              <h1 className="text-xl text-govbr-gray-80 p-0 m-0">
                {headerTitle}
              </h1>
            )}
          </div>
          <div className="w-2/5">{searchInput}</div>
        </div>
      </header>
      <div className="relative">
        {menuVisibility && (
          <div
            className="bg-govbr-gray-10 w-full min-h-screen border-t-4 border-govbr-yellow-vivid-20 absolute flex gap-0"
            onMouseLeave={handleMenuMouseLeave}
          >
            {/* Primeira coluna: Menu principal */}
            <ul className="bg-transparent w-1/3">
              {menu.map(({ title, link, subLinks, type }, index) =>
                type ? (
                  <li className=" py-6">
                    <hr className="border-t border-govbr-gray-20" />
                  </li>
                ) : (
                  <li key={index}>
                    <a
                      href={link}
                      className={cn(
                        "flex gap-3 p-3 text-govbr-gray-60 hover:bg-govbr-blue-warm-vivid-80 hover:text-govbr-pure-0",
                        selectedMenuIndex === index
                          ? `!bg-govbr-blue-warm-vivid-80 !text-govbr-pure-0`
                          : ""
                      )}
                      onMouseEnter={() => setSelectedMenuIndex(index)} // Rastreia qual item de menu está selecionado
                    >
                      <span className="flex-1">{title}</span>
                      {subLinks && (
                        <span>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      )}
                    </a>
                  </li>
                )
              )}
            </ul>

            {/* Segunda coluna: Submenu (se houver) */}
            {selectedMenuIndex !== null &&
              menu[selectedMenuIndex]?.subLinks && (
                <ul className="bg-govbr-pure-0/50 w-1/3 border-l border-govbr-gray-20">
                  {menu[selectedMenuIndex]?.subLinks!.map((subLink, index) => (
                    <li key={index}>
                      <a
                        href={subLink.link}
                        className={cn(
                          "flex gap-3 p-3 text-govbr-gray-60 hover:bg-govbr-blue-warm-vivid-70 hover:text-govbr-pure-0",
                          selectedSubMenuIndex === index
                            ? `!bg-govbr-blue-warm-vivid-70 !text-govbr-pure-0`
                            : ""
                        )}
                        onMouseEnter={() => setSelectedSubMenuIndex(index)} // Rastreia qual sublink está selecionado
                      >
                        <span className="flex-1">{subLink?.title}</span>
                        {subLink?.subLinks && (
                          <span>
                            <FontAwesomeIcon icon={faChevronRight} />
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

            {/* Terceira coluna: Submenu do submenu (se houver) */}
            {selectedMenuIndex !== null &&
              selectedSubMenuIndex !== null &&
              menu[selectedMenuIndex]?.subLinks &&
              menu[selectedMenuIndex]?.subLinks![selectedSubMenuIndex]
                ?.subLinks && (
                <ul className="bg-govbr-pure-0/70 w-1/3 border-l border-govbr-gray-20">
                  {menu[selectedMenuIndex]?.subLinks![
                    selectedSubMenuIndex
                  ]?.subLinks!.map((subSubLink, index) => (
                    <li key={index}>
                      <a
                        href={subSubLink?.link}
                        className="flex gap-3 p-3 text-govbr-gray-60 hover:bg-govbr-blue-warm-vivid-60 hover:text-govbr-pure-0"
                      >
                        {subSubLink?.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        )}
      </div>
    </>
  );
};

const HeaderPrimaryMenu = ({ children, className }: any) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <ul className="flex gap-3">
      {childrenArray.map((child) => (
        <li
          key={getUIDClassName()}
          className="text-govbr-blue-warm-vivid-70 hover:text-govbr-blue-warm-vivid-80"
        >
          {child}
        </li>
      ))}
    </ul>
  );
};

const HeaderIconMenu = ({ children, className }: any) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <ul className="flex gap-0">
      {childrenArray.map((child) => (
        <li key={getUIDClassName()}>{child}</li>
      ))}
    </ul>
  );
};

Header.PrimaryMenu = HeaderPrimaryMenu;
Header.IconMenu = HeaderIconMenu;

export { Header };
