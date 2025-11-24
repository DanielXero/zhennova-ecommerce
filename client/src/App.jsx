import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

import './App.css'; 

function App() {
  return (
    <div className="App">
     
      <Header />
      
     
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      
      <Footer />
    </div>
  );
}

export default App;