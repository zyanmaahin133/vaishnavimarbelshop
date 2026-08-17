import * as ReactDOMServer from "react-dom/server";
import { ErrorView } from "./ErrorView";

export function renderErrorHtml(): string {
  const markup = ReactDOMServer.renderToStaticMarkup(<ErrorView />);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      /* minimal fallback styles to match the client look */
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .max-w-md { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .mt-6 { margin-top: 1.5rem; }
      .inline-flex { display: inline-flex; align-items: center; justify-content: center; }
      button, a { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .bg-primary { background: #111; color: #fff; }
      .border-input { border-color: #d1d5db; color: #111; background: #fff; }
    </style>
  </head>
  <body>
    ${markup}
  </body>
</html>`;
}
