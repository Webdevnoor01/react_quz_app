import { useEffect, useState } from 'react'
export default function useFetch(url,method, headers){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [result, setResult] =useState(null)

    useEffect(() =>{
        async function fetchRequest(){
            try {
                setLoading(true)
                setError(false)
                const response = await fetch(url,{
                    method:method,
                    headers:headers
                })
                const data = await response.json()
                setResult(data)
                setLoading(false)

            } catch (error) {
                console.log(error.message);
                setLoading(false)
                setError(true)
                
            }
        }
        fetchRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        loading,
        error,
        result
    }

}