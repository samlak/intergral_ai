import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useChat } from 'ai/react';
import { useEffect } from "react";
import { Loader2 } from "lucide-react"

const GenerativeTextarea = React.forwardRef(({ 
  setValue, 
  containerClassName, 
  ...props 
}, ref) => {

  const { messages, setMessages,  append, isLoading } = useChat({
    api: "/api/ai/regenerate",
    onFinish: () => setMessages([])
  });

  const rephrase = () => {
    append({
      role: "rephrase",
      content: props.value,
    })
  }

  const expand = () => {
    append({
      role: "expand",
      content: props.value,
    })
  }


  useEffect(() => {
    if(messages.length > 1) {
      setValue(props.name, messages[1].content)
    }
  }, [messages])
  
  return (
    <div className={`relative ${containerClassName}`}>
      <Textarea {...props} ref={ref}/>
      <div className="absolute bottom-2 right-2 flex justify-end space-x-2">
        <Button
          type="button"
          onClick={rephrase}
          size="sm" 
          className="h-7 text-xs"
          disabled={isLoading}
        >
          { isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" /> }
          <span className="hidden sm:block">Rephrase with AI</span>
          <span className="block sm:hidden">Rephrase</span>
        </Button>
        <Button 
          type="button"
          onClick={expand}
          size="sm"
          className="h-7 text-xs"
          disabled={isLoading}
        >
          { isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" /> }
          <span className="hidden sm:block">Expand with AI</span>
          <span className="block sm:hidden">Expand</span>
        </Button>
      </div>
    </div>
  )
})

export default GenerativeTextarea;