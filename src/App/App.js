import './App.css';

import React, {useEffect, useState} from "react";
import {getWeatherData} from "./utils/mockdata.js";
import { Textbox } from './Components/textbox/Textbox.jsx';
import { Todos } from './Components/todo/Todos.jsx';
import { HourlyForecast } from './Components/forecast/Hourlyforecast.jsx';
import {Animation} from './Components/animations/Animation.jsx';
console.log("root called")

function App() {

  /* Mock weather data taken from https://gitlab.vismaconsulting.fi/lut/lut-codecamp-starter */

  const [weatherData, setWeatherData] = useState(null);
  /* today is a single object of weather data*/
  const [today, setToday] = useState(null);
  const [weatherClassName, setWeatherClassName] = useState(null);
  // Data fetching in useEffect
  useEffect(() => {
    async function fetchData() {
      const data = await getWeatherData();
      setWeatherData(data);

      const today = data.find(
        (day) =>
          day.dayOfWeek ===
          new Date().toLocaleString("en-FI", {weekday: "long"})
      );

      if (!today) {
        return;
      }

      setToday(today);
      if (today.weatherType === "snowing" || today.weatherType === "cold" || today.weatherType === "freezing") {
        setWeatherClassName("snowing");
      } else if (today.weatherType === "raining") {
        setWeatherClassName("raining");
      } else if (today.weatherType === "windy") {
        setWeatherClassName("windy");
      } else if (today.weatherType === "cloudy") {
        setWeatherClassName("cloudy");
      }else if (today.weatherType === "sunny") {
        setWeatherClassName("sunny");
      }
    }
    fetchData();
    
  }, []);

  if (!weatherData || !today) {
    return null;
  }

  return (
    <div className="App" id={today.weatherType}>
      <div className="main-view" id={today.weatherType}>
        <div className="row">
          {/* First column for the todos button and message */}
          <div className="col-lg-4" id="col1">
            <Textbox className="h1" message="Welcome!"></Textbox>
            <Textbox className="h3" message={today.weatherType} />
            <br></br>
            <br></br>
            <Todos weatherType={today.weatherType} temperature={today.temperature}/>
          </div>
          <div className='col-lg-4' id="col2">
            <HourlyForecast></HourlyForecast>
          </div>

          <div className='col-lg-4'>
            {/*Button for custom task!*/}
            <div className="container">
              <Animation weatherClassName={weatherClassName}></Animation>
            </div>
          </div>
        </div>
    </div>

  </div>

  )}

export default App;
