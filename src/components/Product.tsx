import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar"
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Navigate, useNavigate } from "react-router";

function Product() {

  let navigate = useNavigate(); 

  const [dataset,setData] = useState<Product[]>([]); 
  const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 15, // numero di record per pagina
  }); 

  const [selectedId, setSelectedId] = useState(null);

  const token = localStorage.getItem('token');
  const [message,setMessage] = useState<string>(); 
  const [success,setSuccess] = useState<boolean>(false);
  const products = useMemo(() => dataset, [dataset]); 

  const loadProducts = () => {
  fetch("http://localhost:8080/api/products")
    .then(res => res.json())
    .then(data => setData(data));
  };
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
    .then((response) => response.json()) 
    .then((json) => { setData(json);})
  },[])

  interface Product {
    id: number;
    name: string;
    price:number;
    description:string;
    available:number; 
    brand:string; 
    code:string;
  } 

  const deleteRecord = (id: any) => {
        fetch(`http://localhost:8080/api/products/${id}`, {
         method: 'DELETE',
         headers: {
             'Content-Type': 'application/json', 
             'X-CSRFToken': localStorage.getItem('csrfToken') || ''
         }, 
      }) 
      .then((response) => {return response.json()})
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

  const handleDelete = (id: any) => {
    setSelectedId(id);
  }  

  const handleEdit = (id: any) => {
     navigate('/products/' + id)
  }

  const columns: ColumnDef<Product>[] = [ 
    {
    accessorKey: 'id',
    header: 'ID',
    cell: info => info.getValue(),
    },
    {
    accessorKey: 'name',
    header: 'Name',
    cell: info => info.getValue(),
    },
    {
    accessorKey: 'price',
    header: 'price',
    cell: info => info.getValue(),
    },
    {
    accessorKey: 'description',
    header: 'description',
    cell: info => {
      const value = info.getValue() as string;
      return value.length > 25 ? value.substring(0, 25) + "..." : value;
      },
     },
    {
    accessorKey: 'available',
    header: 'available',
    cell: info => info.getValue(),
    },
    {
    accessorKey: 'brand',
    header: 'brand',
    cell: info => info.getValue(),
    },
    {
    accessorKey: 'code',
    header: 'code',
    cell: info => info.getValue(),
    },
    {
    id: 'actions',
    header: 'Actions',
    cell: (row => (
      <div>
         <button className="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleDelete(row.row.original.id)}>delete</button>
         <button className="btn btn-warning m-1" onClick={() => handleEdit(row.row.original.id)} >edit</button>
      </div>
    ))
    }
  ]

  const table = useReactTable<Product>({
    data: products,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(), 
    getPaginationRowModel:getPaginationRowModel(), 
    autoResetPageIndex: false
  }) 

  return (
  <>
  <Navbar />
    
  <div className="container mt-5">
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                Are you sure record with id <strong>{selectedId}</strong>?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal" 
                 onClick={() => {
                setSuccess(false);
                loadProducts();
              }}
              >
                Close
              </button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteRecord(selectedId)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="container mt-5"> 

      {success && (
        <>
           <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setSuccess(false);
                loadProducts();
              }}
            />
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSuccess(false);
                loadProducts();
              }}
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show"></div>
        </>
      )}

      <table className="table table-striped">
          <thead>
            {
              table.getHeaderGroups().map(headerGroup =>
                <tr key={headerGroup.id}>
                  {
                    headerGroup.headers.map(header => (
                      <th key={header.id}>
                        {
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </th>
                    ))}
                </tr>
              )}
          </thead>
          <tbody>
            {
              table.getRowModel().rows.map(row =>
                <tr key={row.id}>
                  {
                    row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                      </td>
                    ))}
                </tr>
              )}
          </tbody>
        </table> 
        <div className="mb-5 pagination">
          <button className="border" onClick={() => table.setPageIndex(0)}>First Page</button>
          <button className="border" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous Page</button>
          <button className="border" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
          <button className="border" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
        </div> 

    </div>

         
   


  </>
);
}

export default Product


