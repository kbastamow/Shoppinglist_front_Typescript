import { FC, ReactElement } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { Navigate, Route, Routes } from "react-router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import OldLists from "./pages/OldLists";
import LoginPage from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ListPage from "./pages/ListPage";
import Home from "./pages/Home";
import ActiveLists from "./pages/ActiveLists";
import ShoppingComplete from "./pages/ShoppingComplete";
import { ItemProvider } from "./context/ItemContext/ItemContext";
import { isAuthenticated } from "./helpers/isAuthenticated";
import { custom } from "./theme/custom";
import PrivateArea from "./helpers/PrivateArea";

//Create a query client
const queryClient = new QueryClient();

const App: FC = (): ReactElement => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={custom}>
          <CssBaseline />
          <BrowserRouter>
            <Header></Header>
            <Routes>
              <Route
                path="/login"
                element={isAuthenticated()
                  ? <Navigate to="/" />
                  : <LoginPage />}
              />
              <Route
                path="/"
                element={
                  <PrivateArea>
                    <Home />
                  </PrivateArea>
                }
              />
              <Route
                path="/lists"
                element={
                  <PrivateArea>
                    <ActiveLists />
                  </PrivateArea>
                }
              />
              <Route
                path="/lists/old"
                element={
                  <PrivateArea>
                    <OldLists />
                  </PrivateArea>
                }
              />
              <Route
                path="/lists/:listId"
                element={
                  <PrivateArea>
                    <ListPage />
                  </PrivateArea>
                }
              />
              <Route
                path="/shoppingComplete"
                element={
                  <PrivateArea>
                    <ShoppingComplete />
                  </PrivateArea>
                }
              />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
