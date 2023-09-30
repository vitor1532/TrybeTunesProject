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

      {/* {albuns.map(

      )} */}
    </>
  );
}

export default AlbumList;
