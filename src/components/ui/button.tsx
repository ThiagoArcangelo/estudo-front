import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

// Interface criada para corrigir o erro React.forwardRef
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        login:
          "bg-[#00539B] text-white hover:bg-[#1366ae] hover:rounded cursor-pointer w-full h-screen gap-4 shadow-xs",
        pesquisa:
          "h-8 bg-white hover:bg-zinc-100 cursor-pointer flex items-center justify-center rounded-l-none border-zinc-500 border-[1px] border-l-0 shadow-xs",
        adicionar: 
          "cursor-pointer flex items-center bg-[#00539B]  hover:bg-[#1366ae] text-white shadow-xs",
        sorting:
          // "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:border-l-zinc-200"
          "w-auto hover:border-r-zinc-100 hover:border-r-[1px] rounded-none cursor-pointer shadow-xs",
        edit:
          "hover:bg-zinc-300 hover:rounded-2 cursor-pointer w-2 shadow-xs",
        save:
          "bg-[#00539B]  hover:bg-[#1366ae] text-white cursor-pointer shadow-xs",
        exit:
          "text-red-500 mr-8 w-16 h-8 border border-red-500 hover:bg-red-200 cursor-pointer shadow-xs",
        cancel:
          "text-white bg-red-500 hover:bg-red-600 cursor-pointer shadow-xs",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        pesquisa: "h-8 px-4"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Botão com Reac.forwardRef corrigido
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

//#region Button original
// function Button({
//   className,
//   variant,
//   size,
//   asChild = false,
//   ...props
// }: React.ComponentProps<"button"> &
//   VariantProps<typeof buttonVariants> & {
//     asChild?: boolean
//   }) {
//   const Comp = asChild ? Slot : "button"

//   return (
//     <Comp
//       data-slot="button"
//       className={cn(buttonVariants({ variant, size, className }))}
//       {...props}
//     />
//   )
// }
//#endregion

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
