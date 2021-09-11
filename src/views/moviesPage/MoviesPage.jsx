import { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import MovieDetailsPage from '../movieDetailsPage/MovieDetailsPage';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState(null);
  const [arrayOfFilms, setArrayOfFilms] = useState([]);
  const [idMovies, setId] = useState('');
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const onChangeQuery = e => {
    setQuery(e.target.value);
  };

  const onSabmitForm = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.warn('Fill in the search box!');
      return;
    }
    setSearchQuery(query);
    setQuery('');
    history.push({ ...location, search: `?query=${query}` });
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=f63adc268da4af945e1cc9e898d72aa8&query=${searchQuery}`,
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data.results.length === 0) {
            toast.error('No movies found for this request!');
            return;
          }
          console.log(response);
          setArrayOfFilms(response.data.results);
          setId(response.data.results.id);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchQuery]);

  return (
    <div>
      <form onSubmit={onSabmitForm}>
        <input type="text" onChange={onChangeQuery} value={query} />
        <button type="submit"></button>
      </form>
      {arrayOfFilms && (
        <ul>
          {arrayOfFilms.map(r => (
            <li key={r.id}>
              <NavLink
                to={{
                  pathname: `${url}/${r.id}`,
                  state: { from: location },
                }}
              >
                {r.original_title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <Route path={`${path}/${idMovies}`}>
        <MovieDetailsPage />
      </Route>
    </div>
  );
};

export default MoviesPage;
