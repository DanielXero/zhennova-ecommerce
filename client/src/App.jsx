import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { Routes, Route } from 'react-router-dom'; 
import './App.css'; 

function App() {
  return (
    <div className="App">
     
      <Header />
      
     
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      
      <Footer />
    </div>
  );
}

export default App;