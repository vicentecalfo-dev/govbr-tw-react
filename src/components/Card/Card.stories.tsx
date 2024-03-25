import Card from ".";
import Accordion from "../Accordion";
import { Avatar } from "../Avatar";
import { Button } from "../Button";

export default {
  component: Card,
  title: "Card",
};

const data = [
  {
    trigger:
      "Quem pode usar?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in odio congue, bibendum ex vitae, ornare diam. Nam fringilla metus eu viverra lacinia. Duis ut odio viverra, sollicitudin tellus nec, pretium elit. Sed a suscipit augue. Sed mollis accumsan diam, nec maximus dui pharetra sit amet. ",
    value: "1",
  },
  {
    trigger: "Etapas para utilizar este serviço?",
    content:
      "Integer elit mi, scelerisque in lectus vel, iaculis vestibulum tellus. Proin at convallis arcu. Quisque et sollicitudin magna. Donec ultricies neque magna, eu mollis dolor suscipit nec. ",
    value: "2",
  }
];

export const Default = () => (
  <div className="flex gap-5">
    <Card className="w-[400px]">
      <Card.Header className="flex items-center gap-3 text-govbr-blue-warm-vivid-70">
        <Avatar
          src="https://www.gov.br/pt-br/perfil_usuario/aposentado/@@images/image"
          title="Aposentadoria"
          variant="image"
          className="border border-govbr-blue-warm-20 size-14"
        />
        <span>
          <h1 className="">Simular Aposentadoria</h1>
          <h2 className="text-sm font-light">Calculadora do INSS</h2>
        </span>
      </Card.Header>
      <Card.Main>
        <p>
          Serviço que ajuda a saber quanto tempo falta para se aposentar (por
          idade ou tempo de contribuição).
        </p>

        <p>
          A simulação é feita com as informações que estão na base de dados do
          INSS. Também é possível incluir vínculos e alterar sua data de
          nascimento no momento da simulação.
        </p>
      </Card.Main>
      <Card.Footer>
        <Button>Começar</Button>
      </Card.Footer>
    </Card>
  </div>
);

export const Simple = () => (
  <div className="flex gap-5">
    <Card className="w-[400px]">
      <Card.Header>Simular Aposentadoria</Card.Header>
      <Card.Main>
        <p>
          Serviço que ajuda a saber quanto tempo falta para se aposentar (por
          idade ou tempo de contribuição).
        </p>

        <p>
          A simulação é feita com as informações que estão na base de dados do
          INSS. Também é possível incluir vínculos e alterar sua data de
          nascimento no momento da simulação.
        </p>
      </Card.Main>
      <Card.Footer>
        <Button>Começar</Button>
      </Card.Footer>
    </Card>
  </div>
);

export const Disabled = () => (
  <div className="flex gap-5">
    <Card className="w-[400px]" disabled="">
      <Card.Header className="flex items-center gap-3 text-govbr-blue-warm-vivid-70">
        <Avatar
          src="https://www.gov.br/pt-br/perfil_usuario/aposentado/@@images/image"
          title="Aposentadoria"
          variant="image"
          className="border border-govbr-blue-warm-20 size-14"
        />
        <span>
          <h1 className="">Simular Aposentadoria</h1>
          <h2 className="text-sm font-light">Calculadora do INSS</h2>
        </span>
      </Card.Header>
      <Card.Main>
        <p>
          Serviço que ajuda a saber quanto tempo falta para se aposentar (por
          idade ou tempo de contribuição).
        </p>

        <p>
          A simulação é feita com as informações que estão na base de dados do
          INSS. Também é possível incluir vínculos e alterar sua data de
          nascimento no momento da simulação.
        </p>
      </Card.Main>
      <Card.Footer>
        <Button>Começar</Button>
      </Card.Footer>
    </Card>
  </div>
);

export const WithImage = () => (
  <div className="flex gap-5">
    <Card className="w-[400px]">
      <img src="https://www.gov.br/inss/pt-br/assuntos/gestao-e-inss-fazem-redesenho-para-facilitar-solicitacao-de-aposentadoria-por-tempo-de-contribuicao/meu-inss.jpeg/@@images/82050ddd-333f-499b-b02b-157aa8ee2fb3.jpeg" />
      <Card.Header className="flex items-center gap-3 text-govbr-blue-warm-vivid-70">
        <Avatar
          src="https://www.gov.br/pt-br/perfil_usuario/aposentado/@@images/image"
          title="Aposentadoria"
          variant="image"
          className="border border-govbr-blue-warm-20 size-14"
        />
        <span>
          <h1 className="">Simular Aposentadoria</h1>
          <h2 className="text-sm font-light">Calculadora do INSS</h2>
        </span>
      </Card.Header>
      <Card.Main>
        <p>
          Serviço que ajuda a saber quanto tempo falta para se aposentar (por
          idade ou tempo de contribuição).
        </p>

        <p>
          A simulação é feita com as informações que estão na base de dados do
          INSS. Também é possível incluir vínculos e alterar sua data de
          nascimento no momento da simulação.
        </p>
      </Card.Main>
      <Card.Footer>
        <Button>Começar</Button>
      </Card.Footer>
    </Card>
  </div>
);

