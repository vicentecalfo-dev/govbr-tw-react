import {
  faChevronDown,
  faChevronRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Accordion from ".";
import { Avatar } from "../Avatar";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default {
  component: Accordion,
  title: "Layout/Accordion",
};

const data = [
  {
    trigger:
      "Qual a competência do Departamento de Revitalização de Bacias Hidrográficas?",
    content:
      "O Departamento de Revitalização de Bacias Hidrográficas (DRB) tem como competência subsidiar a formulação de políticas, planos e normas, bem como definir as estratégias para a implementação de programas e projetos nacionais relacionados com a revitalização de bacias hidrográficas.",
    value: "1",
  },
  {
    trigger: "Quais os principais Programas e Projetos?",
    content:
      "Atualmente estão sob a coordenação do DRB: o Programa de Revitalização da Bacia Hidrográfica do Rio São Francisco, o Programa Pantanal, o Programa Água Doce, o Programa de Revitalização da Bacia do Paraíba do Sul, o Programa de Revitalização da Bacia do Tocantins-Araguaia, entre outros.",
    value: "2",
  },
  {
    trigger:
      "Como propor projetos para obtenção de recursos para ações de revitalização?",
    content:
      "Existem duas modalidades para a proposição de projetos: a de demanda espontânea e a de demanda induzida. No primeiro caso, os proponentes encaminham os projetos por sua iniciativa. No segundo, são abertos editais com linhas de financiamento exclusivas a determinadas ações. Para saber mais sobre a obtenção de recursos, consultar a página do Fundo Nacional de Meio Ambiente.",
    value: "3",
  },
];

const avatar = {
  vicente: {
    src: "https://media.licdn.com/dms/image/D4D03AQGZ7hKGRT_Aqw/profile-displayphoto-shrink_800_800/0/1696216951627?e=2147483647&v=beta&t=vYhSp05unvUDN_Np-GDfCq8ELlpECHu6AnuQySGrib8",
    title: "Vicente Calfo",
    position: "Coordenador de TI",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquam ante a vestibulum mollis. Cras turpis sapien, mattis sed nisl in, vulputate tempus leo. Ut sit amet turpis erat. Donec eu diam ut lacus dapibus vulputate. Fusce ac nibh id ipsum porta ullamcorper. Etiam eget dui vitae libero lacinia malesuada. Sed pellentesque arcu id libero pellentesque hendrerit. Cras iaculis elementum nibh. Aliquam consectetur rutrum lobortis. Etiam fermentum mollis ultrices.",
  },
  lucas: {
    src: "https://lsbjordao.netlify.app/author/admin/avatar_hu2be63e1607ba32c3eebd0209533da7ac_2526962_250x250_fill_q90_lanczos_center.jpg",
    title: "Lucas Jordão",
    position: "Analista de Dados",
    content:
      "Donec elementum, purus ut varius dignissim, turpis justo vehicula nunc, euismod accumsan lectus dui ut diam. Sed sit amet congue arcu. Ut accumsan dictum urna, at viverra ligula porta id. Ut quis vulputate purus, et lobortis ligula. Duis hendrerit sagittis dolor, et consequat dui consequat nec. Proin hendrerit nec est et aliquet. Ut pulvinar porta neque, sit amet condimentum turpis lacinia ac. Pellentesque fermentum neque in mi ultricies mattis quis eget dui. Curabitur gravida, nibh eget feugiat aliquam, erat felis auctor eros, et tincidunt sapien nisl in nunc. Aliquam tristique libero eu ornare ultrices. Praesent erat lorem, dignissim at diam a, sollicitudin accumsan ligula.",
  },
  andre: {
    src: "https://media.licdn.com/dms/image/D4D03AQG-qVYCg_SOYw/profile-displayphoto-shrink_800_800/0/1670503044683?e=2147483647&v=beta&t=1kft_vfzLVoAJlpNDTQP0SXfHe9qDvHrPUc3uTMh9Ag",
    title: "André Eppinghaus",
    position: "Analista de Sistemas Sênior",
    content:
      "Etiam porttitor malesuada lorem, a facilisis neque volutpat sit amet. Proin vel facilisis eros. Vestibulum finibus erat ex, nec vehicula justo consectetur pharetra. Pellentesque iaculis enim sit amet odio vehicula, sit amet lacinia arcu venenatis. Etiam venenatis sapien maximus bibendum ornare. Donec sollicitudin diam a tortor dictum posuere quis quis nibh. Ut id arcu nec urna bibendum fringilla vitae eu orci. In dignissim eleifend nisi, ac congue ante iaculis ac. Etiam molestie ex quis sapien lacinia malesuada. Maecenas a ex quis erat viverra vehicula eget ut turpis.",
  },
};

export const Default = () => (
  <>
    <Accordion value="2" multi={false} className="bg-white w-[450px]">
      {data.map(({ value, trigger, content }) => (
        <Accordion.Item value={value} key={uuidv4()}>
          <>{trigger}</>
          <>{content}</>
        </Accordion.Item>
      ))}
    </Accordion>
  </>
);

export const Dark = () => (
  <>
    <Accordion
      value="2"
      multi={false}
      variant="dark"
      className="bg-govbr-blue-warm-vivid-90 w-[450px]"
    >
      {data.map(({ value, trigger, content }) => (
        <Accordion.Item value={value} key={uuidv4()}>
          <>{trigger}</>
          <>{content}</>
        </Accordion.Item>
      ))}
    </Accordion>
  </>
);

export const AlwaysOpen = () => (
  <>
    <Accordion value="1" multi={true} className="bg-white w-[450px]">
      {data.map(({ value, trigger, content }) => (
        <Accordion.Item value={value} key={uuidv4()}>
          <>{trigger}</>
          <>{content}</>
        </Accordion.Item>
      ))}
    </Accordion>
  </>
);

export const CustomIcon = () => (
  <>
    <Accordion
      value="2"
      multi={false}
      className="bg-white w-[450px]"
      icons={[faPlus, faMinus]}
    >
      {data.map(({ value, trigger, content }) => (
        <Accordion.Item value={value} key={uuidv4()}>
          <>{trigger}</>
          <>{content}</>
        </Accordion.Item>
      ))}
    </Accordion>
  </>
);

export const IconPosition = () => (
  <>
    <Accordion
      value="2"
      multi={false}
      className="bg-white w-[450px]"
      icons={[faChevronRight, faChevronDown]}
      iconPosition="left"
    >
      {data.map(({ value, trigger, content }) => (
        <Accordion.Item value={value} key={uuidv4()}>
          <>{trigger}</>
          <>{content}</>
        </Accordion.Item>
      ))}
    </Accordion>
  </>
);

export const CustomTrigger = () => (
  <>
    <Accordion value="2" multi={false} className="bg-white w-[450px]">
      {Object.values(avatar).map(({ src, title, position, content }) => (
        <Accordion.Item value={title} key={uuidv4()}>
          <div className="flex gap-3 items-center">
            <span>
              <Avatar src={src} title={title} variant="image" />
            </span>
            <span>
              <h1 className="font-semibold">{title}</h1>
              <h2 className="text-sm !font-light">{position}</h2>
            </span>
          </div>
          <>{content}</>
        </Accordion.Item>
      ))}
    </Accordion>
  </>
);

export const FixedHeight = () => (
  <>
    <Accordion
      value="Lucas Jordão"
      multi={false}
      className="bg-white w-[450px]"
      fixedHeight="max-h-[120px]"
    >
      {Object.values(avatar).map(({ src, title, position, content }) => (
        <Accordion.Item value={title} key={uuidv4()}>
          <div className="flex gap-3 items-center">
            <span>
              <Avatar src={src} title={title} variant="image" />
            </span>
            <span>
              <h1 className="font-semibold">{title}</h1>
              <h2 className="text-sm !font-light">{position}</h2>
            </span>
          </div>
          <>{content}</>
        </Accordion.Item>
      ))}
    </Accordion>
  </>
);

export const CustomStyle = () => (
  <>
    <Accordion
      value="Lucas Jordão"
      multi={false}
      className="bg-white w-[450px] border-govbr-gray-20 border shadow-md"
      fixedHeight="max-h-[120px]"
    >
      {Object.values(avatar).map(({ src, title, position, content }) => (
        <Accordion.Item value={title} key={uuidv4()}>
          <div className="flex gap-3 items-center">
            <span>
              <Avatar src={src} title={title} variant="image" />
            </span>
            <span>
              <h1 className="font-semibold">{title}</h1>
              <h2 className="text-sm !font-light">{position}</h2>
            </span>
          </div>
          <>{content}</>
        </Accordion.Item>
      ))}
    </Accordion>
  </>
);
