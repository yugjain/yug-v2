import { renderToString } from 'react-dom/server';
import App from './App';
import LabApp from './LabApp';

/** Used by scripts/prerender.mjs to bake the first paint into dist/index.html. */
export function renderHome() {
  return renderToString(<App />);
}

/** Used by scripts/prerender.mjs to bake the first paint into dist/lab/index.html. */
export function renderLab() {
  return renderToString(<LabApp />);
}
