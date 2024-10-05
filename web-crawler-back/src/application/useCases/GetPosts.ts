import { Post } from "@domains/entities/Post";

export class GetPosts {

  constructor() {}

  execute(posts:Post[], queryParams:{type?:string,limit?:string}): Post[] {
    const {type, limit} = queryParams
    if (!type && !limit) return posts
    const sortKey = {
      moreThan: 'quantityOfComments',
      lessThan: 'points'
    }[type!] as keyof Post
    const filteredPosts = posts.filter(({ title }) => {
      if (!title) return 0;
      const cleanTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').trim();
      if (type === 'moreThan')
        return cleanTitle.split(/\s+/).length > parseInt(limit as string);
      if (type === 'lessThan')
        return cleanTitle.split(/\s+/).length <= parseInt(limit as string);
    })
    .sort((post, newPost) => {
      return (
        parseInt(post[sortKey]!, 10) -
        parseInt(newPost[sortKey]!, 10)
      );
    });
    return filteredPosts;
  }
}
