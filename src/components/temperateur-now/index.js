import LogoWeather from "../logo-weather"
import { UilSchedule } from '@iconscout/react-unicons'
import { UilBars } from '@iconscout/react-unicons'
import { UilMapMarker } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { useEffect, useState } from "react"
import { Loading } from "../loading"
import { Link } from "react-router-dom"
 
const TemperateurNow = ({temperatureUnit, temperature, weatherCode,day , date ,month ,hours ,minuts, lat, lon}) =>{
    const [location, setLocation]=useState()
    const [pays,setPays] = useState()
    const [isLoading,setIsLoading] = useState(false)

    const getPosition = () =>{
        return alert("latitude:  " + lat + "\nlongitude:  " + lon)
    }
    const convertCoordinates = async () => {
        try {
          const  Response  = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
          const data = await Response.json()
          setLocation(data.city);
          setPays(data.countryName);
        } catch (err) {
          console.log("Location Error:", err);
        }
      };

        useEffect(()=>{
            const getLocalisation = ()=>{
                setIsLoading(true)
                convertCoordinates();
                setIsLoading(false)
            }
            getLocalisation();
        },[])

       if(isLoading){
        return <Loading />
        }
        const whatDay=["Dim","Lun","Mar","Mer","Jeu","Ven","Sam",]
        const whatMonth=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"]

    return(
        <>
            <div className="mt-2 flex justify-between w-screen pl-8 pr-8">
                <div><UilBars size="50" color="#61DAFB" /></div>
                <button 
                // onClick= {getPosition}
                >
                <Link to='/newLocalisation'><UilPlus size="50" color="#61DAFB" /></Link>
                </button>
            </div>
            <h1 id="font" className="text-3xl">Météo</h1>
                <div className="flex flex-col w-screen pl-4 mt-8">
                    <div className="flex flex-row  items-center gap-1s mb-1">
                        <UilMapMarker size="20" color="#61DAFB" />
                        <span className="text-xs">{location}-{pays}</span>
                    </div>
                    <div className="flex flex-row mb-6  items-center gap-1s">
                        <UilSchedule size="20" color="#61DAFB" />
                        <h2 className="text-xs">{whatDay[day]}. {date} {whatMonth[month]} {(hours.length===1)? "0".concat(hours): hours}:{(minuts.length===1)? "0".concat(minuts): minuts}</h2>
                    </div>
                </div>
            
                <div className="mb-10 flex flex-row gap-2 items-center">
                    <div>{<LogoWeather code={weatherCode} size={'big-css-svg'}/>}</div>
                    <div className="flex items-start">
                        <h1 className="text-7xl">{temperature}</h1>
                        <h1>{temperatureUnit}</h1>
                    </div>
                </div>
            
        </>
    )
}

export default TemperateurNow