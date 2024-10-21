import { createContext, ReactNode, useEffect, useState } from 'react';
import { FetchedData } from '../components/ArtworkList';

type ArtworkContextObj = {
  artworks: FetchedData[];
  addArtwork: (id: string, artworks: FetchedData[]) => void;
  removeArtwork: (id: string, artworks: FetchedData[]) => void;
};

export const ArtworkContext = createContext<ArtworkContextObj>({
  artworks: [],
  addArtwork: (id: string, artworks: FetchedData[]) => {},
  removeArtwork: (id: string, artworks: FetchedData[]) => {},
});

type ArtworkContextProps = {
  children: ReactNode;
};

export const ArtworkContextProvider = ({ children }: ArtworkContextProps) => {
  const artworksLS = localStorage.getItem('artworks');
  const [artworks, setArtworks] = useState<FetchedData[]>(
    artworksLS ? JSON.parse(artworksLS) : []
  );

  useEffect(() => {
    localStorage.setItem('artworks', JSON.stringify(artworks));
  }, [artworks]);

  const handleSaveArtwork = (id: string, arts: FetchedData[]) => {
    const selectedArtwork: any = arts.find((artwork) => artwork.id === id); // any type
    console.log(selectedArtwork);
    setArtworks((prevState) => {
      const newState = [...prevState, selectedArtwork];
      return newState;
    });
  };

  const handleRemoveArtwork = (id: string, arts: FetchedData[]) => {
    const selectedArtwork: any = arts.find((artwork) => artwork.id === id);
    setArtworks((prevState) => {
      const newState = prevState.filter(
        (item) => item.id !== selectedArtwork.id
      );
      return newState;
    });
  };

  const contextValue: ArtworkContextObj = {
    artworks: artworks,
    addArtwork: handleSaveArtwork,
    removeArtwork: handleRemoveArtwork,
  };

  return (
    <ArtworkContext.Provider value={contextValue}>
      {children}
    </ArtworkContext.Provider>
  );
};
