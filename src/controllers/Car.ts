import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/Car';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  checkId = (id: string): boolean => {
    const MIN_CHARACTER = 24;
    if (id.length !== MIN_CHARACTER) {
      return false;
    }
    return true;
  };

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const isHexa = this.checkId(id);
    if (!isHexa) return res.status(400).json({ error: this.errors.requiredId });
    try {
      const car = await this.service.readOne(id);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Car> | Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    const isHexa = this.checkId(id);
    if (!isHexa) return res.status(400).json({ error: this.errors.requiredId });
    try {
      const car = await this.service.update(id, body);

      if (!car) return res.status(404).json({ error: this.errors.notFound });

      if ('error' in car) return res.status(400).json(car);

      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const isHexa = this.checkId(id);
    if (!isHexa) return res.status(400).json({ error: this.errors.requiredId });
    try {
      const car = await this.service.delete(id);
      return car
        ? res.status(204).send()
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;