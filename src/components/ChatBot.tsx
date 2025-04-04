import { useState, useEffect, useRef } from "react";
import { SendHorizontal, MessageCircle } from "lucide-react";
import { marked, Renderer } from "marked";
import { motion, AnimatePresence } from "framer-motion";

// Verificar si estamos en el cliente
const isBrowser = typeof window !== "undefined";

const Chatbot = () => {
  const isEnglish = isBrowser && window.location.pathname === "/en";

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
  const [isTyping, setIsTyping] = useState(false);
  const [typingContent, setTypingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatVisible) {
      // Usamos un timeout para asegurar que el DOM se haya actualizado
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 100); // Ajustar si es necesario, pero 100ms suele ser suficiente
      return () => clearTimeout(timer); // Limpiar el timeout si el efecto se ejecuta de nuevo antes
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, isTyping, isChatVisible]); // Dependencias clave: cambio en número de mensajes, inicio/fin de tipeo, visibilidad del chat

  const extractTextFromHtml = (html: string): string => {
    if (!isBrowser) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const animateTyping = (text: string, onComplete: () => void) => {
    // Manejar texto vacío inmediatamente
    if (!text) {
      onComplete();
      return () => {}; // No hay intervalo para limpiar
    }

    setIsTyping(true);

    // Si solo hay un carácter, llamar a onComplete después de un breve retraso
    if (text.length === 1) {
      const timeoutId = setTimeout(() => {
        onComplete();
      }, 50); // Mantener el retraso consistente
      // No se inicia intervalo, pero devolvemos función de limpieza para el timeout
      return () => clearTimeout(timeoutId);
    }

    let index = -1;
    const intervalId = setInterval(() => {
      // Añadir el carácter actual
      setTypingContent((prev) => prev + text[index]);
      index++;
      // Si hemos añadido el último carácter
      if (index === text.length) {
        clearInterval(intervalId);
        // Llamar a onComplete después de un breve retraso
        setTimeout(() => {
          onComplete();
        }, 50);
      }
    }, 20); // Velocidad de tipeo

    // Devolver la función de limpieza para el intervalo
    return () => clearInterval(intervalId);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setIsTyping(false);
    setTypingContent("");

    try {
      const res = await fetch(
        "https://api-ai-agents.vercel.app/api/ai/gemini/chat",
        {
          method: "POST",
          body: JSON.stringify({ message: userMessage.content }),
          headers: { "Content-Type": "application/json" },
        },
      );

      setLoading(false);

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const { response } = await res.json();
      const renderer = new Renderer();
      renderer.link = (link) => {
        const { href, title, text } = link;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" title="${title || ""}" class="text-blue-500 font-bold underline">${text}</a>`;
      };
      const markedRespuesta = await marked(response, { renderer: renderer });
      const plainText = extractTextFromHtml(markedRespuesta);

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      animateTyping(plainText, () => {
        setIsTyping(false);
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1].content = markedRespuesta;
          return updatedMessages;
        });
      });
    } catch (error) {
      setLoading(false);
      setIsTyping(false);
      console.error("Error al enviar la pregunta:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isEnglish
            ? "Sorry, an error occurred."
            : "Lo siento, ocurrió un error.",
        },
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMessage = (
    msg: { role: string; content: string },
    index: number,
  ) => {
    const isLastMessage = index === messages.length - 1;
    const isAssistant = msg.role === "assistant";

    if (isAssistant && isLastMessage && isTyping) {
      return (
        <div
          key={`${index}-typing`}
          className="max-w-[85%] p-2 text-sm font-light leading-6 rounded-lg bg-gray-200 text-gray-900 self-start"
        >
          <div>{typingContent}</div>
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
          <div dangerouslySetInnerHTML={{ __html: msg.content || "" }}></div>
        )}
      </div>
    );
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-sky-600 text-sky-200 shadow-lg hover:bg-sky-700 transition-colors flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isChatVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-2xl border border-gray-300 flex flex-col overflow-hidden z-50"
            style={{ maxHeight: "calc(100vh - 10rem)", minHeight: "20rem" }}
          >
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

            <div className="p-3 flex-1 overflow-y-auto space-y-2 flex flex-col chat-messages">
              {messages.map(renderMessage)}

              {loading && (
                <div className="self-start flex items-center space-x-2 p-2 ml-1">
                  {/* <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={`loading-dot-${i}`}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: "1s",
                        }}
                      />
                    ))}
                  </div> */}
                  <p className="text-gray-400 text-xs font-light">
                    {isEnglish ? "Writting..." : "Escribiendo..."}
                  </p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="flex border-t border-gray-300 p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isEnglish ? "Type a message..." : "Escribe un mensaje..."
                }
                className="flex-1 p-2 text-sm border-none outline-none bg-transparent"
                disabled={loading || isTyping}
              />
              <button
                onClick={sendMessage}
                className={`p-2 rounded-lg transition ${
                  loading || isTyping || !input.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-sky-500 text-white hover:bg-sky-600"
                }`}
                disabled={loading || isTyping || !input.trim()}
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
