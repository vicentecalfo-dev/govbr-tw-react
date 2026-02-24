import Login from ".";

export default {
  component: Login,
  title: "Login",
};

export const Default = () => (
  <div className="w-[480px]">
    <Login
      locatorText="Ministério do Meio Ambiente"
      institutionText="Instituto de Pesquisas Jardim Botânico do Rio de Janeiro"
    />
  </div>
);

export const Prefilled = () => (
  <div className="max-w-[480px]">
    <Login
      initialUsername="usuario"
      initialPassword="12345"
      subtitle="Teste de validacao com valores iniciais."
      locatorText="Governo Federal"
      institutionText="Ministerio da Saude"
    />
  </div>
);

export const Disabled = () => (
  <div className="max-w-[480px]">
    <Login
      disabled
      subtitle="Campos bloqueados para demonstracao."
      locatorText="Governo Federal"
      institutionText="Ministerio da Saude"
    />
  </div>
);
