import { useNavigate } from "react-router-dom";
// import logosistema from "../../assets/sed-sistema.ico";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import {
  ShieldUser,
  LogOut,
  RotateCcwKey,
  FolderInput,
  FolderPen,
  SquareStack,
  FileQuestion,
  BookOpenCheck,
  Text,
  NotepadText,
  CaptionsOff,
  Library,
  Pencil,
  LayoutGrid,
} from "lucide-react";

import { AuthContext } from "../../shared/context/AuthContext";
import { useContext } from "react";
import { Button } from "../ui/button";
import { FolderDot, AudioLines, UserRoundPen } from "lucide-react";

export default function Menu() {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div
      id="container-menu"
      className="w-full h-20  
                bg-white  
                flex  
                items-center 
                justify-between 
                border-b-[1px] 
                border-b-zinc-300"
    >
      <div className="w-30 flex items-center justify-center ">
        <div className="flex justify-center items-center text-4xl font-bold text-zinc-500 px-0 ml-10 cursor-pointer">
          <button
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => navigate("/entrevista-desligamento")}
          >
            <div className="flex items-center h-auto">
              <LayoutGrid color="#fe9a00" size={30} />
            </div>
            <p className="font-bold flex items-center justify-between gap-1 bg-a">
              SED
            </p>
          </button>
        </div>
      </div>
      <div
        id="menu"
        className="w-auto border-none ml-2 flex justify-center items-center"
      >
        <Menubar className="w-full border-none border-0 gap-4">
          {/*Menu de Sistema */}
          <MenubarMenu>
            <MenubarTrigger className="text-gray-500 hover:bg-zinc-100 hover:rounded cursor-pointer text-[1.2rem] gap-2">
              <FolderDot size={20} color="#888888" />
              Sistema
            </MenubarTrigger>
            <MenubarContent className="border-zinc-200 shadow-xl bg-white">
              {/*Aba de Segurança */}
              <MenubarSub>
                <MenubarSubTrigger className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4">
                  <ShieldUser size={18} color="gray" />
                  Segurança
                </MenubarSubTrigger>
                {/*Criação de Usuários */}
                <MenubarSubContent className="border-zinc-200 w-48 bg-white shadow-md rounded-sm ">
                  <MenubarItem
                    onClick={() => navigate("cadastro-usuario")}
                    className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer"
                  >
                    Cadastro de Usuários
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator className="border-[0.2px] border-zinc-200" />
              {/*Alteração de Senha */}
              <MenubarItem
                onClick={() => navigate("login")}
                className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer"
              >
                <RotateCcwKey size={20} color="gray" />
                Alteração de Senha
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          {/*Parâmetrização */}
          <MenubarMenu>
            {/*Menu de Parametrização */}
            <MenubarTrigger className="text-gray-500 hover:bg-zinc-100 hover:rounded cursor-pointer text-[1.2rem] gap-2">
              <AudioLines size={20} color="#888888" />
              Parâmetrização
            </MenubarTrigger>
            <MenubarContent className="border-zinc-200 shadow-xl bg-white">
              {/*Cad Motivos de Desligamento */}
              <MenubarItem
                onClick={() => navigate("cad-motivo-desligamento")}
                className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4"
              >
                <FolderInput size={20} color="gray" />
                Cadastro de Motivos de Desligamento
              </MenubarItem>

              {/*Cad Detalhes de Desligamento */}
              <MenubarItem
                onClick={() => navigate("cad-det-motivo-desligamento")}
                className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4"
              >
                <FolderPen size={20} color="gray" />
                Cadastro de Detalhes de Desligamento
              </MenubarItem>
              <MenubarSeparator />

              {/*Cad Fatores de Desligamento */}
              <MenubarItem
                onClick={() => navigate("cadastro-fatores")}
                className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4"
              >
                <SquareStack size={20} color="gray" />
                Cadastro de Fatores de Desligamento
              </MenubarItem>
              <MenubarSeparator />

              {/*Cad Perguntas de Avaliação */}
              <MenubarItem
                onClick={() => navigate("cad-pergunta-avaliacao")}
                className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4"
              >
                <FileQuestion size={20} color="gray" />
                Cadastro de Perguntas de Avaliação
              </MenubarItem>
              <MenubarSeparator />

              {/*Cadastro de Resposta */}
              <MenubarItem
                onClick={() => navigate("cadastro-resposta")}
                className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4"
              >
                <BookOpenCheck size={20} color="gray" />
                Cadastro de Resposta
              </MenubarItem>
              <MenubarSeparator className="border-[0.2px] border-zinc-200" />

              {/*Config Fatores de Desligamento/Pergunta */}
              <MenubarItem className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4">
                <Text size={20} color="gray" />
                Configuração (Fatores de Desligamento/Pergunta)
              </MenubarItem>
              <MenubarSeparator />

              {/*Config Pergunta Outra Proposta */}
              <MenubarItem className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4">
                <NotepadText size={20} color="gray" />
                Configuração Pergunta Outra Reposta
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/*Menu de Entrevista */}
          <MenubarMenu>
            <MenubarTrigger className="text-gray-500 hover:bg-zinc-100 hover:rounded cursor-pointer text-[1.2rem] gap-2">
              <UserRoundPen size={20} color="#888888" />
              Entrevista
            </MenubarTrigger>
            <MenubarContent className="border-zinc-200 shadow-xl bg-white">
              {/*Desligamento */}
              <MenubarItem className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4">
                <CaptionsOff size={20} color="gray" />
                Desligamento
              </MenubarItem>
              <MenubarSeparator className="border-[0.2px] border-zinc-200" />

              {/*Ficha */}
              <MenubarItem className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4">
                <Library size={20} color="gray" />
                Ficha
              </MenubarItem>
              <MenubarSeparator />

              {/*Alteração de Motivo */}
              <MenubarItem className="text-zinc-500 hover:bg-zinc-100 hover:rounded cursor-pointer gap-4">
                <Pencil size={20} color="gray" />
                Alteração de Motivo
              </MenubarItem>
              <MenubarSeparator />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      {/* Sair do Sistema */}
      <div className="w-30 flex items-center justify-center">
        <Button variant="exit" onClick={signOut}>
          <LogOut size={28} color="#fb2c36" />
          Sair
        </Button>
      </div>
    </div>
  );
}
