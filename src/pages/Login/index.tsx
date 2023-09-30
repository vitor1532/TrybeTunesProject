import { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { ChangeType } from '../../types';
import { createUser } from '../../services/userAPI';

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

  return (
    isLoading ? (<h1>Carregando...</h1>) : (
      <div className="form-container">
        <form onSubmit={ handleSubmit } className="login-form">
          <label htmlFor="name">
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              id="name"
              placeholder="Nome"
              value={ formInfo.name }
              onChange={ handleChange }
            />
          </label>
          <button
            disabled={ isDisabled }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    )
  );
}

export default Login;
