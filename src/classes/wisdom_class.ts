export class Wisdom {
  public id: string;
  public userid: string;
  public title: string;
  public paragraph: string;

  constructor({
    id = "",
    userid = "",
    title = "",
    paragraph = "",
  }: {
    id?: string;
    userid?: string;
    title?: string;
    paragraph?: string;
  } = {}) {
    this.id = id;
    this.userid = userid;
    this.title = title;
    this.paragraph = paragraph;
  }

  public static createFromObject(object: any): Wisdom {
    return new Wisdom({
      id: object.id,
      userid: object.userid,
      title: object.title,
      paragraph: object.paragraph,
    });
  }

  public static createFromJSON(JSON: any[]): Wisdom[] {
    return JSON.map((data) => Wisdom.createFromObject(data));
  }
}
