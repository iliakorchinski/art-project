import React, { useState, useEffect } from 'react';
import { SearchInput } from './SearchInput';

type FetchedData = {
  id: string;
  image_id: string;
  title: string;
  artist_title: string;
  is_public_domain: boolean;
};

export const ArtworkList = () => {
  const [artworks, setArtworks] = useState<FetchedData[]>([]);
  const [enterredSearch, setEnterredSearch] = useState<string>('');

  function getArtWorks(): Promise<{ data: FetchedData[] }> {
    const responce = fetch(
      'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain&limit=3&page=1'
    ).then((res) => res.json());
    return responce;
  }
  function searchArtwork(): Promise<{ data: FetchedData[] }> {
    const responce = fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${enterredSearch}?fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain&limit=3&page=1`
    ).then((res) => res.json());
    return responce;
  }
  useEffect(() => {
    if (!enterredSearch) {
      getArtWorks().then((data) => setArtworks(data.data));
    }
  }, [enterredSearch]);
  useEffect(() => {
    if (enterredSearch) {
      searchArtwork().then((data) => setArtworks(data.data));
    }
  }, [enterredSearch]);

  // const filterredArtworks =
  //   artworks &&
  //   artworks.filter((item) => {
  //     return (
  //       item.title.toLowerCase().trim().includes(enterredSearch) ||
  //       item.artist_title.toLowerCase().trim().includes(enterredSearch)
  //     );
  //   });
  return (
    <>
      <SearchInput value={enterredSearch} onChange={setEnterredSearch} />
      <ul>
        {artworks.map((artwork) => {
          return (
            <li key={artwork.id}>
              <div>
                <p>{artwork.title}</p>
                <p>{artwork.artist_title}</p>
                <p>{artwork.is_public_domain ? 'public' : 'private'}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
