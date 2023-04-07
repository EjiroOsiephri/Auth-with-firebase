import { AuthInput } from "./inputs"
import { Firestore } from "./firebase"
import { useState, useEffect } from "react"
import { getDocs, collection } from "firebase/firestore"
function App() {
    const [movies, setMovies] = useState([])

    const movieCollectionList = collection(Firestore, "movies")


    useEffect(() => {
        async function getMovies() {
            try {
                const data = await getDocs(movieCollectionList)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setMovies(filteredData)
            } catch (error) {
                console.log(error);
            }
        }
        getMovies()
    }, [])


    return <div>
        <AuthInput></AuthInput>
        <div>
            {movies.map((movie, index) => {
                return <div key={index}>
                    <h1>{movie.title}</h1>
                    <h1>{movie.releaseDate}</h1>
                </div>
            })}
        </div>
    </div>
}

export default App
