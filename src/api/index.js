export const fetchWeather = async() =>{
    try{
     // const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode,rain`)    
     const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=45.18361503033922&longitude=5.730560712071008&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode,rain')           
         return await response.json()
    }
    catch(e){
         console.log(e.message);
    }
    finally{
    }
 }