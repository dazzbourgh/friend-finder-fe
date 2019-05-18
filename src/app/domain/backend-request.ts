export class BackendRequest {
  constructor(public groupIds: string[],
              public fields: { [key: string]: string }) {
  }
}
