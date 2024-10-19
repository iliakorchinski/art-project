import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/Home';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigation />,
      children: [{ index: true, element: <HomePage /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
