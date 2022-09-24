export const fetchWeather = async() =>{
    try{
         const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=45.196065698843384&longitude=5.70441754070341&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode,rain')           
         return await response.json()
    }
    catch(e){
         console.log(e.message);
    }
    finally{
    }
 }