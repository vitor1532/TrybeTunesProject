type NotFoundProps = {
  route: string
};

function NotFound({ route }: NotFoundProps) {
  return (
    <h1>
      {route}
      {' '}
      Not Found
      {' :('}
    </h1>
  );
}

export default NotFound;
