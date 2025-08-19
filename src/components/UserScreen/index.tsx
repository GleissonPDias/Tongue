import { Container } from "../Container";
import { ImgUser } from "../ImgUser";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

export function UserScreen() {
  interface User {
    id_user: number;
    name: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null); // 👈 agora é só 1 user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token não encontrado no localStorage");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/apis/dataUsers.php", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (data.success) {
            // seu backend retorna apenas 1 usuário (id_user, name, email no payload)
            setUser(data.user);
          } else {
            setError(data.error || "Erro desconhecido do servidor");
          }
        } catch (err) {
          setError("Resposta do servidor não é JSON válido");
          console.error("Resposta completa:", text);
        }
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        setError("Erro na requisição: " + err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <div className={styles.content}>
        <ImgUser />
        {loading ? (
          <p>Carregando usuário...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : user ? (
          <h1 key={user.id_user}>{user.name}</h1>
        ) : (
          <p>Nenhum usuário encontrado</p>
        )}
      </div>
    </Container>
  );
}
