import { Hono } from 'hono';
import { agentContext } from './agent';
import { testHandler } from './routes/test';
import { apiHealthHandler } from './routes/api-health';
import { apiConvertHandler } from './routes/api-convert';
import { uiRootHandler } from './routes/ui-root';
import { uiConvertHandler } from './routes/ui-convert';

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

// Test endpoint
app.get('/test', testHandler);

// Health check endpoint
app.get('/api/health', apiHealthHandler);

// API convert endpoint
app.post('/api/convert', apiConvertHandler);

// UI endpoints
app.get('/', uiRootHandler);
app.post('/convert', uiConvertHandler);

export default app;
