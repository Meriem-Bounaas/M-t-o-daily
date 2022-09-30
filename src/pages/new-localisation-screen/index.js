import { useNavigate, useParams } from "react-router-dom";
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { UilSearch } from '@iconscout/react-unicons'
import { useContext } from "react";
import { PositionContext } from "../../position-context";
import BgVideo from "../../components/bg-video";

const NewLocalisation = () => {
    const navigate = useNavigate();
    const param = useParams();
    const positionContext = useContext(PositionContext)
   
        const fetchcities = async(ville) => {
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${ville}&appid=e52320b984040185e6040a1e67f254e0`)
            const data = await response.json()
            positionContext.setLat(data[0].lat)
            positionContext.setLon(data[0].lon)  
            navigate(-1)          
        }

    const handleChange = (e) => {
        if (e.key === "Enter") {
            fetchcities(e.target.value)   
        }
    }

    return (
        <div className="flex">
            <div className='absolute'>
                <div className='absolute bg-black w-full h-screen opacity-50'></div>
                <video autoPlay loop muted className='right-0 w-screen h-screen object-cover'>
                    <BgVideo code = {parseInt(param.id)}/>                    
                </video>
            </div>
            <div className="text-white rounded-3xl z-0">
                <button className='pl-9 pt-7 pb-2' onClick={() => {
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
                                onKeyDown={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewLocalisation;