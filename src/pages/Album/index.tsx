import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';

function Album() {
  const [isLoading, setIsLoading] = useState(true);
  const [albumInfo, setAlbumInfo] = useState<AlbumType>();
  const [musics, setMusics] = useState<SongType[]>([]);
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    setIsLoading(true);
    const getAlbumInfo = async () => {
      try {
        const response = await getMusics(id || '');
        const albumData = response[0];
        const songs = response.slice(1) as SongType[];
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
    <>
      <div>
        <img src={ albumInfo?.artworkUrl100 } alt="album-cover" />
        <h3 data-testid="album-name">{albumInfo?.collectionName}</h3>
        <p data-testid="artist-name">{albumInfo?.artistName}</p>
      </div>
      <div>
        <h3>Musics: </h3>
        {musics.map((music) => {
          const {
            trackId,
            trackName,
            previewUrl,
          } = music;
          return (
            <div key={ trackId }>
              <h3>{trackName}</h3>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Album;
