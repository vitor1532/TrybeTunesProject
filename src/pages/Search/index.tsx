import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AlbumType, ChangeType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import AlbumList from '../../components/AlbumList';
import Loading from '../../components/Loading';
import './index.css';

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

  if (isLoading) return (<Loading />);

  return (
    <>
      <div className="center-middle-container">
        <Form onSubmit={ handleSubmit } className="center-middle-form">
          <Form.Group className="d-flex align-items-center">
            <Form.Control
              className="me-2"
              data-testid="search-artist-input"
              type="text"
              name="artist"
              id="artist"
              placeholder="Artist Name"
              value={ artist }
              onChange={ handleChange }
            />
            <Button
              variant="success"
              disabled={ isDisabled }
              data-testid="search-artist-button"
              type="submit"
            >
              Search
            </Button>
          </Form.Group>
        </Form>
      </div>
      {isFormClicked && (
        <AlbumList setArtist={ setArtist } artist={ artist } albuns={ albuns } />
      )}
    </>
  );
}

export default Search;
