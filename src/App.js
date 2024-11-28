
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './comp/Header';
import Home from './pages/Home';
import Auth from './pages/Auth';


function App() {
  return (
    <div className="App">
    <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/auth" element={<Auth></Auth>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
