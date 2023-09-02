import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const GenerativeTextarea = React.forwardRef(({ 
  setValue, 
  containerClassName, 
  ...props 
}, ref) => {
  const rephrase = () => {
    setValue(props.name, `In my role as the lead developer, I undertook a transformative initiative by conceptualizing, designing, and delivering a holistic health tracker application. This innovative app emerged as a powerful tool, granting users the ability to proactively manage their fitness aspirations. My responsibilities encompassed every phase of development, from ideation to execution. With an acute understanding of user needs, I meticulously crafted a user-friendly interface that facilitated effortless navigation and engagement. This was pivotal in ensuring that users of all technical backgrounds could seamlessly interact with the app, leading to an exceptional user experience.
One of the core features I spearheaded was real-time data synchronization. Recognizing the significance of up-to-the-minute information for health enthusiasts, I architected a robust synchronization mechanism that enabled users to witness their progress without delay. This seamless integration of data heightened user engagement and commitment to their fitness journeys. Moreover, my technical expertise shone as I adeptly incorporated support for wearable devices. This enhancement not only showcased my mastery over integrating hardware and software but also widened the app's appeal, catering to a broader audience and elevating its status as an indispensable health companion.`)
  }
  const expand = () => {
    rephrase();
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