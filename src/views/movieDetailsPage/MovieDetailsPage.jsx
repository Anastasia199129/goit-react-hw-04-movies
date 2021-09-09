import axios from 'axios';
import s from './movieDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

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
        <img className={s.img} src={movie.data.backdrop_path} alt="" />
        <h2>{movie.data.original_title}</h2>
      </div>
    )
  );
};

export default MovieDetailsPage;
