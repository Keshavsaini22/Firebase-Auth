import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase'
import Login2 from './pages/Login2'
function Routess() {
    const [user, setUser] = useState();
    console.log('user: ', user);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        })
    }, [])
    return (
        <>
            <Routes>
                <Route path='/' element={!user ? <Login /> : <Navigate to='/home' />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login2 />} />

            </Routes>
            <ToastContainer />

        </>
    )
}

export default Routess