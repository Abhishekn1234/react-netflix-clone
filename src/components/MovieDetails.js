// MovieDetails.js
import React from 'react';

const MovieDetails = ({ title, description, onPlayClick, onMyListClick }) => {
  return (
    <div className="movie-details">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onPlayClick}>Play</button>
      <button onClick={onMyListClick}>MyList</button>
    </div>
  );
};

export default MovieDetails;
