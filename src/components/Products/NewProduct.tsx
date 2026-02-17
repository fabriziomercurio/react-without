import { useState } from "react"
import Navbar from "../Navbar"

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
        descr: string;
        multi_name: string;
        available: number;
        brand: string;
        code: string;
        weight: number;
        image:Blob
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
      const {name, value, type, files} = e.target;      
      setFormData({
        ...formData,
        data: { 
            ...formData.data,
            [name]: type === "file" ? files[0] : value
        }
    }) 
    }

    const handleSubmit = (e:any) => { 
        e.preventDefault(); 

        const form = new FormData(); 
        form.append('name',formData.data?.name ?? '');
        form.append('descr',formData.data?.descr ?? ''); 
        form.append('multi_name',formData.data?.multi_name ?? '');
        form.append('image',formData.data?.image ?? '');

        fetch('http://localhost:8080/api/product', {
        method: 'POST',
        body:form 
        })
        .then(response => {return response.json();} )
        .then(result => {             
             if (result.success) { 
               console.log(result.success)
               setMessage(result.message); 
               setSuccess(true); 
             }else{ 
                console.log(result)
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
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSuccess(false)} />
            </div>
            </div>
            )} 

            <form onSubmit={handleSubmit} encType="multipart/form-data"> 
                <label>Nome</label> 
                <input className={`form-control ${validation.name ? 'is-invalid' : ''} mb-3`} type="text" name="name" value={formData.data?.name} onChange={handleInputChange} />
                 {validation.name && (
                    <div className="invalid-feedback mb-3">
                    {validation.name}
                    </div>
                 )}
                <label>Description</label>
                <textarea className={`form-control ${validation.descr ? 'is-invalid' : ''} mb-3`} name="descr" value={formData.data?.descr} onChange={handleInputChange}></textarea>
                {validation.descr && (
                    <div className="invalid-feedback mb-3">
                    {validation.descr}
                    </div>
                 )} 
                 <div>
                <label>Immagine:</label>
                <input type="file" name="image" onChange={handleInputChange} />
                
            </div>
                <button className="btn btn-outline-success">Send</button>
            </form>
         </div>
        </>
    )
}
export default NewProduct