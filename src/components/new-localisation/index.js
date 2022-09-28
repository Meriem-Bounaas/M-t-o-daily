import { useNavigate, useParams } from "react-router-dom";
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { UilSearch } from '@iconscout/react-unicons'
import { useState } from "react";


const NewLocalisation = () => {
    const navigate = useNavigate();
    const [ville,setVille]=useState()
    const  param  = useParams();
    const handleChange = (e) =>{
        setVille(e.target.value);
    }
console.log(param);
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

    return (
        <div className="flex">
            <div className='absolute'>
                <video autoPlay loop muted className=' rounded-3xl right-0 w-screen h-screen object-cover'>
                   {bgVideo(parseInt(param.id))}
                </video>
            </div>
            <div className="text-white rounded-3xl z-0">
                <button className='pl-9 pt-7 pb-2' onClick={()=>{
                    navigate(-1)
                }}> 
                    <UilArrowCircleLeft size="50" color="#ffffff" />
                </button>
                <div className=" mt-2">
                    <div className="flex flex-col items-center w-screen">
                        <h1 id="font" className="text-2xl mb-4 text-center">Gérer les villes</h1>
                        <div className="flex flex-row items-center gap-2 bg-slate-200 rounded-3xl">
                            <button className="pl-4"><UilSearch size="50" color="#36494E" /></button>
                            <input id="font" className="bg-slate-200 w-64 h-10 rounded-3xl text-gray-600 text-lg  pl-4" placeholder="saisir la ville" type="text"
                                onChange={handleChange}
                            />
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewLocalisation;