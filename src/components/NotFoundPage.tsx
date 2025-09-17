import { Link } from "react-router";

function NotFoundPage() 
{
    return(
        <>
        <h2 className="mt-5">Page Not Found</h2>
         <Link to={"/"}>
          <button className="btn btn-primary mt-5">Go back home</button>
         </Link>
        </>
    )
}

export default NotFoundPage; 