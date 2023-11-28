import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = () => {
  const [seriesData, setSeriesData] = useState(null);

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        const apiKey = 'cd8742620695dde8f1e750bff5bb0dee'; // Replace with your TMDb API key
        const response = await fetch(
          `https://api.themoviedb.org/3/search/tv?query=Ginny%20and%20Georgia&api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setSeriesData(data.results[0]);
        }
      } catch (error) {
        console.error('Error fetching series data:', error);
      }
    };

    fetchSeriesData();
  }, []);

  return (
    <div>
      <div className="container-fluid-xl">
        <div className="banner">
          {seriesData && (
            // Use an image as a clickable link to the video
            <a href={`https://www.themoviedb.org/117581-ginny-georgia/${seriesData.id}`}>
              <img src={`https://image.tmdb.org/t/p/original/${seriesData.poster_path}`} alt={seriesData.name} className="sec" />
            </a>
          )}
        </div>

        <div className="banner_content">
          {seriesData && (
            <>
              <h1>{seriesData.name}</h1>
              {/* Other details about the series */}
              <p className="banner_desc">{seriesData.overview}</p>
            </>
          )}
        </div>

        <div className="banner__fadebottom"></div>
      </div>
    </div>
  );
};

export default Banner;
