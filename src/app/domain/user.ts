export class User {
  constructor(public id: number,
              public first_name: string,
              public last_name: string,
              public sex: string,
              public photo_400_orig: string,
              public photo_200: string,
              public city: string,
              public link: string) {
  }
}
