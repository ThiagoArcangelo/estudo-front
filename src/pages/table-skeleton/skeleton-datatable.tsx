import { Skeleton } from "../../components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

export function DataTableSkeleton() {
  return (
    <Table className="w-full h-auto border-separate border-spacing-0 border rounded-md overflow-hidden border-zinc-300">
      {/* Cabeçalho da tabela */}
      <TableHeader className="sticky top-0 z-10">
        <TableRow className="bg-zinc-600 text-zinc-50 shadow-sm">
          <TableHead className="text-left min-w-2">
            <Skeleton className="h-5 w-20 bg-zinc-400" /> {/* Código */}
          </TableHead>
          <TableHead className="text-left min-w-2">
            <Skeleton className="h-5 w-48 bg-zinc-400" /> {/* Descrição */}
          </TableHead>
          <TableHead className="text-left min-w-2">
            <Skeleton className="h-5 w-16 bg-zinc-400" /> {/* Usado */}
          </TableHead>
          <TableHead className="text-center min-w-2">
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-400 mx-auto" /> {/* Editar */}
          </TableHead>
          <TableHead className="text-center min-w-2">
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-400 mx-auto" /> {/* Excluir */}
          </TableHead>
        </TableRow>
      </TableHeader>

      {/* Corpo da tabela */}
      <TableBody className="bg-white">
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow
            key={i}
            className="hover:bg-[#e6e6e0] transition-colors"
          >
            <TableCell className="text-zinc-600">
              <Skeleton className="h-4 w-20 bg-zinc-300 mx-auto" />
            </TableCell>
            <TableCell className="text-zinc-600">
              <Skeleton className="h-4 w-48 bg-zinc-300 mx-auto" />
            </TableCell>
            <TableCell className="text-zinc-600">
              <Skeleton className="h-4 w-16 bg-zinc-300 mx-auto" />
            </TableCell>
            <TableCell className="text-center text-zinc-600">
              <Skeleton className="h-5 w-5 rounded-full mx-auto bg-zinc-300" />
            </TableCell>
            <TableCell className="text-center text-zinc-600">
              <Skeleton className="h-5 w-5 rounded-full mx-auto bg-zinc-300" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
