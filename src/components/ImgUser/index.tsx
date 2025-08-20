import styles from "./styles.module.css";

type ImgUserProps = {
  src: string;
};
export function ImgUser({ src }: ImgUserProps) {
  return <img className={styles.img} src={src} />;
}
