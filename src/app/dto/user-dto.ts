export class UserDto {
  constructor(public data: User, public percent: number) {
  }
}

export class User {
  constructor(public id: number, public fields: [string, string]) {
  }
}
