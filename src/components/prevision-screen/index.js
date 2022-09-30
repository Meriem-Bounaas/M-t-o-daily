import {useNavigate, useParams} from 'react-router-dom';
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
        <div className='flex'>
            <div className='absolute'>
                <div className='absolute bg-black w-full h-screen opacity-50'></div>
                <video autoPlay loop muted className=' rounded-3xl right-0 w-screen h-screen object-cover'>
                    {bgVideo(parseInt(param.id))}
                </video>
            </div>

            <div className="rounded-3xl text-white w-full z-0">
                <button className='pl-9 pt-7 pb-2' onClick={()=>{
                    navigate(-1)
                }}> 
                    <UilArrowCircleLeft size="50" color="#ffffff" />
                </button>

                <div className='flex justify-center font-semibold text-2xl pb-16'>
                    <span>Prevision sur 5 jours</span>
                </div>
                <div className='flex flex-row space-x-12 justify-center'>
                    <div className='flex flex-col gap-7'>
                        {dayName} 
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PrevisionScreen