import { useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Loading from './Loading';
import { UserType } from '../types';
import { getUser } from '../services/userAPI';
import NavComponent from './NavComponent';

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

        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <NavComponent />
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
