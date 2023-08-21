import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

export default function RemoveableInput({ onClick, containerClassName, ...props }) {
  return (
    <div className={`relative ${containerClassName}`}>
      <Input {...props} />
      <X 
        className="w-4 h-4 absolute right-2 top-3 hover:cursor-pointer text-gray-400 hover:text-white" 
        onClick={onClick}
      />
    </div>
  )
}