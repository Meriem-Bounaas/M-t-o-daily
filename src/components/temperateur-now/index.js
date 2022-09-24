import LogoWeather from "../logo-weather"
import { UilSchedule } from '@iconscout/react-unicons'
import { UilBars } from '@iconscout/react-unicons'
import { UilMapMarker } from '@iconscout/react-unicons'

const TemperateurNow = ({temperatureUnit, temperature, weatherCode, date}) =>{
    return(
        <>
            <div className="mt-2 flex justify-between w-screen pl-8 pr-8">
                <div><UilBars size="50" color="#61DAFB" /></div>
                <div><UilMapMarker size="50" color="#61DAFB" /></div>
            </div>
            <div className="flex flex-row items-end gap-2 mb-3">
                <h1 className="text-5xl mt-3">Today</h1>
            </div>
            <div className="flex flex-row mb-10  items-center gap-">
                <UilSchedule size="20" color="#61DAFB" />
                <h2 className="text-sm ">{date}</h2>
            </div>
                <div className="mb-10 flex flex-row gap-2 items-center">
                    <div className="text-6xl">{<LogoWeather code={weatherCode} size={'big-css-svg'}/>}</div>
                    <div className="flex items-start">
                        <h1 className="text-7xl">{temperature}</h1>
                        <h1>{temperatureUnit}</h1>
                    </div>
                </div>
            
        </>
    )
}

export default TemperateurNow