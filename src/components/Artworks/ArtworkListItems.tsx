import { useContext } from 'react';
import { ArtworkContext } from '../../store/artwork-context';
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
import { FetchedData } from './FetchedArtworks';

type ArtworkListItemsProps = {
  artworks: FetchedData[];
};
export const ArtworkListItems = ({ artworks }: ArtworkListItemsProps) => {
  const artworkCtx = useContext(ArtworkContext);

  return (
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
  );
};
