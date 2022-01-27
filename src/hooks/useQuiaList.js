import { get, getDatabase, orderByKey, query, ref } from 'firebase/database'
import { useEffect, useState } from 'react'


export default function useQuizList(videoId){
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [questions, setQuestions] =useState([])
    useEffect(() =>{
        async function fetchQuestions(){
            const db = getDatabase()
            const quizRef = ref(db, `quiz/${videoId}/questions`)
            const quizQuery = query(quizRef, orderByKey())

            try {
                // Request database
                setLoading(true)
                setError(false)
                const snapshot = await get(quizQuery)
                setLoading(false)
                if(snapshot.exists()){

                    setQuestions((prevQuistions) => {
                        return [...prevQuistions, ...Object.values(snapshot.val())]})
                    
                }
            } catch (error) {
                setLoading(false)
                setError(true)
                // console.log(error);
                
            }

        }
            
        fetchQuestions()
        
    }, [videoId])

    return{
        loading,
        error,
        questions
    }


}