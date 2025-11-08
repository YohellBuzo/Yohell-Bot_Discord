export class Wisdom {
  public id: string;
  public userid: string;
  public title: string;
  public paragraph: string;
  public createdAt: Date;

  constructor({
    id = "",
    userid = "",
    title = "",
    paragraph = "",
    createdAt = new Date(),
  }: {
    id?: string;
    userid?: string;
    title?: string;
    paragraph?: string;
    code?: string;
    createdAt?: Date;
  } = {}) {
    this.id = id;
    this.userid = userid;
    this.title = title;
    this.paragraph = paragraph;
    this.createdAt = createdAt;
  }

  public static createFromObject(object: any): Wisdom {
    return new Wisdom({
      id: object.id,
      userid: object.userid,
      title: object.title,
      paragraph: object.paragraph,
      createdAt: object.created_at,
    });
  }

  public static createFromJSON(JSON: any[]): Wisdom[] {
    return JSON.map((data) => Wisdom.createFromObject(data));
  }
}
