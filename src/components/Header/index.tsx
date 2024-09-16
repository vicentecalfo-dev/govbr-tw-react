import React, { ComponentProps, useState } from "react";
import { GovBRLogo } from "../GovBRLogo";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn, getUIDClassName } from "../../libs/utils";
import {
  faBars,
  faChevronDown,
  faChevronRight,
  faMagnifyingGlass,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../Input";

interface MenuItem {
  title?: string;
  link?: string;
  subLinks?: MenuItem[];
  type?: string
}

interface HeaderProps extends ComponentProps<"header"> {
  locator?: string;
  headerTitle?: string;
  login?: boolean;
  loginLabel?: string;
  onChangeSearchInput?: any;
  onSubmitSearchInput?: any;
  menu?: MenuItem[];
}

const Header = ({
  children,
  locator,
  headerTitle,
  login = true,
  loginLabel = "Entrar com gov.br",
  onChangeSearchInput,
  onSubmitSearchInput,
  menu = [],
}: HeaderProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [menuVisibility, setMenuVisibility] = useState(false);

  // Estado para rastrear item selecionado e sublink selecionado
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(
    null
  );
  const [selectedSubMenuIndex, setSelectedSubMenuIndex] = useState<
    number | null
  >(null);

  function handleOnChangeSearchInput(event: any) {
    const value = event.target.value;
    onChangeSearchInput(value);
    setSearchValue(value);
  }

  function handleMenuMouseLeave() {
    setSelectedMenuIndex(null);
    setSelectedSubMenuIndex(null);
  }

  return (
    <>
      <header className="grid grid-rows-[auto_auto] w-full gap-6 py-6">
        <div className="flex gap-3  items-center">
          <div className="flex gap-6 items-center">
            <div className="w-[110px]">
              <GovBRLogo />
            </div>
            {locator && (
              <h1 className="text-xs text-govbr-gray-80 max-w-[200px]">
                {locator}
              </h1>
            )}
          </div>

          <div className="flex-1"></div>
          {children}
          {login && (
            <div>
              <Button>
                <FontAwesomeIcon icon={faUser} />
                {loginLabel}
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-6">
          <div className="ml-[-10px] flex gap-2 items-center w-3/4">
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
          <div className="w-1/4">
            <Input
              placeholder="O que você procura?"
              type="text"
              iconPosition="right"
              variant="featured"
              density="lowest"
              className="w-full"
              value={searchValue}
              onChange={handleOnChangeSearchInput}
            >
              <Button
                size="icon"
                variant="ghost"
                density="high"
                onClick={() => onSubmitSearchInput(searchValue)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </Input>
          </div>
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
              {menu.map(({ title, link, subLinks, type }, index) => type? <li className=" py-6">
                <hr className="border-t border-govbr-gray-20"/>
              </li>:(
                <li key={index}>
                  <a
                    href={link}
                    className={cn("flex gap-3 p-3 text-govbr-gray-60 hover:bg-govbr-blue-warm-vivid-80 hover:text-govbr-pure-0", selectedMenuIndex === index ? `!bg-govbr-blue-warm-vivid-80 !text-govbr-pure-0`: "")}
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
              ))}
            </ul>

            {/* Segunda coluna: Submenu (se houver) */}
            {selectedMenuIndex !== null && menu[selectedMenuIndex]?.subLinks && (
              <ul className="bg-govbr-pure-0/50 w-1/3 border-l border-govbr-gray-20">
                {menu[selectedMenuIndex]?.subLinks!.map((subLink, index) => (
                  <li key={index}>
                    <a
                      href={subLink.link}
                      className={cn("flex gap-3 p-3 text-govbr-gray-60 hover:bg-govbr-blue-warm-vivid-70 hover:text-govbr-pure-0", selectedSubMenuIndex === index ? `!bg-govbr-blue-warm-vivid-70 !text-govbr-pure-0`: "")}
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
