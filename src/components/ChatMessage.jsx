import { Bot, User, ShoppingCart } from "lucide-react";

const ChatMessage = ({ sender, message, products }) => {
  const isRobot = sender === "robot";

  return (
    <div
      className={`flex items-end gap-2 ${
        isRobot ? "justify-start" : "justify-end"
      }`}
    >
      {/* ROBOT ICON */}
      {isRobot && (
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100">
          <Bot size={16} className="text-blue-600" />
        </div>
      )}

      {/* MESSAGE CONTAINER */}
      <div
        className={`flex flex-col gap-2 max-w-[75%] ${
          isRobot ? "items-start" : "items-end"
        }`}
      >
        {/* AI LABEL */}
        {isRobot && message && (
          <div className="text-[10px] text-gray-400 ml-1">
            AI Assistant
          </div>
        )}

        {/* MESSAGE BUBBLE */}
        {message && (
          <div
            className={`px-3 py-2 text-sm rounded-2xl leading-snug shadow-sm transition
            ${
              isRobot
                ? "bg-gradient-to-r from-blue-50 to-white text-blue-900 rounded-bl-none border border-blue-100"
                : "bg-blue-600 text-white rounded-br-none shadow-md"
            }`}
          >
            {message}
          </div>
        )}

        {/* PRODUCTS SECTION */}
        {products?.length > 0 && (
          <div className="flex flex-col gap-2 mt-1">
            {products.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition"
              >
                {/* IMAGE */}
                <img
                  src={p.image}
                  className="w-14 h-14 object-cover"
                  alt={p.name}
                />

                {/* INFO */}
                <div className="flex-1 p-2">
                  <div className="text-xs font-semibold text-gray-800">
                    {p.name}
                  </div>

                  <div className="text-[11px] text-gray-500">
                    ₹{p.price}
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-[10px] text-green-600">
                    <ShoppingCart size={12} />
                    Available
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* USER ICON */}
      {!isRobot && (
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white">
          <User size={16} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;