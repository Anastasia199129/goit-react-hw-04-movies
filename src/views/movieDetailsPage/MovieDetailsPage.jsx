import axios from 'axios';
import s from './movieDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import Cast from '../cast/Cast';
import { NavLink } from 'react-router-dom';
import Reviews from '../reviews/Reviews';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f63adc268da4af945e1cc9e898d72aa8`)
      .then(response => {
        if (response.status === 200) {
          setMovie(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/movies');
  };

  return (
    movie && (
      <div>
        <button type="button" onClick={onGoBack}>
          Go back
        </button>
        <img
          className={s.img}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
        />
        <h2>{`${movie.original_title} (${movie.release_date.slice(0, 4)})`} </h2>
        <p>{`User score: ${movie.vote_average * 10}%`}</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h4>Genres</h4>
        <ul>
          {movie.genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <p>Additional information</p>
        <NavLink to={{ pathname: `${url}/reviews`, state: { from: location } }}>Reviews</NavLink>
        <NavLink to={{ pathname: `${url}/cast`, state: { from: location } }}>Cast</NavLink>
        <Route path="/movies/:movieId/cast">
          <Cast movieId={movieId} url={url} />
        </Route>
        <Route path="/movies/:movieId/reviews">{movieId && <Reviews movieId={movieId} />}</Route>
      </div>
    )
  );
};

export default MovieDetailsPage;
