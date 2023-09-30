import { ChangeType } from '../types';

type ALbumFormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  handleChange: (event: ChangeType) => void
  artist: string
  isDisabled: boolean
};

function AlbumForm({ handleSubmit, handleChange, artist, isDisabled }: ALbumFormProps) {
  return (
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
  );
}

export default AlbumForm;
