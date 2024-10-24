import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ArtworkListItems } from './ArtworkListItems';
import { FetchedData } from './FetchedArtworks';
import { ArtworkContext } from '../../store/artwork-context';

type ArtworkContextObj = {
  artworks: FetchedData[];
  addArtwork: (id: string, artworks: FetchedData[]) => void;
  removeArtwork: (id: string, artworks: FetchedData[]) => void;
};
it('render artworks', async () => {
  const mockedContextData: ArtworkContextObj = {
    artworks: [],
    addArtwork: () => {},
    removeArtwork: () => {},
  };

  const mockedData: FetchedData[] = [
    {
      id: '271536',
      title: 'test title',
      is_public_domain: false,
      artist_title: 'Test Artist',
      image_id: '615d6e9d-dfcf-0e52-c991-cd45f6b581c6',
    },
  ];
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({ json: () => Promise.resolve(mockedData) })
  //   ) as jest.Mock;
  render(<ArtworkListItems artworks={mockedData} />, {
    wrapper: BrowserRouter,
  });
  screen.debug();

  const listItemElements = await screen.findByText('Test Artist');

  expect(listItemElements).toBeInTheDocument();
});
