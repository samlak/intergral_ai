import { useState } from "react";
import { Send } from "lucide-react";

export function QuestionInput({ setMessages, scrollDown }) {
  const [question, setQuestion] = useState("");

  const onInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const submitQuestion = async (event) => {
    event.preventDefault();
 
    await setMessages((state) => ([
      ...state, 
      {
        role: "client",
        content: question,
      },
    ]))
    setQuestion("")
    scrollDown();
  };

  return (
    <form onSubmit={submitQuestion}>
      <label htmlFor="chat-input" className="sr-only">
        Ask me anything
      </label>
      <div className="relative">
        <textarea
          id="chat-input"
          className="block w-full resize-none rounded-b-lg border-none bg-slate-200 p-4 pr-16 text-xs text-slate-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-blue-500 sm:text-sm"
          placeholder="Ask me anything"
          rows="1"
          required
          onChange={onInputChange}
          value={question}
        ></textarea>
        <button
          type="submit"
          className="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 p-[6px] sm:p-2  text-xs font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-sm"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
}
