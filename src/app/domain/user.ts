export class User {
  id: number;
  fields: [string, string];

  constructor(id, fields) {
    this.id = id;
    this.fields = fields;
  }
}
