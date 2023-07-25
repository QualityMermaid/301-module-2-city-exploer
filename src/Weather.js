import { useEffect, useState } from "react";
import axios from "axios";
import './Weather.css'

import React from 'react'

export default function Weather() {
    // useEffect(()=>{
    //     getWeather()
    // },[])
    const [weather, setWeather] = useState("")

    async function getWeather(){
        try{
            const API = `http://localhost:8082/weather`
            const res = await axios.get(API)
            setWeather(res.data)
        } catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Weather</h1>
            {/* {weather.map((weather, key)=>{
                return(
                    <p>{weather}</p>
                    )
            })} */}
            <button className="weatherButton" onClick={getWeather}>Click for weather</button>
        </div>
    )
}
