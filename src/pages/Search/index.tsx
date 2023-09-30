import { useState } from 'react';
import { ChangeType } from '../../types';

function Search() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [artist, setArtist] = useState('');

  const handleChange = (event: ChangeType) => {
    const { value } = event.target;
    setArtist(value);
    setIsDisabled(value.length < 2);
  };

  return (
    <form>
      <input
        data-testid="search-artist-input"
        type="text"
        name="artist"
        id="artist"
        placeholder="Nome do Artista"
        value={ artist }
        onChange={ handleChange }
      />
      <button disabled={ isDisabled } data-testid="search-artist-button">Procurar</button>
    </form>
  );
}

export default Search;
