import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import { useParams } from "react-router";

function ProductEdit() { 

   interface ProductResponse {
    success: boolean;
    error: boolean;
    message: string;
    messageError: string;
    data: {
        id?: number;
        name?: string;
        price?: number;
        category?: string;
        description?: string;
        available?: number;
        brand?: string;
        code?: string;
        weight?: number;
    } | null;
    statusCode: number;
    token: string;
    csrf: string;
    } 

   const [product, setProduct] = useState<ProductResponse | null>(null); 
   const [formData, setFormData] = useState<Partial<ProductResponse | null>>({}); 

   const { id } = useParams<{ id?: string }>();

    if (!id) {
     throw new Error("id parameter is missing");
    }

    const numericId = parseInt(id, 10);
 
    useEffect(() => {
    fetch(`http://localhost:8080/api/product/${numericId}`)
        .then((response) => response.json())
        .then((data) => {
        setProduct(data);
        setFormData(data); // 👈 inizializza subito il form con i dati della tabella
        })
        .catch((error) => {
        console.error("Errore nel fetch del prodotto:", error);
        });
    }, [numericId]); 

    // handleInputChange aggiorna lo stato del form
    const handleInputChange = ((e:any) => { 

        const {name,value} = e.target; // Prende il nome e il valore dell’input

         setFormData({
            ...formData, // copia tutto quello che già c’è nello stato. => ...formData copia tutto l’oggetto di stato attuale dentro al nuovo oggetto.
            data: {
                ...formData?.data, 
                [name]:value
            }
         }); 
    })

    const submitForm = ((e:any) => {
        e.preventDefault(); 
        fetch(`http://localhost:8080/api/product-update/${numericId}`,{
            method: 'PUT', 
            headers:{
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify({
            description: formData?.data?.description,
            code: formData?.data?.code
          })
        }).then((response) => {return response.json()})
        .then((data) => console.log(data))
    })

   return(
    <>
     <Navbar />
     <div className="container mt-5"> 

        {product &&  product.data === null && (
          <h2>{product.messageError}</h2>
        )}
      
        {product?.data && (
        <>
         <h2>{product?.data?.name}</h2>  
         <form onSubmit={submitForm}>
         <input className="mt-3 form-control" type="text" id="description" name="description" onChange={handleInputChange} value={formData?.data?.description} />
         <input className="mt-3 form-control" type="text" id="code" name="code" onChange={handleInputChange} value={formData?.data?.code} />
         <button className="btn btn-outline-warning mt-4">Update</button>
         </form>
        </>
    )}
    
     </div>
    </>
   )
} 

export default ProductEdit