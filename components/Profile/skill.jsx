import { Button } from "@/components/ui/button";

export default function Skill({ skillsets }) {  
  return  (
    <section className="container py-3">
      <div className="flex flex-wrap justify-center">
        {skillsets.map((skill, index ) => (
          <Button 
            variant="outline" 
            key={index}
            className="rounded-lg mr-2 mb-2 h-6 text-xs px-3"
          >
            {skill}
          </Button>
        ))}
      </div>
    </section>
  );
}