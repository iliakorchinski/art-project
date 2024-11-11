import React from 'react';

import { FetchedData } from './FetchedArtworks';

export type ArtworkContextObj = {
  artworks: FetchedData[];
  addArtwork: (id: string, artworks: FetchedData[]) => void;
  removeArtwork: (id: string, artworks: FetchedData[]) => void;
};

export type ArtworkContextProps = {
  children: React.ReactNode;
};
