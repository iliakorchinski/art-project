import React, { createContext, ReactNode, useState } from 'react';
import { FetchedData } from '../components/ArtworkList';

type ArtworkContextObj = {
  artworks: FetchedData[];
  addArtwork: (id: string, artworks: FetchedData[]) => void;
  //   removeArtwork: (id: string) => void;
};

export const ArtworkContext = createContext<ArtworkContextObj>({
  artworks: [],
  addArtwork: (id: string, artworks: FetchedData[]) => {},
  //   removeArtwork: (id: string) => {},
});

type ArtworkContextProps = {
  children: ReactNode;
};

export const ArtworkContextProvider = ({ children }: ArtworkContextProps) => {
  const [artworks, setArtworks] = useState<FetchedData[]>([]);

  //   let arr: any = [];
  const handleSaveArtwork = (id: string, arts: FetchedData[]) => {
    const selectedArtwork: any = arts.find((artwork) => artwork.id === id);
    console.log(selectedArtwork);
    // arr.push(selectedArtwork);
    setArtworks((prevState) => {
      return [...prevState, selectedArtwork];
    });
    localStorage.setItem('artworks', JSON.stringify(artworks));
    // arr = [];
  };

  const contextValue: ArtworkContextObj = {
    artworks: artworks,
    addArtwork: handleSaveArtwork,
  };

  return (
    <ArtworkContext.Provider value={contextValue}>
      {children}
    </ArtworkContext.Provider>
  );
};
