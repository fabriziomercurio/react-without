import { useEffect, useState } from "react"
import Navbar from "./Navbar"

function Product()
{ 
  interface TypePost 
  {
    userId: number;
    id: number;
    name: string;
    body: string;
  }
  const [data,setData] = useState<TypePost[]>([])

  useEffect(() => {
    //fetch("https://jsonplaceholder.typicode.com/posts") 
    fetch("http://localhost:8080/api/products")
    .then((response) => response.json()) 
    .then((json) => { setData(json); console.log(json)})
  },[])

  return(
    <>
      <Navbar /> 
      <div className="container mt-5">
        <h2>List of products</h2> 
         <div className="row">
           {data.map((post:any) => ( 
                <div key={post.id} className="mb-3">
                  <h5>{post.name}</h5> 
                  <p>{post.body}</p>
                </div>
              ))}
         </div>
      </div>
    </>
  )
} 
export default Product 


{/* <>
      <Navbar />
      <div className="container mt-5">
        <h3>Lista dei post</h3>
        {data.map((post) => (
          <div key={post.id} className="mb-3">
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </> */}