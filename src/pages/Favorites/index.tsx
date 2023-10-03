import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import MusicCard from '../../components/MusicCard';

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

  if (isLoading) return (<Loading />);

  return (
    favoriteSongs.map((song) => {
      return (<MusicCard key={ song.trackId } song={ song } isFavorite />);
    })
  );
}

export default Favorites;
