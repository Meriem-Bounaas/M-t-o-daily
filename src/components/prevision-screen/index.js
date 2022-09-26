import {useNavigate} from 'react-router-dom';
import {fetchWeather} from '../../api/index'
import { Loading } from '../loading/index';
import { useEffect, useState } from 'react';
import TemperateurNext from '../temperateur-next';
import { add } from 'date-fns'
import LogoWeather from '../logo-weather';
import { UilArrowCircleLeft } from '@iconscout/react-unicons'

const PrevisionScreen = () =>{
    const navigate = useNavigate();
    const [data,setData]=useState();
    const [isDownload,setIsDownload]=useState(false)

    useEffect(()=>{
        const fetch = async()=>{
            setIsDownload(true)
            const fetchJson= await fetchWeather()
            setData(fetchJson)
            setIsDownload(false)
        }
        fetch()
    },[])

    if(isDownload){
        <Loading/>
    }
 
    const daysList=[] 
    for (let i = 1; i < 6; i++) {
        daysList.push(add(new Date(),{days:i}).getDay())
    }
    const whatDay =["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
    const listIndexNextDay=[]
    const ListDayIso= data? data.hourly.time.map(e=> new Date(e).toISOString()):[]
    for (let i = 1; i <6; i++) {
        const nextDay= (add(new Date(), {days:i})).toISOString()
        const nextDayIso= nextDay.slice(0,11).concat('00:00:00.000Z')
        const indexNextDay =ListDayIso.indexOf(nextDayIso) 
        listIndexNextDay.push(indexNextDay)
    }
    const dayName = data? daysList.map((e,index)=>{
                        return <div key={index} className='flex flex-row space-x-14 justify-start'>
                                    <div className='w-24'>{whatDay[e]}</div>
                                    <LogoWeather code={data.hourly.weathercode[index]}
                                    />          
                                    <TemperateurNext temperateur={data.hourly.temperature_2m[index]}
                                                                                        temperatureUnit={data.hourly_units.temperature_2m}
                                                                                        keys={index}
                                    />
                                </div>
    
                    }):[]
  
    return(
        <div id='font' className="rounded-3xl bg-gradient-to-b from-gray-700 via-gray-900 to-black h-screen text-white">
            <button className='pl-9 pt-7 pb-10' onClick={()=>{
                navigate(-1)
            }}> 
                <UilArrowCircleLeft size="50" color="#61DAFB" />
            </button>

            <div className='flex justify-center font-semibold text-2xl pb-16'><span>Prevision sur 5 jours</span></div>
            <div className='flex flex-row space-x-12 justify-center'>
                <div className='flex flex-col gap-7'>
                     {dayName} 
                </div>
            </div>
        </div>

    )
}

export default PrevisionScreen