import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/Home';
import { Favourites } from './pages/Favourites/Favourites';
import { ArtworkContextProvider } from './store/artwork-context';
import { ArtworkDetail } from './pages/ArtworkDetail/ArtworkDetail';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigation />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'favourites', element: <Favourites /> },
        { path: '/:id', element: <ArtworkDetail /> },
      ],
    },
  ]);
  return (
    <ArtworkContextProvider>
      <RouterProvider router={router} />
    </ArtworkContextProvider>
  );
}

export default App;
