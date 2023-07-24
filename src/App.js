import { useState } from "react";
import "./App.css";

import axios from "axios";

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState({});
    const [map, setMap] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    function handleSearch(event) {
        setSearchQuery(event.target.value);
    }

    async function getLocation(event) {
        try {
            setErrorMessage("")
            event.preventDefault();
            event.target.input.value = "";
            const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
            const res = await axios.get(API);
            setLocation(res.data[0]);
            handleMap(res.data[0]);
        } catch (error) {
            // error.code = "STATUS"
            console.log(error);
            setErrorMessage(`${error}`)
            setLocation({})
            setMap("")
        }
    }

    function handleMap(data) {
        const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}&zoom=10`;
        setMap(API);
    }

    return (
        <div className="App">
            <form onSubmit={getLocation}>
                <input type="text" placeholder="search for a city" name="input" onChange={handleSearch} />
                <button type="submit">Explore!</button>
            </form>
            {/* <p className="errorMessage">{errorMessage}</p> */}
            <p>{errorMessage}</p>
            <p>{location.display_name}</p>
            {/* <p>Latitude: {location.lat}</p> */}
            {/* <p>Longitude: {location.lon}</p> */}
            {map && <img className="mapImg" src={map} alt="map" />}
        </div>
    );
}

export default App;