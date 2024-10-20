type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
};
