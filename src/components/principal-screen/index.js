import '../../style/index.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { fetchWeather } from '../../api';
import { Loading } from '../loading';
import TemperateurNow from '../temperateur-now';
import WindHumidityRain from '../wind-humidity-rain';
import { add } from 'date-fns'
import TemperateurNext from '../temperateur-next';
import LogoWeather from '../logo-weather';

const PrincipalScreen = () =>{
    const [data,setData] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()

   
    useEffect(()=>{
        const  getData= async()=>{
            setIsLoading(true)
            const datajson= await fetchWeather()
            setData(datajson)
            setIsLoading(false)
        }
        const permission =async()=>{
            const state  =  await navigator.permissions.query({
                name: "geolocation"
              });
              console.log('geolocation permission:' +state.state);
        }
        getData()
        permission()
    },[])
    
    if(isLoading){
        return <Loading />
    }

    const timeIso = data? data.hourly.time.map(temp=>new Date(temp).toISOString()):[]
    const listIndex=[]
    const listTime=[]
    for (let i = 0; i <4 ; i++) {
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
   
    try {
        if('geolocation' in navigator)
            navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)     
            console.log(position.coords.latitude);              
        })
        else 
            alert("Geolocation is not supported by your browser")
    } catch (e) {
        alert('Unable to retrieve your location')
    }

    const bgVideo = (code) => {
        if(code === -1)
            return
         
        if(code === 0) return <source src="https://player.vimeo.com/external/345805150.hd.mp4?s=36c4e596b480ef0e8049370becbaf261b3989a01&profile_id=170&oauth2_token_id=57447761"></source>
        else
            if([1,2,3].includes(code)) return <source src="https://player.vimeo.com/external/444212674.hd.mp4?s=4071981264d9e78acf09a0400e4638432495c4f0&profile_id=175&oauth2_token_id=57447761" type="video/mp4"></source>
        else
            if( Array.from(Array(4).keys()).map(e=>e+45).includes(code)) return <source src="https://static.videezy.com/system/resources/previews/000/036/800/original/over-mountain12.mp4" type="video/mp4"></source>
        else
            if( Array.from(Array(7).keys()).map(e=>e+51).includes(code)) return <source src="https://player.vimeo.com/external/569217602.hd.mp4?s=9a96178c91fe19a6317ed594785f2e368cd1eade&profile_id=174&oauth2_token_id=57447761" type="video/mp4"></source>
        else
            if( Array.from(Array(7).keys()).map(e=>e+61).includes(code)) return <source src="https://player.vimeo.com/external/569217602.hd.mp4?s=9a96178c91fe19a6317ed594785f2e368cd1eade&profile_id=174&oauth2_token_id=57447761" type="video/mp4"></source>
        else
            if( Array.from(Array(8).keys()).map(e=>e+71).includes(code)) return <source src="https://static.videezy.com/system/resources/previews/000/035/469/original/18_024_04.mp4" type="video/mp4"></source>
        else
            if([80, 81, 82].includes(code)) return <source src="https://player.vimeo.com/external/569217602.hd.mp4?s=9a96178c91fe19a6317ed594785f2e368cd1eade&profile_id=174&oauth2_token_id=57447761" type="video/mp4"></source>
        else
            if([85, 86].includes(code)) return <source src="https://static.videezy.com/system/resources/previews/000/004/950/original/Snow_Day_4K_Living_Background.mp4" type="video/mp4"></source>
        else
            if(code >= 95) return <source src="https://static.videezy.com/system/resources/previews/000/039/127/original/stockvideo_01055.mp4"></source>
    
    };
      
    return(
        <div id='font' className='flex h-screen w-screen  justify-center'>
            <div className='absolute w-full h-screen'>
                <video autoPlay loop muted className=' rounded-3xl right-0 w-screen h-screen object-cover'>
                    {data && bgVideo(data.hourly.weathercode[listIndex[0]])}
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
                                     lat={lat}
                                     lon={lon}
                                     
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