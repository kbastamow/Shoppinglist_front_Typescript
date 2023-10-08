import { FC, ReactElement } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ILoginData } from "../types/interfaces/ILoginData";
import { apiRequest } from "../helpers/apiRequest";
import { useMutation } from "@tanstack/react-query";
import { IUserProfile } from "../types/interfaces/IUserProfile";
import { useNavigate } from "react-router";
import { API_URL } from "../helpers/apiurl";
import trolley from "../assets/trolley.png";

const LoginPage: FC = (): ReactElement => {
  const navigate = useNavigate();

  const loginMutation = useMutation(
    async (data: ILoginData) => {
      const loginResponse = await apiRequest<IUserProfile>(
        `${API_URL}/users/login`,
        "PUT",
        data,
      );
      if (loginResponse.token) {
        localStorage.setItem("token-shoppinglist", loginResponse.token);
        navigate("/");
      }
      return loginResponse;
    },
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const emailData = data.get("email");
    const passwordData = data.get("password");

    if (!emailData || !passwordData) {
      return;
    }
    const loginData: ILoginData = {
      email: emailData as string,
      password: passwordData as string,
    };
    loginMutation.mutate(loginData);
  };

  return (
    <Container
      sx={{ border: "4px solid", borderColor: "primary.dark", height: "95vh" }}
    >
      <Stack
        direction="column"
        alignItems="center"
        spacing={5}
        sx={{ py: 3, height: "100%" }}
      >
        <Typography className="title" variant="h3">
          Shopping organiser
        </Typography>
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
          >
            Login
          </Button>
        </Box>
        <Box sx={{ width: "50%" }}>
          <img src={trolley} alt="Groceries" />
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
