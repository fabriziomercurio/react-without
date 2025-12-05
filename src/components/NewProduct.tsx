import { useState } from "react"
import Navbar from "./Navbar"

function NewProduct() 
{
    interface ProductResponse {
    success: boolean;
    error: boolean;
    message: string;
    messageError: string;
    data: {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
        available: number;
        brand: string;
        code: string;
        weight: number;
    } | null;
    details:{
       status:boolean; 
       core:string
    };
    statusCode: number;
    token: string;
    csrf: string;
    }

   const [success, setSuccess] = useState(false); 
   const [message, setMessage] = useState<string | boolean>(false); 

   const [validation, setValidation] = useState<Record<string, string | number | boolean>>({})

   const [formData, setFormData] = useState<Partial<Omit<ProductResponse, 'data' | 'details'>> & {data?: Partial<ProductResponse['data']>; details?: Partial<ProductResponse['details']>}>({
       data:{
        available:1 
       }     
   })

   const handleInputChange = (e:any) => {
      const {name, value} = e.target;      
      setFormData({
        ...formData,
        data: { 
            ...formData.data,
            [name]: value,
        }
    }) 
    }

    const handleSubmit = (e:any) => { 
        e.preventDefault(); 
        fetch('http://localhost:8080/api/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.data?.name,
            description: formData.data?.description
        })
        })
        .then(response => {return response.json();} )
        .then(result => {             
             if (result.success) {
               setMessage(result.message); 
               setSuccess(true); 
             }else{
                setValidation(result); 
             } 
         })
        .catch(error => { 
           console.error('Errore nella richiesta:', error.message);
        });
    } 

    return(
        <> 
        <Navbar />
         <div className="container mt-5">

            {success &&(
            <div className="container">
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
            </div>
            </div>
            )} 

            <form onSubmit={handleSubmit}> 
                <label>Nome</label> 
                <input className={`form-control ${validation.name ? 'is-invalid' : ''} mb-3`} type="text" name="name" value={formData.data?.name} onChange={handleInputChange} />
                 {validation.name && (
                    <div className="invalid-feedback mb-3">
                    {validation.name}
                    </div>
                 )}
                <label>Description</label>
                <textarea className={`form-control ${validation.description ? 'is-invalid' : ''} mb-3`} name="description" value={formData.data?.description} onChange={handleInputChange}></textarea>
                {validation.description && (
                    <div className="invalid-feedback mb-3">
                    {validation.description}
                    </div>
                 )}
                <button className="btn btn-outline-success">Send</button>
            </form>
         </div>
        </>
    )
}
export default NewProduct