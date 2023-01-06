import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const {register} = useAuth()

  const formRef = useRef<HTMLFormElement>(null)

  async function onSubmit(e : React.SyntheticEvent) {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const name = target.name.value
    const email = target.email.value
    const password = target.password.value

    await register({name, email, password})

    formRef.current && formRef.current.reset()
  }

  return (
    <Box sx={{ height: 'inherit', width: 'inherit' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '100%' }}>
        <Box sx={{ width: '400px', height: '400px' }}>
          <form onSubmit={onSubmit} ref={formRef}>
          <div>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type={'password'}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <Box sx={{ py: 2 }}>
              <Button color="primary" variant="contained" type="submit" size="medium" fullWidth>
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Register