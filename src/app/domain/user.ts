import { City } from './city';

export interface User {
  id: number,
  first_name: string,
  last_name: string,
  sex: string,
  photo_400_orig: string,
  photo_200: string,
  city: City,
  link: string
}
