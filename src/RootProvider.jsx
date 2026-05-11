"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Minimize2, Maximize2, Send } from "lucide-react";
import Image from "next/image";
import chatBotIcon from "../src/assets/chatboat.png";

gsap.registerPlugin(ScrollTrigger);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! 👋 How can I help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  const botResponses = {
    "hello": "Hi there! Welcome to Vyanwebs. How can I assist you?",
    "hi": "Hello! Great to see you. What brings you here today?",
    "services": "We offer Web Development, App Development, Digital Marketing, SEO, and more! Check our Services page for details.",
    "price": "Our pricing varies based on project requirements. Could you share more details about what you're looking for?",
    "contact": "You can reach us at +91 9111721315 or email us at info@vyanwebs.com",
    "work": "We've worked with 500+ clients across various industries. Check out our Work portfolio!",
    "career": "We're always looking for talented individuals! Send your resume to hr@vyanwebs.com",
    "default": "Thanks for your message! Our team will get back to you shortly. You can also call us at +91 9111721315"
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Animation when chat opens
  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      gsap.fromTo(chatWindowRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const getBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
      return botResponses.hello;
    } else if (lowerMsg.includes("service")) {
      return botResponses.services;
    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("quote")) {
      return botResponses.price;
    } else if (lowerMsg.includes("contact") || lowerMsg.includes("reach")) {
      return botResponses.contact;
    } else if (lowerMsg.includes("work") || lowerMsg.includes("portfolio")) {
      return botResponses.work;
    } else if (lowerMsg.includes("career") || lowerMsg.includes("job")) {
      return botResponses.career;
    } else {
      return botResponses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { type: "user", text: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages(prev => [...prev, { type: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1000);
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
        className={`fixed bottom-6 right-6 z-[99999] bg-white hover:from-blue-700 hover:to-blue-600 text-white rounded-full p-3 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group`}
        aria-label="Chat with us"
      >
        <Image
          src={chatBotIcon}
          alt="Chat Bot"
          width={28}
          height={28}
          className="object-contain"
        />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`fixed bottom-24 right-6 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-[99999] flex flex-col overflow-hidden transition-all duration-300 ${isMinimized ? "h-[60px]" : "h-[500px]"
            }`}
        >
          {/* Header with Close and Minimize Buttons */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
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
                  <p className="text-xs opacity-90">Online • Usually replies instantly</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleMinimize}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors"
                  aria-label="Minimize"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
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
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${message.type === "user"
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
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                  {["Services", "Pricing", "Contact", "Work", "Careers"].map((reply) => (
                    <button
                      key={reply}
                      onClick={() => {
                        setInputMessage(reply);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors whitespace-nowrap"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white text-sm transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
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
      {children}
      <ChatBot />
    </>
  );
}