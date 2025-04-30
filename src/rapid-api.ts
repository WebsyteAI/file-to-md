// src/rapid-api.ts
import { Hono } from 'hono';
import { z } from 'zod';

export interface Env {
  AI: {
    toMarkdown: (documents: Array<{ name: string; blob: Blob }>) => Promise<
      Array<{
        name: string;
        mimeType: string;
        tokens: number;
        data: string;
      }>
    >;
  };
}

const app = new Hono<{ Bindings: Env }>();

// POST /api/convert
// Accepts multipart/form-data with a file, returns JSON with markdown results
app.post('/api/convert', async (c) => {
  const contentType = c.req.header('Content-Type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return c.json({ error: 'Content-Type must be multipart/form-data' }, 400);
  }

  try {
    const formData = await c.req.parseBody();
    const files: Array<{ name: string; blob: Blob }> = [];
    for (const value of Object.values(formData)) {
      if (value instanceof File) {
        files.push({ name: value.name, blob: value });
      }
    }
    if (files.length === 0) {
      return c.json({ error: 'No files uploaded' }, 400);
    }
    const results = await c.env.AI.toMarkdown(files);
    return c.json({ results });
  } catch (error) {
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

export default app;
