import { Nav } from 'react-bootstrap';
import { BsSearch, BsStarFill, BsFillPersonFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import '../styles/NavComponent.css';

function NavComponent() {
  return (
    <Nav className="me-auto nav-container">
      <NavLink
        className="nav-link"
        data-testid="link-to-search"
        to="/search"
      >
        <BsSearch className="icon" />
        <span className="route">Search</span>
      </NavLink>
      |
      <NavLink
        className="nav-link"
        data-testid="link-to-favorites"
        to="/favorites"
      >
        <BsStarFill className="icon" />
        <span className="route">Favorites</span>
      </NavLink>
      |
      <NavLink
        className="nav-link"
        data-testid="link-to-profile"
        to="/profile"
      >
        <BsFillPersonFill className="icon" />
        <span className="route">Profile</span>
      </NavLink>
    </Nav>
  );
}

export default NavComponent;
