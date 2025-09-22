import { RouterProvider } from 'react-router-dom';
import router from './router';

export default function SetupApp() {
  return <RouterProvider router={router} />;
}
