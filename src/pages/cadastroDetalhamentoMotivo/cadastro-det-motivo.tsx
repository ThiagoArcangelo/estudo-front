import {
  Search,
  ChevronsUpDown,
  Pencil,
  Trash2,
  Plus,
  LoaderCircle,
} from "lucide-react"; ///ArrowUpDown,
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
// import Menu from "../../components/menu/menu";
import { getSedApi } from "../../services/api";
import type { DetMotivo } from "../../models";
import { useCallback, useEffect, useState } from "react";
import { DataTable } from "../../components/tables/datatable";
import type { ColumnDef } from "@tanstack/react-table";
import { DialogCadParametros } from "../../components/dialog/dialog-manutencao-motivo";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useConfirmDialog } from "../../shared/context/ConfirmDialogContext";
import { DataTableSkeleton } from "../table-skeleton/skeleton-datatable";

const { getDetMotivo, deleteDetMotivoExcluir } = getSedApi();

export default function CadDetMotDesligamento() {
  const [descricao, setDescricao] = useState<string>("");
  const [lista, setLista] = useState<DetMotivo[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<DetMotivo>({});
  const { confirmDialog } = useConfirmDialog();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // CARREGA OS DADOS DO GRID NO DIALOG
  const handleOpenDialog = (item: DetMotivo) => {
    setItemSelecionado(item);
    setOpenDialog(true);
  };

  /***********************************************************/
  /**********  DEFINIÇÃO DAS COLUNAS DO DATATABLE  ***********/
  const colunas: ColumnDef<DetMotivo>[] = [
    {
      accessorKey: "Codigo",
      header: ({ column }) => {
        return (
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Código
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("Codigo")}</div>;
      },
    },
    {
      accessorKey: "Descricao",
      header: ({ column }) => {
        return (
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descrição
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("Descricao")}</div>;
      },
      enableResizing: true
    },
    {
      accessorKey: "Usado",
      header: ({ column }) => {
        return (
          <Button
            className="hover:border-l-zinc-100"
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usado
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("Usado")}</div>;
      },
    },
    {
      id: "update",
      header: "",
      cell: ({ row }) => (
        <Button variant="edit" onClick={() => handleOpenDialog(row.original)}>
          <Pencil color="#193cb8" />
        </Button>
      ),
      size: 20,
      maxSize: 25,
      enableResizing: false,
    },
    {
      id: "delete",
      header: "",
      cell: ({ row }) => {
        const codigo = row.getValue("Codigo") as number;
        const isLoading = loadingId === codigo;

        return (
          <Button
            onClick={() => ExcluirDetMotivo(codigo)}
            variant="edit"
            disabled={
              !!loadingId
            } /**DESABILITA APENAS A LINHA SELECIONADA NA TABLE */
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin h-5 w-5" color="red" />
            ) : (
              <Trash2 color="red" />
            )}
          </Button>
        );
      },
      size: 10,
      maxSize: 15,
      enableResizing: false,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescricao(e.target.value);
  };

  /** LISTA DADOS NA TABLE */
  const ListaDetMotivo = useCallback(async (descricao?: string) => {
    try {
      setLoading(true);
      const retorno = await getDetMotivo(undefined, {
        params: { descricao: descricao },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLista(retorno.data);
    } catch (error) {
      toast.error(
        error instanceof AxiosError && error.response
          ? error.response.data.detail
          : "Ocorreu um erro inesperado."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /** EXCLUSÃO DE DADOS NO GRID */
  const ExcluirDetMotivo = useCallback(
    async (codigo: number) => {
      try {
        setLoadingId(codigo); // SETA O LOADING DE UMA ÚNICA LINHA NO GRID

        const confirmado = await confirmDialog("Deseja excluir os dados?");
        if (!confirmado) return;

        const retorno = await deleteDetMotivoExcluir(undefined, {
          params: { codigo },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (retorno.status === 200) {
          toast.success(retorno.data.Mensagem);
          ListaDetMotivo();
        } else {
          toast.warning(retorno.data.Mensagem);
        }
      } catch (error) {
        toast.error(
          error instanceof AxiosError && error.response
            ? error.response.data.Mensagem
            : "Ocorreu um erro inesperado."
        );
      } finally {
        setLoadingId(null);
      }
    },
    [ListaDetMotivo, confirmDialog]
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    ListaDetMotivo(descricao.toUpperCase());
  }

  useEffect(() => {
    ListaDetMotivo();
    setDescricao("");
  }, [ListaDetMotivo]);

  return (
    <div
      id="cad-parametros"
      className="w-full 
            h-screen 
            flex 
            items-center 
            justify-start 
            flex-col "
    >
      {/* <div className="w-full">
        <Menu />
      </div> */}
      {/*Pesquisa */}
      <div className="w-full h-screen flex flex-col items-center mt-10 ">
        <div className="w-10/12 h-10 flex justify-between items-center flex-row">
          {/*Formulário para filtro de busca de parametros */}
          <form
            onSubmit={onSubmit}
            className="w-10/12 h-10 flex flex-row items-center"
          >
            {/** Input de Pesquisa */}
            <Input
              type="text"
              className="w-xs h-8 
                            flex 
                            bg-white
                            border-zinc-500 
                            border-[1px] 
                            rounded-r-none 
                            placeholder:normal-case 
                            uppercase border-r-0 
                            focus:ring-0 
                            focus-visible:ring-0  
                                    text-zinc-500"
              placeholder="Pesquisar parâmetro ..."
              maxLength={30}
              onChange={handleChange}
            />
            {/** Botão de Pesquisa */}
            <Button type="submit" variant="pesquisa" size="pesquisa">
              <Search color="#6a6a6a" size={22} />
            </Button>
          </form>
          <div className="z-10">
            {/** BOTÃO PARA CADASTRAR UM NOVO PARÂMETRO */}
            <Button
              type="button"
              variant="adicionar"
              onClick={() => handleOpenDialog({})}
            >
              <Plus size="22" color="white" />
              Novo
            </Button>
          </div>
        </div>

        <div className=" w-10/12 max-h-[370px] mt-4 overflow-auto border-[1px] border-zinc-300 rounded-lg">
          {loading ? (
            <DataTableSkeleton />
          ) : (
            <DataTable columns={colunas} data={lista} />
          )}
        </div>
      </div>

      {/* MODAL PARA EDIÇÃO */}
      {itemSelecionado && (
        <DialogCadParametros
          objeto="DetMotivo"
          open={openDialog}
          setOpenDialog={setOpenDialog}
          trigger={<></>}
          codigo={itemSelecionado.Codigo || 0}
          descricao={itemSelecionado.Descricao ?? ""}
          usado={itemSelecionado.Usado ?? ""}
          onSucess={ListaDetMotivo}
        />
      )}
    </div>
  );
}
