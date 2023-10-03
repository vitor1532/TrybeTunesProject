import { useEffect, useState } from 'react';

import emptyHeart from '../images/empty_heart.png';
import fullHeart from '../images/checked_heart.png';

import '../styles/MusicCard.css';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import { SongType } from '../types';

type MusicCardProps = {
  song: SongType
  isFavorite: boolean
};

function MusicCard({ song, isFavorite }: MusicCardProps) {
  const [isChecked, setIsChecked] = useState(isFavorite);
  const { trackId, trackName, previewUrl } = song;

  const handleChange = () => {
    setIsChecked((prevFavorite) => !prevFavorite);
  };
  useEffect(() => {
    const getFavSongs = async () => {
      if (isChecked) {
        await addSong(song);
      } else if (!isChecked) {
        await removeSong(song);
      }
    };
    getFavSongs();
  }, [isChecked]);

  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` } className="custom-checkbox">
        <input
          checked={ isChecked }
          type="checkbox"
          onChange={ handleChange }
        />
        {isChecked
          ? (<img src={ fullHeart } alt="favorite" />
          ) : (<img src={ emptyHeart } alt="favorite" />)}

      </label>
    </div>
  );
}

export default MusicCard;
