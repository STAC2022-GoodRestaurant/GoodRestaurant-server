import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";
import { router } from "./shared/@decorator/http/controller.decorator";
import "./user/controller/user.controller";

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  public port: number = this.getNumberEnv("PORT");
  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.passportUse();
    this.dbConnect();
    this.app.use(morgan("dev"));

    this.app.use(
      cors({
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
      })
    );

    this.app.use(router);
    this.listen();
  }

  passportUse() {
    return [];
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => {
        console.log("Connect Success");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Listen in ${this.port} :: ENV = ${this.getEnvironment("ENV")}`
      );
    });
  }
}

new ServerBootstrap();
