import 'reflect-metadata';
import { Application, Context, inject } from 'midway';
import { createConnection, Connection } from 'typeorm';

class AppBootHook {
  app: Application;
  connection: Connection;

  @inject()
  ctx: Context;

  constructor(app: Application) {
    this.app = app;
  }

  async willReady() {
    try {
      const con = await createConnection();
      this.connection = con;
      this.app.applicationContext.registerObject('connection', con);
    } catch (err) {
      console.log(err);
      if (this.ctx) {
        this.ctx.logger.error(err);
      }
    }
  }

  async beforeClose() {
    if (this.connection) {
      await this.connection.close();
    }
  }
}

export default AppBootHook;
