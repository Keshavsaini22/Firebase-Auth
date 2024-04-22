import React, { useState } from 'react'
import { TextField, Box, Stack, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [value, setValue] = useState()

    return (
        <Stack height={'100vh'}>
            <Box sx={{ fontSize: '30px', fontWeight: '700' }}>Login Here</Box>

            <Stack width={'400px'} gap={4} p={2} m={'auto'} sx={{ border: '1px solid ' }}>
                <Stack gap={3} component={'form'} onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        await signInWithEmailAndPassword(auth, email, password)
                        toast.success("User Login Successfully", { position: 'bottom-left', pauseOnHover: false, autoClose: 2000 })
                        setEmail('')
                        setPassword('')
                        navigate('/home')
                    } catch (e) {
                        toast.error(e.message, { position: 'bottom-left', pauseOnHover: false, autoClose: 2000 })
                    }
                }}>
                    <TextField label="Email" variant="outlined" value={email} onChange={(e) => (setEmail(e.target.value))} />
                    <TextField label="Passoword" variant="outlined" value={password} onChange={(e) => (setPassword(e.target.value))} />
                    <Button variant='contained' type='submit'>Submit</Button>
                    <Button onClick={() => {
                        navigate('/signup')
                    }} >Sign Up</Button>
                </Stack>
                <Stack gap={2} alignItems={'center'}>
                    <Box sx={{ fontSize: '18px', fontWeight: '600' }}>Or</Box>
                    <Button variant='contained' fullWidth onClick={() => {
                        signInWithPopup(auth, provider).then((data) => {
                            setValue(data.user.email)
                            localStorage.setItem("email", data.user.email)
                            navigate('/home')
                        })
                    }}>Sign In With Google</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Login