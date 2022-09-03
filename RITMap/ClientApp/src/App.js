import logo from './logo.svg';
import './App.css';

import GoogleMap from './components/Map';
import Nav from './components/Navbar';
//AIzaSyDH-KRabVOXL9wpJvRoeMJRNvGLn9Qd9wI

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};


function App() {
  return (
    <div>
      <Nav/>
      <GoogleMap/>
    </div>
  );
}

export default App;
