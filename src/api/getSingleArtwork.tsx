import { FetchedData } from '../types/FetchedArtworks';

export function getArtWork(params: string): Promise<{ data: FetchedData }> {
  const responce = fetch(
    `https://api.artic.edu/api/v1/artworks/${params}?fields=id,title,artist_display,date_display,main_reference_number,image_id,artist_title,is_public_domain,dimensions,credit_line,dimensions`
  ).then((res) => res.json());
  return responce;
}
