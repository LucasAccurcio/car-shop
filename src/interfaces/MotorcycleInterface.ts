import { z } from 'zod';
import VehicleSchema from './VehicleInterface';

const VALUES = ['Street', 'Custom', 'Trail'] as const;

const MotorcycleBaseSchema = z.object({
  category: z.enum(VALUES),
  engineCapacity: z.number().int().positive().lte(2500),
});

type MotorcycleBase = z.infer<typeof MotorcycleBaseSchema>;

const MotorcycleSchema = VehicleSchema.merge(MotorcycleBaseSchema);
type Motorcycle = z.infer<typeof MotorcycleSchema>;

export { MotorcycleBase, Motorcycle };
export default MotorcycleSchema;