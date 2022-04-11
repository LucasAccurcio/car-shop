import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

const CarSchema = z.object({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type CarBase = z.infer<typeof CarSchema>;

type Car = CarBase & Vehicle;

export { CarBase, Car };
export default CarSchema;