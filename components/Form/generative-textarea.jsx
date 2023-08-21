import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const GenerativeTextarea = React.forwardRef(({ 
  setValue, 
  containerClassName, 
  ...props 
}, ref) => {
  const rephrase = () => {
    setValue(props.name, `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, soluta corporis nam fugit nemo deserunt. Molestiae quasi minus praesentium rerum aspernatur alias iste doloremque, provident placeat aliquid fugiat saepe unde.
    Veritatis quod praesentium rem provident in vero fugit. Non voluptates molestiae, ullam, autem ea repudiandae odio expedita architecto at ab ipsum incidunt distinctio delectus suscipit! Consequuntur corporis necessitatibus esse nostrum!
    Numquam tenetur magni dolore eum sunt, soluta voluptates laudantium excepturi debitis obcaecati ab a repellat vitae aliquam ea corporis in, omnis ipsa quasi alias, ut saepe temporibus doloremque. Accusamus, suscipit!`)
  }
  const expand = () => {

  }
  return (
    <div className={`relative ${containerClassName}`}>
      <Textarea {...props} ref={ref}/>
      <div className="absolute bottom-2 right-2 flex justify-end space-x-2">
        <Button
          type="button"
          onClick={rephrase}
          size="sm" 
          className="h-7 text-xs"
        >
          <span className="hidden sm:block">Rephrase with AI</span>
          <span className="block sm:hidden">Rephrase</span>
        </Button>
        <Button 
          type="button"
          onClick={expand}
          size="sm"
          className="h-7 text-xs"
        >
          <span className="hidden sm:block">Expand with AI</span>
          <span className="block sm:hidden">Expand</span>
        </Button>
      </div>
    </div>
  )
})

export default GenerativeTextarea;