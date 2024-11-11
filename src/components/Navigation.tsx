import { Outlet } from 'react-router';

import { MainNav } from './Header/main-nav';

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
