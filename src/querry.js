import { useQuery } from "@tanstack/react-query";

const fetchQuote = async() =>{
    try{
        const response = await fetch("https://api.quotable.io/random")
        
        return await response.json()
        
    }
    catch(e){
        throw e
    }
}

export const useFetchQuote = () =>{
    return useQuery(
        ['quote'],
        () => fetchQuote()
    )
}


