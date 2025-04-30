import { Context } from 'hono';

export const apiHealthHandler = (c: Context) => {
  return c.json({ status: 'ok', timestamp: Date.now() });
};
