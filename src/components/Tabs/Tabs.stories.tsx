import {
  faBook,
  faGraduationCap,
  faHandHoldingHand,
} from "@fortawesome/free-solid-svg-icons";
import Tabs from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default {
  component: Tabs,
  title: "Tabs",
};

const items = [
  {
    button: "Mestrado e doutorado",
    icon: faBook,
    content:
      "O Programa de Pós-Graduação em Botânica forma profissionais voltados para o ensino, a pesquisa e políticas públicas nas áreas de Botânica, Ecologia Vegetal e Conservação da Biodiversidade. Contato: ppgenbt@jbrj.gov.br ou (021)3875-6201.",
  },
  {
    button: "Extensão",
    icon: faGraduationCap,
    content:
      "O programa de Extensão da ENBT promove a articulação entre o ensino e a pesquisa e a interlocução com a sociedade. Dele fazem parte cursos abertos ao público, como os do programa de Ilustração Botânica, atividades de divulgação científica e outras iniciativas no Jardim Botânico e extramuros. Contato: extensao@jbrj.gov.br ou (21)3875-6209.",
  },
  {
    button: "Responsabilidade Socioambiental",
    icon: faHandHoldingHand,
    content:
      "Integrado à ENBT em 2015, o Centro de Responsabilidade Socioambiental atua para qualificar e promover a inclusão social e profissional de jovens com idades entre 15 e 18 anos, por meio da educação e capacitação para o trabalho, com o objetivo de formar cidadãos mais conscientes e preparados para o mercado de trabalho e para a vida. Contato: crs@jbrj.gov.br e (21) 3204-2886.",
  },
];

export const Default = () => (
  <div className="flex gap-5">
    <Tabs value="0" className="w-[650px]">
      <>
        {items.map(({ button }, index) => (
          <Tabs.Trigger value={index.toString()} key={`${index}-trigger`}>
            {button}
          </Tabs.Trigger>
        ))}
      </>
      {items.map(({ content }, index) => (
        <Tabs.Content value={index.toString()} key={`${index}-content`}>
          {content}
        </Tabs.Content>
      ))}
    </Tabs>
  </div>
);

export const DensityLow = () => (
  <div className="flex gap-5">
    <Tabs value="0" className="w-[650px]" density="low">
      <>
        {items.map(({ button }, index) => (
          <Tabs.Trigger value={index.toString()} key={`${index}-trigger`}>
            {button}
          </Tabs.Trigger>
        ))}
      </>
      {items.map(({ content }, index) => (
        <Tabs.Content value={index.toString()} key={`${index}-content`}>
          {content}
        </Tabs.Content>
      ))}
    </Tabs>
  </div>
);

export const DensityHigh = () => (
  <div className="flex gap-5">
    <Tabs value="0" className="w-[650px]" density="high">
      <>
        {items.map(({ button }, index) => (
          <Tabs.Trigger value={index.toString()} key={`${index}-trigger`}>
            {button}
          </Tabs.Trigger>
        ))}
      </>
      {items.map(({ content }, index) => (
        <Tabs.Content value={index.toString()} key={`${index}-content`}>
          {content}
        </Tabs.Content>
      ))}
    </Tabs>
  </div>
);

export const IconTriggers = () => (
  <div className="flex gap-5">
    <Tabs value="1" className="w-[650px]" density="high">
      <>
        {items.map(({ icon }, index) => (
          <Tabs.Trigger value={index.toString()} key={`${index}-trigger`}>
            <FontAwesomeIcon icon={icon} />
          </Tabs.Trigger>
        ))}
      </>
      {items.map(({ content }, index) => (
        <Tabs.Content value={index.toString()} key={`${index}-content`}>
          {content}
        </Tabs.Content>
      ))}
    </Tabs>
  </div>
);

export const MixedTriggers = () => (
  <div className="flex gap-5">
    <Tabs value="2" className="w-[650px]">
      <>
        {items.map(({ button, icon }, index) => (
          <Tabs.Trigger value={index.toString()} key={`${index}-trigger`}>
            <FontAwesomeIcon icon={icon} />
            {button}
          </Tabs.Trigger>
        ))}
      </>
      {items.map(({ content }, index) => (
        <Tabs.Content value={index.toString()} key={`${index}-content`}>
          {content}
        </Tabs.Content>
      ))}
    </Tabs>
  </div>
);

export const FixedHeight = () => (
  <div className="flex gap-5">
    <Tabs value="0" className="w-[650px]" contentHeight="h-[100px]">
      <>
        {items.map(({ button }, index) => (
          <Tabs.Trigger value={index.toString()} key={`${index}-trigger`}>
            {button}
          </Tabs.Trigger>
        ))}
      </>
      {items.map(({ content }, index) => (
        <Tabs.Content value={index.toString()} key={`${index}-content`}>
          {content}
        </Tabs.Content>
      ))}
    </Tabs>
  </div>
);

export const Dark = () => (
  <div className="flex gap-5 bg-govbr-blue-warm-vivid-90 p-6">
    <Tabs
      value="0"
      className="w-[650px]"
      contentHeight="h-[100px]"
      variant="dark"
    >
      <>
        {items.map(({ button, icon }, index) => (
          <Tabs.Trigger value={index.toString()} key={`${index}-trigger`}>
            {button}
            <FontAwesomeIcon icon={icon} />
          </Tabs.Trigger>
        ))}
      </>
      {items.map(({ content }, index) => (
        <Tabs.Content value={index.toString()} key={`${index}-content`}>
          {content}
        </Tabs.Content>
      ))}
    </Tabs>
  </div>
);
