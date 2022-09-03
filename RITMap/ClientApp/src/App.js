import logo from './logo.svg';
import './App.css';

import GoogleMap from './components/Map';
//AIzaSyDH-KRabVOXL9wpJvRoeMJRNvGLn9Qd9wI

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};


function App() {
  return (
    <div>
      <GoogleMap/>
    </div>
  );
}

export default App;
