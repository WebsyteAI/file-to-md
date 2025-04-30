import { Context } from 'hono';

export const apiConvertHandler = async (c: Context) => {
  const contentType = c.req.header('Content-Type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return c.json({ error: 'Content-Type must be multipart/form-data' }, 400);
  }

  try {
    const formData = await c.req.parseBody();
    const files: Array<{ name: string; blob: Blob }> = [];
    for (const value of Object.values(formData)) {
      // If value is a File/Blob (has arrayBuffer), use as is
      if (value && typeof value.arrayBuffer === 'function') {
        files.push({ name: value.name, blob: value });
      }
      // If value is a JSON string, try to parse and convert base64/data URL to Blob
      else if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          if (parsed && typeof parsed.data === 'string' && typeof parsed.value === 'string') {
            let mimeType = 'application/octet-stream';
            let base64 = parsed.data;
            const match = parsed.data.match(/^data:(.*?);base64,(.*)$/);
            if (match) {
              mimeType = match[1];
              base64 = match[2];
            }
            const binary = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
            const blob = new Blob([binary], { type: mimeType });
            files.push({ name: parsed.value, blob });
          }
        } catch (e) {
          // Not a JSON string, skip
        }
      }
    }
    if (files.length === 0) {
      return c.json({ error: 'No files uploaded' }, 400);
    }
    const results = await c.env.AI.toMarkdown(files);
    return c.json({ results });
  } catch (error) {
    console.error('Error in /api/convert:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
};
