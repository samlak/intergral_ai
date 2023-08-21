import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function TruncatedText({ description }) {  
  const [text, setText] = useState(description);
  const [showMoreText, setShowMoreText] = useState("Show More")
  const [isTruncated, setIsTruncated] = useState(true)

  const truncate = (string, truncateAt = 400) => {
    if(!truncateAt) { 
      setShowMoreText("Show Less");
      setIsTruncated(string.length >= truncateAt);
      setText(string);
      return ;
    }

    const shortString = string.slice(0, truncateAt);
    const suffix =  string.length >= truncateAt ? "..." : "";
    const finalString = shortString + suffix;
    setShowMoreText("Show More");
    setIsTruncated(Boolean(suffix));
    setText(finalString);
    return ;
  }

  useEffect(() => {
    truncate(description);
  }, [])
  

  return  (
    <p className="text-sm">
      {text} 
      {isTruncated && 
      <Button 
        className="h-7 text-sm -ml-2"
        variant="link" 
        onClick={() => truncate(description, showMoreText == "Show More" ? null : "400")}
      > 
        {showMoreText} 
      </Button>}
    </p>
  );
}