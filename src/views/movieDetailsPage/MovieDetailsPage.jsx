import axios from 'axios';
import s from './movieDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);

  const { movieId } = useParams();
  console.log(movieId);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f63adc268da4af945e1cc9e898d72aa8`)
      .then(response => {
        if (response.status === 200) {
          setMovie(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);

  return (
    movie && (
      <div>
        <img className={s.img} src={movie.data.poster_path} alt="" />
        <h2>{`${movie.data.original_title} (${movie.data.release_date.slice(0, 4)})`} </h2>
        <p>{`User score: ${movie.data.popularity}`}</p>
        <h3>Overview</h3>
        <p>{movie.data.overview}</p>
        <h3>Genres</h3>
        <ul>
          {movie.data.genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default MovieDetailsPage;
