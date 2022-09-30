const BgVideo = ({code}) => {
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

export default BgVideo;