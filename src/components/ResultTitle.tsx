type ResultTitleProps = {
  searchedArtist: string
};

function ResultTitle({ searchedArtist }: ResultTitleProps) {
  return (
    <h2 className="d-flex justify-content-center mb-5">
      Resultado de álbuns de:
      {' '}
      {searchedArtist}
    </h2>
  );
}

export default ResultTitle;
