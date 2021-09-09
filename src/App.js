import { Route, Switch } from 'react-router-dom';
// import s from './App.module.css';

import Container from './components/container/Container';
import Navigation from './components/navigation/Navigation';
import HomePage from './views/homePage/HomePage';
import MoviesPage from './views/moviesPage/MoviesPage';
import NotFound from './views/notFound/NotFound';
import MovieDetailsPage from './views/movieDetailsPage/MovieDetailsPage';

function App() {
  return (
    <Container>
      <Navigation></Navigation>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/movies">
          <MoviesPage />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>
        <Route path="">
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
