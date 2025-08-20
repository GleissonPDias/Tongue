type CommitProps = {
  value?: string;
  className: string;
  maxlength?: number;
  disable?: boolean;
  rows?: number;
  cols?: number;
};

export function Commit({
  value,
  className,
  maxlength,
  disable,
  rows,
  cols,
}: CommitProps) {
  return (
    <textarea
      rows={rows}
      cols={cols}
      disabled={disable}
      maxLength={maxlength}
      className={className}
    >
      {value}
    </textarea>
  );
}
