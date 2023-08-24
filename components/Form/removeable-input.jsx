import * as React from "react"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

const RemoveableInput = React.forwardRef(({ 
  onClick, 
  containerClassName, 
  ...props 
}, ref) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <Input {...props}  ref={ref}/>
      <X 
        className="w-4 h-4 absolute right-2 top-3 hover:cursor-pointer text-gray-400 hover:text-white" 
        onClick={onClick}
      />
    </div>
  )
})

export default RemoveableInput