import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Loading from './Loading';
import { UserType } from '../types';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';

function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser();
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) return (<Loading />);

  if (user !== null) {
    return (
      <header data-testid="header-component">

        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto">
              <NavLink
                className="nav-link"
                data-testid="link-to-search"
                to="/search"
              >
                Search
              </NavLink>
              <NavLink
                className="nav-link"
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favorites
              </NavLink>
              <NavLink
                className="nav-link"
                data-testid="link-to-profile"
                to="/profile"
              >
                Profile
              </NavLink>
            </Nav>
            <Navbar.Brand href="/profile">
              <p data-testid="header-user-name">{user.name}</p>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default Header;
