import { createContext, useEffect, useMemo, useState } from 'react';

import {
  ArtworkContextObj,
  ArtworkContextProps,
} from '../types/ArtworkContext';
import { FetchedData } from '../types/FetchedArtworks';

export const ArtworkContext = createContext<ArtworkContextObj>({
  artworks: [],
  addArtwork: (id: string, artworks: FetchedData[]) => {},
  removeArtwork: (id: string, artworks: FetchedData[]) => {},
});

export const ArtworkContextProvider = ({ children }: ArtworkContextProps) => {
  const artworksLS = localStorage.getItem('artworks');
  const [artworks, setArtworks] = useState<FetchedData[]>(
    artworksLS ? JSON.parse(artworksLS) : []
  );

  useEffect(() => {
    localStorage.setItem('artworks', JSON.stringify(artworks));
  }, [artworks]);

  const handleSaveArtwork = (id: string, arts: FetchedData[]) => {
    const selectedArtwork: FetchedData | undefined = arts.find(
      (artwork) => artwork.id === id
    );
    console.log(selectedArtwork);
    if (selectedArtwork) {
      setArtworks((prevState) => {
        const newState = [...prevState, selectedArtwork];
        return newState;
      });
    }
  };

  const handleRemoveArtwork = (id: string, arts: FetchedData[]) => {
    const selectedArtwork: FetchedData | undefined = arts.find(
      (artwork) => artwork.id === id
    );
    if (selectedArtwork) {
      setArtworks((prevState) => {
        const newState = prevState.filter(
          (item) => item.id !== selectedArtwork.id
        );
        return newState;
      });
    }
  };

  const contextValue: ArtworkContextObj = useMemo(
    () => ({
      artworks,
      addArtwork: handleSaveArtwork,
      removeArtwork: handleRemoveArtwork,
    }),
    [artworks, handleSaveArtwork, handleRemoveArtwork]
  );

  return (
    <ArtworkContext.Provider value={contextValue}>
      {children}
    </ArtworkContext.Provider>
  );
};
