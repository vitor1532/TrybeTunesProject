import { useState } from 'react';
import { AlbumType, ChangeType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [albuns, setAlbuns] = useState<AlbumType[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [artist, setArtist] = useState('');

  const handleChange = (event: ChangeType) => {
    const { value } = event.target;
    setArtist(value);
    setIsDisabled(value.length < 2);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const searchArtist = await searchAlbumsAPI(artist);

      setAlbuns(searchArtist);
      setIsLoading(false);
    } catch (error) {
      console.log('Erro: ', error);
    }
  };

  return (
    isLoading ? (<h1>Carregando...</h1>) : (
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="search-artist-input"
          type="text"
          name="artist"
          id="artist"
          placeholder="Nome do Artista"
          value={ artist }
          onChange={ handleChange }
        />
        <button
          disabled={ isDisabled }
          data-testid="search-artist-button"
        >
          Procurar
        </button>
      </form>
    )
  );
}

export default Search;
