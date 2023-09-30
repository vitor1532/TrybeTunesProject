import { useState } from 'react';
import './index.css';
import { ChangeType } from '../../types';

const INITIAL_FORM = {
  name: '',
};

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formInfo, setFormInfo] = useState(INITIAL_FORM);

  const handleChange = (event: ChangeType) => {
    const { name, value } = event.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
    setIsDisabled(value.length < 3);
  };

  return (
    <div className="form-container">
      <form className="login-form">
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
        <button disabled={ isDisabled } data-testid="login-submit-button">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
