import { useEffect } from "react"
import { useNavigate } from "react-router";

function Dashboard()
{
   const firstname = localStorage.getItem('userName');
   let navigate = useNavigate(); 

   const removeItems = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      navigate('/');
   }

   useEffect(() => {
     const token = localStorage.getItem('token'); 
     if(!token)
     {
         navigate('/');
     }  
   }, [])
    
    return(<>
    Benvenuto {firstname}
    <button className="btn btn-danger" onClick={removeItems} >Logout</button>
    
    </>)
}
export default Dashboard