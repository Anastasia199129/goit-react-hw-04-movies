import { NavLink } from 'react-router-dom';
import s from './navigation.module.css';

function Navigation() {
  return (
    <nav className="App">
      <NavLink exact to="/" className={s.link} activeClassName={s.active}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.link} activeClassName={s.active}>
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
