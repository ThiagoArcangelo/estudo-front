import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

export interface ColunasProps<T, K extends keyof T> {
  header: string;
  accessor: K;
}

interface GenericTableProps<T> {
  data: T[];
  columns: ColunasProps<T, keyof T>[];
}

export default function TableComponent<T>({data, columns}: GenericTableProps<T>) {
    return (
        <Table className="w-full h-full flex flex-col border-[1px] border-zinc-300 rounded-sm">
            <TableHeader className="bg-zinc-200 text-zinc-500 flex justify-center items-center rounded-t-sm">
                <TableRow className="font-extralight font-sans border-b-[1px] border-none w-full h-10 flex justify-around ml-2">
                    {columns.map((column, index) => (
                        <TableHead className="flex items-end text-right" key={index}>{column.header}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody className="bg-zinc-50 min-h-72 w-full rounded-b-sm flex">
                {data.map((row, rowIndex) => (
                    <TableRow  key={rowIndex}>
                        {columns.map((column, columnIndex) => (
                            <TableCell className=" text-right" key={columnIndex}>
                                {String(row[column.accessor])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        //#region Comentado
        // <Table className="w-full h-full flex flex-col border-[1px] border-zinc-300 rounded-sm">
        //     <TableHeader className="bg-zinc-200 text-zinc-500 flex justify-center items-center rounded-t-sm">
        //         <TableRow className="font-extralight font-sans border-b-[1px] border-none w-full h-10 flex justify-around ml-2">
        //             <TableHead className="flex items-end w-full text-right">Código</TableHead>
        //             <TableHead className="flex items-end w-full text-right">Descrição</TableHead>
        //             <TableHead className="flex items-end w-full text-right">Usado</TableHead>
        //         </TableRow>
        //     </TableHeader>
        //     <TableBody className="bg-zinc-50 min-h-72 w-full rounded-b-sm">
        //         <TableRow className="hover:bg-zinc-300 text-left text-zinc-500  border-b-[1px] border-b-zinc-700 ml-2">
        //             <TableCell className="flex items-center w-full text-right"></TableCell>
        //             <TableCell className="flex items-center w-full text-right"></TableCell>
        //             <TableCell className="flex items-center w-full text-right"></TableCell>
        //         </TableRow>
        //     </TableBody>
        // </Table>
        //#endregion
    )
}