import { useEffect, useState } from 'react';

import { getArtWorks } from '../../api/getArtworks';
import { searchArtwork } from '../../api/searchArtwork';
import { FetchedData } from '../../types/FetchedArtworks';
import { useDebouncedValue } from '../../util/hooks/useDebounce';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { SearchInput } from '../Search/SearchInput';
import { ArtworkListItems } from './ArtworkListItems';

export const ArtworkList = () => {
  const [artworks, setArtworks] = useState<FetchedData[]>([]);
  const [enterredSearch, setEnterredSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages: number = 9;
  const pageSize = 3;
  const DELAY = 500;

  const debounceSearchItem = useDebouncedValue(enterredSearch, DELAY);

  useEffect(() => {
    setIsLoading(true);
    if (debounceSearchItem) {
      searchArtwork(debounceSearchItem).then((data) => {
        setArtworks(data.data);
        setIsLoading(false);
      });
    } else {
      getArtWorks(currentPage, pageSize).then((data) => {
        setArtworks(data.data);
        setIsLoading(false);
      });
    }
  }, [debounceSearchItem, currentPage]);

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
      {isLoading && <Loader />}
      {!isLoading && <ArtworkListItems artworks={artworks} />}
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
