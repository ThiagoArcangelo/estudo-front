"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  size?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      size: 150,
      minSize: 10,
      maxSize: 500,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    initialState: { pagination: { pageSize } },
    enableColumnResizing: true,
    columnResizeMode: "onChange", 
  });

  return (
      <Table className="w-full rounded-md overflow-auto ">
        <TableHeader className="sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-zinc-600 text-zinc-50 shadow-sm"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="relative text-left "
                  style={{ width: `${header.getSize()}px` }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {/* Resizer */}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute right-0 top-0 h-full w-1 bg-transparent group-hover:bg-zinc-400 cursor-col-resize select-none"
                    />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white ">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-[#e6e6e0] transition-colors"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: `${cell.column.getSize()}px` }}
                    className="text-zinc-600 border-b-[1px] border-zinc-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-zinc-600"
              >
                Nenhum resultado...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
  );
}

// "use client";

// import {
//   type ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   type SortingState,
//   getSortedRowModel,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/table";
// import { useState } from "react";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   pageSize?: number;
//   size?: number;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   pageSize = 10,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = useState<SortingState>([]);

//   // const table = useReactTable({
//   //   data,
//   //   columns,
//   //   getCoreRowModel: getCoreRowModel(),
//   //   getSortedRowModel: getSortedRowModel(),
//   //   onSortingChange: setSorting,
//   //   initialState: {
//   //     pagination: {
//   //       pageSize,
//   //     },
//   //   },
//   //   state: {
//   //     sorting,
//   //   },
//   // });

//   const table = useReactTable({
//   data,
//   columns,
//   defaultColumn: {
//     size: 150,     // largura inicial padrão para todas as colunas
//     minSize: 50,   // largura mínima ao redimensionar
//     maxSize: 500,  // largura máxima ao redimensionar (opcional)
//   },
//   getCoreRowModel: getCoreRowModel(),
//   getSortedRowModel: getSortedRowModel(),
//   onSortingChange: setSorting,
//   state: { sorting },
//   initialState: { pagination: { pageSize } },
// });

//   return (
//     <Table
//       // style={{ width: table.getCenterTotalSize()}}
//       className="w-full  h-auto border-separate border-spacing-0  border rounded-md overflow-hidden  border-zinc-300"
//     >
//       <TableHeader className="sticky top-0 z-10">
//         {table.getHeaderGroups().map((headerGroup) => (
//           <TableRow
//             className="bg-zinc-600 text-zinc-50 shadow-sm"
//             key={headerGroup.id}
//           >
//             {headerGroup.headers.map((header) => {
//               return (
//                 <TableHead
//                   className="text-left min-w-2 "
//                   key={header.id}
//                   style={{ width: `${header.getSize()}px` }}
//                 >
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </TableHead>
//               );
//             })}
//           </TableRow>
//         ))}
//       </TableHeader>
//       <TableBody className="bg-white">
//         {table.getRowModel().rows?.length ? (
//           table.getRowModel().rows.map((row) => (
//             <TableRow
//               className="hover:bg-[#e6e6e0]
//                              transition-colors"
//               key={row.id}
//               data-state={row.getIsSelected() && "selected"}
//             >
//               {row.getVisibleCells().map((cell) => (
//                 <TableCell
//                   key={cell.id}
//                   style={{ width: `${cell.column.getSize()}px` }}
//                   className="  text-zinc-600"
//                 >
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))
//         ) : (
//           <TableRow>
//             <TableCell
//               colSpan={columns.length}
//               className="h-24 text-center text-zinc-500"
//             >
//               Nenhum resultado...
//             </TableCell>
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }