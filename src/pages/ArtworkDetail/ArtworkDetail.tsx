import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { FetchedData } from '../../components/Artworks/ArtworkList';
import {
  Container,
  ImageContainer,
  Image,
  InfoContainer,
  Span,
} from './ArtworkDetailStyle';

export function ArtworkDetail() {
  const [artwork, setArtwork] = useState<any>(); // any
  const params = useParams();
  function getArtWorks(): Promise<{ data: FetchedData }> {
    const responce = fetch(
      `https://api.artic.edu/api/v1/artworks/${params.id}?fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain,dimensions,credit_line,dimensions`
    ).then((res) => res.json());
    return responce;
  }
  useEffect(() => {
    getArtWorks().then((data) => setArtwork(data.data));
  }, []);
  console.log(artwork);
  return (
    <>
      <h1>ArtworkDetailPage</h1>
      {artwork && (
        <Container>
          <ImageContainer>
            <Image
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
            />
          </ImageContainer>
          <InfoContainer>
            <h2>{`${artwork.title}`}</h2>
            <p>{`Credit Line: ${artwork.credit_line}`}</p>
            <p>{`Date: ${artwork.date_display}`}</p>
            <p>{`Artist: ${artwork.artist_title}`}</p>
            <p>{`Dimensions: ${artwork.dimensions}`} </p>
          </InfoContainer>
        </Container>
      )}
    </>
  );
}
