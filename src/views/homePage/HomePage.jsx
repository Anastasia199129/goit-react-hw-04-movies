import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import s from './homePage.module.css';

const HomePage = () => {
  const [movie, setMovie] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation();

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
        <ul className={s.list}>
          {movie.map(({ id, title, backdrop_path, name }) => (
            <li className={s.item} key={id}>
              <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt={name} />

              <Link
                className={s.link}
                to={{
                  pathname: `${url}movies/${id}`,
                  state: { from: location },
                }}
              >
                <p className={s.title}>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

HomePage.propTypes = {
  movie: PropTypes.array,
  url: PropTypes.string,
  location: PropTypes.string,
};

export default HomePage;
