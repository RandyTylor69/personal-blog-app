import { useParams } from "react-router-dom"
import { useEffect} from "react"
import React from "react"

export default function Post(){
    // grab all post information from post id
    const {id} = useParams()
    const [postData, setPostData] = React.useState(null)
    useEffect(()=>{
        fetch(`http://localhost:3001/post/${id}`)
        .then(res => res.json())
        .then(data => setPostData(data))
    }, [])
    return(
        <>

        </>
    )
}