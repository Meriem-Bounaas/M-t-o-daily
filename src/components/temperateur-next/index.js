
const TemperateurNext = ({temperateur, temperatureUnit, keys}) =>{

    return(
        <div key={keys} className=" flex items-start">
                        <h1 className="text-lg md:text-xl">{temperateur}</h1>
                        <h1 className="text-sm">{temperatureUnit}</h1>
        </div>
    )
}

export default TemperateurNext