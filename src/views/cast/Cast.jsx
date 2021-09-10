import { useState, useEffect } from 'react';
import axios from 'axios';

const Cast = ({ movieId, url }) => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=f63adc268da4af945e1cc9e898d72aa8`,
      )
      .then(response => {
        if (response.status === 200) {
          setMovie(response);
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);
  return (
    movie && (
      <ul>
        {movie.data.cast.map(r => (
          <li key={r.id}>
            <img src={`https://image.tmdb.org/t/p/w500${r.profile_path}`} alt={r.name} />
            <p>{r.name}</p>
            <p>{r.character}</p>
          </li>
        ))}
      </ul>
    )
  );
};

export default Cast;
