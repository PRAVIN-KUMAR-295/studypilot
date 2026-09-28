import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Bot,
  Send,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Cpu,
  CornerDownLeft,
  RefreshCw,
  Zap,
  Info
} from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { RobotIllustration } from "../components/RobotIllustration";
import { AITypingIndicator } from "../components/SkeletonLoader";

export const AIAssistantPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const chatBottomRef = useRef(null);

  const initialQuestion = location.state?.initialQuestion || "";
  const topicContext = location.state?.topicContext || "";

  const [inputQuestion, setInputQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: `Hello ${user?.name || "Student"}! I am **StudyPilot AI**, your technical learning copilot. 
Ask me to explain any concept in AWS Cloud, Python, Java, or Web Development, or click any suggestion below!`,
      source: "local",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(topicContext);

  const suggestedPrompts = [
    "Explain AWS Lambda",
    "What is EC2?",
    "Explain Python functions",
    "How does CSS work?"
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle passed initial question
  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion, false);
    }
  }, [initialQuestion]);

  const handleSendMessage = async (text, isSimpler = false) => {
    const questionText = text || inputQuestion;
    if (!questionText.trim() || isTyping) return;

    const userMessage = {
      role: "user",
      content: questionText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!text) setInputQuestion("");
    setIsTyping(true);

    try {
      // Build conversation history
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await api.askAI(
        questionText.trim(),
        currentTopic,
        history,
        isSimpler
      );

      const aiMessage = {
        role: "ai",
        content: res.answer,
        source: res.source, // "bedrock" or "local"
        topic: res.topic,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, aiMessage]);
      if (res.topic && res.topic !== "General") {
        setCurrentTopic(res.topic);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I encountered an issue connecting to the AI service. Please try again in a few moments.",
          source: "local",
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleExplainSimpler = (lastAnswer) => {
    handleSendMessage(`Explain simpler: ${lastAnswer.slice(0, 150)}...`, true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-w-4xl mx-auto pb-4">
      {/* Header Bar */}
      <div className="glass-panel px-6 py-4 rounded-3xl border border-slate-800 flex items-center justify-between mb-4 shadow-sm shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-glow">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center space-x-2">
              <span>StudyPilot AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            </h1>
            <p className="text-[11px] text-slate-400">
              Interactive AI Tutor {currentTopic ? `• Topic: ${currentTopic}` : ""}
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Bedrock & Local Hybrid</span>
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 overflow-y-auto glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800 space-y-4 mb-4">
        {messages.map((msg, index) => {
          const isAI = msg.role === "ai";

          return (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                isAI ? "justify-start" : "justify-end"
              } animate-fadeIn`}
            >
              {/* AI Avatar */}
              {isAI && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold shrink-0 mt-1 shadow-glow">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-xl rounded-2xl p-4 text-sm leading-relaxed space-y-2 ${
                  isAI
                    ? "bg-[#0E172B] border border-slate-800 text-slate-200"
                    : "bg-cyan-500 text-slate-950 font-medium ml-12 shadow-glow"
                }`}
              >
                {/* AI Header with Engine Source Badge */}
                {isAI && (
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-1.5 mb-2">
                    <span className="font-bold text-white flex items-center space-x-1">
                      <span>StudyPilot AI</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          msg.source === "bedrock"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        }`}
                      >
                        {msg.source === "bedrock" ? "Amazon Bedrock" : "StudyPilot Knowledge"}
                      </span>
                      <span className="text-slate-500">{msg.timestamp}</span>
                    </div>
                  </div>
                )}

                {/* Message Content with Markdown rendering */}
                <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed">
                  {msg.content}
                </div>

                {/* Explain Simpler Button on AI messages */}
                {isAI && index > 0 && !msg.isError && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleExplainSimpler(msg.content)}
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 text-xs font-semibold transition-all border border-slate-700/80"
                      title="Request an intuitive analogy or simpler explanation"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Explain simpler</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-glow">
              <Bot className="w-4 h-4" />
            </div>
            <AITypingIndicator />
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Prompt Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 shrink-0">
        <span className="text-[11px] text-slate-400 shrink-0 font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Suggestions:</span>
        </span>
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt, false)}
            className="px-3 py-1 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800 shrink-0 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="glass-panel p-2 rounded-2xl border border-slate-800 flex items-center gap-2 shadow-xl shrink-0"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Ask a technical question... (e.g. 'What is the difference between EC2 and S3?')"
          disabled={isTyping}
          className="flex-1 px-4 py-2.5 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
        />

        <button
          type="submit"
          disabled={!inputQuestion.trim() || isTyping}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
