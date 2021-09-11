import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useRouteMatch } from 'react-router-dom';

const HomePage = () => {
  const [movie, setMovie] = useState(null);
  const { url } = useRouteMatch();

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/trending/movie/week?api_key=f63adc268da4af945e1cc9e898d72aa8',
      )
      .then(response => {
        if (response.status === 200) {
          setMovie(response.data.results);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Trending Today</h2>
      {movie && (
        <ul>
          {movie.map(({ id, title }) => (
            <li key={id}>
              <Link to={`${url}movies/${id}`}>
                <p>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
