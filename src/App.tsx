import { FC, ReactElement } from 'react';
import './App.css'
import Header from './components/header/Header'
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MyList from './components/myList/MyList';
import OldLists from './pages/OldLists';
import LoginPage from './pages/LoginPage';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import OneList from './pages/OneList';
import Home from './pages/Home';
import ActiveLists from './pages/ActiveLists';

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
    path="/home" 
    element={isAuthenticated() ? <Home/> : <Navigate to="/login" /> } />
    <Route path="/lists" element={<ActiveLists />} />
    <Route path="/lists/old" element={<OldLists />} />
    <Route path="/lists/:listId" element={<OneList />} />
    </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>

    </>  )
}

export default App
