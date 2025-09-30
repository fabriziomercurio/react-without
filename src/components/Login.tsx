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

   const navigate = useNavigate();

   const saveToken = (token:string) => {
    localStorage.setItem('token', JSON.stringify(token))
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
          'Authorization': `Bearer J9joxLCJ1c2VyX25hbWUiOiJGYWJyaXppbyIsImV4cCI6MTc1OTIyNjAwNX0.THTeuOVR0xeav-SFUTmu3TmWGRZR1VP12y7P8TzWAq-EKLPnqGdNbBjY-_GMLw6HmrQmtRrJLxeFCQlrH53-d477eW3Li3Xaqog7Sd4owGOn-WMLxUCYAMVHIab4SBD2BYRD-HPI0mMtfiWVsr6hAg4f5uZWMANi17I8fBDtLiy5pnoK2fIlkUJWrznR5MFZKMorwRRfsw68MUaa8BID9aR0UJIkWEreLXfMUnFfaxlqTfJXTKHt_qUq7DAbyxjgSUMr_fkrpes7wF6ajI-vEB41RqU7E46omb0ZhkvwU80RtA3A-awmIpee-vNwsdDdcsRGoQ9Vr1wg2IQ`
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