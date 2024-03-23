import Message from ".";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default {
  component: Message,
  title: "Message",
};

export const Default = () => (
  <Message>
    <strong>Informação.</strong> Seus dados só serão salvos após o preenchimento
    do primeiro campo do formulário.
  </Message>
);

export const Success = () => (
  <Message variant="success">
    <strong>Sucesso.</strong> Seus dados foram alterados conforme preenchimento
    do formulário.
  </Message>
);

export const Danger = () => (
  <Message variant="danger">
    <strong>Data de início do afastamento inválida.</strong> A data não pode ser
    superior à data atual.
  </Message>
);

export const Warning = () => (
  <Message variant="warning">
    <strong>Atenção.</strong> Em caso de dúvida, não compartilhe sua senha com
    terceiros. Ligue para a Central de atendimento.
  </Message>
);

export const Timer = () => (
  <div className="flex flex-col gap-6">
    <Message variant="warning" closable="both">
      <strong>Atenção.</strong> Em caso de dúvida, não compartilhe sua senha com
      terceiros. Ligue para a Central de atendimento.
    </Message>
    <Message variant="success" closable="both" timer={10}>
      <strong>Sucesso.</strong> Seus dados foram alterados conforme
      preenchimento do formulário.
    </Message>
  </div>
);

export const CustomIcon = () => (
  <Message icon={faLock}>
    <strong>Matrícula Trancada.</strong> Volte logo!
  </Message>
);

export const NoClose = () => (
    <Message closable="none">
      <strong>Informação.</strong> Seus dados só serão salvos após o preenchimento
      do primeiro campo do formulário.
    </Message>
  );