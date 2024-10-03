import { Post } from "@domains/entities/Posts";
import { Request, Response } from "express";

import { Builder, By } from 'selenium-webdriver';
import chrome, { Options } from 'selenium-webdriver/chrome';
export default class StartController {
  options:Options

  constructor() {
    this.options = new chrome.Options();
    this.options.addArguments('--headless');
    this.options.addArguments('--disable-gpu');
    this.options.addArguments('--no-sandbox');
    this.options.addArguments('--disable-dev-shm-usage')
  }

  getPage = async (req: Request, res: Response) =>{

    const {type, limit} = req.query;

    const driver = await new Builder().forBrowser('chrome')
    .setChromeOptions(this.options )
    .build();
    await driver.get('https://news.ycombinator.com/?p=2');
    const allElements = await driver.findElements(By.css('#hnmain > tbody > tr:nth-child(3) tbody > tr'));
    const results = await Promise.all(allElements.map(async (post,index) =>  await post.getText()));
    const clearData = results.filter(text => text !== '' && text !== 'More')
    let newPost :Post ={}
    let posts:Post[] = []
    clearData.forEach((text, index)=>{
      if(!(index % 2)) {
        const titleDescription = text.split(/[\.\n]\s/)
        if(!titleDescription.length) return
        newPost.id = titleDescription[0].trim()
        newPost.title = titleDescription[1].trim()
        return
      }
      if(index % 2) {
        const description = text.match(/(\d+)\s+points.*?(\d+)\s+(comments|comment)/)
        if(!description?.length) return posts.push({id:'',title:'', points:'0', quantityOfComments:'0',...newPost})
        newPost.points = description[1]
        newPost.quantityOfComments = description[2]
        posts.push({...newPost})
        newPost = {}
        return
      }
    })
    if(type && limit){
      posts = posts.filter(({title} )=>{
        if(!title) return 0
        const cleanTitle = title.replace(/[^a-zA-Z0-9\s]/g, '')
        if(type === 'moreThan') return cleanTitle.split(/\s+/).length >  parseInt(limit as string)
        if(type === 'lessThan') return cleanTitle.split(/\s+/).length <= parseInt(limit as string)
      })
    }
    res.status(200).json(posts);


  }


}
