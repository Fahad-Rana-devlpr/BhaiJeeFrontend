import './App.css';
import Home from './component/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UploadFile from './component/UploadFile';
import LogIn from './component/LogIn';
function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/home' element = {<Home/> }/>
          <Route path='/uploadFile' element = {<UploadFile/> }/>
          <Route path='/' element = {<LogIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
