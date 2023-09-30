import { useState } from 'react';
import { AlbumType, ChangeType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import AlbumList from '../../components/AlbumList';
import AlbumForm from '../../components/AlbumForm';

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
    isFormClicked ? (
      <>
        <AlbumForm
          handleSubmit={ handleSubmit }
          handleChange={ handleChange }
          artist={ artist }
          isDisabled={ isDisabled }
        />
        <AlbumList artist={ artist } albuns={ albuns } />
      </>
    ) : (
      <AlbumForm
        handleSubmit={ handleSubmit }
        handleChange={ handleChange }
        artist={ artist }
        isDisabled={ isDisabled }
      />
    )
  );
}

export default Search;
