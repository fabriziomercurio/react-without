import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar"
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

function Product() {

  const [dataset,setData] = useState<Product[]>([]); 
  const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 15, // numero di record per pagina
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
    .then((response) => response.json()) 
    .then((json) => { setData(json); console.log(json)})
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

  const products = useMemo(() => dataset, [dataset]);

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
         <button className="btn btn-danger m-1" onClick={() => alert(row.row.original.id)}>delete</button>
         <button className="btn btn-warning m-1">edit</button>
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
    getPaginationRowModel:getPaginationRowModel()
  })

  return (
    <>
      <Navbar />
      <div className="container mt-5">
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
  )
}
export default Product


