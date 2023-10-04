import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { ChangeType, UserType } from '../../types';
import { getUser, updateUser } from '../../services/userAPI';
import './index.css';

function ProfileEdit() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [formInfo, setFormInfo] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const userResponse = await getUser();
      setUser(userResponse);
      setFormInfo({
        ...userResponse,
      });
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const {
    name,
    email,
    image,
    description,
  } = formInfo;

  const isFormValid = () => {
    const validEmail = /^\S+@\S+\.\S+$/;

    return (
      validEmail.test(email)
      && formInfo.name.length >= 3
      && image.length !== 0
      && description.length !== 0
    );
  };

  function handleChange(event: ChangeType) {
    const { target } = event;
    setFormInfo({
      ...formInfo,
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    await updateUser({ ...formInfo } as UserType);
    navigate('/profile');
    setIsLoading(false);
  };

  if (isLoading) return (<Loading />);

  return (
    <form
      onSubmit={ handleSubmit }
    >
      <label htmlFor="image">
        <input
          type="text"
          name="image"
          id="image"
          onChange={ handleChange }
          value={ image }
          data-testid="edit-input-image"
        />
        {image
        && <img className="placeholder-image" src={ image } alt="foto-perfil" />}

      </label>
      <label htmlFor="name">
        <h4>Name</h4>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Feel free to use your social name"
          value={ name }
          onChange={ handleChange }
          data-testid="edit-input-name"
        />
      </label>
      <label htmlFor="email">
        <h4>E-mail</h4>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Choose an email that you check daily"
          value={ email }
          onChange={ handleChange }
          data-testid="edit-input-email"
        />
      </label>
      <label htmlFor="description">
        <h4>Description</h4>
        <textarea
          name="description"
          id="description"
          placeholder="About me"
          cols={ 30 }
          rows={ 10 }
          value={ description }
          onChange={ handleChange }
          data-testid="edit-input-description"
        />
      </label>
      <button data-testid="edit-button-save" disabled={ !isFormValid() }>Save</button>
    </form>
  );
}

export default ProfileEdit;
