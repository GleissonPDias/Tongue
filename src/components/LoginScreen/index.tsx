import { ButtonsLogin } from "../ButtonsLogin";
import { FormLogin } from "../FormLogin";
import { InputLogin } from "../InputLogin";
import { Container } from "../Container";

export function LoginScreen() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const senha = (form.elements.namedItem("senha") as HTMLInputElement).value;

    try {
      const response = await fetch(
        "http://192.168.100.4:8000/apis/processa_login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        }
      );
      const data = await response.json();
      alert(data.message);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <InputLogin
          type="email"
          id="email"
          htmlFor="email"
          name="email"
          label="E-mail"
        />
        <InputLogin
          type="password"
          id="senha"
          htmlFor="senha"
          name="senha"
          label="Senha"
        />
        <div>
          <ButtonsLogin label="Login" type="submit" />
          <ButtonsLogin label="Apagar" type="reset" />
        </div>
      </FormLogin>
    </Container>
  );
}
