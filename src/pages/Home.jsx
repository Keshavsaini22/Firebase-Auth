import { Box, Stack, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
function Home() {
    console.log('auth: ', auth);
    const navigate = useNavigate();
    const [detail, setDetail] = useState()
    console.log('detail: ', detail);
    const fetchUser = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log('user?.uid: ', user?.uid);
            const docRef = doc(db, "Users", user?.uid);
            const docSnap = await getDoc(docRef);
            console.log('docSnap: ', docSnap);
            if (docSnap.exists()) {
                console.log('docSnap.data(): ', docSnap.data());
                setDetail(docSnap.data())
            }
            else {
                console.log("User not have data")
            }
        })
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <Stack height={'100vh'}>
            <Stack gap={4} p={2} m={'auto'} alignItems={'center'} >
                <Box sx={{ fontSize: '30px', fontWeight: '700' }}>Welcome ji Welcome</Box>
                {
                    detail && <Box sx={{ fontSize: '20px', fontWeight: '600' }}>{detail?.name}</Box>
                }
                <Button variant='contained' fullWidth onClick={async (e) => {
                    e.preventDefault()
                    try {
                        const res = await signOut(auth)
                        console.log('res: ', res);
                        // toast.success("User Logout Successfully", { position: 'bottom-left', pauseOnHover: false, autoClose: 2000 })
                        navigate('/')
                    }
                    catch (e) {
                        console.log('e: ', e);
                        toast.error(e.message, { position: 'bottom-left', pauseOnHover: false, autoClose: 2000 })
                    }
                }}>Logout</Button>
            </Stack>
        </Stack>
    )
}

export default Home