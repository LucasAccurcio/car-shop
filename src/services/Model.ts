import Service from '.';
import { Vehicle } from '../interfaces/VehicleInterface';
import CarModel from '../models/Car';

class ModelService extends Service<Vehicle> {
  constructor(model = new CarModel()) {
    super(model);
  }
}

export default ModelService;