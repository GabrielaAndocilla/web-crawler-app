export class Post {
  id?: string;
  title?: string;
  points?: string;
  quantityOfComments?:string;


  constructor(id: string, title:string, points:string, quantityOfComments:string) {
    this.id = id;
    this.title = title;
    this.points = points;
    this.quantityOfComments = quantityOfComments;
  }

}
