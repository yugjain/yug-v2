import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import LabApp from './LabApp';
import './index.css';

const root = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <LabApp />
  </StrictMode>
);

// The production build is prerendered; dev and any unprerendered fallback
// mount from scratch.
if (root.hasChildNodes()) hydrateRoot(root, tree);
else createRoot(root).render(tree);
