import './App.css';
import HomePage from './Pages/landingPage';
import User from './Pages/user';
import New from './Components/new';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/getuser' element={<User />}/>
      <Route path='/new' element={<New />}/>
    </Routes>
    <Footer />
    </Router>
  );
}

export default App;
