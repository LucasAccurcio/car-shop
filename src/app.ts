import express, { Router } from 'express';
import connectToDatabase from './connection';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  public startServer(port: string | number = 3001): void {
    connectToDatabase();
    const actualPort = process.env.PORT || port;
    this.app.listen(
      actualPort,
      () => console.log(`Server running here 👉 http://localhost:${actualPort}`),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  public getApp() {
    return this.app;
  }
}

export default App;
