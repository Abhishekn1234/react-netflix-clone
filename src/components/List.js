import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import YouTube from 'react-youtube';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './List.css';
import Navbar from './Netflix';
import Banner from './Banner';

const Movie = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
 
  const [selectedVideoTopRated, setSelectedVideoTopRated] = useState(null);
  const [selectedVideoUpcoming, setSelectedVideoUpcoming] = useState(null);
  const [selectedVideoPopular, setSelectedVideoPopular] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const apiKey = 'cd8742620695dde8f1e750bff5bb0dee';

    const fetchMovies = async (endpoint, setStateFunction) => {
      try {
        const response = await axios.get(endpoint);
        setStateFunction(response.data.results);
      } catch (error) {
        console.error(`Error fetching movies: ${error}`);
      }
    };

    // Fetch top-rated movies
    fetchMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`, setTopRatedMovies);

    // Fetch upcoming movies
    fetchMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`, setUpcomingMovies);

    // Fetch popular movies
    fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, setPopularMovies);
  }, []);

  const fetchMovieVideos = async (movieId, setVideoFunction) => {
    try {
      const apiKey = 'cd8742620695dde8f1e750bff5bb0dee';
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
      const videos = response.data.results;

      // Check if there are videos and set the selected video to the first one
      if (videos.length > 0) {
        setVideoFunction(videos[0].key);
      } else {
        console.warn(`No videos found for movie with ID ${movieId}`);
      }
    } catch (error) {
      console.error(`Error fetching movie videos: ${error}`);
    }
  };

  const opts = {
    height: '390',
    width: '740',
    playerVars: {
      autoplay: 1,
    },
  };

  const renderMovieSection = (movies, sectionTitle, setSelectedVideoFunction) => (
    
    <div className="movie-section">
      <Banner/>
      <h2>{sectionTitle}</h2>
      <Slider slidesToShow={4} slidesToScroll={1}>
        {movies
          .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(movie => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                onClick={() => {
                  fetchMovieVideos(movie.id, setSelectedVideoFunction);
                  // You can also open a modal here with movie details and buttons
                }}
              />
              <p>{movie.title}</p>
            </div>
          ))}
      </Slider>
      {setSelectedVideoFunction === setSelectedVideoTopRated && selectedVideoTopRated && (
        <YouTube videoId={selectedVideoTopRated} opts={opts} />
      )}
      {setSelectedVideoFunction === setSelectedVideoUpcoming && selectedVideoUpcoming && (
        <YouTube videoId={selectedVideoUpcoming} opts={opts} />
      )}
      {setSelectedVideoFunction === setSelectedVideoPopular && selectedVideoPopular && (
        <YouTube videoId={selectedVideoPopular} opts={opts} />
      )}
    </div>
  );

  if (
    topRatedMovies.length === 0 ||
    upcomingMovies.length === 0 ||
    popularMovies.length === 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <Navbar setSearchTerm={setSearchTerm} />
    <div className="movie-container">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {renderMovieSection(topRatedMovies, 'Top Rated Movies', setSelectedVideoTopRated)}
      {renderMovieSection(upcomingMovies, 'Upcoming Movies', setSelectedVideoUpcoming)}
      {renderMovieSection(popularMovies, 'Popular Movies', setSelectedVideoPopular)}
    </div>
    </div>

  );
};

export default Movie;