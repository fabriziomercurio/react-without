import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar'
import Login from './components/Login'

function App() {

  return (
    <>  
    <Navbar />
    <div className="container mb-5">
      <Login /> 
    </div>   
    </>
  )
}

export default App
