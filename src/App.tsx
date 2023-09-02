import { FC, ReactElement } from 'react';
import './App.css'
import Header from './components/header/Header'
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MyList from './pages/MyList';
import OldLists from './pages/OldLists';
import LoginPage from './pages/LoginPage';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//Create a query client
const queryClient = new QueryClient()

const App: FC = (): ReactElement => {

  const isAuthenticated = () => {
    const token = localStorage.getItem("token-shoppinglist")
    if (token) {
      return true
    } else {
      return false
    }
  }


  return ( <>
   <QueryClientProvider client = {queryClient}>
    <BrowserRouter>
    {isAuthenticated()  ? <Header></Header> : <></>}
    <Routes>
    <Route path="/login" element= {isAuthenticated() ? <Navigate to="/list" /> : <LoginPage/> } />
    <Route 
    path="/list" 
    element={isAuthenticated() ? <MyList title={"My List"} /> : <Navigate to="/login" /> } />
    <Route path="/lists" element={<OldLists />} />
    </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>

    </>  )
}

export default App
