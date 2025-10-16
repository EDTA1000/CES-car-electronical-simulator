import logo from './logo.svg';
import './App.css';
function App() {
  return (
    <div className="App">
      <div className="logo-container">
        <img src="/logo512.png" alt="logo512" className="logo512" />
        <div className="lightning"></div>
        <div className="lightning"></div>
        <div className="lightning"></div>
      </div>
    </div>
  );
}
<button className="subscribe-button" onClick={() => window.location.href = "/subscribe"}>
  اشتراک
</button>
export default App;
