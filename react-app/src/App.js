import { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Messenger from './pages/messenger/Messenger';
import Profile from './pages/profile/Profile';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={user ? <Navigate to='/messenger' /> : <Login />}
        ></Route>
        <Route
          path='/login'
          element={user ? <Navigate to='/messenger' /> : <Login />}
        ></Route>
        <Route path='/register' element={<Registration />}></Route>
        <Route
          path='/messenger'
          element={
            user && socket ? (
              <>
                <Navbar />
                <Layout>
                  <Messenger socket={socket} />
                </Layout>
              </>
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route path='/profile/:username' element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
