"use client";

import * as React from "react";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ItemSelecionadoProps  {
  value?: string; 
  label?: string;
  frameworks: options[]
  onChange?: (valor: string) => void;
  loading?: boolean;
}

export interface options {
  value: string;
  label: string;
}

export function Combobox({ value, label, onChange, frameworks = [], loading = false}: ItemSelecionadoProps) {
  const [open, setOpen] = React.useState(false);

  const currentValue = value ? frameworks.find((framework) => framework.value === value)?.label : label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between text-zinc-600"
        >
          {/** LÓGICA ORIGINAL DO COMPONENTE - COM ADAPTAÇÃO */}
          {/* {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : label && label !== ""
            ? frameworks.find((framework) => framework.label === label)?.label
            : currentValue} */}

            {loading ? <LoaderCircle className="animate-spin h-5 w-5" color="#56565c" /> : currentValue}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-[200px] p-0">
        <Command>
          <CommandList className="bg-white">
            <CommandEmpty>Não encontrado...</CommandEmpty>
            <CommandGroup className="w-full">
              {frameworks.map((framework) => (
                <CommandItem
                  className="cursor-pointer hover:bg-zinc-200 text-zinc-600"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    // CHAMA ONCHANGE EXTERNO PARA SELEÇÃO
                    if (onChange) onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentValue === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

