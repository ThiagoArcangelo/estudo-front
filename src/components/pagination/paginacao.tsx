import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Pagination, PaginationContent, PaginationItem } from "../ui/pagination";
import { Button } from "../ui/button";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Paginacao({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  // Se não houver páginas, não renderiza nada
  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {/* Botão Primeira Página */}
        <PaginationItem>
          <Button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            variant="ghost"
            size="sm"
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
        </PaginationItem>

        {/* Botão Página Anterior */}
        <PaginationItem>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
        </PaginationItem>

        {/* Números das páginas (com otimização para muitas páginas) */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          // Mostrar apenas algumas páginas ao redor da atual
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <Button
                  onClick={() => onPageChange(pageNumber)}
                  variant={currentPage === pageNumber ? "outline" : "ghost"}
                  size="sm"
                >
                  {pageNumber}
                </Button>
              </PaginationItem>
            );
          }

          // Mostrar "..." para páginas ocultas
          if (
            pageNumber === currentPage - 2 ||
            pageNumber === currentPage + 2
          ) {
            return (
              <PaginationItem key={`ellipsis-${pageNumber}`}>
                <span className="px-2">...</span>
              </PaginationItem>
            );
          }

          return null;
        })}

        {/* Botão Próxima Página */}
        <PaginationItem>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="ghost"
            size="sm"
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
        </PaginationItem>

        {/* Botão Última Página */}
        <PaginationItem>
          <Button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            variant="ghost"
            size="sm"
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
