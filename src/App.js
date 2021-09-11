import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Container from './components/container/Container';
import Navigation from './components/navigation/Navigation';
import Loader from './components/loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('./views/homePage/HomePage'));
const MoviesPage = lazy(() => import('./views/moviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./views/movieDetailsPage/MovieDetailsPage'));
const NotFound = lazy(() => import('./views/notFound/NotFound'));

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
