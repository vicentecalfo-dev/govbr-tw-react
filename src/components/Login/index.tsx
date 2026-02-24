import { useCallback, useMemo, useState, type FormEvent } from "react";
import Card from "../Card";
import Input from "../Input";
import { Button } from "../Button";
import { GovBRLogo } from "../GovBRLogo";

export interface LoginValues {
  username: string;
  password: string;
}

export interface LoginProps {
  title?: string;
  subtitle?: string;
  initialUsername?: string;
  initialPassword?: string;
  minUsernameLength?: number;
  minPasswordLength?: number;
  showGovBRLogo?: boolean;
  locatorText?: string;
  institutionText?: string;
  usernameLabel?: string;
  passwordLabel?: string;
  usernamePlaceholder?: string;
  passwordPlaceholder?: string;
  submitLabel?: string;
  usernameRequiredMessage?: string;
  usernameMinLengthMessage?: string;
  passwordRequiredMessage?: string;
  passwordMinLengthMessage?: string;
  onSubmit?: (values: LoginValues) => void;
  disabled?: boolean;
  className?: string;
}

const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;

const Login = ({
  title = "Acesso",
  subtitle = "Informe suas credenciais",
  initialUsername = "",
  initialPassword = "",
  minUsernameLength = MIN_USERNAME_LENGTH,
  minPasswordLength = MIN_PASSWORD_LENGTH,
  showGovBRLogo = true,
  locatorText,
  institutionText,
  usernameLabel = "Usuário",
  passwordLabel = "Senha",
  usernamePlaceholder = "Seu usuário",
  passwordPlaceholder = "Sua senha",
  submitLabel = "Entrar",
  usernameRequiredMessage = "Usuário obrigatório.",
  usernameMinLengthMessage = `Usuário deve ter ao menos ${minUsernameLength} caracteres.`,
  passwordRequiredMessage = "Senha obrigatória.",
  passwordMinLengthMessage = `Senha deve ter ao menos ${minPasswordLength} caracteres.`,
  onSubmit,
  disabled = false,
  className,
}: LoginProps) => {
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState(initialPassword);
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const errors = useMemo(() => {
    const nextErrors: Partial<LoginValues> = {};

    if (!username.trim()) {
      nextErrors.username = usernameRequiredMessage;
    } else if (username.trim().length < minUsernameLength) {
      nextErrors.username = usernameMinLengthMessage;
    }

    if (!password.trim()) {
      nextErrors.password = passwordRequiredMessage;
    } else if (password.trim().length < minPasswordLength) {
      nextErrors.password = passwordMinLengthMessage;
    }

    return nextErrors;
  }, [
    minPasswordLength,
    minUsernameLength,
    password,
    passwordMinLengthMessage,
    passwordRequiredMessage,
    username,
    usernameMinLengthMessage,
    usernameRequiredMessage,
  ]);

  const hasError = (field: keyof LoginValues) => Boolean(errors[field]);
  const showError = (field: keyof LoginValues) =>
    touched[field] ? errors[field] : "";

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setTouched({ username: true, password: true });

      if (Object.keys(errors).length > 0) {
        return;
      }

      onSubmit?.({ username: username.trim(), password: password.trim() });
    },
    [errors, onSubmit, password, username]
  );

  return (
    <Card className={className} disabled={disabled}>
      <Card.Header className="space-y-1">
        {(showGovBRLogo || locatorText || institutionText) && (
          <div className="flex items-center gap-6 pb-2">
            {showGovBRLogo && (
              <div className="w-28">
                <GovBRLogo />
              </div>
            )}
            {(locatorText || institutionText) && (
              <div className="text-govbr-gray-70">
                {locatorText && (
                  <div className="text-sm font-semibold text-govbr-gray-80">
                    {locatorText}
                  </div>
                )}
                {institutionText && (
                  <div className="text-xs text-govbr-gray-60">{institutionText}</div>
                )}
              </div>
            )}
          </div>
        )}
        <h2 className="text-xl font-semibold text-govbr-gray-90">{title}</h2>
        <p className="text-sm font-normal text-govbr-gray-60">{subtitle}</p>
      </Card.Header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-6">
        <Card.Main>
          <label className="flex flex-col gap-3">
            <span className="text-sm font-medium text-govbr-gray-80">
              {usernameLabel}
            </span>
            <Input
              type="text"
              placeholder={usernamePlaceholder}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, username: true }))
              }
              variant={showError("username") ? "danger" : "default"}
              hint={showError("username")}
              disabled={disabled}
              autoComplete="username"
              aria-invalid={hasError("username")}
            />
          </label>

          <label className="flex flex-col gap-3">
            <span className="text-sm font-medium text-govbr-gray-80">
              {passwordLabel}
            </span>
            <Input
              type="password"
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, password: true }))
              }
              variant={showError("password") ? "danger" : "default"}
              hint={showError("password")}
              disabled={disabled}
              autoComplete="current-password"
              aria-invalid={hasError("password")}
            />
          </label>
        </Card.Main>
        <Card.Footer className="pt-2">
          <Button type="submit" disabled={disabled}>
            {submitLabel}
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
};

export default Login;
