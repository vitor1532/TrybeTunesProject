import { useEffect, useState } from 'react';

import emptyHeart from '../images/empty_heart.png';
import fullHeart from '../images/checked_heart.png';

import '../styles/MusicCard.css';

type MusicCardProps = {
  trackId: number,
  trackName: string,
  previewUrl: string,
  favorites: number[],
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>
};

function MusicCard({
  trackId,
  trackName,
  previewUrl,
  favorites,
  setFavorites,
}: MusicCardProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prevFavorite) => !prevFavorite);
  };

  useEffect(() => {
    if (isChecked && !favorites.includes(trackId)) {
      setFavorites([
        ...favorites,
        trackId,
      ]);
    }
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
