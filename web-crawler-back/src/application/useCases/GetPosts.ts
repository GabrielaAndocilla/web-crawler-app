import { Post } from "@domains/entities/Post";

export class GetPosts {

  constructor() {}

  private filterTitleByNumberOfWords(title:string, type: 'lessThan'| 'moreThan', limit:string): boolean {
    if (!title) return false;
    const cleanTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    return {
      moreThan: cleanTitle.split(/\s+/).length > parseInt(limit as string),
      lessThan: cleanTitle.split(/\s+/).length <= parseInt(limit as string)
    }[type]
  }

  private orderAscendent(type: 'lessThan'| 'moreThan', post:Post, newPost:Post) {
    const sortKey = {
      moreThan: 'quantityOfComments',
      lessThan: 'points'
    }[type!] as keyof Post
    return (
      parseInt(post[sortKey]!, 10) -
      parseInt(newPost[sortKey]!, 10)
    );
  }

  execute(posts:Post[], queryParams:{type?:'lessThan'| 'moreThan',limit?:string}): Post[] {
    const {type, limit} = queryParams
    if (!type && !limit) return posts
    return posts.filter(({ title }) =>this.filterTitleByNumberOfWords(title!,type!, limit!))
    .sort((post, newPost) => this.orderAscendent(type!,post,newPost))
  }
}
