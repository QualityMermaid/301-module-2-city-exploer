import { useState } from "react";
import "./App.css";
import Weather from "./Weather";
import axios from "axios";

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState({});
    const [map, setMap] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [weather, setWether] = useState([])


    function handleSearch(event) {
        setSearchQuery(event.target.value);
    }

    async function getCityWeather({lat, lon}){
        console.log("LAT HERE" + lat)
        console.log(lon)
            const API = `http://localhost:8082/weather?lat=${lat}&lon=${lon}`
            console.log(API)
            const res = await axios.get(API)
            console.log(res)
            setWether(res.data)
            console.log(weather)
    }

    async function getLocation(event) {
        setWether([])
        try {
            event.preventDefault()
            setErrorMessage("")
            const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
            const res = await axios.get(API);
            setLocation(res.data[0]);
            console.log(res.data[0])
            // handleMap(res.data[0]);
            // console.log(map)
            getCityWeather(res.data[0])
            event.target.query.value = "";
        } catch (error) {
            // error.code = "STATUS"
            console.log(error);
            setErrorMessage(`${error}`)
            setLocation({})
            setMap("")
            setWether("")
        }
    }

    function handleMap(data) {
        const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}&zoom=10`;
        setMap(API);
        console.log("Setting map")
        console.log(map)
    }

    return (
        <>
        <div className="App">
            <form onSubmit={getLocation}>
                <input type="text" placeholder="search for a city" name="input" onChange={handleSearch} />
                <button type="submit">Explore!</button>
            </form>
        </div>
        <div className="searchInfo">
            {/* <p className="errorMessage">{errorMessage}</p> */}
            <p>{errorMessage}</p>
            <p>{location.display_name}</p>
            {/* <p>Latitude: {location.lat}</p> */}
            {/* <p>Longitude: {location.lon}</p> */}
            {map && <img className="mapImg" src={map} alt="map" />}
            {weather.length > 0 && <Weather weather={weather} city={searchQuery}/>}  
        </div>
        </>
    );
}

export default App;