/** @jsx h */
import { Hono } from 'hono';
import { jsx, serveStatic } from 'hono/jsx';
import MarkdownResults from './components/MarkdownResults';
import FAQs from './components/FAQs';
import AdSense from './components/AdSense';

const app = new Hono();

// Home route
app.get('/', (c) => {
  return jsx(
    <html>
      <head>
        <title>Markdown Conversion Service</title>
      </head>
      <body>
        <h1>Welcome to the Markdown Conversion Service</h1>
        <FAQs />
        <AdSense />
      </body>
    </html>
  );
});

// Test endpoint
app.get('/test', (c) => {
  return c.json({ message: 'Service is working!' });
});

export default app;