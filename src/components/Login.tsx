import { useState } from "react"
import { useNavigate } from "react-router";

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

   const [token,setToken] = useState<string>( localStorage.getItem('token') ||  ''); 
   const [userName,setUSerName] = useState<string>( localStorage.getItem('userName') ||  ''); 

   const [csrfToken,setCsrfToken] = useState<string>( localStorage.getItem('csrfToken') ||  ''); 

   const navigate = useNavigate();

   const saveToken = (token:string) => {
    localStorage.setItem('token', JSON.stringify(token))
   } 

   const saveCsrfToken = (csrfToken:string) => {
    localStorage.setItem('csrfToken', JSON.stringify(csrfToken))
   }

   const saveUserName = (username:string) => {
    localStorage.setItem('userName', JSON.stringify(username))
   }

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
      headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJGYWJyaXppbyIsImV4cCI6MTc2NDY2Nzc2N30.F69MLEJGo0X8Nly_i5NgLyqYSI74uPUrMgpt71MPfP4eTxT9KR56JdoCnZe2xqw6qrqWrN2PzLO3jq_B4mZ7UulMzq16iK_9Ezvkl72-ql2sglRE9YRPXr7MvO0JkwatPJCuS4x6R7Lc-cxKLEeyNZ6gUBgSCS56tMmUb93Q0XwooYBRJ_BRSNWVDgsH3npnHi-wrm1xEd4LYaWeGTtWf1vnVN1UCV5YdlT6EzmfzZTybNs3dZgVTdA-YXWs0a-u4bS2mvcPr80-koLhFfuXoFzvoBRMzu3QLkgyoU93ljXQwOFSlwCFj06l2aZp0BAzPMIV008LnJWZVgIkNZFdCQ`
      },
      body: JSON.stringify({
        email:formData.email, 
        password:formData.password
      })
     })
     .then((response) => response.json()) 
     .then(result => {
      if (result.error == false) {  
             setMessage(result.messageError); 
             setAlert(true);
             console.log(alert);   
       } 
       if (result.message) {          
            console.log(result)  
            setToken(result.token)
            saveToken(result.token)
            setUSerName(result.data.name)
            saveUserName(result.data.name) 
            setCsrfToken(result.csrf)
            saveCsrfToken(result.csrf)
            navigate('/dashboard')
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