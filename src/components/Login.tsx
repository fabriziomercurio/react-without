import { useState } from "react"

function Login()
{
   interface stateValue
   {
      email:string, 
      password:string
   }

   const [formData,setFormData] = useState<stateValue>({
        email:"",
        password:""
    }); 
  
   const [message,setMessage] = useState<string>(); 
   const [alert,setAlert] = useState<boolean>(false);

   function handleInputChange(e: { target: { name:any, value:any } }) 
   {
      const {name,value} = e.target; 
      
      setFormData({
        ...formData,
        [name] : value // use value of the variable 'name' like key
      })
   } 

   const sendValue = (e:any) =>  
   { 
     e.preventDefault();
     fetch('http://localhost:8080/api/login', {
      method: 'POST',
     
      body: JSON.stringify({
        email:formData.email, 
        password:formData.password
      })
     })
     .then((response) => response.json()) 
     .then(result => {
       if (result.error) {  
             setMessage(result.error); 
             setAlert(true);
             console.log(alert)  
       } 
       if (result.message) {
             console.log(result)  
       }
      }     
    )
   } 
    
   return(
    <>
    {
      alert &&(
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {setAlert(false)}} />
          </div>
      )
    }
    

    <form onSubmit={sendValue}>
        <div style={{maxWidth: "50%", margin: "0 auto"}}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input name="email" type="email" className="form-control" id="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Example textarea</label>
            <input name="password" type="password" className="form-control" id="password" value={formData.password} onChange={handleInputChange} />
        </div> 
        <button className="btn btn-danger">Submit</button>
      </div>
    </form> 
    </>
   )
} 

export default Login