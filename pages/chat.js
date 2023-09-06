import { useChat } from 'ai/react';
 
// Optional but recommended: use the Edge Runtime. This can only be done at the page level, not inside nested components.
// export const runtime = 'experimental-edge';
export const config = {
  runtime: "experimental-edge"
};
 
export default function IndexPage() {
  const { messages, handleSubmit, input, handleInputChange, setMessages } = useChat({api: "/api/ai/profile-chat"});
 
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input">Prompt</label>
      <input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <button type="submit">Submit</button>
      {messages.map((message, i) => (
        <div key={i}>{message.content}</div>
      ))}
    </form>
  );
}
    setMessages((state) => ([
      ...state, 
      {
        role: "client",
        content: question,
      },
    ]))