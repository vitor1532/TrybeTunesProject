type ResultTitleProps = {
  searchedArtist: string
};

function ResultTitle({ searchedArtist }: ResultTitleProps) {
  return (
    <h2 className="m-3 p-3">
      Resultado de álbuns de:
      {' '}
      {searchedArtist}
    </h2>
  );
}

export default ResultTitle;
