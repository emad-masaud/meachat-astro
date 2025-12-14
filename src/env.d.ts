/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare module '*.css' {
  const content: string;
  export default content;
}