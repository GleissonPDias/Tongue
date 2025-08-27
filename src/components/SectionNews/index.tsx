import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Navbar } from "../Navbar";

type Article = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: { name: string; url: string };
};

export function SectionNews() {
  const key = "0d5ecaf830424ee4be068b01992776fb";
  const search = "";

  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=${search}&category=sports&pageSize=15&language=pt&from=2025-08-26&to=2025-08-26&sortBy=popularity&apiKey=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setNews(data.articles);
          console.log(data);
        } else {
          setError("Erro ao carregar notícias");
        }
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        setError("Erro na requisição: " + err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.news}>
      {loading && <p>Carregando notícias...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && news.length === 0 && (
        <p>Nenhuma notícia encontrada.</p>
      )}
      {!loading &&
        !error &&
        news.map((article, index) => (
          <div key={index} className={styles.article}>
            {article.image ? (
              <img src={article.image} alt={article.title} />
            ) : (
              <div className={styles.placeholder}>Sem imagem</div>
            )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Ler mais
            </a>
            <small>
              Fonte:{" "}
              <a href={article.source.url} target="_blank" rel="noreferrer">
                {article.source.name}
              </a>
            </small>
          </div>
        ))}
      <Navbar />
    </section>
  );
}
