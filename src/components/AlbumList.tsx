import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { AlbumType } from '../types';
import ResultTitle from './ResultTitle';

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
  if (albuns.length === 0 && artist === '') {
    return (
      <h2 className="m-3 p-3">Nenhum álbum foi encontrado</h2>
    );
  }
  return (
    <>
      <ResultTitle searchedArtist={ searchedArtist } />

      <Row className="d-flex justify-content-center">
        {albuns.map((album) => {
          const {
            collectionId,
            artworkUrl100,
            collectionName,
            artistName,
          } = album;
          return (
            <Col
              className="d-flex justify-content-center mb-5"
              key={ collectionId }
              xs={ 12 }
              sm={ 6 }
              md={ 4 }
              lg={ 3 }
            >
              <Card style={ { width: '18rem' } }>
                <Card.Img variant="top" src={ artworkUrl100 } alt="album-cover" />
                <Card.Body>
                  <Card.Title>{collectionName}</Card.Title>
                  <Card.Text>{artistName}</Card.Text>
                </Card.Body>
                <Link
                  className="btn btn-dark"
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  See Album
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default AlbumList;
