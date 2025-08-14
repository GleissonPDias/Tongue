import styles from "./styles.module.css";
type ButtonsLoginProps = {
  label: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
};
export function ButtonsLogin({ label, type, onClick }: ButtonsLoginProps) {
  return (
    <button className={styles.buttons} type={type} onClick={onClick}>
      {label}
    </button>
  );
}
