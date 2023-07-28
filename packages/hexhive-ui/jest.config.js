/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    ".spec.ts", 
    ".spec.tsx", 
    'dist/', 
  ],
  transformIgnorePatterns: [
    "/node_modules/(?!react-dnd|core-dnd|@react-dnd|dnd-core|react-dnd-html5-backend)",
    // 'node_modules/(?!react-dnd|dnd-core|@react-dnd)/',
    // 'node_modules/react-dnd-html5-backend/'
  ],
  transform: {
    "node_modules/(react-dnd|dnd-core|@react-dnd)/.+\\.(j|t)sx?$": "ts-jest",
    "node_modules/react-dnd-html5-backend/.+\\.(j|t)sx?$": "ts-jest",
  }
}