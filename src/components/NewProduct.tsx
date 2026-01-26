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

        const test = new FormData(); 
        test.append('name',formData.data?.name ?? '');
        test.append('description',formData.data?.description ?? ''); 
        test.append('multi_name',formData.data?.multi_name ?? '');
        test.append('image',formData.data?.image ?? '');

        fetch('http://localhost:8080/api/product', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // },
        // body: JSON.stringify({
        //     name: formData.data?.name,
        //     description: formData.data?.description, 
        //     multi_name: formData.data?.multi_name
        // }) 
        body:test 
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
                <textarea className={`form-control ${validation.description ? 'is-invalid' : ''} mb-3`} name="description" value={formData.data?.description} onChange={handleInputChange}></textarea>
                {validation.description && (
                    <div className="invalid-feedback mb-3">
                    {validation.description}
                    </div>
                 )} 
                <label>Name Image</label>
                <textarea className={`form-control ${validation.multi_name ? 'is-invalid' : ''} mb-3`} name="multi_name" value={formData.data?.multi_name} onChange={handleInputChange}></textarea>
                {validation.multi_name && (
                    <div className="invalid-feedback mb-3">
                    {validation.multi_name}
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