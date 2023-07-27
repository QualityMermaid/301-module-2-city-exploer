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
                <div key={day.datetime}>
                    <h3> {day.datetime}: </h3>
                    <p>{description}</p>
                </div>
            )
        })

        return (
            <div className="weather-container">
                <h2>Weather Forecast</h2>
                <h3>{cityName}</h3>
                {forcastWeather}
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
