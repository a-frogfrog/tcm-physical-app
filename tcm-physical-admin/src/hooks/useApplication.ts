/**
 * @description 提供应用信息 hook
 */
export const useApplication = () => {
  const title = import.meta.env.VITE_APP_TITLE;
  const name = import.meta.env.VITE_APP_NAME;
  return { title, name };
};
