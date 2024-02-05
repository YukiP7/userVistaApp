import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from "./firebase/authService";
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await authService.getCurrentUser();
      if (!user) {
        // Redirect to login if user is not authenticated
        navigate('/');
      }
    };

    checkAuthentication();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = '180ccae21c56eb2a907d5d1aeb3f2b6d';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundImage = () => {
    if (!weatherData) {
      return '';
    }

    const weatherImages = {
      'Clear': 'clear.jpg',
      'Clouds': 'clouds.jpg',
      'Rain': 'rain.jpg',
      'Snow': 'snow.jpg',
    };

    const condition = weatherData.weather[0].main;
    const imageName = weatherImages[condition] || 'default.jpg';

    return `url(images/${imageName})` ;
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat p-8 rounded-md mt-8 bg-blue-500"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 100, 0.7), rgba(0, 0, 100, 0.7)), ${getBackgroundImage()}` }}
    >
      <h2 className="text-3xl text-white mb-4">Weather Information</h2>
      <div className="flex mb-4">
        <label htmlFor="city" className="text-white mr-2">Enter City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Get Weather'}
        </button>
      </div>

      {loading && <p className="text-white">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {weatherData && (
        <div>
          <h3 className="text-xl text-white mb-2">{weatherData.name}, {weatherData.sys.country}</h3>
          <p className="text-lg text-white mb-2">Temperature: {weatherData.main.temp}°C</p>
          <p className="text-lg text-white">Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
