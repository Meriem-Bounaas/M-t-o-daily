import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NewLocalisation from './pages/new-localisation-screen';
import {PositionContext} from './position-context/index';
import { useEffect, useState } from "react";
import PrincipalScreen from "./pages/principal-screen";
import PrevisionScreen from "./pages/prevision-screen";

const App = ()=> {
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()

    const getPosition = ()=>{
                try {
                    if('geolocation' in navigator)
                        navigator.geolocation.getCurrentPosition((position) => {
                        setLat(position.coords.latitude)
                        setLon(position.coords.longitude)     
                    })
                    else 
                        alert("Geolocation is not supported by your browser")
                } catch (e) {
                    alert('Unable to retrieve your location')
                }
    }

    useEffect(()=>{
        getPosition()
    }, [])

    return (
        <PositionContext.Provider value={{lat:lat, lon:lon, setLat:setLat, setLon:setLon} }>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<PrincipalScreen />} />
                <Route path="prevision/:id" element={<PrevisionScreen />} ></Route>
                <Route path='newLocalisation/:id' element={<NewLocalisation/>}></Route>
                </Routes>
            </BrowserRouter>    
        </PositionContext.Provider>    
    )
}

export default App;