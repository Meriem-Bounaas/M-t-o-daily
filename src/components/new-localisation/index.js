import { useNavigate } from "react-router-dom";
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { UilSearch } from '@iconscout/react-unicons'
import { useState } from "react";


const NewLocalisation = () => {
    const navigate = useNavigate();
    const [ville,setVille]=useState()
    const handleChange = (e) =>{
        setVille(e.target.value);
    }
    

    return (
        <div className="bg-gr h-screen text-white rounded-3xl bg-gradient-to-b from-gray-700 via-gray-900 to-black ">
            <button className='pl-9 pt-7 pb-2' onClick={()=>{
                navigate(-1)
            }}> 
                <UilArrowCircleLeft size="50" color="#61DAFB" />
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
    );
};

export default NewLocalisation;