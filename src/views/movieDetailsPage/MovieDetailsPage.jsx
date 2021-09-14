import axios from 'axios';
import s from './movieDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import Cast from '../cast/Cast';
import { NavLink } from 'react-router-dom';
import Reviews from '../reviews/Reviews';
import PropTypes from 'prop-types';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!movieId) {
      return;
    }
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
    history.push(location?.state?.from ?? '/');
  };

  return (
    movie && (
      <div>
        <button className={s.button} type="button" onClick={onGoBack}>
          Go back
        </button>
        <div className={s.wrapper}>
          <div className={s.imgContainer}>
            <img
              className={s.img}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
            />
          </div>
          <div className={s.wrapperList}>
            <h2 className={s.mainTitle}>
              {`${movie.original_title} (${movie.release_date.slice(0, 4)})`}{' '}
            </h2>
            <p>{`User score: ${movie.vote_average * 10}%`}</p>
            <h3 className={s.overviewTitle}>Overview</h3>
            <p className={s.overview}>{movie.overview}</p>
            <h4 className={s.genresTitle}>Genres</h4>
            <ul className={s.listGenres}>
              {movie.genres.map(genre => (
                <li className={s.itemGenres} key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className={s.additionalInformation}>Additional information</p>
        <NavLink
          className={s.linkAdditionalInformation}
          activeClassName={s.activLink}
          to={`${url}/reviews`}
        >
          Reviews
        </NavLink>
        <NavLink
          className={s.linkAdditionalInformation}
          activeClassName={s.activLink}
          to={`${url}/cast`}
        >
          Cast
        </NavLink>
        <Route path="/movies/:movieId/cast">
          <Cast movieId={movieId} />
        </Route>
        <Route path="/movies/:movieId/reviews">{movieId && <Reviews movieId={movieId} />}</Route>
      </div>
    )
  );
};

MovieDetailsPage.propTypes = {
  movie: PropTypes.array,
};

export default MovieDetailsPage;
