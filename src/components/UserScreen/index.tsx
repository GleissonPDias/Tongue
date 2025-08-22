import { Container } from "../Container";
import { ImgUser } from "../ImgUser";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { UploadPhoto } from "../UploadPhoto";

import { IoIosNotifications, IoIosSearch, IoMdSettings } from "react-icons/io";
import { CgFeed } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";

export function UserScreen() {
  interface User {
    id_user: number;
    name: string;
    email: string;
    bio: string;
  }
  const [photoUpdateKey, setPhotoUpdateKey] = useState(Date.now());

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

    fetch("http://192.168.100.4:8000/apis/dataUsers.php", {
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
          console.error("Resposta completa:", text, err);
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
        {user && (
          <ImgUser
            src={`http://192.168.100.4:8000/apis/get_photo.php?id_user=${user.id_user}&t=${photoUpdateKey}`}
          />
        )}
        {user && (
          <UploadPhoto
            className={styles.btnUpload}
            userId={user.id_user}
            onUploadSuccess={() => setPhotoUpdateKey(Date.now())}
          />
        )}
        {loading ? (
          <p>Carregando usuário...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : user ? (
          <h1 className={styles.username} key={user.id_user}>
            {user.name}
          </h1>
        ) : (
          <p>Nenhum usuário encontrado</p>
        )}
        {user && <p className={styles.about}>{user.bio}</p>}
        <div className={styles.config}>
          <IoMdSettings size={30} />
        </div>
        <div className={styles.feed}>
          <CgFeed size={30} color="#03bfcb" />
        </div>
        <div className={styles.buttons}>
          <button className={styles.primary}>Message</button>
          <button className={styles.ghost}>Following</button>
        </div>
        <div className={styles.skills}>
          <h6>Preferencias</h6>
          <br></br>
          <ul>
            <li>Esportes</li>
            <li>Tecnologia</li>
            <li>Internacional</li>
            <li>Pop</li>
            <li>Novelas</li>
            <li>Famosos</li>
          </ul>
        </div>
        <div className={styles.navbar}>
          <ul>
            <IoIosSearch />
          </ul>
          <ul>
            <IoHome />
          </ul>
          <ul>
            <LuMessagesSquare />
          </ul>
          <ul>
            <IoIosNotifications />
          </ul>
        </div>
      </div>
    </Container>
  );
}
