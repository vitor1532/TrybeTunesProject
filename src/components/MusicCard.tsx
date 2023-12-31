import { useEffect, useState } from 'react';

import emptyHeart from '../images/empty_heart.png';
import fullHeart from '../images/checked_heart.png';

import '../styles/MusicCard.css';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import { SongType } from '../types';

type MusicCardProps = {
  song: SongType
  isFavorite: boolean
  onRemoveFromFavorites?: ((trackIdToRemove: number) => void) | undefined
};

function MusicCard(
  { song, isFavorite, onRemoveFromFavorites = () => {} }: MusicCardProps,
) {
  const [isChecked, setIsChecked] = useState(isFavorite);
  const { trackId, trackName, previewUrl } = song;

  const handleChange = async () => {
    setIsChecked((prevFavorite) => !prevFavorite);
    if (trackId && onRemoveFromFavorites) {
      onRemoveFromFavorites(trackId);
      await removeSong(song);
    }
  };
  useEffect(() => {
    const getFavSongs = async () => {
      if (isChecked && !isFavorite) {
        await addSong(song);
      }
      if (!isChecked) {
        await removeSong(song);
      }
    };
    getFavSongs();
  }, [isChecked]);

  return (
    <div className="music-card">
      {/* <div className="music-info"> */}
      <span>{trackName}</span>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      {/* </div> */}
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
