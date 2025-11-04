export class Claim {
  public id: string;
  public character: string;
  public userId: string;
  public date: string;
  public imageURL: string;

  constructor({
    id = "",
    character = "",
    userId = "",
    date = "",
    imageURL = "",
  }: {
    id: string;
    character: string;
    userId: string;
    date: string;
    imageURL: string;
  }) {
    this.id = id;
    this.character = character;
    this.userId = userId;
    this.date = date;
    this.imageURL = imageURL;
  }
}
