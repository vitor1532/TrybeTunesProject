import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
import { UserType } from '../types';
import { getUser } from '../services/userAPI';

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
        <div className="logo-container">
          <div className="user-container">
            <p data-testid="header-user-name">{user.name}</p>
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
}

export default Header;
