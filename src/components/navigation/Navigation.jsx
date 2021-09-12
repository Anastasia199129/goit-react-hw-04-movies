import { NavLink } from 'react-router-dom';
import s from './navigation.module.css';
import { useLocation } from 'react-router';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="App">
      <NavLink
        exact
        to={{ pathname: '/', state: { from: location } }}
        className={s.link}
        activeClassName={s.active}
      >
        Home
      </NavLink>
      <NavLink
        to={{ pathname: '/movies', state: { from: location } }}
        className={s.link}
        activeClassName={s.active}
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
