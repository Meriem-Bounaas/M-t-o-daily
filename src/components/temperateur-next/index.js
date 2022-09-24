
const TemperateurNext = ({temperateur, temperatureUnit, keys}) =>{

    return(
        <div key={keys} className=" flex items-start ">
                        <h1>{temperateur}</h1>
                        <h1>{temperatureUnit}</h1>
        </div>
    )
}

export default TemperateurNext