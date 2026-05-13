"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Minimize2, Maximize2, Send } from "lucide-react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import chatBotIcon from "../src/assets/chatboat.png";

gsap.registerPlugin(ScrollTrigger);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: "welcome", type: "bot", text: "Hello! 👋 How can I help you today?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const chatWindowRef = useRef(null);
  const sessionIdRef = useRef(
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `chat-${Date.now()}`,
  );
  const chatApiBaseUrl =
    (typeof import.meta !== "undefined" &&
      import.meta.env?.VITE_CHATBOT_API_URL?.trim()) ||
    "http://localhost:8000";

  const fallbackResponses = {
    hello: "Hi there! Welcome to Vyanwebs. How can I assist you?",
    hi: "Hello! Great to see you. What brings you here today?",
    services:
      "We offer Web Development, App Development, Digital Marketing, SEO, and more! Check our Services page for details.",
    price:
      "Our pricing varies based on project requirements. Could you share more details about what you're looking for?",
    contact:
      "You can reach us at +91 9111721315 or email us at info@vyanwebs.com",
    work: "We've worked with 500+ clients across various industries. Check out our Work portfolio!",
    career:
      "We're always looking for talented individuals! Send your resume to hr@vyanwebs.com",
    default:
      "Thanks for your message! Our team will get back to you shortly. You can also call us at +91 9111721315",
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      try {
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      } catch (e) {
        // fallback
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }
    } else if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isTyping]);

  // Animation when chat opens
  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      gsap.fromTo(
        chatWindowRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  const getFallbackResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();

    if (
      lowerMsg.includes("hello") ||
      lowerMsg.includes("hi") ||
      lowerMsg.includes("hey")
    ) {
      return fallbackResponses.hello;
    }

    if (lowerMsg.includes("service")) {
      return fallbackResponses.services;
    }

    if (
      lowerMsg.includes("price") ||
      lowerMsg.includes("cost") ||
      lowerMsg.includes("quote")
    ) {
      return fallbackResponses.price;
    }

    if (lowerMsg.includes("contact") || lowerMsg.includes("reach")) {
      return fallbackResponses.contact;
    }

    if (lowerMsg.includes("work") || lowerMsg.includes("portfolio")) {
      return fallbackResponses.work;
    }

    if (lowerMsg.includes("career") || lowerMsg.includes("job")) {
      return fallbackResponses.career;
    }

    return fallbackResponses.default;
  };

  const updateMessageById = (messageId, text) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, text } : message,
      ),
    );
  };

  const fetchStreamingBotResponse = async (
    userMessage,
    botMessageId,
    onComplete,
  ) => {
    const response = await fetch(
      `${chatApiBaseUrl.replace(/\/$/, "")}/chat/stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionIdRef.current,
          page_url: window.location.href,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Chat API returned ${response.status}`);
    }

    if (!response.body) {
      throw new Error("Chat API did not return a readable stream");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let accumulatedReply = "";
    let isComplete = false;

    while (!isComplete) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;

        const payload = JSON.parse(line);

        if (payload.type === "chunk") {
          accumulatedReply += payload.chunk;
          updateMessageById(botMessageId, accumulatedReply);
        }

        if (payload.type === "done") {
          accumulatedReply = payload.reply || accumulatedReply;
          updateMessageById(botMessageId, accumulatedReply);
          isComplete = true;
          if (onComplete) onComplete();
          await reader.cancel();
          break;
        }

        if (payload.type === "error") {
          throw new Error(payload.message || "Streaming chat failed");
        }
      }
    }

    if (buffer.trim()) {
      const payload = JSON.parse(buffer);
      if (payload.type === "chunk") {
        accumulatedReply += payload.chunk;
        updateMessageById(botMessageId, accumulatedReply);
      }
      if (payload.type === "done") {
        accumulatedReply = payload.reply || accumulatedReply;
        updateMessageById(botMessageId, accumulatedReply);
        isComplete = true;
        if (onComplete) onComplete();
      }
      if (payload.type === "error") {
        throw new Error(payload.message || "Streaming chat failed");
      }
    }

    return accumulatedReply;
  };

  const handleSendMessage = async (messageOverride) => {
    // Defensive: if messageOverride is an event (click event), ignore it
    const overrideIsString = typeof messageOverride === "string";
    const messageToSend = (
      overrideIsString ? messageOverride : (inputMessage ?? "")
    ).trim();
    if (!messageToSend) return;

    // Add user message
    const userMessageId = `user-${Date.now()}`;
    const botMessageId = `bot-${Date.now()}`;
    const userMessage = {
      id: userMessageId,
      type: "user",
      text: messageToSend,
    };
    const botMessage = { id: botMessageId, type: "bot", text: "" };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      await fetchStreamingBotResponse(messageToSend, botMessageId, () => {
        setIsTyping(false);
      });
    } catch (error) {
      console.error("Chatbot streaming failed:", error);
      const fallbackReply = getFallbackResponse(messageToSend);
      updateMessageById(botMessageId, fallbackReply);
      toast.error(
        "Live chat is temporarily unavailable. Showing a fallback reply.",
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      gsap.to(chatWindowRef.current, { height: "60px", duration: 0.3 });
    } else {
      gsap.to(chatWindowRef.current, { height: "500px", duration: 0.3 });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Chat Button with Custom Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-99999 bg-white hover:from-blue-700 hover:to-blue-600 text-white rounded-full p-3 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group`}
        aria-label="Chat with us"
      >
        <Image
          src={chatBotIcon}
          alt="Chat Bot"
          width={42}
          height={42}
          className="object-contain"
        />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`fixed bottom-24 right-6 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-99999 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-15" : "h-125"
          }`}
        >
          {/* Header with Close and Minimize Buttons */}
          <div className="bg-linear-to-r from-blue-600 to-blue-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Image
                    src={chatBotIcon}
                    alt="Chat Bot"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Vyanwebs Assistant</h3>
                  <p className="text-xs opacity-90">
                    Online • Usually replies instantly
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleMinimize}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors"
                  aria-label="Minimize"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handleClose}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Content - Only show when not minimized */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div
                ref={messagesContainerRef}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800 overscroll-contain"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start animate-in fade-in duration-200">
                    <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                  {["Services", "Pricing", "Contact", "Work", "Careers"].map(
                    (reply) => (
                      <button
                        key={reply}
                        onClick={() => handleSendMessage(reply)}
                        disabled={isTyping}
                        className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                      >
                        {reply}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    disabled={isTyping}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isTyping}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:hover:scale-100 disabled:cursor-not-allowed text-white rounded-full transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {isTyping ? "Sending..." : "Send"}
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default function RootProviders({ children }) {
  useEffect(() => {
    // Initialize GSAP and Lenis for smooth scrolling
    gsap.ticker.lagSmoothing(1000, 16);
    ScrollTrigger.defaults({ scroller: undefined });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true,
      lerp: 0.08,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Refresh ScrollTrigger on window resize
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
      gsap.killTweensOf("*");
      window.removeEventListener("resize", () => {
        ScrollTrigger.refresh();
      });
    };
  }, []);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 3500 }} />
      {children}
      <ChatBot />
    </>
  );
}
