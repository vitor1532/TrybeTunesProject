import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import './index.css';

function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [user, setUser] = useState<UserType>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setSelectedImage(imageDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

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
    <form>
      <label htmlFor="image" data-testid="edit-input-image">
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={ handleImageChange }
        />
        {selectedImage
        && <img className="placeholder-image" src={ selectedImage } alt="foto-perfil" />}

      </label>
      <label data-testid="edit-input-name" htmlFor="name">
        <h4>Nome</h4>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Fique à vontade para usar seu nome social"
        />
      </label>
      <label data-testid="edit-input-email" htmlFor="email">
        <h4>E-mail</h4>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Escolha um e-mail que consulta diaraiamente"
        />
      </label>
      <label data-testid="edit-input-description" htmlFor="name">
        <h4>Nome</h4>
        <p>Fique à vontade para usar seu nome social</p>
        <textarea
          name="description"
          id="description"
          placeholder="Sobre mim"
          cols={ 30 }
          rows={ 10 }
        />
      </label>
    </form>
  );
}

export default ProfileEdit;
