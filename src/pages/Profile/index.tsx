import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const userResponse = await getUser();
      setUser(userResponse);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) return (<Loading />);

  return (
    <div>
      <img data-testid="profile-image" src={ user?.image } alt="" />
      <Link to="/profile/edit">Editar perfil</Link>
      <h4>Nome</h4>
      <p>{user?.name}</p>
      <h4>E=mail</h4>
      <p>{user?.email}</p>
      <h4>Descrição</h4>
      <p>{user?.description}</p>
    </div>
  );
}

export default Profile;
