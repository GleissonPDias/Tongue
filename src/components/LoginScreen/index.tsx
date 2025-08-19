import { ButtonsLogin } from "../ButtonsLogin";
import { useNavigate } from "react-router-dom";
import { FormLogin } from "../FormLogin";
import { InputLogin } from "../InputLogin";
import { Container } from "../Container";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Atom, EraserIcon, LogInIcon, UserRoundPen } from "lucide-react";

export function LoginScreen() {
  const navigate = useNavigate();
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
      if (data.success) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/UserPage");
      } else {
        alert(data.message);
      }
      console.log(data);
      setEmail("");
      setSenha("");
    } catch (err) {
      console.error(err);
    }
  };

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <Atom size="80" color="#3ec9a7" />
        <InputLogin
          type="email"
          id="email"
          htmlFor="email"
          name="email"
          label="E-mail"
          placeholder="example@email.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputLogin
          type="password"
          id="senha"
          htmlFor="senha"
          name="senha"
          label="Senha"
          placeholder="********"
          value={senha}
          required
          onChange={(e) => setSenha(e.target.value)}
        />
        <div className={styles.buttonsGroup}>
          <ButtonsLogin
            className={styles.erase}
            title="Apagar"
            type="reset"
            onClick={() => {
              setEmail("");
              setSenha("");
            }}
          >
            <EraserIcon />
          </ButtonsLogin>
          <ButtonsLogin className={styles.signup} title="Login" type="submit">
            <LogInIcon />
          </ButtonsLogin>
        </div>
        <p>
          Não tem conta?
          <Link to="/cadastro" font-decoration="none">
            Cadastro
            <UserRoundPen color="#3ec9a7" size="15px" />
          </Link>
        </p>
      </FormLogin>
    </Container>
  );
}
