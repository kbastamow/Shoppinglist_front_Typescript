import {
  Box,
  Button,
  Container,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { API_URL } from "../helpers/apiurl";
import { apiRequest } from "../helpers/apiRequest";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { INewListData } from "../types/interfaces/INewListData";
import { INewList } from "../types/interfaces/INewList";
import trolley from "../assets/trolley.png";
import { ILogout } from "../types/interfaces/ILogout";
const Home = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createListMutation = useMutation(
    async (data: INewListData) => {
      const newListResponse = await apiRequest<INewList>(
        `${API_URL}/lists`,
        "POST",
        data,
      );

      if (newListResponse) {
        handleClose();
        navigate(`/lists/${newListResponse.list.id}`);
      }
    },
  );

  const logoutMutation = useMutation(
    async () => {
      const logoutResponse = await apiRequest<ILogout>(
        `${API_URL}/users/logout`,
        "PUT",
      );

      if (logoutResponse) {
        localStorage.removeItem("token-shoppinglist");
        navigate("/login");
      }
    },
  );

  const handleCreateList = () => {
    const newList: INewListData = { title: "My list" };
    if (title !== "") {
      newList.title = title;
    }
    createListMutation.mutate(newList);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    // localStorage.removeItem("token-shoppinglist");
    // navigate("/login");
  };

  return (
    <Container
      sx={{ border: "4px solid", borderColor: "primary.dark", height: "95vh" }}
    >
      <Typography className="title" variant="h3">
        Shopping organiser
      </Typography>
      <Stack
        spacing={5}
        sx={{ my: 5 }}
      >
        <Button variant="contained" size="large" onClick={handleOpen}>
          New List
        </Button>
        <Dialog onClose={handleClose} open={open}>
          <Container>
            <Box sx={{ m: 2, display: "flex", flexDirection: "column" }}>
              <Typography variant="body1" align="center">
                List title
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button onClick={handleCreateList}>Create list</Button>
            </Box>
          </Container>
        </Dialog>

        <Button variant="contained" onClick={() => navigate("/lists")}>
          View active lists
        </Button>
        <Button variant="contained" onClick={() => navigate("/lists/old")}>
          View list history
        </Button>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
      </Stack>
      <Box sx={{ width: "50%", mx: "auto" }}>
        <img src={trolley} alt="Groceries" />
      </Box>
    </Container>
  );
};

export default Home;
