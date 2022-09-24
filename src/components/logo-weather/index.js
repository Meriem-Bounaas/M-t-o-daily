import { ReactSVG } from 'react-svg'
import sunSVG from '../../media/sun.svg';
import cloudySVG from '../../media/cloudy.svg';
import rainSVG  from '../../media/rain.svg'
import snowSVG from '../../media/snow.svg'
import sunRainSVG from '../../media/sun-rain.svg'
import thunderSVG from '../../media/thunder.svg'
import drizzelSVG from '../../media/cloudDrizel.svg'
import cloudFogSVG from '../../media/cloudFog.svg'

const LogoWeather = ({code, size=''}) =>{
    if(code === -1)
        return
     
    if(code === 0) return <div><ReactSVG className={size} src={sunSVG} /></div>
    else
        if([1,2,3].includes(code)) return <div ><ReactSVG className={size} src={cloudySVG} /></div>
    else
        if( Array.from(Array(4).keys()).map(e=>e+45).includes(code)) return <div ><ReactSVG className={size} src={cloudFogSVG} /></div>
    else
        if( Array.from(Array(7).keys()).map(e=>e+51).includes(code)) return <div ><ReactSVG className={size} src={drizzelSVG} /></div>
    else
        if( Array.from(Array(7).keys()).map(e=>e+61).includes(code)) return <div ><ReactSVG className={size} src={sunRainSVG} /></div>
    else
        if( Array.from(Array(8).keys()).map(e=>e+71).includes(code)) return <div ><ReactSVG className={size} src={snowSVG} /></div>
    else
        if([80, 81, 82].includes(code)) return <div ><ReactSVG className={size} src={rainSVG} /></div>
    else
        if([85, 86].includes(code)) return <div ><ReactSVG className={size} src={snowSVG} /></div>
    else
        if(code >= 95) return <div ><ReactSVG className={size} src={thunderSVG} /></div>
}

export default LogoWeather;
