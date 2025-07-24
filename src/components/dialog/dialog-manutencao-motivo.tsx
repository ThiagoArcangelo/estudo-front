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
import { Combobox } from "../combobox/combobox";
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
import type { Motivo, DetMotivo } from "../../models";
import { ConfirmDialogContext } from "../../shared/context/ConfirmDialogContext";
import { getSedApi } from "../../services/api";
import { LoaderCircle, ShieldQuestion } from "lucide-react";

interface ItemProps {
  trigger: ReactNode;
  codigo?: number;
  descricao?: string;
  usado?: string;
  open?: boolean;
  setOpenDialog?: (open: boolean) => void;
  objeto: "Motivo" | "DetMotivo" | "CadFatores";
  onSucess: () => void;
}

type FormValues = {
  codigo?: number;
  descricao?: string;
  usado?: string;
};

// LISTA COM OS DADOS DO COMBOBOX
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
});

export function DialogCadParametros(props: ItemProps) {
  const [loading, setLoading] = useState(false);
  const {
    postMotivoGravar,
    putMotivoAtualizar,
    postDetMotivoGravar,
    putDetMotivoAtualizar,
  } = getSedApi();
  const { confirmDialog } = useContext(ConfirmDialogContext);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(dataForm),
    defaultValues: {
      descricao: props.descricao ?? "",
      usado: props.usado ?? "",
    },
  });

  /** ONSUBMIT VERIFICA SE OS DADOS A SEREM MANIPULADOS SÃO DE CADASTRO DE MOTIVOS OU DETALHAMENTO DE MOTIVOS */
  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      try {
        setLoading(true);

        /** CONFIRMAÇÃO */
        const confirmado = await confirmDialog(
          "Deseja salvar os dados?",
          <ShieldQuestion color="#52525c" size={26} />
        );
        if (!confirmado) return;

        /** FORMATA OS DADOS PARA INSERÇÃO OU EDIÇÃO  */
        if (data.codigo === undefined) data.codigo = 0;
        if (data.usado === "1") {
          data.usado = "S";
        } else if (data.usado === "2") {
          data.usado = "N";
        }

        /** GRAVAÇÃO MOTIVO DE DESLIGAMENTO */
        if (props.objeto === "Motivo") {
          const retorno = await (!props.codigo || props.codigo <= 0
            ? postMotivoGravar(data as Motivo, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
            : /**ATUALIZAÇÃO MOTIVO DESLIGAMENTO */
              putMotivoAtualizar(data as Motivo, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }));
          /** TRATAMENTO DO RETORNO */
          if (retorno.status === 200) {
            toast.success("Operação realizada com sucesso!");
            props.onSucess();
            props.setOpenDialog?.(false);
          } else toast.warning("Não foi possível realizar a operação!");
        } else if (props.objeto === "DetMotivo") {
          /** GRAVAÇÃO DETALHAMENTO DE MOTIVO DE DESLIGAMENTO */
          const retorno = await (!props.codigo || props.codigo <= 0
            ? postDetMotivoGravar(data as DetMotivo, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
            : /** ATUALIZAÇÃO DETALHAMENTO DE MOTIVO DE DESLIGAMENTO */
              putDetMotivoAtualizar(data as DetMotivo, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }));

          /** TRATAMENTO DO RETORNO */
          if (retorno.status === 200) {
            toast.success("Operação realizada com sucesso!");
            props.onSucess();
            props.setOpenDialog?.(false);
          } else toast.warning("Não foi possível realizar a operação!");
        }
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
    [
      postDetMotivoGravar,
      postMotivoGravar,
      props,
      putDetMotivoAtualizar,
      putMotivoAtualizar,
      confirmDialog,
    ]
  );

  /** ATUALIZA O FORM PARA UM NOVO REGISTRO OU PARA EDIÇÃO DE UM REGISTRO */
  useEffect(() => {
    if (props.open || !props.open) {
      form.reset({
        codigo: props.codigo ?? undefined,
        descricao: props.descricao ?? "",
        usado: props.usado === "SIM" ? "1" : props.usado === "NÃO" ? "2" : "1",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpenDialog}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-white border-zinc-400 shadow-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Cadastrar Parâmetros</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Cadastre um novo parametro ou atualize um registro existente.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2 mt-6">
              <Label htmlFor="codigo" className="">
                Código
              </Label>
              {/* CÓDIGO */}
              <Input
                id="codigo"
                className="bg-gray-300 border-zinc-500 border-[1px] placeholder:normal-case"
                type="number"
                placeholder=""
                disabled
                {...form.register("codigo")}
              />
            </div>
            {/* DESCRIÇÃO */}
            <div className="grid gap-2 mt-4">
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
            {/* COMBOBOX */}
            <div className="grid gap-2 text-zinc-700">
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
          </div>
          {/* BOTÕES SALVAR E CANCELAR */}
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
