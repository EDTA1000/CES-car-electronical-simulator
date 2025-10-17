import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Subscribe from './pages/Subscribe';

function Home() {
  return (
    <div className="App">
      <div className="ces-container">
        <img src="/CES.png" alt="CES Logo" className="ces-logo" />
        <img src="/wheel.png" alt="Wheel" className="wheel" />
        <img src="/lighting.png" alt="Lightning" className="lightning" />
      </div>
      <button
        className="subscribe-button"
        onClick={() =>
          (window.location.href =
            "/CES-car-electronical-simulator/subscribe")
        }
      >
        اشتراک
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/CES-car-electronical-simulator">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
