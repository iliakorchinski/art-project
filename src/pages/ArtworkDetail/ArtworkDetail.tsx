import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getArtWork } from '../../api/getSingleArtwork';
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

  useEffect(() => {
    setIsLoading(true);
    if (params.id) {
      getArtWork(params.id).then((data) => {
        setArtwork(data.data);
        setIsLoading(false);
      });
    }
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
