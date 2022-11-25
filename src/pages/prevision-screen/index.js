import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import {useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { add } from 'date-fns'
import {fetchWeather} from '../../api/index'
import { Loading } from '../../components/loading/index';
import TemperateurNext from '../../components/temperateur-next';
import LogoWeather from '../../components/logo-weather';
import BgVideo from '../../components/bg-video';

const PrevisionScreen = () =>{
    const navigate = useNavigate();
    const [data,setData]=useState();
    const [isDownload,setIsDownload]=useState(false)
    const  param  = useParams();

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
        <div className='flex'>
            <div className='absolute'>
                <div className='absolute bg-black w-full h-screen opacity-50'></div>
                <video autoPlay loop muted className='right-0 w-screen h-screen object-cover'>
                    <BgVideo code={parseInt(param.id)}/>
                </video>
            </div>

            <div className=" text-white w-full z-0">
                <button className='pl-9 pt-7 pb-2' onClick={()=>{
                    navigate(-1)
                }}> 
                    <UilArrowCircleLeft size="50" color="#ffffff" />
                </button>

                <div className='flex justify-center text-2xl md:text-5xl pb-16'>
                    <span id='font'>Prevision sur 5 jours</span>
                </div>
                <div className='flex flex-row space-x-12 justify-center'>
                    <div id='font' className='flex flex-col gap-7 md:text-2xl'>
                        {dayName} 
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PrevisionScreen