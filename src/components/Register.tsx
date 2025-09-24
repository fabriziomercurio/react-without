import { useState } from "react";
import Navbar from "./Navbar"

function Register() 
{
    interface Register
    {
       firstname:string, 
       lastname:string, 
       email:string,
       password:string, 
       city:string,
       age:string
    }
    const [formData, setFormData] = useState<Partial<Register>>({});
    const [message,setMessage] = useState<string>(); 
    const [success,setSuccess] = useState<boolean>(false);

    function handleInputChange(e:any)
    {
       const {name, value} = e.target 

       setFormData({
        ...formData,
        [name]: value
        });

       console.log(formData.firstname); 
    }

    const submitForm = (e:any) =>  
    {   
        e.preventDefault();        
        fetch('http://localhost:8080/api/user-register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: formData.firstname,
            lastname: formData.lastname, 
            email: formData.email, 
            password: formData.password, 
            city: formData.city, 
            age: formData.age
        })
        })
        .then(response => { return response.json();})
        .then(result => { 
            if (result.success) {
                setMessage(result.message); 
                setSuccess(true); 
            }
         })
        .catch(error => {
        console.error('Errore nella richiesta:', error.message);
        });
     
    }
    return(
        <>
        <Navbar />
        <h3 className="mt-3">Register</h3> 
        
        {success &&(
            <div className="container">
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
            </div>
            </div>
        )}       
        
        <div className="container mt-5"> 
         <form onSubmit={submitForm}>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">FirstName</label>
                <input type="text" name="firstname" className="form-control" id="exampleFormControlInput1" onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">LastName</label>
                <input type="text" name="lastname" className="form-control" id="exampleFormControlInput1" onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleFormControlInput1" onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="exampleFormControlInput1" onChange={handleInputChange} />
            </div> 
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Age</label>
                <input type="text" name="age" className="form-control" id="exampleFormControlInput1" onChange={handleInputChange} />
            </div> 
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">City</label>
                <input type="text" name="city" className="form-control" id="exampleFormControlInput1" onChange={handleInputChange} />
            </div>
            <button className="btn btn-success">Register</button>
          </form>
        </div>        
        </>
    )
}
export default Register