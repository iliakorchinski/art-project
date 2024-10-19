import React, { useState, useEffect } from 'react';
export const Pictures: React.FC = () => {
  const [artworks, setArtworks] = useState<fetchedData[]>([]);
  const [enterredSearch, setEnterredSearch] = useState<string>('');

  type fetchedData = {
    id: string;
    image_id: string;
    title: string;
    artist_title: string;
    is_public_domain: boolean;
  };

  function getArtWorks(): Promise<{ data: fetchedData[] }> {
    const responce = fetch(
      'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain&limit=3&page=1'
    ).then((res) => res.json());
    return responce;
  }
  useEffect(() => {
    getArtWorks().then((data) => setArtworks(data.data));
  }, []);

  const filterredArtworks =
    artworks &&
    artworks.filter((item) => {
      return (
        item.title.toLowerCase().trim().includes(enterredSearch) ||
        item.artist_title.toLowerCase().trim().includes(enterredSearch)
      );
    });
  return (
    <>
      <input
        value={enterredSearch}
        onChange={(e) => setEnterredSearch(e.target.value)}
      />
      <ul>
        {filterredArtworks.map((artwork) => {
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
