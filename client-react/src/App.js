import logo from './logo.svg';
import './App.css';
function App() {
  return (
    <div className="App">
      <div className="ces-container">
        <img src="/CES.png" alt="CES Logo" className="ces-logo" />
        <img src="/wheel.png" alt="Wheel" className="wheel" />
        <img src="/lighting.png" alt="Lightning" className="lightning" />
      </div>
      <button className="subscribe-button" onClick={() => window.location.href = "/subscribe"}>
        اشتراک
      </button>
    </div>
  );
}
export default App;
