import { FC, ReactElement } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import { ILoginData } from '../types/interfaces/ILoginData';
import { apiRequest } from '../services/apiRequest';
import { useMutation } from '@tanstack/react-query';
import { IUserProfile } from '../types/interfaces/IUserProfile';
import { useNavigate } from 'react-router';
const API_URL = 'http://localhost:3500';
const LoginPage: FC = (): ReactElement => {
const navigate = useNavigate()


    const createLoginMutation = useMutation(
        async (data: ILoginData) => {
          const loginResponse = await apiRequest<IUserProfile>(
            `${API_URL}/users/login`,
            'POST',
            data
            );
          if (loginResponse.token) {
            localStorage.setItem("token-shoppinglist", loginResponse.token);
            navigate("/home")
          }
        
          // return loginResponse
        },
      );

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("login")
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const emailData = data.get("email")
        const passwordData = data.get("password")
        
        if (!emailData || !passwordData) {
            return 
        }
        const loginData: ILoginData = {
                email: emailData as string,
                password: passwordData as string,
        }
        createLoginMutation.mutate(loginData);
        
    }

    return (
        <>
        <Typography> Login </Typography>
            <Box
                component="form"
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >Login</Button>
            </Box>
        </>
    );
};

export default LoginPage;
