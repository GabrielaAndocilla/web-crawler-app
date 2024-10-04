import cors, { CorsOptions } from "cors";
import express, { Application } from "express";
import Routes from "./routes";
import sequelize from "infrastructure/db";

export default class Server {
  constructor(app: Application, port:string) {
    this.config(app, port);
    new Routes(app);
  }

  private config(app: Application, port: string): void {
    const corsOptions: CorsOptions = {
      origin: [`http://localhost:${port}`,`http://localhost:3000`]
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
   }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
   });
  }
}
