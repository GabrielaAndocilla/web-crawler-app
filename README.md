
# Web Crawler App 📝

The purpose of this app is to display news from an [external web](https://news.ycombinator.com).We treat these news items as "Posts," and you can filter them based on the number of words in the post title, combined with a filter type (e.g., "more than," "less than or equal to"). You can also navigate between pages on the external website, allowing you to move forward and backward through the news items.


Additionally, the app tracks user interactions. Every time you choose a word limit and a filter type to filter post titles, the app records those inputs. It also tracks page navigation. For example, if you move to page 2, the tracker will record this action. One important condition is that the filters only work when used together.

The filters will show the data based on the criteria:
- If the filter type is **more than** it will be ordered by the number of comments in ASC way.
- If the filter type is **less than or equal** it will be ordered by points in ASC way.

To help visualize this data, I have added a section called Application Metrics. This section updates automatically based on user behavior.

You could check the deployed app : https://web-crawler-app.daikuroneko.com/

  ## Tech Stack 🚀
The project consists of two main parts: the backend and the frontend, both are made in TypeScript.

```css
├── web-crawler-back
│
└── web-crawler-ui
```
### Backend
The backend is built with `NodeJs` and `Express` to set up the server. It is configured to use `TypeScript` for type management throughout the application. Additionally, nodemon is utilized for development, allowing the server to restart automatically upon code changes.

For testing, `Jest` is configured to perform unit tests. Some folders will contain a __tests__ directory, where the tests are located.

#### Folder structure
The project architecture follows Domain-Driven Design (DDD):

```css
└── api
   ├───application
   │        └── useCases
   ├─--domain
   │       └|── entities
   │        └── repositories
   └── infrastructure
       ├── controllers
       ├── db
       └── repositories
```

Let's briefly explain each folder and its contents.

Starting with the `domain` folder, here you'll find the core **entities** of the project:
- Post: Represents the news fetched from the external website.
- UserInteraction: Tracks metrics related to user activity within the app

In the `repositories` folder of **domain**,are defined the interfaces to outline how the repository implementations will interact with the entities.

Moving to the **application** folder, his is where use cases are defined. Use cases represent the actions the app can perform, and they rely on repository implementations to execute these actions.

The **infrastructure** folder contains the technical implementations needed for the app, such as repository implementations for persisting entities, controllers for handling HTTP requests, and database configurations.

This architecture try to separate business logic from technical details.Trying to separate the concerns between business logic and technical details.


Regarding **database configuration**, I am using an `ORM` called `Sequelize`, that its an `ORM` for `MySql` database that I chose for this project. In the `db` folder, you'll find the `models` that facilitate interaction with database records, and the `migrations` that define the setup for creating the necessary database structure. To assist with migrations, models, and additional configuration, I am using `sequelize-cli`. Although Sequelize is not fully TypeScript-oriented, I have made the best possible adjustments to integrate it with TypeScript.

#### Web Crawler
For the web crawler, I am using `Selenium`, an open-source library that simulates user actions on websites. It’s widely used for testing web functionality and performance and serves as the foundation for many automated web tests.

**So how does this help our web crawler?** We can take advantage of Selenium’s ability to read web pages and retrieve specific elements using its query capabilities. In this case, I use a `cssSelector` to identify the elements in the table. Once these elements are retrieved, the code extract the information from each and create a list of `Posts`. After transforming the news into the app's data model, it can filter or manipulate it as needed.

### Front
For the frontend, I am using `React` with `create-react-app`, configured with `TypeScript` for type management. Testing is handled with `Jest` and `react-testing-library`, and you can find tests for each part in the `__tests__` folder inside the respective directories. For styling, I used `Tailwind`, and `React Query` is employed to manage caching for API requests.

Note: The React Query implementation is organized in the `hooks` folder, where each hook corresponds to a specific action requiring data fetching

**Why is React Query especially useful for this app?** React Query is a library that helps cache API responses, reducing unnecessary fetches by automatically refreshing data after a specified time. It also updates the cache after a `mutation`, allowing React Query to notify the app that something has changed. Additionally, React Query uses a key array (similar to React’s dependency array) to track when any key changes, triggering a new API request.

This is especially important for the app's `Post` requests, which are resource-intensive for the server. Without React Query, the server would need to reprocess all the posts every time you navigate to a different page. You’ll notice the app fetching when you see the` Loading ...` message. This message was specifically added to indicate to the user when the data for a page are fetched. The front end won’t ask the server again unless you reload the entire app. So, if you already load the info of a page, it will not be fetched again. The same applies to filters, if the same filter combination is cached, React Query won’t request the data again.

Another benefit of React Query is in the Metrics section. Every time you apply a filter, it triggers a mutation that saves the user interaction to the database, prompting React Query to fetch the updated metrics automatically.

#### Folder structure
For the project architecture we maintain a classic react project structure
```css
└── ui
   ├── components
   │       └|── atoms
   │        └── moleculess
   ├─- hooks
   ├─- models
   ├─- pages
   └── sections
```
- **Components:** here will be the components, it must be as abstract as it can, so I am implementing `atomic design`. In this case, only the layers needed to create the pages have been added.
- **Hooks:** Here you will find the logic to interact with the APIs
- **Models:** You will find some interfaces representing the entities of the App
- **Pages:** You will find only the one page that we need to list the post, but in this folder we can add any other pages created based on the components.
- **Section:** I add this folder to add some sections that can be reused in other Page, that doesn't depend at all to a Page like the Metrics Section.

## How to run the App's🔥
1. First let's clone the code with `git@github.com:GabrielaAndocilla/web-crawler-app.git`

###### Backend
To start the backend you will need to have `MySql` installed

2. Let's go to the folder api `cd web-crawler-back`
3. Create a  `.env` on the root directory with this keys (Example keys), you will find a `.env.example` file
```
PORT=8081

NEWS_URL=https://news.ycombinator.com
USER_DB=user
PASSWORD_DB=password
DATABASE_NAME=db_web_crawler
HOST_DB=127.0.0.1

```
4. Run `npm install`
5. To let the ORM create the database and the tables for you run
  - run `npm run db:create`
  - run `npm run db:migrate`

  You will see how `sequelize` works for you

6. To run in dev mode `npm run dev`

To run test please execute `npm run test`



###### Front

2. Let's go to the correct folder `cd web-crawler-ui`
3. Create a `.env` on the root directory with this keys (Example keys), you will find a `.env.example` file
```
REACT_APP_BACK_URL=http://localhost:8081/api

```
4. Run `npm install`
5. To run in dev mode `npm run start`

To run test please execute `npm run test`


  ## What we could improve  ✨
- Implement End to End tests
- Establish a CI/CD pipeline for deployments, facilitating automatic deployments whenever changes are made.
- Add Not Found Pages
- Add internationalization por the ui
- Create a logger to log to understand the flow if something isn't working.
