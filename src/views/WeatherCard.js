import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";

// WeatherCard Component
function TemperatureCard({ temperature, lastUpdate }) {
  return (
    <Col lg="3" sm="6">
      <Card className="card-stats">
        <Card.Body>
          <Row>
            <Col xs="5">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-sun-fog-29 text-warning"></i>
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">Temperature</p>
                <Card.Title as="h4">{temperature !== null ? `${temperature} °C` : 'Loading...'}</Card.Title>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <hr />
          <div className="stats">
            <i className="far fa-calendar-alt mr-1"></i>
            Last Update: {lastUpdate || 'Loading...'}
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
}

// HumidityCard Component
function HumidityCard({ humidity, lastUpdate }) {
  return (
    <Col lg="3" sm="6">
      <Card className="card-stats">
        <Card.Body>
          <Row>
            <Col xs="5">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-umbrella-13 text-success"></i>
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">Humidity</p>
                <Card.Title as="h4">{humidity !== null ? `${humidity}%` : 'Loading...'}</Card.Title>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <hr />
          <div className="stats">
            <i className="far fa-calendar-alt mr-1"></i>
            Last Update: {lastUpdate || 'Loading...'}
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
}

// PressureCard Component
function WeatherCard({ weatherCondition, weatherIcon, lastUpdate }) {
    const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
  return (
    <Col lg="3" sm="6">
      <Card className="card-stats">
        <Card.Body>
          <Row>
            <Col xs="5">
              <div className="icon-big text-center icon-warning">
                <img src={iconUrl} alt={weatherCondition} style={{ width: '50px', height: '50px' }} />
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">Weather Condition</p>
                <Card.Title as="h4">{weatherCondition  !== null ? `${weatherCondition }` : 'Loading...'}</Card.Title>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <hr />
          <div className="stats">
            <i className="far fa-calendar-alt mr-1"></i>
            Last Update: {lastUpdate || 'Loading...'}
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
}

// RainCard Component
function RainCard({ rain, lastUpdate }) {
    return (
      <Col lg="3" sm="6">
        <Card className="card-stats">
          <Card.Body>
            <Row>
              <Col xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-compass-05 text-danger"></i>
                </div>
              </Col>
              <Col xs="7">
                <div className="numbers">
                  <p className="card-category">Rain Precipitation</p>
                  <Card.Title as="h4">{rain !== null ? `${rain} mm` : 'Loading...'}</Card.Title>
                </div>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <hr />
            <div className="stats">
                <i className="far fa-calendar-alt mr-1"></i>
                Last Update: {lastUpdate || 'Loading...'}
            </div>
          </Card.Footer>
        </Card>
      </Col>
    );
  }

// Weatherboard Component
function Weatherboard() {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    humidity: null,
    pressure: null,
    rain: null,
  });
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "2d83427b597818adc760a15005895c49";
      const lat = "11.03939"; // Example latitude
      const lon = "124.00211"; // Example longitude

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const data = response.data;
        setWeatherData({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          rain: data.rain ? data.rain["1h"] : 0,
          weatherCondition: data.weather[0].description,
          weatherIcon: data.weather[0].icon, 
        });
        setLastUpdate(new Date().toLocaleTimeString()); // Update last update time
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 60000); // Refresh every minute

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return (
    <Row>
      <TemperatureCard temperature={weatherData.temperature} lastUpdate={lastUpdate}/>
      <HumidityCard humidity={weatherData.humidity} lastUpdate={lastUpdate}/>
      <WeatherCard weatherCondition={weatherData.weatherCondition} weatherIcon={weatherData.weatherIcon} lastUpdate={lastUpdate}/>
      <RainCard rain={weatherData.rain} lastUpdate={lastUpdate}/>
    </Row>
  );
}

export default Weatherboard;
