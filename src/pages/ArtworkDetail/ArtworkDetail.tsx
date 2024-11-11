import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Loader } from '../../components/Loader/Loader';
import { FetchedData } from '../../types/FetchedArtworks';
import {
  Container,
  Image,
  ImageContainer,
  InfoContainer,
} from './ArtworkDetailStyle';

export function ArtworkDetail() {
  const [artwork, setArtwork] = useState<FetchedData>();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  function getArtWorks(): Promise<{ data: FetchedData }> {
    const responce = fetch(
      `https://api.artic.edu/api/v1/artworks/${params.id}?fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain,dimensions,credit_line,dimensions`
    ).then((res) => res.json());
    return responce;
  }
  useEffect(() => {
    setIsLoading(true);
    getArtWorks().then((data) => {
      setArtwork(data.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <h1>ArtworkDetailPage</h1>
      {isLoading && <Loader />}
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
