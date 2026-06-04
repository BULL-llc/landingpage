import { cp, mkdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);

await mkdir(new URL('src/assets/', dist), { recursive: true });
await cp(new URL('index.html', root), new URL('index.html', dist), {
  force: true,
});
await cp(new URL('src/main.js', root), new URL('src/main.js', dist), {
  force: true,
});
await cp(new URL('src/content.js', root), new URL('src/content.js', dist), {
  force: true,
});
await cp(
  new URL('src/validation.js', root),
  new URL('src/validation.js', dist),
  {
    force: true,
  }
);
await cp(new URL('src/styles.css', root), new URL('src/styles.css', dist), {
  force: true,
});
await cp(new URL('src/assets/', root), new URL('src/assets/', dist), {
  force: true,
  recursive: true,
});

console.log('Built frontend static files into packages/frontend/dist.');
