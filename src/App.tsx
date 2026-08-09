import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import '@/shared/styles/tokens.css';

export function App() {
  return <RouterProvider router={router} />;
}
