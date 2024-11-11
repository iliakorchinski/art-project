import { FetchedData } from '../types/FetchedArtworks';

export function searchArtwork(
  debounceSearchItem: string
): Promise<{ data: FetchedData[] }> {
  return fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${debounceSearchItem}&fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain&limit=3&page=1`
  ).then((res) => res.json());
}
