import { ChangeEvent, useEffect, useState } from 'react';

import { getArtWorks } from '../../api/getArtworks';
import { searchArtwork } from '../../api/searchArtwork';
import { FetchedData } from '../../types/FetchedArtworks';
import { useDebouncedValue } from '../../util/hooks/useDebounce';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { SearchInput } from '../Search/SearchInput';
import { Sort } from '../Sort/Sort';
import { ArtworkListItems } from './ArtworkListItems';

export const ArtworkList = () => {
  const [artworks, setArtworks] = useState<FetchedData[]>([]);
  const [sortedArtworks, setSortedArtworks] = useState<FetchedData[]>([]);
  const [sortOption, setSortOption] = useState<string>('');
  const [enterredSearch, setEnterredSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages: number = 9;
  const pageSize = 3;
  const DELAY = 500;

  const debounceSearchItem = useDebouncedValue(enterredSearch, DELAY);

  const updateFunction = (data: FetchedData[]) => {
    setSortOption('');
    setSortedArtworks([]);
    setArtworks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (debounceSearchItem) {
      searchArtwork(debounceSearchItem).then((data) => {
        updateFunction(data.data);
      });
    } else {
      getArtWorks(currentPage, pageSize).then((data) => {
        updateFunction(data.data);
      });
    }
  }, [debounceSearchItem, currentPage]);

  const sortData = (option: string) => {
    let sortedArray: FetchedData[];
    if (artworks && option === 'date') {
      sortedArray = [...artworks];
      sortedArray.sort((a, b) => a.date_end - b.date_end);
      setSortedArtworks(sortedArray);
    }
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    sortData(selectedOption);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pagesToShow =
    totalPages - currentPage >= 3
      ? Array.from({ length: 4 }, (_, i) => i + currentPage).slice(0, 4)
      : [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

  return (
    <>
      <SearchInput
        value={enterredSearch}
        onChange={setEnterredSearch}
        color={debounceSearchItem !== '' && artworks.length === 0 ? 'red' : ''}
      />
      <Sort handleSortChange={handleSortChange} sortOption={sortOption} />
      {isLoading && <Loader />}
      {!isLoading && (
        <ArtworkListItems
          artworks={sortedArtworks.length > 0 ? sortedArtworks : artworks}
        />
      )}
      {debounceSearchItem !== '' && artworks.length === 0 && (
        <p>Could not find any artworks...</p>
      )}
      <Pagination
        pagesToShow={pagesToShow}
        totalPages={totalPages}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
      />
    </>
  );
};
