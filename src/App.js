import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Container from './components/container/Container';
import Navigation from './components/navigation/Navigation';
import Loader from './components/loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() =>
  import('./views/homePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./views/moviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import('./views/movieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */),
);
const NotFound = lazy(() =>
  import('./views/notFound/NotFound' /* webpackChunkName: "not-found" */),
);

function App() {
  return (
    <Container>
      <Navigation></Navigation>
      <ToastContainer autoClose={3000} position="top-center" />
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </Container>
  );
}

export default App;
