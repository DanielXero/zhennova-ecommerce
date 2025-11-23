import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import './App.css'; 

function App() {
  return (
    <div className="App">
      {/* Renderizamos el Header */}
      <Header />
      
      {/* Renderizamos la lista de productos (Main content) */}
      <main>
        <Home />
      </main>

      {/* Renderizamos el Footer */}
      <Footer />
    </div>
  );
}

export default App;