import { useState, useEffect } from 'react';
import { SearchInput } from '../Search/SearchInput';
import { Loader } from '../Loader/Loader';
import { useDebouncedValue } from '../../util/hooks/useDebounce';
import { Pagination } from '../Pagination/Pagination';
import { ArtworkListItems } from './ArtworkListItems';
import { FetchedData } from './FetchedArtworks';

export const ArtworkList = () => {
  const [artworks, setArtworks] = useState<FetchedData[]>([]);
  const [enterredSearch, setEnterredSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [pagesToShow, setPagesToShow] = useState([1, 2, 3, 4]);
  const [step, setStep] = useState(1);
  const debounceSearchItem = useDebouncedValue(enterredSearch, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;
  const pageSize = 3;

  function getArtWorks(
    pageNumber: number = 1,
    limit: number = 3
  ): Promise<{ data: FetchedData[] }> {
    const responce = fetch(
      `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain&limit=${limit}&page=${pageNumber}`
    ).then((res) => res.json());
    return responce;
  }
  function searchArtwork(): Promise<{ data: FetchedData[] }> {
    const responce = fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${debounceSearchItem}?fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain&limit=3&page=1`
    ).then((res) => res.json());
    return responce;
  }

  useEffect(() => {
    setIsLoading(true);
    if (debounceSearchItem) {
      searchArtwork().then((data) => {
        setArtworks(data.data);
        setIsLoading(false);
      });
    } else {
      setPagesToShow((prevState) => {
        if (currentPage > 2) {
          return [
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
          ];
        }
        return [1, 2, 3, 4];
      });
      getArtWorks(currentPage, pageSize).then((data) => {
        setArtworks(data.data);

        setIsLoading(false);
      });
    }
  }, [debounceSearchItem, currentPage]);

  const handleNextPage = () => {
    // if (currentPage === totalPages) {
    //   setPagesToShow([
    //     currentPage - 3,
    //     currentPage - 2,
    //     currentPage - 1,
    //     currentPage,
    //   ]);
    // }

    if (currentPage < totalPages) {
      setCurrentPage((prevState) => prevState + 1);
      setStep((prevStep) => prevStep + 1);
    }
    if (currentPage < 2) {
      setStep(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);
      setStep((prevStep) => prevStep - 1);
    }
    if (currentPage < 2) {
      setStep(1);
    }
  };
  const handlePageClick = (pageNumber: number) => {
    if (currentPage > pageNumber) {
      setStep((prevStep) => prevStep - 1);
    }
    if (currentPage < pageNumber) {
      setStep((prevStep) => prevStep + 1);
    }

    setCurrentPage(pageNumber);
  };

  return (
    <>
      <SearchInput value={enterredSearch} onChange={setEnterredSearch} />
      {isLoading && <Loader />}
      {!isLoading && <ArtworkListItems artworks={artworks} />}
      <Pagination
        step={step}
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
