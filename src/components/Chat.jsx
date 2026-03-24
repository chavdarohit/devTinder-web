import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { toUserId } = useParams();

  const user = useSelector((store) => store.user);
  // Simulated initial chat state.
  // In reality, you will fetch these from your backend via Socket.io / API.
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const fromUserId = user?.data?._id;

  useEffect(() => {
    if (!fromUserId || !toUserId) return;
    const socket = createSocketConnection();
    // As soon as the page loads, the socket connection is made, and joinChat event is emitted

    socket.emit("joinChat", { fromUserId, toUserId });

    socket.on(
      "messageReceived",
      ({ id, text, senderName, sender, receiver, time }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id, text, senderName, sender, receiver, time },
        ]);
      },
    );

    // When the component unmounts, the socket connection is closed
    return () => {
      socket.disconnect();
    };
  }, [fromUserId, toUserId]);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      id: Date.now(),
      text: newMessage,
      senderName: `${user?.data?.firstName} ${user?.data?.lastName}`,
      sender: fromUserId,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      receiver: toUserId,
    });

    setNewMessage("");
  };

  return (
    <div className="container mx-auto max-w-5xl px-0 sm:px-4 py-0 sm:py-8 h-[calc(100vh-64px)] sm:h-[calc(100vh-120px)] animate-fade-in flex flex-col">
      <div className="flex-1 flex flex-col modern-card border-x-0 sm:border-x sm:rounded-3xl bg-base-100 shadow-2xl overflow-hidden relative">
        {/* Chat Header */}
        <div className="glass-nav z-10 px-6 py-4 flex items-center justify-between border-b border-base-200 shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <Link
              to="/connections"
              className="btn btn-ghost btn-circle btn-sm mr-2 hover:bg-base-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div className="relative indicator">
              <span className="indicator-item badge badge-success badge-xs border-white absolute bottom-1 right-1"></span>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-base-200 bg-base-300">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Connection Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-extrabold text-base-content leading-tight">
                Match User
              </h2>
              <span className="text-xs font-semibold text-success tracking-wide">
                Active now
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="btn btn-ghost btn-circle text-base-content/70 hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle text-base-content/70 hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 bg-base-200/50 space-y-4"
        >
          <div className="text-center my-6">
            <span className="text-xs font-semibold px-3 py-1 bg-base-200 text-base-content/50 rounded-full shadow-sm">
              Today
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat ${msg.sender === fromUserId ? "chat-end" : "chat-start"} animate-slide-up`}
            >
              {msg.sender !== fromUserId ? (
                <div className="chat-image avatar hidden sm:block">
                  <div className="w-10 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Avatar"
                    />
                  </div>
                </div>
              ) : (
                <div className="chat-image avatar hidden sm:block">
                  <div className="w-10 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Avatar"
                    />
                  </div>
                </div>
              )}
              <div className="chat-header mb-1 text-xs opacity-60">
                {msg.sender === fromUserId ? "You" : msg.senderName}
                <time className="text-xs opacity-50 ml-2">{msg.time}</time>
              </div>
              <div
                className={`chat-bubble shadow-sm ${
                  msg.sender === fromUserId
                    ? "bg-primary text-primary-content"
                    : "bg-base-100 text-base-content border border-base-200"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === fromUserId && (
                <div className="chat-footer opacity-50 text-xs mt-1">
                  Delivered
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input Compositor */}
        <div className="bg-base-100 p-4 border-t border-base-200 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] shrink-0 z-10">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 max-w-full"
          >
            <button
              type="button"
              className="btn btn-circle btn-ghost text-base-content/50 hover:text-primary transition-colors shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered w-full rounded-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all shadow-inner"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-circle btn-primary shadow-lg shadow-primary/30 hover:scale-105 transition-transform shrink-0"
              disabled={!newMessage.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 rotate-90"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
