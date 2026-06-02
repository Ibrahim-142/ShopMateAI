import { Bot, User, ShoppingCart } from "lucide-react";

const ChatMessage = ({ sender, message, products }) => {
  const isRobot = sender === "robot";

  return (
    <div
      className={`flex items-end gap-2 ${
        isRobot ? "justify-start" : "justify-end"
      }`}
    >

      {/* ROBOT */}
      {isRobot && (
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100">
          <Bot size={16} className="text-blue-600" />
        </div>
      )}

      {/* MESSAGE */}
      <div
        className={`flex flex-col gap-2 max-w-[75%] ${
          isRobot ? "items-start" : "items-end"
        }`}
      >
        {message && (
          <div
            className={`px-3 py-2 text-sm rounded-2xl leading-snug shadow-sm
            ${
              isRobot
                ? "bg-blue-50 text-blue-900 rounded-bl-none border border-blue-100"
                : "bg-blue-600 text-white rounded-br-none"
            }`}
          >
            {message}
          </div>
        )}

        {products?.length > 0 && (
          <div className="flex flex-col gap-2">
            {products.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100"
              >
                <img src={p.image} className="w-14 h-14 object-cover" />

                <div className="flex-1 p-2">
                  <div className="text-xs font-medium text-gray-800">
                    {p.name}
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-[10px] text-blue-500">
                    <ShoppingCart size={12} />
                    Product
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* USER */}
      {!isRobot && (
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white">
          <User size={16} />
        </div>
      )}

    </div>
  );
};

export default ChatMessage;