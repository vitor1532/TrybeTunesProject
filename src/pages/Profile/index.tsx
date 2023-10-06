import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import './index.css';
import avatar from '../../images/avatar.png';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [image, setImage] = useState(avatar);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const userResponse = await getUser();
      if (userResponse.image !== '') {
        setImage(userResponse.image);
      }
      setUser(userResponse);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) return (<Loading />);

  return (
    <div className="profile-container">
      <div className="image-container">
        <img className="profile-image" data-testid="profile-image" src={ image } alt="" />
      </div>
      <div className="info-container">
        <h4 className="info">Nome:</h4>
        <p>{user?.name}</p>
        <hr />
        <h4 className="info">E-mail:</h4>
        <p>{user?.email}</p>
        <hr />
        <h4 className="info">Descrição:</h4>
        <p>{user?.description}</p>
        <hr />
        <Button
          variant="success"
        >
          <Link
            className="text-white text-decoration-none"
            to="/profile/edit"
          >
            Editar perfil
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Profile;
