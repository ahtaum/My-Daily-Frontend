import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import About from './pages/About';
import Detail from './pages/Detail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Edit from './pages/Edit';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>

          <Navbar />

          <Routes>

            <Route path="/" element={ user ? <Home /> : <Navigate to="login" /> } />
            <Route path="/about" element={ user ? <About /> : <Navigate to="login" /> } />
            <Route path="/detail/:id" element={ user ? <Detail /> : <Navigate to="login" /> } />
            <Route path='/edit/:id' element={ user ? <Edit /> : <Navigate to="login" /> } />
            <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" /> } />
            <Route path="/signup" element={ !user ? <Signup /> : <Navigate to="/" /> } />
            
          </Routes>

          <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
