import { useState } from 'react';
import { AlbumType, ChangeType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import AlbumList from '../../components/AlbumList';

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormClicked, setFormClicked] = useState(false);
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
      setFormClicked(true);
    } catch (error) {
      console.log('Erro: ', error);
    }
  };

  if (isLoading) return (<h1>Carregando...</h1>);

  return (
    <>
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
      {isFormClicked && (
        <AlbumList setArtist={ setArtist } artist={ artist } albuns={ albuns } />
      )}
    </>
  );
}

export default Search;
