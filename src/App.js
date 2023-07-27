import { useState } from "react";
import "./App.css";
import Weather from "./Weather";
import axios from "axios";
import Header from "./Header/Header"
import Footer from "./Footer/Footer"

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState({});
    const [map, setMap] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [weather, setWether] = useState("")
    const [cityName, setCityName] = useState("")


    function handleSearch(event) {
        setSearchQuery(event.target.value);
    }

    async function getCityWeather({lat, lon}){
        try{
            // const API = `http://localhost:8082/weather?lat=${lat}&lon=${lon}`
            const API = `https://three01-city-explorer-api.onrender.com/weather?lat=${lat}&lon=${lon}`
            setErrorMessage("")
            const res = await axios.get(API)
            setWether(res.data)
        }catch(error){
            setErrorMessage(`${error}`)
            setLocation({})
            setMap("")
            setWether("")
        }
    }

    async function getLocation(event) {
        setWether("")
        setCityName(searchQuery)

        try {
            event.preventDefault()
            setErrorMessage("")
            const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
            const res = await axios.get(API);
            const newData = res.data[0]
            setLocation(newData);
            handleMap(newData);
            getCityWeather(newData)
            // setCityName(searchQuery)
        } catch (error) {
            setErrorMessage(`${error}`)
            setLocation({})
            setMap("")
            setWether("")
        }
    }

    function handleMap(data) {
        const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}&zoom=10`;
        setMap(API);
    }

    return (
        <>
        <Header/>
        <div className="App">
            <form className="form" onSubmit={getLocation}>
                <input className="formInput" type="text" placeholder="search for a city" name="input" onChange={handleSearch} />
                <button className="button" type="submit">Explore!</button>
            </form>
        </div>
        <div className="searchInfo">
            {/* <p className="errorMessage">{errorMessage}</p> */}
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            {location && <p id="locationName">{location.display_name}</p>}
            <div className="returnedData">
            {map && <img className="mapImg" src={map} alt="map" />}
            {weather.length && <Weather className="weather" weather={weather} city={cityName}/>}  
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default App;