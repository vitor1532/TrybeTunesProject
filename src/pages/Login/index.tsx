import { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { ChangeType } from '../../types';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading';

const INITIAL_FORM = {
  name: '',
};

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [formInfo, setFormInfo] = useState(INITIAL_FORM);
  const navigate = useNavigate();

  const handleChange = (event: ChangeType) => {
    const { name, value } = event.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
    setIsDisabled(value.length < 3);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await createUser(formInfo);

      if (response === 'OK') {
        setIsLoading(false);
        (navigate('/search'));
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };
  if (isLoading) return (<Loading />);

  return (
    <div className="form-container">
      <Form onSubmit={ handleSubmit } className="login-form">
        <FormGroup className="mb-3">
          <Form.Label htmlFor="name" />
          <Form.Control
            data-testid="login-name-input"
            type="text"
            name="name"
            id="name"
            placeholder="Type your name"
            value={ formInfo.name }
            onChange={ handleChange }
          />
        </FormGroup>
        <Button
          variant="success"
          disabled={ isDisabled }
          data-testid="login-submit-button"
          type="submit"
        >
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default Login;
