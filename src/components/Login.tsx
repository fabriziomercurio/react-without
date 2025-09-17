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

   function handleInputChange(e: { target: { name:any, value:any } }) 
   {
      const {name,value} = e.target; 
      
      setFormData({
        ...formData,
        [name] : value // use value of the variable 'name' like key
      })
   } 

   function sendValue(e:any) 
   { 
     e.preventDefault();
     alert(formData.email + ' ' + formData.password); 
   }

    
   return(
    <>
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