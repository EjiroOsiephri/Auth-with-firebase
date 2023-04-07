import React from 'react'
import { AuthContext } from './inputs'
import { useState, useContext, useEffect } from "react"
import { useAuth } from './inputs'

const Home = () => {
    const ctx = useContext(AuthContext)
    const { currentUser } = useAuth()

    console.log(currentUser);
    return (
        <div>
            <h1>Home</h1>
            <h1>{ctx?.user?.email}</h1>
        </div>
    )
}

export default Home