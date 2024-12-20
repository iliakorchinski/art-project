import { useContext } from 'react';

import RemoveIcon from '../../assets/RemoveIcon.jpg';
import { ArtworkContext } from '../../store/artwork-context';
import {
  Button,
  ButtonContainer,
  Container,
  Image,
  Item,
} from './FavouritesStyle';

export function Favourites() {
  const artworkCtx = useContext(ArtworkContext);
  return (
    <>
      <h1>Favourites</h1>
      <Container>
        {artworkCtx.artworks.map((artwork) => {
          return (
            <Item key={artwork.id}>
              <p>{`${artwork.title.slice(0, 9).trim()}...`}</p>
              <p>{artwork.artist_title}</p>
              <ButtonContainer>
                <Button
                  type="button"
                  onClick={() =>
                    artworkCtx.removeArtwork(artwork.id, artworkCtx.artworks)
                  }
                >
                  <Image src={RemoveIcon} alt="remove icon" />
                </Button>
              </ButtonContainer>
            </Item>
          );
        })}
      </Container>
    </>
  );
}
