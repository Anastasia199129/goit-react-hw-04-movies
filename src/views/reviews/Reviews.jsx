import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Reviews = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [dataResults, setDataResults] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=f63adc268da4af945e1cc9e898d72aa8`,
      )
      .then(response => {
        if (response.status === 200) {
          setMovie(response);
          setDataResults(response.data.results);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);
  return (
    movie && (
      <ul>
        {dataResults.length === 0 && <div>We don't have any reviews for this</div>}
        {movie.data.results.map(result => (
          <li key={result.id}>
            <h4>Avtor:{result.author_details.username}</h4>
            <p>{result.content}</p>
          </li>
        ))}
      </ul>
    )
  );
};

Reviews.propTypes = {
  movie: PropTypes.string,
  dataResults: PropTypes.array,
  movieId: PropTypes.string,
};

export default Reviews;
