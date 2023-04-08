import { AuthInput } from "./inputs"
import { Firestore } from "./firebase"
import { useState, useEffect } from "react"
import { getDocs, collection, addDoc } from "firebase/firestore"
function App() {
    const [movies, setMovies] = useState([])

    const movieCollectionList = collection(Firestore, "movies")

    const [enterMovie, setEnterMovie] = useState("")
    const [enterReleaseDate, setEnterReleaseDate] = useState(0)
    const [isMovieOscar, setEnterMovieOscar] = useState(false)

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

    useEffect(() => {
        getMovies()
    }, [])

    const addMovie = async () => {
        try {
            await addDoc(movieCollectionList, {
                tita: enterMovie,
                date: enterReleaseDate,
                isMovieOscars: isMovieOscar
            })
            getMovies()
        } catch (error) {
            console.log(error);
        }
    }

    return <div>
        <AuthInput></AuthInput>
        <div>
            <input type="text" placeholder="enter a movie" onChange={(e) => {
                setEnterMovie(e.target.value)
            }} />
            <input type="number" placeholder="release date" onChange={(e) => {
                setEnterReleaseDate((e.target.value))
            }} />
            <input type="checkbox" checked={isMovieOscar} onChange={(e) => {
                setEnterMovieOscar(e.target.checked)
            }} />
            <label htmlFor="">Nominee award</label>
            <button onClick={addMovie}>Enter a movie</button>
        </div>
        <div>
            {movies.map((movie, index) => {
                return <div key={index}>
                    <h1>{movie.tita}</h1>
                    <h1>{movie.date}</h1>
                </div>
            })}
        </div>
    </div>
}

export default App
