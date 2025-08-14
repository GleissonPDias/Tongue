import styles from "./styles.module.css";
type ContainerProps = {
  children: React.ReactNode;
};
export function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
