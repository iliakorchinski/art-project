import { FetchedData } from '../types/FetchedArtworks';

export function getArtWorks(
  pageNumber: number = 1,
  limit: number = 3
): Promise<{ data: FetchedData[] }> {
  return fetch(
    `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain&limit=${limit}&page=${pageNumber}`
  ).then((res) => res.json());
}
