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
        name?: string;
        price?: number;
        category?: string;
        description?: string;
        available?: number;
        brand?: string;
        code?: string;
        weight?: number;
    } | null;
    details:{
       status:boolean; 
       core:string
    };
    statusCode: number;
    token: string;
    csrf: string;
    }

   const [formData, setFormData] = useState<Partial<Omit<ProductResponse, 'data' | 'details'>> & {data?: Partial<ProductResponse['data']>; details?: Partial<ProductResponse['details']>}>({
        success:true,
        data: {
            name: 'fabrizio', 
            description:'testo di prova'
        },
        details: {
            status: true
        }
    })

    const handleSubmit = () => {
        alert()
    }
    return(
        <> 
        <Navbar />
         <div className="container mt-5">

            <form onSubmit={handleSubmit}> 
                <label>Nome</label> 
                <input className="form-control mb-3" type="text" name="name" value={formData.data?.name}/>
                <label>Description</label>
                <textarea className="form-control mb-3" name="description" value={formData.data?.description}></textarea>
                <button className="btn btn-outline-success">Send</button>
            </form>
         </div>
        </>
    )
}
export default NewProduct