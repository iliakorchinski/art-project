import { useContext } from 'react';
import { ArtworkContext } from '../store/artwork-context';

export function Favourites() {
  const artworkCtx = useContext(ArtworkContext);
  console.log(artworkCtx.artworks);
  return (
    <>
      <h1>Favourites</h1>
      <ul>
        {artworkCtx.artworks.map((artwork) => {
          return (
            <li key={artwork.id}>
              <p>{artwork.title}</p>
              <p>{artwork.artist_title}</p>
              <button
                type="button"
                onClick={() =>
                  artworkCtx.removeArtwork(artwork.id, artworkCtx.artworks)
                }
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
