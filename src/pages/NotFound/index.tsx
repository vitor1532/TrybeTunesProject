import './index.css';

type NotFoundProps = {
  route: string
};

function NotFound({ route }: NotFoundProps) {
  return (
    <h1 className="not-found">
      {route}
      {' '}
      Not Found
      {' :('}
    </h1>
  );
}

export default NotFound;
