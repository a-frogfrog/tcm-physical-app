import router from '#/router';
import { RouterProvider } from 'react-router-dom';

export function SetupRouter() {
  return <RouterProvider router={router} />;
}
