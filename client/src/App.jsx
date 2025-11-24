import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

// Importamos los nuevos componentes:
import { ProductList } from './components/ProductList';
import { AboutUs } from './pages/AboutUs'; // 👈 NUEVA IMPORTACIÓN
import { Contact } from './pages/Contact'; // 👈 NUEVA IMPORTACIÓN

import './App.css'; 

function App() {
  return (
    <div className="App">
      
      <Header />
      
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          {/* Añadimos las nuevas rutas: */}
          <Route path="/nosotros" element={<AboutUs />} />   {/* 👈 NUEVA RUTA */}
          <Route path="/contacto" element={<Contact />} />   {/* 👈 NUEVA RUTA */}
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      
      <Footer />
    </div>
  );
}

export default App;