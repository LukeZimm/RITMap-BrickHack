import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Nav from './components/Nav';
import Map from './components/Map';
import FaqStatement from "./components/Faq";
import Feed from './components/Feed';
import Contact from './components/Contact';

import './App.css';


function App() {
  return (
    <Router>
      <Nav/>
        <Routes>
          <Route path="*" element={<Map/>}/>
          <Route path="/faq" element={<FaqStatement/>}/>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Router>
  );
}

export default App;
