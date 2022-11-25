import { WiStrongWind, WiHumidity } from 'react-icons/wi'
import { FaCloudRain } from 'react-icons/fa'

const WindHumidityRain = ({ windUnit, wind, humidityUnit, humidity, rain, rainUnit }) => {
    return (
        <div className="flex gap-4 text-white border-gray-200 border-2 rounded-3xl mb-10 p-3 justify-center h-20 md:h-24 text-sm md:text-xl lg:w-auto lg:pl-10 lg:pr-10 md:w-auto md:pl-10 md:pr-10 ">
            <div className="flex flex-col items-center justify-center">
                <div className='text-2xl text-white'><WiStrongWind /></div>
                <span>{`${wind} ${windUnit}`}</span>
                <span className="font-thin">Wind</span>
            </div>
            <div className="flex flex-col items-center border-x-2 pl-4 pr-4 justify-center">
                <div className='text-2xl text-white'><WiHumidity /></div>
                <span>{`${humidity} ${humidityUnit}`}</span>
                <span className="font-thin">Humidity</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className='text-2xl text-white'><FaCloudRain /></div>
                <span>{`${rain} ${rainUnit}`}</span>
                <span className="font-thin">Rain</span>
            </div>
        </div>
    )
}

export default WindHumidityRain