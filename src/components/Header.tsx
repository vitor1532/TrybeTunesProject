import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header data-testid="header-component">
      <div className="logo-container">
        <div className="user-container">
          <p data-testid="header-user-name">usuario</p>
        </div>
      </div>
      <nav>
        <NavLink data-testid="link-to-search" to="/search">Search</NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">Favorites</NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
}

export default Header;
