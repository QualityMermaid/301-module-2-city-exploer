// import { useState } from "react";
// import axios from "axios";
import './Weather.css'

import React from 'react'

export default function Weather({weather, city}) {
    const cityName = city.charAt(0).toUpperCase() + city.slice(1)

    try{
        const forcastWeather = weather.map((day, key)=>{
            const description = day.weather.description
            console.log(day.weather.description)

            return (
                <div className='weatherData' key={day.datetime}>
                    <h3 className='date'> {day.datetime} </h3>
                    <p className='weatherDescription'>{description}</p>
                </div>
            )
        })

        return (
            <div className="weather-div">
                <h2>Weather Forecast for {cityName}</h2>
                <div className='weatherContainer'>
                {forcastWeather}
                </div>
            </div>
        )
    }catch(error){
        console.log(error)
        return(
            <div>
                <h3>{cityName}</h3>
                <p> Sorry there is no weather forecast for this location</p>
            </div>
        )
    }
}
