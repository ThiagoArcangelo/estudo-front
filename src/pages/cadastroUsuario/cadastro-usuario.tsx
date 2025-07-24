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
import type { PerguntaAvaliacao, Motivo } from "../../models";
import { useCallback, useEffect, useState } from "react";
import { DataTable } from "../../components/tables/datatable";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useConfirmDialog } from "../../shared/context/ConfirmDialogContext";
import { DialogPerguntaAvaliacao } from "../../components/dialog/dialog-pergunta-avaliacao";
import { DataTableSkeleton } from "../table-skeleton/skeleton-datatable";

const { getUsuario, deleteUsuarioExcluir } = getSedApi();

export default function CadastroUsuario() {
  const [usuario, setUsuario] = useState<string>("");
  const [lista, setLista] = useState<Motivo[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<PerguntaAvaliacao>({});
  const { confirmDialog } = useConfirmDialog();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // CARREGA OS DADOS DO GRID NO DIALOG
  const handleOpenDialog = (item: PerguntaAvaliacao) => {
    setItemSelecionado(item);
    setOpenDialog(true);
  };

  /***********************************************************/
  /**********  DEFINIÇÃO DAS COLUNAS DO DATATABLE  ***********/
  const colunas: ColumnDef<PerguntaAvaliacao>[] = [
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
      size: 35
    },
    {
      accessorKey: "Nome",
      header: ({ column }) => {
        return (
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("Nome")}</div>;
      },
    },
    {
      accessorKey: "User",
      header: ({ column }) => {
        return (
          <Button
            className="hover:border-l-zinc-100"
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usuário
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("User")}</div>;
      },
    },
    {
      accessorKey: "Adm",
      header: ({ column }) => {
        return (
          <Button
            className="hover:border-l-zinc-100"
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Adm
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("Adm")}</div>;
      },
      size: 40
    },
    {
      accessorKey: "Ativo",
      header: ({ column }) => {
        return (
          <Button
            className="hover:border-l-zinc-100"
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ativo
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("Ativo")}</div>;
      },
      size: 40
    },
    {
      id: "update",
      header: "",
      cell: ({ row }) => (
        <Button variant="edit" onClick={() => handleOpenDialog(row.original)}>
          <Pencil color="#193cb8" />
        </Button>
      ),
      size: 10,
      maxSize: 15,
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
            onClick={() => ExcluirCadFatores(codigo)}
            variant="edit"
            disabled={
              !!loadingId
            } /**DESABILITA APENAS A LINHA SELECIONADA NA TABLE */
          >
            {isLoading ? (
              <LoaderCircle
                className="animate-spin h-5 w-5 bg-zinc-"
                color="red"
              />
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

  /** CAPTURA O CAMPO DE PESQUISA */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario(e.target.value);
  };

  /** LISTA DADOS NA TABLE */
  const ListaUsuarios = useCallback(async (usuario?: string) => {
    try {
      setLoading(true);
      const retorno = await getUsuario({
        params: { usuario },
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
  const ExcluirCadFatores = useCallback(
    async (codigo: number) => {
      try {
        setLoadingId(codigo); // SETA O LOADING DE UMA ÚNICA LINHA NO GRID

        const confirmado = await confirmDialog("Deseja excluir os dados?");
        if (!confirmado) return;

        const retorno = await deleteUsuarioExcluir(undefined, {
          params: { codigo },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (retorno.status === 200) {
          toast.success(retorno.data.Mensagem);
          ListaUsuarios();
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
    [ListaUsuarios, confirmDialog]
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    ListaUsuarios(usuario.toUpperCase());
  }

  useEffect(() => {
    ListaUsuarios();
  }, [ListaUsuarios]);

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
              placeholder="Pesquisar usuário ..."
              maxLength={30}
              onChange={handleChange}
            />
            {/** Botão de Pesquisa */}
            <Button type="submit" variant="pesquisa" size="pesquisa">
              <Search color="#6a6a6a" size={22} />
            </Button>
          </form>
          <div className="z-10">
            {/** Botão para cadastrar um novo parâmetro */}
            <Button
              type="button"
              variant="adicionar"
              onClick={() => handleOpenDialog({})}
            >
              <Plus size="22" color="white" />
              Novo Usuário
            </Button>
          </div>
        </div>

        <div className=" w-10/12 max-h-[370px] mt-4 overflow-auto border-[1px] border-zinc-300 rounded-lg ">
          {loading ? (
            <DataTableSkeleton />
          ) : (
            <DataTable columns={colunas} data={lista} />
          )}
        </div>
      </div>

      {/* MODAL PARA EDIÇÃO */}
      {itemSelecionado && (
        <DialogPerguntaAvaliacao
          open={openDialog}
          setOpenDialog={setOpenDialog}
          trigger={<></>}
          codigo={itemSelecionado.Codigo || 0}
        //   usuario={itemSelecionado.usuario ?? ""}
          usado={itemSelecionado.Usado ?? ""}
          motivo={itemSelecionado.Motivo ?? ""}
          onSucess={ListaUsuarios}
        />
      )}
    </div>
  );
}
