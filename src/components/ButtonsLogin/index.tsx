type ButtonsLoginProps = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
};
export function ButtonsLogin({
  children,
  className,
  title,
  type,
  onClick,
}: ButtonsLoginProps) {
  return (
    <button className={className} type={type} onClick={onClick} title={title}>
      {children}
    </button>
  );
}
