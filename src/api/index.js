export const fetchWeather = async(lat=1,lon=2) =>{
    try{
     const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode,rain`)    
         return await response.json()
    }
    catch(e){
         console.log(e.message);
    }
    finally{
    }
 }