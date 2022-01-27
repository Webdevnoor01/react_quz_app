import { get, getDatabase, orderByKey, query, ref } from 'firebase/database'
import { useEffect, useState } from 'react'


export default function useAnswers(videoId){
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [answers, setAnswers] =useState([])
    useEffect(() =>{
        async function fetchAnswers(){
            const db = getDatabase()
            const answerRef = ref(db, `/answers/${videoId}/questions`)
            const answerQuery = query(answerRef, orderByKey())

            try {
                // Request database
                setLoading(true)
                setError(false)
                const snapshot = await get(answerQuery)
                setLoading(false)
                if(snapshot.exists()){

                    setAnswers((prevAnswers) => {
                        return [...prevAnswers, ...Object.values(snapshot.val())]})
                    
                }
            } catch (error) {
                setLoading(false)
                setError(true)
                // console.log(error);
                
            }

        }
            
        fetchAnswers()
        
    }, [videoId])

    return{
        loading,
        error,
        answers
    }


}