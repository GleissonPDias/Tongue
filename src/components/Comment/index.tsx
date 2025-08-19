import styles from "./styles.module.css";

type CommentProps = {
  value: string;
};

export function Comment({ value }: CommentProps) {
  return <textarea className={styles.bio}>{value}</textarea>;
}
