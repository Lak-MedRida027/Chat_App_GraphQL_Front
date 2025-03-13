import { useState } from 'react';
import './App.css';
import AuthScreen from './pages/AuthScreen';
import Home from './pages/Home';

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt')?true:false)

  return (
    <>
    {
      loggedIn? (
        <Home setLoggedIn={setLoggedIn}/>
      ) : (
        <AuthScreen setLoggedIn={setLoggedIn}/>
      )
    }
    </>
  );
}

export default App;
