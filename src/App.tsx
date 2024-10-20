import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/Home';
import { Favourites } from './pages/Favourites';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigation />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'favourites', element: <Favourites /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
