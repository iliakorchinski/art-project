import { useState, useEffect } from 'react';
export function Pictures() {
  const [artworks, setArtworks] = useState<fetchedData[]>([]);

  type fetchedData = {
    id: String;
    image_id: String;
    title: String;
    artist_title: String;
    is_public_domain: Boolean;
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
  return (
    <ul>
      {artworks.map((artwork) => {
        return (
          <li>
            <div>
              <p>{artwork.title}</p>
              <p>{artwork.artist_title}</p>
              <p>{artwork.is_public_domain ? 'public' : 'private'}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
