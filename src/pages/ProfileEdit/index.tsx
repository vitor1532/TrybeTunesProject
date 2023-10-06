import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
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
    <div className="perfil-form-container">
      <h3 className="title-edit">Edit you profile</h3>
      <Form
        className="perfil-form"
        onSubmit={ handleSubmit }
      >
        <Row>
          <Form.Group as={ Col }>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="image"
              id="image"
              value={ image }
              data-testid="edit-input-image"
              onChange={ (event) => handleChange(event as ChangeType) }
            />
          </Form.Group>
          <Form.Group as={ Col }>
            {image
        && <img className="placeholder-image" src={ image } alt="foto-perfil" />}
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
