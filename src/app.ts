import express from "express";
import { logger } from "./utils/Logger";
import { useSentry } from "./utils/Sentry";
import cors from "cors";
import helmet from "helmet";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
  }

  private setMiddlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
  }

  public async createExpressServer(port: number) {
    try {
      useSentry(this.app);

      this.app.listen(port, () => {
        logger.info(`Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      logger.error(error);
    }
  }
}
