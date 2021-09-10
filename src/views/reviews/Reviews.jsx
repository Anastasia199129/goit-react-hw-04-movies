import { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=f63adc268da4af945e1cc9e898d72aa8`,
      )
      .then(response => {
        if (response.status === 200) {
          setMovie(response);
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);
  return movie ? (
    <ul>
      {movie.data.results.map(r => (
        <li key={r.id}>
          <h4>Avtor:{r.author_details.username}</h4>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <div>We don't have any reviews for this</div>
  );
};

export default Reviews;
