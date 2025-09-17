/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
  VITE_APP_NAME: string;
  VITE_APP_TITLE: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
