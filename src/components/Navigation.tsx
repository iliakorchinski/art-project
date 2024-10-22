import { Outlet } from 'react-router';
import { MainNav } from './Header/MainNav';

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
