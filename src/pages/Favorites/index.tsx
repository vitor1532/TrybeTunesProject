import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import MusicCard from '../../components/MusicCard';
import NotFound from '../NotFound';
import './index.css';

function Favorites() {
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);

  useEffect(() => {
    const getFav = async () => {
      setIsLoading(true);
      const favorites = await getFavoriteSongs();
      setFavoriteSongs(favorites);
      setIsLoading(false);
    };
    getFav();
  }, []);

  const removeSongFromFavorites = (trackIdToRemove: number) => {
    setFavoriteSongs((prevFavorites) => {
      return prevFavorites.filter((song) => song.trackId !== trackIdToRemove);
    });
  };

  if (isLoading) return (<Loading />);

  if (favoriteSongs.length === 0) {
    return (<NotFound route="Favorites" />);
  }

  return (
    <div className="favorite-container">
      <h1>Musicas Favoritas:</h1>
      <div className="fav-music-container">
        {favoriteSongs.map((song) => {
          return (
            <div className="fav-music" key={ song.trackId }>
              <MusicCard
                song={ song }
                isFavorite
                onRemoveFromFavorites={ removeSongFromFavorites }
              />
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
