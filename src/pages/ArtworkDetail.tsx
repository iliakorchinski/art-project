import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { FetchedData } from '../components/ArtworkList';

export function ArtworkDetail() {
  const [artwork, setArtwork] = useState<any>(); // any
  const params = useParams();
  function getArtWorks(): Promise<{ data: FetchedData }> {
    const responce = fetch(
      `https://api.artic.edu/api/v1/artworks/${params.id}?fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain,dimensions,credit_line,description`
    ).then((res) => res.json());
    return responce;
  }
  useEffect(() => {
    getArtWorks().then((data) => setArtwork(data.data));
  }, []);
  // console.log(artwork);
  return (
    <>
      <h1>ArtworkDetailPage</h1>
      <div>
        <h2>{artwork && artwork.title}</h2>
        <p>{artwork && artwork.credit_line}</p>
        <p>{artwork && artwork.date_display}</p>
        <p>{artwork && artwork.description}</p>
      </div>
    </>
  );
}
