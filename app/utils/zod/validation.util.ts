import { z } from 'zod';

export function isValidation<T extends z.ZodObject<any>>(data: any, schema: T): data is z.infer<T> {
  try {
    schema.parse(data);
    return true;
  } catch (error) {
    return false;
  }
}
