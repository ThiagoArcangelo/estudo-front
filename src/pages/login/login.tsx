import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
// import { toast } from "react-toastify";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../shared/context/AuthContext";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Login } from "../../models";
import { motion } from "motion/react";
import { CircleChevronRight, LayoutGrid, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const schema = yup.object({
  Usuario: yup
    .string()
    .required("Campo Usuário vazio!")
    .max(20, "Máximo 20 caracteres!"),
  Senha: yup
    .string()
    .required("Campo senha vazio!")
    .max(12, "Máximo 12 caracteres!"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      Usuario: "",
      Senha: "",
    },
  });

  // useEffect(() => {
  //   signOut();
  //   form.setFocus("Usuario");
  // }, [form, signOut]);

  const onSubmit: SubmitHandler<Login> = useCallback(
    async (formLogin: Login) => {
      try {
        setLoading(true);
        await signIn(formLogin);
      } catch (error) {
        toast.error(
          error instanceof AxiosError && error.response
            ? error.response.data.detail
            : "Ocorreu um erro inesperado."
        );
      } finally {
        setLoading(false);
      }
    },
    [signIn]
  );

  return (
    <FormProvider {...form}>
      {/* TELA LOGIN - CONTAINER */}
      <div
        id="container"
        className="bg-zinc-50 w-full h-screen flex items-center justify-center m-auto"
      >
        <div className="w-1/2 h-screen flex justify-center items-center bg-transparent">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2,
            }}
          >
            {/* FORMULÁRIO - CONTAINER */}
            <div className="bg-white w-[28rem] h-[34rem] flex flex-col rounded-2xl shadow-2xl z-30 ">
              <div
                className="bg-transparent w-[90px] h-[90px] rounded-b-full rounded-t-full  mt-8 px-4  py-4
                          gap-4  mx-auto max-w-screen-xl flex items-center justify-center"
              >
                <div className="flex items-center h-auto">
                  <LayoutGrid color="#fe9a00" size={50} />
                </div>
                <p className="flex items-center justify-between bg-a text-4xl font-bold text-zinc-500">
                  SED
                </p>
              </div>
              <div className="w-full px-2 h-6 flex justify-center items-center mt-4 bg-transparent inset-shadow-zinc-50">
                <h2 className="font-sans text-[18px] font-semibold text-zinc-600 px-4 ">
                  Sistema de Entrevista de Desligamento
                </h2>
              </div>

              {/* FORMULÁRIO */}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto w-full h-full  mt-2 px-6 py-4"
              >
                {/*USUÁRIO*/}
                <div className="py-2 mx-auto max-w-screen-xl">
                  <label className="flex items-start font-bold text-zinc-500 py-2">
                    Usuário
                  </label>

                  <Input
                    type="text"
                    maxLength={20}
                    autoComplete="username"
                    className={
                      "flex items-start border-zinc-400 placeholder:normal-case uppercase  hover:border-zinc-800"
                    }
                    placeholder="Digite o usuário:"
                    {...form.register("Usuario")}
                  />
                  <p className="text-red-500 font-semibold text-xs h-5 mt-1">
                    {form.formState.errors?.Usuario?.message ?? " "}
                  </p>
                </div>

                {/*SENHA*/}
                <div className="py-2 mx-auto max-w-screen-xl">
                  <label className="flex items-start font-bold text-zinc-600 py-2">
                    Senha
                  </label>

                  <Input
                    type="password"
                    maxLength={12}
                    autoComplete="new-password"
                    className={
                      "flex items-start border-zinc-400 hover:border-zinc-800"
                    }
                    placeholder="Digite a senha:"
                    {...form.register("Senha")}
                  />
                  <p className="text-red-500 font-semibold text-xs h-5 mt-1">
                    {form.formState.errors?.Senha?.message ?? " "}
                  </p>
                </div>

                {/*ACESSAR*/}
                <div className="py-4 flex justify-center mx-auto max-w-screen-xl mt-2 ">
                  <Button type="submit" variant={"login"} disabled={loading}>
                    {loading ? (
                      <LoaderCircle className="animate-spin h-5 w-5" />
                    ) : (
                      <CircleChevronRight />
                    )}
                    Acessar
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </FormProvider>
  );
}
