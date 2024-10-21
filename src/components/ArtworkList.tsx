import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchInput } from './SearchInput';
import { useDebouncedValue } from '../util/hooks/useDebounce';
import { ArtworkContext } from '../store/artwork-context';
import { Pagination } from './Pagination';

export type FetchedData = {
  id: string;
  image_id: string;
  title: string;
  artist_title: string;
  is_public_domain: boolean;
};

export const ArtworkList = () => {
  const [artworks, setArtworks] = useState<FetchedData[]>([]);
  const [enterredSearch, setEnterredSearch] = useState<string>('');
  const debounceSearchItem = useDebouncedValue(enterredSearch, 500);
  const artworkCtx = useContext(ArtworkContext);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;
  const pagesToShow = 4;
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
    if (debounceSearchItem) {
      searchArtwork().then((data) => setArtworks(data.data));
    } else {
      getArtWorks(currentPage, pageSize).then((data) => setArtworks(data.data));
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

  return (
    <>
      <SearchInput value={enterredSearch} onChange={setEnterredSearch} />
      <ul>
        {artworks.map((artwork) => {
          return (
            <li key={artwork.id}>
              <Link to={`/${artwork.id}`}>
                <div>
                  <p>{artwork.title}</p>
                  <p>{artwork.artist_title}</p>
                  <p>{artwork.is_public_domain ? 'public' : 'private'}</p>
                </div>
              </Link>
              <p>
                <button
                  type="button"
                  onClick={() => artworkCtx.addArtwork(artwork.id, artworks)}
                  disabled={artworkCtx.artworks.some(
                    (item) => item.id === artwork.id
                  )}
                >
                  Add to Favourites
                </button>
              </p>
            </li>
          );
        })}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
      />
    </>
  );
};
