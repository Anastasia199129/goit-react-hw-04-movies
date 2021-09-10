import axios from 'axios';
import s from './movieDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import Cast from '../cast/Cast';
import { NavLink } from 'react-router-dom';
import Reviews from '../reviews/Reviews';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  console.log(url);

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
        <img
          className={s.img}
          src={`https://image.tmdb.org/t/p/w500${movie.data.poster_path}`}
          alt={movie.data.original_title}
        />
        <h2>{`${movie.data.original_title} (${movie.data.release_date.slice(0, 4)})`} </h2>
        <p>{`User score: ${movie.data.vote_average * 10}%`}</p>
        <h3>Overview</h3>
        <p>{movie.data.overview}</p>
        <h4>Genres</h4>
        <ul>
          {movie.data.genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <p>Additional information</p>
        <NavLink to={`${url}/reviews`}>Reviews</NavLink>
        <NavLink to={`${url}/cast`}>Cast</NavLink>

        <Route path="/movies/:movieId/cast">
          <Cast movieId={movieId} url={url} />
        </Route>
        <Route path="/movies/:movieId/reviews">
          {movieId && <Reviews movieId={movieId} url={url} />}
        </Route>
      </div>
    )
  );
};

export default MovieDetailsPage;
