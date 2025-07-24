import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "../ui/alert-dialog";
// import { Button } from "../ui/button"

export interface ConfirmDialogProps {
  open: boolean; 
  onConfirm: () => void; 
  onCancel: () => void; 
  icon?: ReactNode;
  descricao?: string;
}

export function DialogConfirm({
  open,
  descricao,
  onConfirm,
  icon,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={() => {}}>
      {/* <AlertDialogTrigger asChild>{open}</AlertDialogTrigger> */} {/**Necessário retirar o trigger para controlar o modal por states */}
      <AlertDialogContent className="bg-white border-[1px] boder-blue-400 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-600 flex justify-between">
            Confirma a operação ? {icon}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-600">
            {descricao}            
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            className="text-white bg-red-500 hover:bg-red-600 cursor-pointer shadow-xs"
          >
            Não
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-[#00539B]  hover:bg-[#1366ae] text-white cursor-pointer shadow-xs"
          >
            Sim
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
