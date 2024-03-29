import { useEffect, useRef } from "react";
import Dialog from ".";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default {
  component: Dialog,
  title: "Dialog",
};

export const Default = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  useEffect(() => {
    toggleDialog();
  }, []);

  return (
    <>
      <Button onClick={toggleDialog}>Open Dialog</Button>
      <Dialog ref={dialogRef} toggleDialog={toggleDialog} className="w-[450px]">
        <Dialog.Header>
          <h1>Escola Nacional de Botânica Tropical</h1>
        </Dialog.Header>
        <Dialog.Content className="h-[200px] overflow-auto">
          <p>
            Inaugurada em 6 de junho de 2001, a Escola Nacional de Botânica
            Tropical (ENBT) centraliza as atividades de pós-graduação, extensão,
            capacitação profissional e responsabilidade socioambiental do
            Instituto de Pesquisas Jardim Botânico do Rio de Janeiro (JBRJ).
            Para isso, conta com uma equipe formada por educadores,
            pesquisadores e tecnologistas reconhecidos em suas respectivas áreas
            de atuação.
          </p>

          <p>
            A ENBT tem como sede o Solar da Imperatriz, prédio histórico que já
            abrigou o Asilo Agrícola do Imperial Instituto da Agricultura
            (1872), o Museu Florestal (1909) e um Laboratório de Botânica
            (1927). Em 1973, o prédio e seu entorno foram tombados pelo IPHAN.
            Visando à instalação da Escola, o Solar passou por uma grande
            restauração, iniciada em 1998, por meio de uma parceria do
            Ministério do Meio Ambiente/JBRJ com a Caixa Econômica Federal. O
            paisagismo foi executado pelo escritório Burle Marx.
          </p>

          <p>
            A ENBT tem como Missão "transformar pessoas em seus princípios,
            valores, capacidades e competências com foco no Conhecimento e
            Conservação da Biodiversidade". Os valores que norteiam sua atuação
            são: ética, excelência, liberdade acadêmica, meritocracia, paixão e
            ambição, responsabilidade socioambiental, prestação de serviços de
            alta relevância à sociedade, transparência e uso da biodiversidade
            como agente de justiça social.
          </p>
        </Dialog.Content>
        <Dialog.Footer>
          <Button onClick={toggleDialog}>Fechar</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export const Dark = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };
  useEffect(() => {
    toggleDialog();
  }, []);

  return (
    <>
      <Button onClick={toggleDialog}>Open Dialog</Button>
      <Dialog
        ref={dialogRef}
        toggleDialog={toggleDialog}
        className="w-[450px]"
        variant="dark"
      >
        <Dialog.Header>
          <h1>Escola Nacional de Botânica Tropical</h1>
        </Dialog.Header>
        <Dialog.Content className="h-[200px] overflow-auto">
          <p>
            Inaugurada em 6 de junho de 2001, a Escola Nacional de Botânica
            Tropical (ENBT) centraliza as atividades de pós-graduação, extensão,
            capacitação profissional e responsabilidade socioambiental do
            Instituto de Pesquisas Jardim Botânico do Rio de Janeiro (JBRJ).
            Para isso, conta com uma equipe formada por educadores,
            pesquisadores e tecnologistas reconhecidos em suas respectivas áreas
            de atuação.
          </p>

          <p>
            A ENBT tem como sede o Solar da Imperatriz, prédio histórico que já
            abrigou o Asilo Agrícola do Imperial Instituto da Agricultura
            (1872), o Museu Florestal (1909) e um Laboratório de Botânica
            (1927). Em 1973, o prédio e seu entorno foram tombados pelo IPHAN.
            Visando à instalação da Escola, o Solar passou por uma grande
            restauração, iniciada em 1998, por meio de uma parceria do
            Ministério do Meio Ambiente/JBRJ com a Caixa Econômica Federal. O
            paisagismo foi executado pelo escritório Burle Marx.
          </p>

          <p>
            A ENBT tem como Missão "transformar pessoas em seus princípios,
            valores, capacidades e competências com foco no Conhecimento e
            Conservação da Biodiversidade". Os valores que norteiam sua atuação
            são: ética, excelência, liberdade acadêmica, meritocracia, paixão e
            ambição, responsabilidade socioambiental, prestação de serviços de
            alta relevância à sociedade, transparência e uso da biodiversidade
            como agente de justiça social.
          </p>
        </Dialog.Content>
        <Dialog.Footer>
          <Button onClick={toggleDialog} variant="default-dark">
            Fechar
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export const CustomColors = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };
  useEffect(() => {
    toggleDialog();
  }, []);

  return (
    <>
      <Button onClick={toggleDialog}>Open Dialog</Button>
      <Dialog ref={dialogRef} toggleDialog={toggleDialog} className="w-[450px]">
        <Dialog.Header className="bg-govbr-gray-10">
          <h1>Escola Nacional de Botânica Tropical</h1>
        </Dialog.Header>
        <Dialog.Content className="h-[200px] overflow-auto bg-govbr-gray-2">
          <p>
            Inaugurada em 6 de junho de 2001, a Escola Nacional de Botânica
            Tropical (ENBT) centraliza as atividades de pós-graduação, extensão,
            capacitação profissional e responsabilidade socioambiental do
            Instituto de Pesquisas Jardim Botânico do Rio de Janeiro (JBRJ).
            Para isso, conta com uma equipe formada por educadores,
            pesquisadores e tecnologistas reconhecidos em suas respectivas áreas
            de atuação.
          </p>

          <p>
            A ENBT tem como sede o Solar da Imperatriz, prédio histórico que já
            abrigou o Asilo Agrícola do Imperial Instituto da Agricultura
            (1872), o Museu Florestal (1909) e um Laboratório de Botânica
            (1927). Em 1973, o prédio e seu entorno foram tombados pelo IPHAN.
            Visando à instalação da Escola, o Solar passou por uma grande
            restauração, iniciada em 1998, por meio de uma parceria do
            Ministério do Meio Ambiente/JBRJ com a Caixa Econômica Federal. O
            paisagismo foi executado pelo escritório Burle Marx.
          </p>

          <p>
            A ENBT tem como Missão "transformar pessoas em seus princípios,
            valores, capacidades e competências com foco no Conhecimento e
            Conservação da Biodiversidade". Os valores que norteiam sua atuação
            são: ética, excelência, liberdade acadêmica, meritocracia, paixão e
            ambição, responsabilidade socioambiental, prestação de serviços de
            alta relevância à sociedade, transparência e uso da biodiversidade
            como agente de justiça social.
          </p>
        </Dialog.Content>
        <Dialog.Footer className="bg-govbr-gray-10">
          <Button onClick={toggleDialog}>Fechar</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export const NoPadding = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  useEffect(() => {
    toggleDialog();
  }, []);

  return (
    <>
      <Button onClick={toggleDialog}>Open Dialog</Button>
      <Dialog
        ref={dialogRef}
        toggleDialog={toggleDialog}
        className="w-[450px]"
        padding={false}
      >
        <Dialog.Header>
          <h1>Escola Nacional de Botânica Tropical</h1>
        </Dialog.Header>
        <Dialog.Content className="h-[200px] overflow-auto">
          <p>
            Inaugurada em 6 de junho de 2001, a Escola Nacional de Botânica
            Tropical (ENBT) centraliza as atividades de pós-graduação, extensão,
            capacitação profissional e responsabilidade socioambiental do
            Instituto de Pesquisas Jardim Botânico do Rio de Janeiro (JBRJ).
            Para isso, conta com uma equipe formada por educadores,
            pesquisadores e tecnologistas reconhecidos em suas respectivas áreas
            de atuação.
          </p>

          <p>
            A ENBT tem como sede o Solar da Imperatriz, prédio histórico que já
            abrigou o Asilo Agrícola do Imperial Instituto da Agricultura
            (1872), o Museu Florestal (1909) e um Laboratório de Botânica
            (1927). Em 1973, o prédio e seu entorno foram tombados pelo IPHAN.
            Visando à instalação da Escola, o Solar passou por uma grande
            restauração, iniciada em 1998, por meio de uma parceria do
            Ministério do Meio Ambiente/JBRJ com a Caixa Econômica Federal. O
            paisagismo foi executado pelo escritório Burle Marx.
          </p>

          <p>
            A ENBT tem como Missão "transformar pessoas em seus princípios,
            valores, capacidades e competências com foco no Conhecimento e
            Conservação da Biodiversidade". Os valores que norteiam sua atuação
            são: ética, excelência, liberdade acadêmica, meritocracia, paixão e
            ambição, responsabilidade socioambiental, prestação de serviços de
            alta relevância à sociedade, transparência e uso da biodiversidade
            como agente de justiça social.
          </p>
        </Dialog.Content>
        <Dialog.Footer>
          <Button onClick={toggleDialog}>Fechar</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export const Compound = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
  
    const toggleDialog = () => {
      if (!dialogRef.current) {
        return;
      }
      dialogRef.current.hasAttribute("open")
        ? dialogRef.current.close()
        : dialogRef.current.showModal();
    };
  
    useEffect(() => {
      toggleDialog();
    }, []);
  
    return (
      <>
        <Button onClick={toggleDialog}>Open Dialog</Button>
        <Dialog ref={dialogRef} toggleDialog={toggleDialog} className="w-[450px]">
          <Dialog.Header className="flex gap-3 items-center">
            <h1 className="flex-1">Escola Nacional de Botânica Tropical</h1>
            <Button size="icon" variant="ghost" onClick={toggleDialog}>
                <FontAwesomeIcon icon={faXmark} />
            </Button>
          </Dialog.Header>
          <Dialog.Content className="h-[200px] overflow-auto">
            <p>
              Inaugurada em 6 de junho de 2001, a Escola Nacional de Botânica
              Tropical (ENBT) centraliza as atividades de pós-graduação, extensão,
              capacitação profissional e responsabilidade socioambiental do
              Instituto de Pesquisas Jardim Botânico do Rio de Janeiro (JBRJ).
              Para isso, conta com uma equipe formada por educadores,
              pesquisadores e tecnologistas reconhecidos em suas respectivas áreas
              de atuação.
            </p>
  
            <p>
              A ENBT tem como sede o Solar da Imperatriz, prédio histórico que já
              abrigou o Asilo Agrícola do Imperial Instituto da Agricultura
              (1872), o Museu Florestal (1909) e um Laboratório de Botânica
              (1927). Em 1973, o prédio e seu entorno foram tombados pelo IPHAN.
              Visando à instalação da Escola, o Solar passou por uma grande
              restauração, iniciada em 1998, por meio de uma parceria do
              Ministério do Meio Ambiente/JBRJ com a Caixa Econômica Federal. O
              paisagismo foi executado pelo escritório Burle Marx.
            </p>
  
            <p>
              A ENBT tem como Missão "transformar pessoas em seus princípios,
              valores, capacidades e competências com foco no Conhecimento e
              Conservação da Biodiversidade". Os valores que norteiam sua atuação
              são: ética, excelência, liberdade acadêmica, meritocracia, paixão e
              ambição, responsabilidade socioambiental, prestação de serviços de
              alta relevância à sociedade, transparência e uso da biodiversidade
              como agente de justiça social.
            </p>
          </Dialog.Content>
          <Dialog.Footer className="flex gap-6">
          <Button>Saiba Mais</Button>
          <Button variant="outline">Pós-Graduação</Button>
        </Dialog.Footer>
        </Dialog>
      </>
    );
  };
