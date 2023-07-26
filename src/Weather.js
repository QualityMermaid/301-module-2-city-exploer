// import { useState } from "react";
// import axios from "axios";
import './Weather.css'

import React from 'react'

export default function Weather({weather, city}) {
    // const forcastWeather = weather.map((day)=>{
    //     return (
    //         <div>
    //             <h3> {day.date}: {day.description}</h3>
    //         </div>
    //     )
    // })
    return (
        <div className="weather-container">
            <h2>Weather Forecast</h2>
            <h3>{city}</h3>
            <p>
                {/* {forcastWeather} */}
            </p>
        </div>
    )
}
