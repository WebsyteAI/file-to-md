import { Context } from 'hono';
import { jsx } from 'hono/jsx';
import { MarkdownResults } from '../components/MarkdownResults';
import { AdSense } from '../components/AdSense';

const SUPPORTED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'text/html',
  'application/xml',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel.sheet.macroenabled.12',
  'application/vnd.ms-excel.sheet.binary.macroenabled.12',
  'application/vnd.ms-excel',
  'application/vnd.oasis.opendocument.spreadsheet',
  'text/csv',
  'application/vnd.apple.numbers',
];

export const uiConvertHandler = async (c: Context) => {
  const contentType = c.req.header('Content-Type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return c.text('Content-Type must be multipart/form-data', 400);
  }

  try {
    // Parse the form data
    const formData = await c.req.parseBody();
    const files: Array<{ name: string; blob: Blob }> = [];

    for (const [key, value] of Object.entries(formData)) {
      if (value instanceof File) {
        if (!SUPPORTED_MIME_TYPES.includes(value.type)) {
          return c.text(`Unsupported file type: ${value.type}`, 400);
        }
        files.push({ name: value.name, blob: value });
      }
    }

    if (files.length === 0) {
      return c.text('No valid files uploaded', 400);
    }

    // Convert files to Markdown
    const results = await c.env.AI.toMarkdown(files);

    // Display the results
    return c.html(
      <html lang="en">
        <head>
          <title>Markdown Results - Converted Files</title>
          <meta name="description" content="View the Markdown results of your converted files. Easily copy and use the Markdown content." />
          <meta name="keywords" content="Markdown results, converted files, copy markdown, AI markdown conversion" />
          <meta name="author" content="WebsyteAI" />
          <meta property="og:title" content="Markdown Results - Converted Files" />
          <meta property="og:description" content="View the Markdown results of your converted files. Easily copy and use the Markdown content." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://wai-browser-rendering.websyte.ai/results" />
          <meta property="og:image" content="https://wai-browser-rendering.websyte.ai/og-image.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        </head>
        <body class="bg-gray-100 text-gray-900 font-sans p-6">
          <MarkdownResults results={results} />
          <AdSense />
        </body>
      </html>
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return c.text('Internal Server Error', 500);
  }
};
