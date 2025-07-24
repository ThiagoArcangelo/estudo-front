import { Menu, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";

export function TableSkeleton() {
  return (
    <div className="w-full h-screen">
      <div>
        <Menu />
      </div>
      <div className="w-10/12 h-10 flex justify-between items-center flex-row">
        {/*Formulário para filtro de busca de parametros */}
        <form className="w-10/12 h-10 flex flex-row items-center ">
          {/** Input de Pesquisa */}
          <Input type="text" />
          {/** Botão de Pesquisa */}
          <Button type="submit" variant="pesquisa" size="pesquisa">
            <Search color="#6a6a6a" size={22} />
          </Button>
        </form>
        <div className="z-10">
          {/** Botão para cadastrar um novo parâmetro */}
          <Button className="" />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[200px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[200px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[200px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[200px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[200px]" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
