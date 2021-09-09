import { useParams } from 'react-router';

const MovieDetailsPage = () => {
  const params = useParams();
  console.log(params);

  return <h1>MovieDetailsPage</h1>;
};

export default MovieDetailsPage;
