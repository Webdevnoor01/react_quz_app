import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from 'firebase/database'
import { useEffect, useState } from 'react'


export default function useVideoList(page){
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [videos, setVideos] =useState([])
    const [hasMore, setHasMore] = useState(true)
    useEffect(() =>{
        async function fetchVideos(){
            const db = getDatabase()
            const videoRef = ref(db, "videos")
            const videoQuery = query(videoRef, orderByKey(), startAt(''+page), limitToFirst(8))

            try {
                // Request database
                setLoading(true)
                setError(false)
                const snapshot = await get(videoQuery)
                setLoading(false)
                if(snapshot.exists()){

                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapshot.val())]})
                    
                }else{
                    setHasMore(false)
                }
            } catch (error) {
                setLoading(false)
                setError(true)
                // console.log(error);
                
            }

        }
            
            fetchVideos()
        
    }, [page])

    return{
        loading,
        error,
        videos,
        hasMore
    }


}