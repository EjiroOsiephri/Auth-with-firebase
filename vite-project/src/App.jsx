import { AuthInput } from "./inputs"
import { Firestore, auth, storage } from "./firebase"
import { useState, useEffect } from "react"
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
function App() {
    const [movies, setMovies] = useState([])

    const movieCollectionList = collection(Firestore, "movies")

    const [enterMovie, setEnterMovie] = useState("")
    const [enterReleaseDate, setEnterReleaseDate] = useState(0)
    const [isMovieOscar, setEnterMovieOscar] = useState(false)

    const [updateTitle, setUpdatedTitle] = useState('')

    const [fileUpload, setFileUpload] = useState(null)
    const [image, setImage] = useState(null)

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
                title: enterMovie,
                releaseDate: enterReleaseDate,
                isMovieOscar: isMovieOscar,
                userId: auth?.currentUser.uid
            })
            getMovies()
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMovie = async (id) => {
        const movieDoc = doc(Firestore, "movies", id)
        await deleteDoc(movieDoc)
        getMovies()
    }

    const updateMovieTitle = async (id) => {
        const movieDoc = doc(Firestore, "movies", id)
        await updateDoc(movieDoc, {
            title: updateTitle
        })
        getMovies()
    }

    async function fileAdd() {
        if (!fileUpload) {
            return
        }
        const fileUploadRef = ref(storage, `img/${fileUpload.name}`)
        try {
            await uploadBytes(fileUploadRef, fileUpload).then(() => {
                getDownloadURL(fileUploadRef).then((url) => {
                    setImage(url)
                })
            })
            setFileUpload(null)
        } catch (error) {
            console.log(error);
        }
    }
    console.log(fileUpload);

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
                    <h1>{movie.title}</h1>
                    <h1>{movie.releaseDate}</h1>
                    <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>
                    <input type="text" onChange={(e) => {
                        setUpdatedTitle(e.target.value)
                    }} />
                    <button onClick={() => updateMovieTitle(movie.id)}>Update movie title</button>
                </div>
            })}
            <div>
                <input type="file" onChange={(e) => {
                    setFileUpload(e.target.files[0])
                }} />
                <button onClick={fileAdd}>Add img</button>
            </div>
        </div>
        <img src={image} alt="" />
    </div>
}

export default App
