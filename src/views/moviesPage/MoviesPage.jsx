import { useState } from 'react';

const MoviesPage = ({ movies }) => {
  const [movie, setMovie] = useState(movies);
  console.log(movies);
  // setMovie(movies);
  return <h1>Moviespages</h1>;
};

export default MoviesPage;
