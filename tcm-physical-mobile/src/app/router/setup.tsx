import { RouterProvider } from 'react-router-dom';
import router from '.';

export default function SetupRouter() {
  return <RouterProvider router={router} />;
}
