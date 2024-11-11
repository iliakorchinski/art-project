import { SearchInputProps } from '../../types/SearchInputProps';
import { InputContainer } from './SearchInputStyle';

export const SearchInput = ({ value, onChange, color }: SearchInputProps) => {
  return (
    <InputContainer
      color={color}
      placeholder="search artist or title"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
