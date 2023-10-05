import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import './index.css';

function Album() {
  const [isLoading, setIsLoading] = useState(true);
  const [albumInfo, setAlbumInfo] = useState<AlbumType>();
  const [musics, setMusics] = useState<SongType[]>([]);
  const [favorites, setFavorites] = useState<SongType[]>([]);
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const getAlbumInfo = async () => {
      try {
        setIsLoading(true);
        const response = await getMusics(id || '');
        const albumData = response[0];
        const songs = response.slice(1) as SongType[];
        const favSongs = await getFavoriteSongs();
        setFavorites(favSongs);
        setAlbumInfo(albumData);
        setMusics(songs);
        setIsLoading(false);
      } catch (error) {
        console.log('Erro: ', error);
      }
    };
    getAlbumInfo();
  }, []);

  if (isLoading) return (<h1>Carregando...</h1>);

  return (
    <div className="album-container">
      <div>
        <img className="album-cover" src={ albumInfo?.artworkUrl100 } alt="album-cover" />
        <h3 data-testid="album-name">{albumInfo?.collectionName}</h3>
        <p data-testid="artist-name">{albumInfo?.artistName}</p>
      </div>
      <div className="musics-container">
        <h3>Musics</h3>
        <hr />
        {musics.map((music) => {
          const {
            trackId,
          } = music;
          const isFavorite = favorites.some((favorite) => {
            return favorite.trackId === music.trackId;
          });
          return (
            <>
              <MusicCard
                key={ trackId }
                song={ music }
                isFavorite={ isFavorite }
              />
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Album;
