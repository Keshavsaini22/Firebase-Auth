import { Box, Button, Stack, TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate();

  return (
    <Stack height={'100vh'}>
      <Box sx={{ fontSize: '30px', fontWeight: '700' }}>SignUp Here</Box>

      <Stack width={'400px'} gap={4} p={2} m={'auto'} sx={{ border: '1px solid ' }}>
        <Stack gap={3} component={'form'} onSubmit={async (e) => {
          e.preventDefault();
          try {
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;
            if (user) {
              await setDoc(doc(db, "Users", user?.uid), {
                email: user.email,
                name: name
              })
            }
            toast.success("User Registered Successfully", { position: 'bottom-left', pauseOnHover: false, autoClose: 2000 })
            navigate('/')
            setEmail('')
            setPassword('')
            setName('')
          }
          catch (e) {
            toast.error(e.message, { position: 'bottom-left', pauseOnHover: false, autoClose: 2000 })
          }

        }}>
          <TextField label="Name" variant="outlined" value={name} onChange={(e) => (setName(e.target.value))} />
          <TextField label="Email" variant="outlined" value={email} onChange={(e) => (setEmail(e.target.value))} />
          <TextField label="Passoword" variant="outlined" value={password} onChange={(e) => (setPassword(e.target.value))} />
          <Button variant='contained' type='submit'>Submit</Button>
          <Button onClick={() => {
            navigate('/')
          }} >Login In</Button>
        </Stack>
        {/* <Stack gap={2} alignItems={'center'}>
          <Box sx={{ fontSize: '18px', fontWeight: '600' }}>Or</Box>
          <Button variant='contained' fullWidth>Sign In With Google</Button>
        </Stack> */}
      </Stack>
    </Stack>
  )
}

export default SignUp