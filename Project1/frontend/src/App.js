import './App.css';
import HomePage from './Pages/landingPage';
import User from './Pages/user';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/user' element={<User />}/>
    </Routes>
    </Router>
  );
}

export default App;
