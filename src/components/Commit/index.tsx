type CommitProps = {
  name: string;
  id: string;
  placeholder?: string;
  value?: string;
  className?: string;
  maxlength?: number;
  disable?: boolean;
  rows?: number;
  cols?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function Commit({
  id,
  name,
  placeholder,
  value,
  className,
  maxlength,
  disable,
  rows,
  cols,
  onChange,
}: CommitProps) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      rows={rows}
      cols={cols}
      disabled={disable}
      maxLength={maxlength}
      className={className}
      value={value}
    />
  );
}
