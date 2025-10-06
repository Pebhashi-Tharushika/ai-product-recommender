import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import ProductPage from './pages/ProductPage';
import PreviewPage from './pages/PreviewPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
          <Route path="/dashboard" element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
