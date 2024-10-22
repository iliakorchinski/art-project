import { InputContainer } from './SearchInputStyle';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <InputContainer
      placeholder="search artist or title"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
