import { z } from 'zod';
import VehicleSchema from './VehicleInterface';

const CarBaseSchema = z.object({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type CarBase = z.infer<typeof CarBaseSchema>;

const CarSchema = VehicleSchema.merge(CarBaseSchema);
type Car = z.infer<typeof CarSchema>;

export { CarBase, Car };
export default CarSchema;