import { useState } from "react";

const ChatInput = ({ addMessage }) => {
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    addMessage({
      sender: "user",
      message: input
    });

    setInput("");
  };

  return (
    <div className="flex items-center gap-2">

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // 🔥 prevents double submit
            send();
          }
        }}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 text-sm bg-gray-100 rounded-full outline-none"
      />

      <button
        onClick={send}
        className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-full"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;