import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Combobox, type options } from "../combobox/combobox";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import * as yup from "yup";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { PerguntaAvaliacao } from "../../models";
import { ConfirmDialogContext } from "../../shared/context/ConfirmDialogContext";
import { getSedApi } from "../../services/api";
import { LoaderCircle, ShieldQuestion } from "lucide-react";

interface ItemProps {
  trigger: ReactNode;
  codigo?: number;
  descricao?: string;
  usado?: string;
  motivo?: string;
  open?: boolean;
  setOpenDialog?: (open: boolean) => void;
  onSucess: () => void;
}

type FormValues = {
  codigo?: number;
  descricao?: string;
  usado?: string;
  motivo?: string; // SOMENTE PARA CARREGAR O TEXTO NO COMBOBOX DE MOTIVOS
  codmotivo?: string; // GRAVA OU ALTERAR DADOS DE MOTIVOS
};

/*** LISTA COM OS DADOS DO COMBOBOX ***/
const frameworks = [
  {
    value: "1",
    label: "SIM",
  },
  {
    value: "2",
    label: "NÃO",
  },
];

const dataForm = yup.object({
  codigo: yup.number().optional(),
  descricao: yup.string().uppercase().required("Campo descrição vazio!"),
  usado: yup.string().uppercase().required("Selecione o status!"),
  motivo: yup.string().uppercase().optional(),
});

export function DialogPerguntaAvaliacao(props: ItemProps) {
  const [loading, setLoading] = useState(false);
  const [lista, setLista] = useState<options[]>([]);
  const {
    postPerguntaAvaliacaoGravar,
    putPerguntaAvaliacaoAtualizar,
    getPerguntaAvaliacaoMotivos,
  } = getSedApi();

  const { confirmDialog } = useContext(ConfirmDialogContext);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(dataForm),
    defaultValues: {
      descricao: props.descricao ?? "",
      usado: props.usado ?? "",
      motivo: props.motivo ?? "",
    },
  });

  const ListaMotivos = useCallback(async () => {
    try {
      setLoading(true);
      const retorno = await getPerguntaAvaliacaoMotivos({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (retorno.data !== null) {
        const novaLista = retorno.data.map((item) => ({
          value: item.Codigo != null ? String(item.Codigo) : "",
          label: item.Descricao ?? "",
        }));
        setLista(novaLista);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError && error.response
          ? error.response.data.detail
          : "Ocorreu um erro inesperado."
      );
    } finally {
      setLoading(false);
    }
  }, [getPerguntaAvaliacaoMotivos]);
  /** ONSUBMIT VERIFICA SE OS DADOS A SEREM MANIPULADOS SÃO DE CADASTRO DE MOTIVOS OU DETALHAMENTO DE MOTIVOS */
  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      try {
        setLoading(true);

        /** CONFIRMAÇÃO **/
        const confirmado = await confirmDialog(
          "Deseja salvar os dados?",
          <ShieldQuestion color="#52525c" size={26} />
        );
        if (!confirmado) return;

        /** FORMATAÇÃO DOS DADOS PARA INSERÇÃO OU EDIÇÃO  **/
        if (data.usado === "1") {
          data.usado = "S";
        } else if (data.usado === "2") {
          data.usado = "N";
        }
        data.codmotivo = lista.find((item) => item.value === data.motivo)?.value ?? "";

        /** GRAVAÇÃO FATOR OPERACIONAL **/
        const retorno = await (!props.codigo || props.codigo <= 0
          ? postPerguntaAvaliacaoGravar(data as PerguntaAvaliacao, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
          : /**ATUALIZAÇÃO FATOR OPERACIONAL */
            putPerguntaAvaliacaoAtualizar(data as PerguntaAvaliacao, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }));
        /** TRATAMENTO DO RETORNO **/
        if (retorno.status === 200) {
          toast.success(retorno.data.Mensagem);
          props.onSucess();
          props.setOpenDialog?.(false);
        } 
        else toast.warning(retorno.data.Mensagem);
      } catch (error) {
        toast.error(
          error instanceof AxiosError && error.response
            ? error.response.data.Mensagem
            : "Ocorreu um erro inesperado."
        );
      } finally {
        setLoading(false);
      }
    },
    [confirmDialog, lista, postPerguntaAvaliacaoGravar, props, putPerguntaAvaliacaoAtualizar]
  );

  /** ATUALIZA O FORM PARA UM NOVO REGISTRO OU PARA EDIÇÃO DE UM REGISTRO **/
  useEffect(() => {
    if (props.open || !props.open) {
      form.reset({
        codigo: props.codigo ?? undefined,
        descricao: props.descricao ?? "",
        usado: props.usado === "SIM" ? "1" : props.usado === "NÃO" ? "2" : "1",
        motivo: lista.find((item) => item.label === props.motivo)?.value ?? "",
      });
      ListaMotivos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpenDialog}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px] bg-white border-zinc-400 shadow-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Cadastrar Perguntas de Avaliação</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Cadastre um novo parametro ou atualize um registro existente.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-8">
            <div className="grid gap-2">
              <Label htmlFor="codigo" className="">
                Código
              </Label>
              {/** CÓDIGO **/}
              <Input
                id="codigo"
                className="bg-gray-300 border-zinc-500 border-[1px] placeholder:normal-case"
                type="number"
                disabled
                placeholder=""
                {...form.register("codigo")}
              />
            </div>
            {/* DESCRIÇÃO */}
            <div className="grid gap-2 mt-6">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                className=" bg-white border-zinc-500 border-[1px] placeholder:normal-case uppercase
                               focus:ring-0 focus-visible:ring-0 focus:bg-none text-zinc-700"
                autoComplete="off"
                maxLength={80}
                placeholder="Informe a descrição..."
                {...form.register("descricao")}
              />
              <p className="text-red-500 font-semibold text-xs h-5 mt-1">
                {form.formState.errors?.descricao?.message ?? " "}
              </p>
            </div>
            {/** COMBOBOX USADO **/}
            <div className="grid gap-2">
              <Label htmlFor="usado">Usado</Label>
              <Controller
                name="usado"
                control={form.control}
                render={({ field }) => (
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    frameworks={frameworks}
                  />
                )}
              />
              <p className="text-red-500 font-semibold text-xs h-5 mt-1">
                {form.formState.errors.usado?.message ?? "\u00A0"}
              </p>
            </div>
            {/** COMBOBOX MOTIVO **/}
            <div className="grid gap-2">
              <Label>Motivo</Label>
              <Controller
                name="motivo"
                control={form.control}
                render={({ field }) => (
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    frameworks={lista}     
                    loading={loading}               
                  />
                )}
              />
              <p className="text-red-500 font-semibold text-xs h-5 mt-1">
                {form.formState.errors.usado?.message ?? "\u00A0"}
              </p>
            </div>
          </div>
          {/** BOTÕES SALVAR E CANCELAR **/}
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button
                variant="cancel"
                onClick={() => {
                  props.setOpenDialog?.(false);
                }}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" variant={"save"} disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin h-5 w-5" />
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
