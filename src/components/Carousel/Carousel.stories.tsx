import { Carousel } from ".";
import React from "react";

export default {
  component: Carousel,
  title: "Layout/Carousel",
};

export const Default = () => (
  <Carousel className="w-[800px] h-[350px]" >
    <div className="size-full bg-[url('https://www.gov.br/mma/pt-br/assuntos/noticias/conama-aprova-proposta-para-conservar-recursos-hidricos-no-pantanal/marina-capo-conama.jpg/@@images/6687358c-b61a-4f79-a335-12e77075ffad.jpeg')] bg-cover bg-center">
      1
    </div>
    <div className="size-full bg-[url('https://www.gov.br/mma/pt-br/assuntos/noticias/governo-federal-autoriza-810-vagas-para-ibama-e-icmbio-1/foto.jpg/@@images/36ad004e-cb04-49a6-b51e-c59921dbd887.jpeg')] bg-cover bg-center">
      1
    </div>
  </Carousel>
);

export const Dark = () => (
    <Carousel className="w-[800px] h-[350px]" variant="dark">
      <div className="size-full bg-[url('https://www.gov.br/mma/pt-br/assuntos/noticias/conama-aprova-proposta-para-conservar-recursos-hidricos-no-pantanal/marina-capo-conama.jpg/@@images/6687358c-b61a-4f79-a335-12e77075ffad.jpeg')] bg-cover bg-center">
        1
      </div>
      <div className="size-full bg-[url('https://www.gov.br/mma/pt-br/assuntos/noticias/governo-federal-autoriza-810-vagas-para-ibama-e-icmbio-1/foto.jpg/@@images/36ad004e-cb04-49a6-b51e-c59921dbd887.jpeg')] bg-cover bg-center">
        1
      </div>
    </Carousel>
  );

  
  export const White = () => (
    <Carousel className="w-[800px] h-[350px]" variant="white">
      <div className="size-full bg-[url('https://www.gov.br/mma/pt-br/assuntos/noticias/conama-aprova-proposta-para-conservar-recursos-hidricos-no-pantanal/marina-capo-conama.jpg/@@images/6687358c-b61a-4f79-a335-12e77075ffad.jpeg')] bg-cover bg-center">
        1
      </div>
      <div className="size-full bg-[url('https://www.gov.br/mma/pt-br/assuntos/noticias/governo-federal-autoriza-810-vagas-para-ibama-e-icmbio-1/foto.jpg/@@images/36ad004e-cb04-49a6-b51e-c59921dbd887.jpeg')] bg-cover bg-center">
        1
      </div>
    </Carousel>
  );
  
