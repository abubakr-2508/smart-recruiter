import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Minimize2, Star, Briefcase } from "lucide-react";
import { useNavigate } from "react-router";
import { jobs, candidates } from "../data/mockData";

type CandidateCard = {
  jobTitle: string;
  jobId: string;
  results: {
    id: string;
    name: string;
    score: number;
    currentRole: string;
    source: string;
    experience: string;
  }[];
};

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  candidateCard?: CandidateCard;
};

const suggestedQueries = [
  "Top candidates for Backend Engineer",
  "Which jobs have failed portal postings?",
  "How many candidates are in review queue?",
  "Top candidates for Product Manager",
];

const botReplies: Record<string, string> = {
  default:
    "I can help you with candidate summaries, job status, scoring explanations, and more. Try asking: \"Top candidates for [Job Title]\".",
  "which jobs have failed portal postings?":
    "Product Manager (JOB002) has a failed posting on Indeed. I recommend retrying the connection in Connected Portals or re-publishing from Job Detail.",
  "how many candidates are in review queue?":
    "There are currently 3 items in the Review Queue requiring your attention: 1 failed parse, 1 possible duplicate, and 1 ambiguous job title mapping.",
  "compare top 2 candidates":
    "Marcus Johnson (94%) vs Sarah Chen (91%): Marcus has stronger cloud experience (AWS SA certified), 7 vs 6 years experience. Sarah has superior secondary skill coverage. Both are strong shortlist candidates.",
};

// Intent: detect if user is asking for top candidates for a specific job
function detectTopCandidatesIntent(text: string): string | null {
  const lower = text.toLowerCase();
  const intentKeywords = [
    "top candidate",
    "best candidate",
    "shortlisted",
    "top 3",
    "who are the top",
    "show me candidate",
    "fetch candidate",
    "candidates for",
    "top picks for",
    "top applicant",
  ];
  const hasIntent = intentKeywords.some((kw) => lower.includes(kw));
  if (!hasIntent) return null;

  // Try matching a job ID directly (e.g. JOB001)
  const jobIdMatch = lower.match(/job0*(\d+)/);
  if (jobIdMatch) {
    const paddedId = `JOB${String(jobIdMatch[1]).padStart(3, "0")}`;
    const found = jobs.find((j) => j.id.toUpperCase() === paddedId.toUpperCase());
    if (found) return found.id;
  }

  // Try matching a job title keyword
  const matched = jobs.find((j) =>
    j.title
      .toLowerCase()
      .split(" ")
      .some((word) => word.length > 3 && lower.includes(word))
  );
  return matched ? matched.id : null;
}

function getTopCandidatesForJob(jobId: string): CandidateCard | null {
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return null;

  const top = candidates
    .filter((c) => c.jobId === jobId && c.status === "Shortlisted")
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (top.length === 0) return null;

  return {
    jobTitle: job.title,
    jobId: job.id,
    results: top.map((c) => ({
      id: c.id,
      name: c.name,
      score: c.score,
      currentRole: c.currentRole,
      source: c.source,
      experience: c.experience,
    })),
  };
}

function getBotResponse(text: string): { text: string; candidateCard?: CandidateCard } {
  const lower = text.toLowerCase().trim();

  // Check for top candidates intent first
  const matchedJobId = detectTopCandidatesIntent(lower);
  if (matchedJobId) {
    const card = getTopCandidatesForJob(matchedJobId);
    if (card) {
      return {
        text: `Here are the top ${card.results.length} shortlisted candidates for **${card.jobTitle}**:`,
        candidateCard: card,
      };
    } else {
      const job = jobs.find((j) => j.id === matchedJobId);
      return {
        text: `I found the job "${job?.title}" but there are no shortlisted candidates yet. Check back after the review queue is processed.`,
      };
    }
  }

  // Fallback to static replies
  return { text: botReplies[lower] || botReplies["default"] };
}

function scoreColor(score: number) {
  if (score >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (score >= 80) return "text-teal-600 bg-teal-50 border-teal-200";
  return "text-amber-600 bg-amber-50 border-amber-200";
}

export function ChatbotPanel() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hi! I'm your SmartRecruiter assistant. Ask me to fetch top candidates for any job, check portal status, review queue counts, and more.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = getBotResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: response.text,
          candidateCard: response.candidateCard,
        },
      ]);
      setTyping(false);
    }, 900);
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-13 h-13 bg-[#0f2240] hover:bg-[#1a3460] text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50 group"
          style={{ width: 52, height: 52 }}
        >
          <MessageCircle size={22} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-teal-500 rounded-full border-2 border-white" />
        </button>
      )}

      {/* Drawer */}
      {open && (
        <div className="fixed bottom-0 right-0 w-96 h-[580px] bg-white border border-slate-100 rounded-tl-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f2240] text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                <Bot size={16} className="text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">SmartRecruiter Assistant</p>
                <p className="text-[11px] text-teal-400">Always available</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              >
                <Minimize2 size={14} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <Bot size={12} className="text-teal-600" />
                  </div>
                )}
                <div className={`max-w-[82%] flex flex-col gap-2`}>
                  {/* Text bubble */}
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#0f2240] text-white rounded-br-sm"
                        : "bg-white text-slate-700 border border-slate-100 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Candidate card */}
                  {msg.candidateCard && (
                    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                      {/* Card header */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#0f2240]/5 border-b border-slate-100">
                        <Briefcase size={12} className="text-indigo-500" />
                        <span className="text-[11px] font-semibold text-slate-600 truncate">
                          {msg.candidateCard.jobTitle}
                        </span>
                        <span className="ml-auto text-[10px] text-slate-400 shrink-0">
                          {msg.candidateCard.jobId}
                        </span>
                      </div>

                      {/* Candidate rows */}
                      <div className="divide-y divide-slate-50">
                        {msg.candidateCard.results.map((c, i) => (
                          <div
                            key={c.name}
                            onClick={() => {
                              navigate(`/jobs/${msg.candidateCard!.jobId}/applications/${c.id}`);
                              setOpen(false);
                            }}
                            className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-indigo-50 cursor-pointer transition-colors group"
                          >
                            {/* Rank */}
                            <div className="w-5 h-5 rounded-full bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-bold text-indigo-500">
                                {i + 1}
                              </span>
                            </div>
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-700 truncate">
                                {c.name}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">
                                {c.currentRole}
                              </p>
                            </div>
                            {/* Score */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Star size={9} className="text-amber-400 fill-amber-400" />
                              <span
                                className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md border ${scoreColor(c.score)}`}
                              >
                                {c.score}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Card footer */}
                      <div className="px-3 py-2 bg-slate-50 border-t border-slate-100">
                        <p className="text-[10px] text-slate-400">
                          Showing top {msg.candidateCard.results.length} shortlisted · Sorted by AI score
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot size={12} className="text-teal-600" />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 bg-white border-t border-slate-100">
              <p className="text-[11px] text-slate-400 mb-1.5">Try asking:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-[11px] px-2.5 py-1 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-600 border border-slate-200 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="e.g. Top candidates for Sales Engineer..."
                className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-9 h-9 flex items-center justify-center bg-[#0f2240] text-white rounded-xl hover:bg-[#1a3460] transition-colors disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}