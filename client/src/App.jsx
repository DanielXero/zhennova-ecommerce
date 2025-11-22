import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { Footer } from './components/Footer';
import './App.css'; // Puedes mantener los estilos o borrarlos si prefieres

function App() {
  return (
    <div className="App">
      {/* Renderizamos el Header */}
      <Header />
      
      {/* Renderizamos la lista de productos (Main content) */}
      <main>
        <ProductList />
      </main>

      {/* Renderizamos el Footer */}
      <Footer />
    </div>
  );
}

export default App;