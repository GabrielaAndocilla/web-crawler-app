export class UserInteraction {
  id?: number;
  pageNumber?: string;
  titleWords?: string;
  filterType?:string;


  constructor(id: number, pageNumber:string, titleWords:string, filterType:string) {
    this.id = id;
    this.pageNumber = pageNumber;
    this.titleWords = titleWords;
    this.filterType = filterType;
  }

}
