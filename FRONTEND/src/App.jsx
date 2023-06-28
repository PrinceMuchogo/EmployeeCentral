import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='App'>
      <Header/>
      <ToastContainer/>
      <body style={{paddingBottom: '50px', marginLeft:'auto'}} className='root-comp'>
          <Outlet/>
      </body>

      <footer className='my-2 footer'>
          <Footer/>
      </footer>
      
    </div>
    
  )
}

export default App