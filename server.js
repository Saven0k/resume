import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

const files = new Set(['index.html', 'styles.css', 'script.js', 'assets/photo.svg', 'assets/photo.jpg', 'assets/photo.png', 'assets/favicon.svg']);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = createServer(async (request, response) => {
  const file = new URL(request.url, 'http://localhost').pathname.slice(1) || 'index.html';
  if (!files.has(file)) { response.writeHead(404); response.end('Not found'); return; }
  try {
    const contents = await readFile(new URL(file, import.meta.url));
    response.writeHead(200, { 'Content-Type': types[extname(file)], 'Cache-Control': 'no-cache' });
    response.end(contents);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
server.listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
