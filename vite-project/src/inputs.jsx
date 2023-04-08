import { auth, googleProvider } from "./firebase"
import React, { useState, useContext, useEffect } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import Home from "./home"

export const AuthContext = React.createContext({
    user: 'ejiro'
})

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthInput = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setLoading(true)
        } catch (error) {
            console.error(error)
        }
    }
    // goggleSigin functions

    const googleSignin = async () => {
        try {
            setLoading(true)
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    // goggleSigout functions
    const googleSignout = async () => {
        try {
            setLoading(true)
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unSubscribe
    }, [])


    const value = {
        user: currentUser
    }


    return <AuthContext.Provider value={value}>

        <input type="text" onChange={(e) => {
            setEmail(e.target.value)
        }} placeholder='email.....' />
        <input type="password" onChange={(e) => {
            setPassword(e.target.value)
        }} placeholder='password.....' />
        <button onClick={signUp}>
            Sign up
        </button>
        <button onClick={googleSignin}>Sign in with google</button>
        <button onClick={googleSignout}>Sign out</button>
    </AuthContext.Provider>
}