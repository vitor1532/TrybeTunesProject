import { AlbumType } from '../types';

type AlbumListProps = {
  artist: string
  albuns: AlbumType[] | []
};

function AlbumList({ artist, albuns }: AlbumListProps) {
  if (albuns.length === 0) return (<h2>Nenhum álbum foi encontrado</h2>);
  return (
    <p>{artist}</p>
  );
}

export default AlbumList;
