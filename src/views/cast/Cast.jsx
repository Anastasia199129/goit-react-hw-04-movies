import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import s from './cast.module.css';

const Cast = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=f63adc268da4af945e1cc9e898d72aa8`,
      )
      .then(response => {
        if (response.status === 200) {
          setMovie(response.data.cast);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [movieId]);
  return (
    movie && (
      <ul>
        {movie.map(r => (
          <li key={r.id}>
            <div className={s.wrapperImg}>
              <img src={`https://image.tmdb.org/t/p/w400${r.profile_path}`} alt={r.name} />
            </div>
            <p>Name: {r.name}</p>
            <p>Character: {r.character}</p>
          </li>
        ))}
      </ul>
    )
  );
};

Cast.propTypes = {
  movie: PropTypes.array,
  movieId: PropTypes.string,
};

export default Cast;
