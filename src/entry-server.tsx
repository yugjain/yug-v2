import { renderToString } from 'react-dom/server';
import App from './App';

/** Used by scripts/prerender.mjs to bake the first paint into dist/index.html. */
export function render() {
  return renderToString(<App />);
}
