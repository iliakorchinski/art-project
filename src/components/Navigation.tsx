import { Outlet } from 'react-router';
import { MainNav } from '../components/MainNav';

export function Navigation() {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
