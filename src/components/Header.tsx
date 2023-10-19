import { useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { UserType } from '../types';
import { getUser } from '../services/userAPI';
import NavComponent from './NavComponent';
import '../styles/Header.css';

function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser();
        setUser(userData);
        const userImageFromLocalStorage = localStorage.getItem('userImage');
        if (userImageFromLocalStorage) {
          setImage(userImageFromLocalStorage);
        }
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
            <Link className="justify-content-end header-profile" to="/profile">
              <img className="profile-img" src={ image } alt="" />
              <span
                className="user-name"
                data-testid="header-user-name"
              >
                {user.name}

              </span>
            </Link>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default Header;
