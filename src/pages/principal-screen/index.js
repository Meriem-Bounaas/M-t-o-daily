import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom";
import { add } from 'date-fns'
import '../../style/index.css'

import { Loading } from '../../components/loading';
import TemperateurNow from '../../components/temperateur-now';
import WindHumidityRain from '../../components/wind-humidity-rain';
import TemperateurNext from '../../components/temperateur-next';
import LogoWeather from '../../components/logo-weather';
import { PositionContext } from '../../position-context';
import BgVideo from '../../components/bg-video/index';
import { fetchWeather } from "../../api";

const PrincipalScreen = () =>{
    const [data,setData] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const position = useContext(PositionContext)
   

    useEffect(()=>{
        const  getData= async()=>{
            setIsLoading(true)
            const datajson= await fetchWeather(position.lat,position.lon)
            setData(datajson)
            setIsLoading(false)
        }
        const permission =async()=>{
            const state  = await navigator.permissions.query({
                name: "geolocation"
              });
              console.log('geolocation permission:' +state.state);
        }
        permission()
        getData()
    },[position.lat,position.lon])
    
    if(isLoading){
        return <Loading />
    }

    const timeIso = data? data.hourly.time.map(temp=>new Date(temp).toISOString()):[]
    const listIndex=[]
    const listTime=[]

    for (let i = 0; i <15 ; i++) {
        const dateLocal= add(new Date(),{hours:i})
        const dateLocal1=dateLocal.toISOString().slice(0,14)
        const dateLocalIso=dateLocal1.concat("00:00.000Z")
        const index= timeIso.indexOf(dateLocalIso)
        listIndex.push(index)
        const time= dateLocal.getHours()
        const time1=time+(":00")
        if(i===0) listTime.push("Now")
        else{
            if (time1==="0:00"){
                const date = add(new Date(),{days:1}).toISOString() 
                const month = date.slice(5,7)
                const day =  date.slice(8,10)
                listTime.push(day.concat('/').concat(month))
            }
            else
                if(time1.length===4) listTime.push(("0").concat(time1))
                else listTime.push(time1)
        }
    }

      
    return(
         <div id='font' className='flex h-screen w-screen  justify-center'>
            <div className='absolute w-full h-screen'>
                <div className='absolute bg-black w-full h-screen opacity-50'></div>
                <video autoPlay loop muted className='right-0 w-screen h-screen object-cover'>
                    {data && <BgVideo code= {data.hourly.weathercode[listIndex[0]]} />}
                </video>
            </div>
            <div className="flex items-center flex-col  bg-gr text-black rounded-3xl z-0">
            {data && <TemperateurNow temperatureUnit={data.hourly_units.temperature_2m} 
                                     weatherCode={data.hourly.weathercode[listIndex[0]]} 
                                     temperature={data.hourly.temperature_2m[listIndex[0]]}
                                     day={new Date().getDay()}
                                     date={new Date().getDate()}
                                     month={new Date().getMonth()}
                                     hours={new Date().getHours()}
                                     minuts={new Date().getMinutes()}
                                     lat={position.lat}
                                     lon={position.lon}
                                     
                     />
            }
            
            {data && <WindHumidityRain  windUnit={data.hourly_units.windspeed_10m} 
                                        wind={data.hourly.windspeed_10m[listIndex[0]]} 
                                        humidityUnit={data.hourly_units.relativehumidity_2m} 
                                        humidity={data.hourly.relativehumidity_2m[listIndex[0]]}
                                        rain={data.hourly.rain[listIndex[0]]}
                                        rainUnit={data.hourly_units.rain}
                      />
            }
            { data && <div className='flex flex-col p-2 mb-16 border-t-2 border-b-2 lg:p-4 md:p-4'>
                            <div className='flex flex-row space-x-4'>
                                            {listTime.map( e => {
                                                return <div className='flex flex-col items-center w-20 text-white' key={e}>
                                                            {e}
                                                        </div>
                                            })}
                            </div>

                        <div className='flex flex-row space-x-4 '>
                            {listIndex.map(index =>{
                                return  <div className='flex flex-col items-center w-20 text-white' key={index}>
                                           <LogoWeather code={data.hourly.weathercode[index]}/>    
                                            <TemperateurNext  temperateur={data.hourly.temperature_2m[index]}
                                                                    temperatureUnit={data.hourly_units.temperature_2m}
                                                                    keys={index}
                                            />
                                        </div>
                            })}
                        </div>

                      </div>
            }

            <button id='font' className="border-gray-300 text-blue-400 rounded-2xl bg-gray-300 p-3 w-auto lg:w-auto lg:p-3 md:w-auto md:p-3" onClick={()=>{
            }}> 
                {data && <Link to={`/prevision/${data.hourly.weathercode[listIndex[0]]}`}>Prévision sur 5 Jours</Link>}
            </button>
            
            </div>
        </div>
    )
}

export default PrincipalScreen