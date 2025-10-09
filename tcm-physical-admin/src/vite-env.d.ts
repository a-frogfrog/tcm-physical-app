/// <reference types="vite/client" />
/// <reference types= "./types/index.d.ts" />

interface ImportMetaEnv {
  VITE_APP_NAME: string;
  VITE_APP_TITLE: string;
  VITE_API_BASE_URL: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
