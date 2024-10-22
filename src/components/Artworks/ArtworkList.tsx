import { useState, useEffect, useContext } from 'react';
import { SearchInput } from '../Search/SearchInput';
import { Loader } from '../Loader/Loader';
import { useDebouncedValue } from '../../util/hooks/useDebounce';
import { ArtworkContext } from '../../store/artwork-context';
import { Pagination } from '../Pagination/Pagination';
import RemoveIcon from '../../assets/RemoveIcon.jpg';
import SelectIcon from '../../assets/SelectIcon.jpg';
import {
  List,
  ListItem,
  Anchor,
  Image,
  InformationContainer,
  InformationParagraph1,
  InformationParagraph2,
  InformationParagraph3,
  ButtonContainer,
  Button,
} from './ArtworkListStyle';

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
  const [isLoading, setIsLoading] = useState(false);
  const debounceSearchItem = useDebouncedValue(enterredSearch, 500);
  const artworkCtx = useContext(ArtworkContext);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
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
    setIsLoading(true);
    if (debounceSearchItem) {
      searchArtwork().then((data) => {
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

  return (
    <>
      <SearchInput value={enterredSearch} onChange={setEnterredSearch} />
      {isLoading && <Loader />}
      {!isLoading && (
        <List>
          {artworks.map((artwork) => {
            return (
              <ListItem key={artwork.id}>
                <Anchor to={`/${artwork.id}`}>
                  <Image
                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                    alt={artwork.title}
                  />
                  <InformationContainer>
                    <InformationParagraph1>{`${artwork.title
                      .slice(0, 9)
                      .trim()}...`}</InformationParagraph1>
                    <InformationParagraph2>
                      {artwork.artist_title}
                    </InformationParagraph2>
                    <InformationParagraph3>
                      {artwork.is_public_domain ? 'public' : 'private'}
                    </InformationParagraph3>
                    <ButtonContainer>
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          artworkCtx.addArtwork(artwork.id, artworks);
                        }}
                        disabled={artworkCtx.artworks.some(
                          (item) => item.id === artwork.id
                        )}
                      >
                        {artworkCtx.artworks.some(
                          (item) => item.id === artwork.id
                        ) ? (
                          <Image src={RemoveIcon} alt="remove artwork" />
                        ) : (
                          <Image src={SelectIcon} alt="select artwork" />
                        )}
                      </Button>
                    </ButtonContainer>
                  </InformationContainer>
                </Anchor>
              </ListItem>
            );
          })}
        </List>
      )}
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
