import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductPage from './pages/ProductPage';
import PreviewPage from './pages/PreviewPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", 
        }}
      >
        <Navbar />

        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/preview/:id" element={<PreviewPage />} />
            <Route path="/dashboard" element={<ProductPage />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Router>
  );
}

export default App;
