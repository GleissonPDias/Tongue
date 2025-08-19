import styles from "./styles.module.css";
type InputLoginProps = {
  label: string;
  type: "email" | "password" | "text";
  id: string;
  name: string;
  value?: string;
  htmlFor: string;
  placeholder: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export function InputLogin({
  label,
  type,
  htmlFor,
  id,
  name,
  value,
  placeholder,
  required,
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
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
      />
    </>
  );
}
