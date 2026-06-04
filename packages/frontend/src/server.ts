import { stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const port = Number(Bun.env.PORT ?? 5173);
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
]);

function toFilePath(pathname: string) {
  const safePathname = pathname === '/' ? '/index.html' : pathname;
  const decodedPathname = decodeURIComponent(safePathname);
  const normalizedPathname = normalize(decodedPathname).replace(
    /^(\.\.\/)+/,
    ''
  );

  if (normalizedPathname.includes('..')) {
    return null;
  }

  return join(root, normalizedPathname);
}

const server = Bun.serve({
  async fetch(request) {
    const url = new URL(request.url);
    const filePath = toFilePath(url.pathname);

    if (!filePath) {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      const fileStat = await stat(filePath);

      if (!fileStat.isFile()) {
        return new Response('Not found', { status: 404 });
      }

      const file = Bun.file(filePath);
      const contentType = mimeTypes.get(extname(filePath)) ?? 'text/plain';

      return new Response(file, {
        headers: {
          'Content-Type': contentType,
        },
      });
    } catch {
      return new Response('Not found', { status: 404 });
    }
  },
  port,
});

console.log(`Frontend preview: http://localhost:${server.port}`);
