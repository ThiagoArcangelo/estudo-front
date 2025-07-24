import {
  Table,
  TableBody,
//   TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface IProps<T> {
    data: T[];
    columns: {
        heading: string;
        element: (row: T) => JSX.Element;
    }[];
}

export default function GenericTableCadMotivos<T>({data, columns}: IProps<T>) {
    return (
        <Table className="w-full h-full flex flex-col border-[1px] border-zinc-300 rounded-sm">
            <TableHeader className="bg-zinc-200 text-zinc-500 flex justify-center items-center rounded-t-sm">
                <TableRow className="font-extralight font-sans border-b-[1px] border-none w-full h-10 flex justify-around ml-2">
                    {columns.map(({heading}, index) => (
                        <TableHead 
                            key={`column-${index}`} 
                            className="flex items-end w-full text-right"
                        >
                            {heading}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody className="bg-zinc-50 min-h-72 w-full rounded-b-sm">
                {data.map((row, rowIndex) => (
                    <TableRow 
                        key={rowIndex} 
                        className="hover:bg-zinc-300 text-left text-zinc-500  border-b-[1px] border-b-zinc-700 ml-2"
                    >
                        {columns.map((column, columnIndex) => (
                            <TableCell 
                                key={`${rowIndex}-${columnIndex}`} 
                                className="flex items-center w-full text-right"
                            >
                                {column.element(row)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}              
            </TableBody>
        </Table>
    )
}