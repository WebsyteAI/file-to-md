import { Context } from 'hono';

export const testHandler = (c: Context) => {
  return c.json({ message: 'Test endpoint is working!' });
};