export const FixedHeight = () => (
  <div className="flex gap-6">
    <Card className="w-[400px]">
      <Card.Header className="flex items-center gap-3 text-govbr-blue-warm-vivid-70">
        <Avatar
          src="https://www.gov.br/pt-br/perfil_usuario/aposentado/@@images/image"
          title="Aposentadoria"
          variant="image"
          className="border border-govbr-blue-warm-20 size-14"
        />
        <span>
          <h1 className="">Simular Aposentadoria</h1>
          <h2 className="text-sm font-light">Calculadora do INSS</h2>
        </span>
      </Card.Header>
      <Card.Main className="max-h-[120px] overflow-auto">
        <p>
          Serviço que ajuda a saber quanto tempo falta para se aposentar (por
          idade ou tempo de contribuição).
        </p>

        <p>
          A simulação é feita com as informações que estão na base de dados do
          INSS. Também é possível incluir vínculos e alterar sua data de
          nascimento no momento da simulação.
        </p>
      </Card.Main>
      <Card.Footer>
        <Button>Começar</Button>
      </Card.Footer>
    </Card>
    <Card className="w-[400px]">
      <Card.Header className="flex items-center gap-3 text-govbr-blue-warm-vivid-70">
        <Avatar
          src="https://www.gov.br/pt-br/perfil_usuario/empreendedor/@@images/image"
          title="Empreendedor"
          variant="image"
          className="border border-govbr-blue-warm-20 size-14"
        />
        <span>
          <h1 className="">Começar meu Negócio</h1>
          <h2 className="text-sm font-light">
            Cadastrar Microempreendedor Individual (MEI)
          </h2>
        </span>
      </Card.Header>
      <Card.Main className="max-h-[120px] overflow-auto">
        <p>
          Este serviço oferece a inscrição do microempreendedor individual, ou
          seja, o empreendedor terá a formalização de sua atividade a partir do
          registro empresarial junto aos órgãos governamentais para :
        </p>

        <ul className="list-disc mx-6">
          <li>Obter o CNPJ;</li>
          <li>Emitir nota fiscal;</li>
          <li>Vender para o governo;</li>
          <li>Acessar serviços bancários específicos;</li>
          <li>Pagar tributos simplificados e mais baratos;</li>
          <li>
            Contribuir para a previdência social e ter regime previdenciário
            próprio.
          </li>
        </ul>
      </Card.Main>
      <Card.Footer>
        <Button>Começar</Button>
      </Card.Footer>
    </Card>
  </div>
);

export const CompoundComponents = () => (
    <div className="flex gap-6">
      <Card className="w-[400px]">
        <Card.Header className="flex items-center gap-3 text-govbr-blue-warm-vivid-70">
          <Avatar
            src="https://www.gov.br/pt-br/perfil_usuario/empreendedor/@@images/image"
            title="Empreendedor"
            variant="image"
            className="border border-govbr-blue-warm-20 size-14"
          />
          <span>
            <h1 className="">Começar meu Negócio</h1>
            <h2 className="text-sm font-light">
              Cadastrar Microempreendedor Individual (MEI)
            </h2>
          </span>
        </Card.Header>
        <Card.Main className="max-h-[120px] overflow-auto">
          <p>
            Este serviço oferece a inscrição do microempreendedor individual, ou
            seja, o empreendedor terá a formalização de sua atividade a partir do
            registro empresarial junto aos órgãos governamentais para :
          </p>
  
          <ul className="list-disc mx-6">
            <li>Obter o CNPJ;</li>
            <li>Emitir nota fiscal;</li>
            <li>Vender para o governo;</li>
            <li>Acessar serviços bancários específicos;</li>
            <li>Pagar tributos simplificados e mais baratos;</li>
            <li>
              Contribuir para a previdência social e ter regime previdenciário
              próprio.
            </li>
          </ul>
        </Card.Main>
        <Accordion multi={false}>
      {data.map(({ value, trigger, content }) => (
        <Accordion.Item value={value}>
          <>{trigger}</>
          <>{content}</>
        </Accordion.Item>
      ))}
    </Accordion>
        <Card.Footer>
          <Button>Começar</Button>
        </Card.Footer>
      </Card>
      <Card className="w-[400px] bg-govbr-blue-warm-vivid-90">
        <Card.Header className="flex items-center gap-3 text-govbr-blue-warm-20">
          <Avatar
            src="https://www.gov.br/pt-br/perfil_usuario/empreendedor/@@images/image"
            title="Empreendedor"
            variant="image"
            className="border border-govbr-blue-warm-20 size-14"
          />
          <span>
            <h1 className="">Começar meu Negócio</h1>
            <h2 className="text-sm font-light">
              Cadastrar Microempreendedor Individual (MEI)
            </h2>
          </span>
        </Card.Header>
        <Card.Main className="max-h-[120px] overflow-auto text-govbr-pure-0">
          <p>
            Este serviço oferece a inscrição do microempreendedor individual, ou
            seja, o empreendedor terá a formalização de sua atividade a partir do
            registro empresarial junto aos órgãos governamentais para :
          </p>
  
          <ul className="list-disc mx-6">
            <li>Obter o CNPJ;</li>
            <li>Emitir nota fiscal;</li>
            <li>Vender para o governo;</li>
            <li>Acessar serviços bancários específicos;</li>
            <li>Pagar tributos simplificados e mais baratos;</li>
            <li>
              Contribuir para a previdência social e ter regime previdenciário
              próprio.
            </li>
          </ul>
        </Card.Main>
        <Accordion multi={false} variant="dark">
      {data.map(({ value, trigger, content }) => (
        <Accordion.Item value={value}>
          <>{trigger}</>
          <>{content}</>
        </Accordion.Item>
      ))}
    </Accordion>
        <Card.Footer>
          <Button variant="default-dark">Começar</Button>
        </Card.Footer>
      </Card>
    </div>
  );
  