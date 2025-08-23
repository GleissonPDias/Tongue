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
  const key = "8b2fcaea7a7ff647afa05c9327aba185";
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://gnews.io/api/v4/top-headlines?q=war&lang=en&apikey=${key}`)
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
