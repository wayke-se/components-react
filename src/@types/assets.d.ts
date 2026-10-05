// Side-effect CSS imports (e.g. '@photo-sphere-viewer/core/index.css') have no type
// declarations; without this TypeScript 6 fails declaration emit with TS2882.
declare module '*.css';
