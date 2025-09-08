/// <reference types="vite/client" />
/// <reference types= "./types/index.d.ts" />

interface ImportMetaEnv {
  VITE_APP_NAME: string;
  VITE_APP_TITLE: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
