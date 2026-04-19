import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { chatMessages, tutors } from "../../data/dummyData";
import { Send, Phone, Video, MoreVertical, Search, CheckCheck } from "lucide-react";

const contacts = [
  { id: 1, name: "Priya Sharma", avatar: tutors[0].avatar, subject: "Mathematics", lastMessage: "Looking forward to teaching you! 😊", time: "10:38", unread: 0, online: true },
  { id: 2, name: "Rahul Verma", avatar: tutors[1].avatar, subject: "Physics", lastMessage: "Please check the study material I sent", time: "Yesterday", unread: 2, online: false },
  { id: 3, name: "Anjali Patel", avatar: tutors[2].avatar, subject: "Chemistry", lastMessage: "Your booking is confirmed!", time: "2 days ago", unread: 0, online: true },
];

export default function ChatPage({ role = "student" }) {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, {
      id: Date.now(), senderId: "student", name: "You",
      message: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }]);
    setInput("");
  };

  return (
    <DashboardLayout role={role}>
      <div
        className="flex rounded-2xl overflow-hidden"
        style={{ height: "calc(100vh - 8rem)", border: "1px solid #E5E7EB", background: "#FFFFFF" }}
      >
        {/* Contacts list */}
        <div
          className="w-72 shrink-0 flex flex-col"
          style={{ background: "#FFFFFF", borderRight: "1px solid #E5E7EB" }}
        >
          <div className="p-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
            <h3 className="font-bold mb-3" style={{ color: "#1F2937" }}>Messages</h3>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "#F5F7FA", border: "1.5px solid #E5E7EB" }}
            >
              <Search size={14} style={{ color: "#9CA3AF" }} />
              <input className="bg-transparent outline-none text-xs w-full" style={{ color: "#4B5563" }} placeholder="Search..." />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveContact(c)}
                className={`w-full flex items-center gap-3 p-4 text-left transition-all`}
                style={{
                  background: activeContact.id === c.id ? "#EFF6FF" : "transparent",
                  borderLeft: activeContact.id === c.id ? "3px solid #0056D2" : "3px solid transparent",
                }}
                onMouseEnter={(e) => { if (activeContact.id !== c.id) e.currentTarget.style.background = "#F9FAFB"; }}
                onMouseLeave={(e) => { if (activeContact.id !== c.id) e.currentTarget.style.background = "transparent"; }}
              >
                <div className="relative shrink-0">
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-xl" style={{ border: "2px solid #E5E7EB" }} />
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold truncate" style={{ color: "#1F2937" }}>{c.name}</p>
                    <p className="text-xs shrink-0 ml-2" style={{ color: "#9CA3AF" }}>{c.time}</p>
                  </div>
                  <p className="text-xs truncate" style={{ color: "#6B7280" }}>{c.lastMessage}</p>
                </div>
                {c.unread > 0 && <div className="notif-badge shrink-0">{c.unread}</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col" style={{ background: "#FAFBFC" }}>
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ background: "#FFFFFF", borderBottom: "1px solid #F3F4F6" }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-xl" style={{ border: "2px solid #E5E7EB" }} />
                {activeContact.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />}
              </div>
              <div>
                <p className="font-bold" style={{ color: "#1F2937" }}>{activeContact.name}</p>
                <p className="text-xs" style={{ color: activeContact.online ? "#22C55E" : "#9CA3AF" }}>
                  {activeContact.subject} · {activeContact.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[Phone, Video, MoreVertical].map((Icon, i) => (
                <button
                  key={i}
                  className="p-2 rounded-lg transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F7FA")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Icon size={16} style={{ color: "#6B7280" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: "#F5F7FA", color: "#9CA3AF" }}>Today</span>
              <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}>
                {!msg.isMe && (
                  <img src={activeContact.avatar} alt={msg.name} className="w-8 h-8 rounded-xl shrink-0 self-end border-2" style={{ borderColor: "#E5E7EB" }} />
                )}
                <div className={`max-w-xs lg:max-w-md flex flex-col gap-1 ${msg.isMe ? "items-end" : "items-start"}`}>
                  <div className={`px-4 py-3 text-sm leading-relaxed ${msg.isMe ? "chat-bubble-user" : "chat-bubble-ai"}`}>
                    {msg.message}
                  </div>
                  <div className={`flex items-center gap-1 ${msg.isMe ? "flex-row-reverse" : ""}`}>
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>{msg.time}</span>
                    {msg.isMe && <CheckCheck size={12} style={{ color: "#0056D2" }} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4" style={{ background: "#FFFFFF", borderTop: "1px solid #F3F4F6" }}>
            <div className="flex gap-3">
              <input
                className="input-field flex-1"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button
                onClick={send}
                className="btn-primary w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
