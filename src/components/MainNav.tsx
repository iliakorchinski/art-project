import { Link } from 'react-router-dom';

export function MainNav() {
  return (
    <header>
      <div>
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="favourites">Your Favourites</Link>
        </p>
      </div>
    </header>
  );
}
