import { createApp } from '@server/app';

const port = Number(process.env.PORT ?? 4001);
const app = createApp();

app.listen(port, '127.0.0.1', () => {
  console.log(`API server listening on http://127.0.0.1:${port}`);
});
