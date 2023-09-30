import { useEffect, useState } from 'react';
import { AlbumType } from '../types';

type AlbumListProps = {
  setArtist: React.Dispatch<React.SetStateAction<string>>
  artist: string
  albuns: AlbumType[] | []
};

function AlbumList({ setArtist, artist, albuns }: AlbumListProps) {
  const [searchedArtist, setSearchedArtist] = useState('');

  useEffect(() => {
    setSearchedArtist(artist);
    setArtist('');
  }, []);
  if (albuns.length === 0 && artist === '') return (<h2>Nenhum álbum foi encontrado</h2>);
  return (
    <>
      <h2>
        Resultado de álbuns de:
        {' '}
        {searchedArtist}
      </h2>

      {albuns.map((album) => {
        return (
          <div key={ album.collectionId }>
            <img src={ album.artworkUrl100 } alt="album-cover" />
            <h3>{album.collectionName}</h3>
            <p>{album.artistName}</p>
          </div>
        );
      })}
    </>
  );
}

export default AlbumList;
