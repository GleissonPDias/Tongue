import styles from "./styles.module.css";
type InputLoginProps = {
  label: string;
  type: "email" | "password" | "text";
  id: string;
  name: string;
  value?: string;
  htmlFor: string;
  onChange?: () => void;
};
export function InputLogin({
  label,
  type,
  htmlFor,
  id,
  name,
  value,
  onChange,
}: InputLoginProps) {
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        className={styles.inputs}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
