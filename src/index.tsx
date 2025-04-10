import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static';

const app = new Hono();

// Serve static files (e.g., the frontend)
app.use('/static/*', serveStatic({ root: './public' }));

// Test endpoint
app.get('/test', (c) => {
  return c.json({ message: 'Service is working!' });
});

export default app;