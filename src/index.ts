import CarController from './controllers/Car';
import CustomRouter from './routes/router';
import App from './server';
import { Car } from './interfaces/CarInterface';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

server.startServer();