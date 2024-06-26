import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState("");

    const fetchWeather = async (city) => {
        const options = {
            method: 'GET',
            url: 'https://yahoo-weather5.p.rapidapi.com/weather',
            params: {
                location: city,
                format: 'json',
                u: 'f'
            },
            headers: {
                'x-rapidapi-key': '0adb62de54msh938e6232f4bdbafp1f2da1jsn2c8e512017a4',
                'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setWeather(response.data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setWeather(null);
        }
    };

    const handleInput = (e) => {
        setCity(e.target.value);
    }

    const handleClick = () => {
        if (city) {
            fetchWeather(city);
        }
    }

    return (
        <div>
            <h1>Search the city name in this search box</h1>
            <input onChange={handleInput} type="text" placeholder='Enter the city name' />
            <button onClick={handleClick}>Click</button>

            {error && <div>Error: {error}</div>}
            {weather && (
                <div>
                    <h1>Weather in {weather.location.city}</h1>
                    <p>Temperature: {weather.current_observation.condition.temperature} °F</p>
                    <p>Condition: {weather.current_observation.condition.text}</p>
                    <p>Humidity: {weather.current_observation.atmosphere.humidity} %</p>
                    <p>Wind Speed: {weather.current_observation.wind.speed} mph</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
