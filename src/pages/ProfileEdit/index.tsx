import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Loading from '../../components/Loading';
import { ChangeType, UserType } from '../../types';
import { getUser, updateUser } from '../../services/userAPI';
import avatar from '../../images/avatar.png';
import './index.css';

function ProfileEdit() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [img, setImg] = useState('');
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
      const userImageFromLocalStorage = localStorage.getItem('userImage');
      if (userImageFromLocalStorage) {
        setImg(userImageFromLocalStorage);
      }
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
      && description.length !== 0
    );
  };

  const handleImagePreview = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const imageDataUrl = e.target.result as string;
          setImg(imageDataUrl);
          localStorage.setItem('userImage', imageDataUrl);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  function handleChange(event: ChangeType) {
    const { target } = event;
    if (target.name === 'image') {
      handleImagePreview(event as ChangeEvent<HTMLInputElement>);
    } else {
      setFormInfo((prevFormInfo) => ({
        ...prevFormInfo,
        [target.name]: target.value,
      }));
    }
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
    <div className="perfil-form-container">
      <h3 className="title-edit">Edit you profile</h3>
      <Form
        className="perfil-form"
        onSubmit={ handleSubmit }
      >
        <Row>
          <Form.Group as={ Col }>
            <Form.Label>Select your image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              id="image"
              value={ image }
              data-testid="edit-input-image"
              onChange={ (event) => handleChange(event as ChangeType) }
            />
          </Form.Group>
          <Form.Group as={ Col }>
            {img === ''
              ? <img
                  className="placeholder-image"
                  src={ avatar }
                  alt="foto-perfil"
              />
              : <img className="placeholder-image" src={ img } alt="foto-perfil" />}
          </Form.Group>
        </Row>

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            placeholder="Feel free to use your social name"
            value={ name }
            data-testid="edit-input-name"
            onChange={ (event) => handleChange(event as ChangeType) }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            placeholder="Choose an email that you check daily"
            value={ email }
            onChange={ (event) => handleChange(event as ChangeType) }
            data-testid="edit-input-email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            id="description"
            placeholder="About me"
            cols={ 30 }
            rows={ 10 }
            size="sm"
            value={ description }
            onChange={ (event) => handleChange(event as ChangeType) }
            data-testid="edit-input-description"
          />
        </Form.Group>
        <Button
          className="profile-btn"
          type="submit"
          variant="success"
          data-testid="edit-button-save"
          disabled={ !isFormValid() }
        >
          Save
        </Button>
      </Form>
    </div>
  );
}

export default ProfileEdit;
