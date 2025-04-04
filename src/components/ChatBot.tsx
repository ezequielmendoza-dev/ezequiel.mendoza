import { useState, useEffect } from "react";
import { SendHorizontal, MessageCircle } from "lucide-react";
import { marked, Renderer } from "marked";
import { motion, AnimatePresence } from "framer-motion";

// Verificar si estamos en el cliente
const isBrowser = typeof window !== "undefined";

const Chatbot = () => {
  const isEnglish = window.location.pathname === "/en";

  const initialMessage = isEnglish
    ? "Hi! I'm Ezequiel's assistant. How can I help you?"
    : "¡Hola! Soy el asistente de Ezequiel. ¿En qué puedo ayudarte?";

  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "assistant",
        content: initialMessage,
      },
    ],
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
    if (!isChatVisible) {
      scrollToBottom();
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://api-ai-agents.vercel.app/api/ai/gemini/chat",
        {
          method: "POST",
          body: JSON.stringify({ message: input }),
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!res.ok) {
        console.error(`Error from backend: ${res.status} - ${res.statusText}`);
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: isEnglish
              ? "Sorry, there was an error communicating with the assistant."
              : "Lo siento, hubo un error al comunicarme con el asistente.",
          },
        ]);
      } else {
        const { response } = await res.json();
        const renderer = new Renderer();
        renderer.link = (link) => {
          const { href, title, text } = link;
          return `<a href="${href}" target="_blank" title="${title || ""}" class="text-blue-500 font-bold underline">${text}</a>`;
        };
        const markedRespuesta = await marked(response, { renderer: renderer });

        // Agregar el mensaje vacío primero
        const newMessagesWithTyping = [
          ...newMessages,
          { role: "assistant", content: "" },
        ];
        setMessages(newMessagesWithTyping);
        scrollToBottom(); // Asegurar el scroll inicial

        // Animar el tipado
        // await animateTyping(markedRespuesta);

        // Actualizar el mensaje final
        setMessages([
          ...newMessages,
          { role: "assistant", content: markedRespuesta },
        ]);
        scrollToBottom(); // Asegurar el scroll final
      }
      scrollToBottom(); // Asegurar el scroll después de todo
    } catch (error) {
      console.error("Error al enviar la pregunta:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: isEnglish
            ? "Could not connect to the assistant at this time."
            : "No se pudo conectar con el asistente en este momento.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const animateTyping = (text: string) => {
    setIsTyping(true);
    setTypingMessage("");

    const interval = 35;
    const chars = text.split("");
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < chars.length) {
        setTypingMessage((prev) => prev + chars[currentIndex]);
        currentIndex++;
        scrollToBottom();
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, interval);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval * chars.length);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (!isBrowser) return;
    const chatContainer = document.querySelector(".chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    if (isChatVisible) {
      scrollToBottom();
    }
  }, [messages, isChatVisible]);

  const renderMessage = (
    msg: { role: string; content: string },
    index: number,
  ) => {
    if (msg.role === "assistant" && index === messages.length - 1 && isTyping) {
      return (
        <div
          key={index}
          className="max-w-[85%] p-2 text-sm font-light leading-6 rounded-lg bg-gray-200 text-gray-900 self-start"
        >
          <div dangerouslySetInnerHTML={{ __html: typingMessage }}></div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div
        key={index}
        className={`max-w-[85%] p-2 text-sm font-light leading-6 rounded-lg ${
          msg.role === "user"
            ? "bg-sky-700 text-white self-end"
            : "bg-gray-200 text-gray-900 self-start"
        }`}
      >
        {msg.role === "user" ? (
          msg.content
        ) : (
          <div dangerouslySetInnerHTML={{ __html: msg.content }}></div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Botón flotante para mostrar/ocultar el chat */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-sky-600 text-sky-200 shadow-lg hover:bg-sky-700 transition-colors flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat completo */}
      <AnimatePresence>
        {isChatVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-2xl border border-gray-300 flex flex-col overflow-hidden z-50"
          >
            {/* Chat Header */}
            <div className="bg-gray-800 text-white pt-3 px-4 text-center font-semibold">
              {isEnglish ? "Chat with Ezequiel 🚀" : "Chat con Ezequiel 🚀"}
            </div>
            <div className="bg-gray-800 text-white pb-2 px-4 text-center font-light text-xs">
              Powered by{" "}
              <a
                href="https://gemini.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-200 transition-colors"
              >
                Gemini
              </a>
            </div>

            {/* Chat Messages */}
            <div className="p-3 h-80 overflow-y-auto space-y-2 flex flex-col chat-messages">
              {messages.map(renderMessage)}
              {loading && !isTyping && (
                <p className="text-gray-400 text-sm self-start">
                  {isEnglish ? "Writing..." : "Escribiendo..."}
                </p>
              )}
            </div>

            {/* Input y Botón */}
            <div className="flex border-t border-gray-300 p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isEnglish ? "Type a message..." : "Escribe un mensaje..."
                }
                className="flex-1 p-2 text-sm border-none outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-600 transition"
              >
                <SendHorizontal size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
