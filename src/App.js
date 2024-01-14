import './App.css';
import React, {useEffect, useState} from "react";
import {getWeatherData} from "./mockdata.js";
import { Textbox } from './Components/textbox/index.js';
import { Todos } from './Components/todo/todos.jsx';
import { HourlyForecast } from '../src/Components/forecast/index.js';
//import { Button } from './Components/button/index.js';
import { CustomTask } from'./Components/customtask/index.js';
import { TimeSelector } from './Components/timeSelector/timeSelector.jsx';
console.log("root called")

function App() {

  /* Mock weather data taken from https://gitlab.vismaconsulting.fi/lut/lut-codecamp-starter */

  const [weatherData, setWeatherData] = useState(null);
  /* today is a single object of weather data*/
  const [today, setToday] = useState(null);
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
    }
    fetchData();
  }, []);

  if (!weatherData || !today) {
    return null;
  }


  return (
    <div className="App">
      <div className="main-view">
      {/* Testing components */}
      <span className='text-wrapper-6'>
        <p>Tests:</p>
      <Textbox className={null} message={today.weatherType} />
      </span>
      <CustomTask />
      <TimeSelector />
      <HourlyForecast />
      <div className="div">
        <Todos />
        <div className="overlap-group">
          <div className="text-wrapper-2">+25°C</div>
          <div className="text-wrapper-3">Lappeenranta</div>
          <img className="icon-temperature" alt="Icon temperature" src="icon-temperature.png" />
          <img className="icon-location" alt="Icon location" src="icon-location.png" />
        </div>
        <div className="jan-fri">Jan 5,&nbsp;&nbsp;Fri</div>
        <img className="sun" alt="Sun" src="sun.svg" />
        <p className="text-wrapper-4">1 2 3 4 5 6</p>
        <div className="text-wrapper-5">The weather right now:</div>
        <p className="welcome-hope-you-re">
          <span className="span">Welcome!</span>
          <span className="text-wrapper-6">
            {" "}
            <br />
            <br />
            <Textbox className="text-wrapper-6" message={today.weatherType} />
          </span>
        </p> 
      </div>
    </div>

  </div>

  )}

export default App;
