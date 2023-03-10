import { useState , useEffect} from 'react';

const useFetch =(url)=> {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() =>{
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
            .then(response => {
                if(!response.ok){
                    throw Error("Could not fetch the data");
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setIsPending(false);
                
            }).catch( error => {
                if(error.name === 'AbortError'){
                    console.log("fetch aborted");
                }
                else{
                    setErr(error.message);
                    setIsPending(false);
                }
                
            });
        }, 1000);

        return () => {
            abortCont.abort(); 
        };
        
    }, [url]);

    return {data, isPending, err};
    
}

export default useFetch;
