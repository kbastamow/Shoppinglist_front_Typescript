import { FC, ReactElement } from 'react';
import './App.css'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MyList from './pages/MyList';
import OldLists from './pages/OldLists';


const App: FC = (): ReactElement => {
  return ( <>
    <BrowserRouter>
    <Header username={"Mary"}></Header>
    <Routes>
    <Route path="/list" element={<MyList title={"My List"} />} />
    <Route path="/lists" element={<OldLists />} />
    </Routes>
    </BrowserRouter>

    </>  )
}

export default App
