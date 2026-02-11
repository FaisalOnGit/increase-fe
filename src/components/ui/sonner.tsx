import { Toaster as Sonner } from "sonner"

export { Toaster as Sonner }

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      expand={false}
      richColors
      closeButton
    />
  )
}
