import { Post } from '@domains/entities/Posts';
import { GetPosts } from '@useCases/GetPosts';
import { Request, Response } from 'express';

import { Builder, By } from 'selenium-webdriver';
import chrome, { Options } from 'selenium-webdriver/chrome';

const cssSelector: string = '#hnmain > tbody > tr:nth-child(3) tbody > tr';
const titlePostRegex: RegExp = /[\.\n]\s/;
const descriptionPostReges: RegExp =
/(?:\b(\d+)\s+points\b)?(?:.*?(\d+)\s+(comments?|comment))?/
export default class PostsController {
  constructor() {}

  private setChromeOptions = (): Options => {
    const option = new chrome.Options();
    option
      .addArguments('--headless')
      .addArguments('--disable-gpu')
      .addArguments('--no-sandbox')
      .addArguments('--disable-dev-shm-usage');
    return option;
  };

  private createCrawlerDriver = async () =>
    await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(this.setChromeOptions())
      .build();

  private getElementsPage = async (url: string): Promise<string[]> => {
    const driver = await this.createCrawlerDriver();
    try {
      await driver.get(url);
      const allElements = await driver.findElements(By.css(cssSelector));
      const posts = await Promise.all(
        allElements.map(async (post) => await post.getText())
      );
      return posts;
    } catch (error) {
      console.error('Error - getElementsPage', error)
      return[]
    } finally{
      await driver.quit();
    }

  };

  private isAValidText = (text: string) => text !== '' && text !== 'More';

  private getFieldsFromPostTitle = (text: string): Partial<Post> => {
    const titleDescription = text.split(titlePostRegex);
    if (!titleDescription.length) return {};
    const id = titleDescription[0].trim();
    const title = titleDescription[1].trim();
    return { id, title };
  };

  private getFieldsFromPostDescription = (text: string): Partial<Post> => {
    const defaultDescription: Post = {
      points: '0',
      quantityOfComments: '0',
    };
    const description = text.match(descriptionPostReges);
    if (!description?.length) return defaultDescription;
    const points = description[1];
    const quantityOfComments = description[2];
    return { points, quantityOfComments };
  };

  private transformPageElementsToModel = (elements: string[]): Post[] => {
    return elements.filter(this.isAValidText)
    .reduce<[Post[], Post]>(
      ([posts, newPost], text, index) => {
        if (!(index % 2)) {
          const newPostAttributes = this.getFieldsFromPostTitle(text);
          return [posts, { ...newPost, ...newPostAttributes }];
        }
        const newPostAttributes = this.getFieldsFromPostDescription(text);
        newPost = { ...newPost, ...newPostAttributes };
        return [[...posts,newPost], {}];
      },
      [[], {}]
    )[0];
  };

  getPostInfo = async (req: Request, res: Response) => {
    const { page } = req.query;
    let url = process.env.NEWS_URL || '';
    if (page) url += `?p=${page}`;
    const elements = await this.getElementsPage(url);
    if(!elements.length) res.status(503).json({message:'There was an error getting elements'})
    const posts = this.transformPageElementsToModel(elements);
    const getPostsByFilter = new GetPosts();
    const filterPosts = getPostsByFilter.execute(posts, req.query);
    res.status(200).json(filterPosts);
  };
}
