import { ComponentProps, FC } from "react";
import { GovBRLogo } from "../GovBRLogo";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleHalfStroke,
  faCookieBite,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps extends ComponentProps<"header"> {
  links?: Array<any>;
}

const Header: FC<HeaderProps> = ({ children, className, links=[] }) => {
  return (
    <header className="grid grid-rows-[auto_auto] w-full">
      <div className="flex gap-3  items-center">
        <div className="w-[110px]">
          <GovBRLogo />
        </div>
        <div className="flex-1"></div>
        <div>
          <ul className="flex gap-3 items-center">
            {links.map(({ label, href }: any) => (
              <a href={href} className="text-govbr-blue-warm-vivid-70 hover:text-govbr-blue-warm-vivid-80">{label}</a>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex gap-0">
            <li>
              <Button variant="ghost" size="icon">
                <FontAwesomeIcon icon={faCookieBite} />
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="icon">
                <FontAwesomeIcon icon={faCircleHalfStroke} />
              </Button>
            </li>
          </ul>
        </div>
        <div>
          <Button>
            <FontAwesomeIcon icon={faUser} />
            Entrar com gov.br
          </Button>
        </div>
      </div>
      <div>
        <div>

        </div>
        <div>
            
        </div>
      </div>
    </header>
  );
};

export { Header };
