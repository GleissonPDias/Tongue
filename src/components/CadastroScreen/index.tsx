import { ButtonsLogin } from "../ButtonsLogin";
import { FormLogin } from "../FormLogin";
import { InputLogin } from "../InputLogin";
import { Container } from "../Container";
import { useState } from "react";
import styles from "./styles.module.css";
import { ArrowLeft, Atom, EraserIcon, LogInIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Commit } from "../Commit";

export function CadastroScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [securityPhrase, setSecurityPhrase] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifica se todos os campos foram preenchidos
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !username ||
      !securityPhrase ||
      !bio
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Verifica se senhas conferem
    if (password !== confirmPassword) {
      alert("A senha e a confirmação de senha não conferem.");
      return;
    }

    try {
      const response = await fetch("http://localhost/apis/cadastro.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          confirm_password: confirmPassword,
          username,
          bio,
          security_phrase: securityPhrase,
        }),
      });

      const data = await response.json();
      alert(data.message);
      console.log(data);

      // Limpa todos os campos
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
      setSecurityPhrase("");
      setBio("");
    } catch (err) {
      console.error(err);
      alert("Erro ao tentar cadastrar. Tente novamente.");
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setSecurityPhrase("");
    setBio("");
  };

  return (
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <Link to="/">
          <ArrowLeft />
        </Link>
        <Atom size="50" color="#3ec9a7" />

        <InputLogin
          type="text"
          id="username"
          htmlFor="username"
          name="username"
          label="Username"
          placeholder="JohnDoe123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputLogin
          type="email"
          id="email"
          htmlFor="email"
          name="email"
          label="Email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputLogin
          type="password"
          id="password"
          htmlFor="password"
          name="password"
          label="Senha"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputLogin
          type="password"
          id="confirm_password"
          htmlFor="confirm_password"
          name="confirm_password"
          label="Confirmação de senha"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <InputLogin
          type="text"
          id="security_phrase"
          htmlFor="security_phrase"
          name="security_phrase"
          label="Frase de Recuperação"
          placeholder="Interestelar2025"
          value={securityPhrase}
          onChange={(e) => setSecurityPhrase(e.target.value)}
        />
        <label htmlFor="bio">Bio</label>
        <Commit
          id="bio"
          name="bio"
          className="bio"
          value={bio}
          placeholder="Eu gosto de ler sobre...tenho Xanos...meu hobbie é..."
          rows={3}
          maxlength={110}
          onChange={(e) => setBio(e.target.value)}
        />
        <div className={styles.buttonsGroup}>
          <ButtonsLogin
            className={styles.erase}
            title="Apagar"
            type="button"
            onClick={handleReset}
          >
            <EraserIcon />
          </ButtonsLogin>

          <ButtonsLogin
            className={styles.signup}
            title="Cadastrar"
            type="submit"
          >
            <LogInIcon />
          </ButtonsLogin>
        </div>
      </FormLogin>
    </Container>
  );
}
