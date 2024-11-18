import { ChangeEvent } from 'react';

type SortProps = {
  sortOption: string;
  handleSortChange(event: ChangeEvent<HTMLSelectElement>): void;
};

export function Sort({ sortOption, handleSortChange }: SortProps) {
  return (
    <select value={sortOption} onChange={handleSortChange}>
      <option value="">Select an option</option>
      <option value="date">Date</option>
      <option value="artist">Artist</option>
    </select>
  );
}
