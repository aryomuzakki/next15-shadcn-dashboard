import { toast as sonnerToast } from "sonner"

interface ToastOptions {
  title?: string
  description?: string
  variant?: "default" | "success" | "warning" | "destructive"
}

const VARIANT = {
  default: "",
  success: "!bg-green-500",
  warning: "!bg-yellow-500",
  destructive: "!bg-destructive",
}

export function useToast() {
  const toast = ({ title, description, variant = "default" }: ToastOptions) => {
    
    sonnerToast(
      title,
      {
        description: description,
        className: VARIANT[variant],
      }
    )
  }

  return { toast }
}