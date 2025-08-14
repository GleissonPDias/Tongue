import styles from "./styles.module.css";

type FormLoginProps = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function FormLogin({ children, onSubmit }: FormLoginProps) {
  return (
    <form onSubmit={onSubmit} className={styles.formLogin}>
      {children}
    </form>
  );
}
