"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store/user";

interface Message {
  id: number;
  content: string;
  user_id: string;
  user_email: string;
  created_at: string;
}

export default function ChatRoom() {
  const { user } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // 移除 session 检查，让所有用户都能接收消息
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    // 获取历史消息
    fetchMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // 移除 session 依赖

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) setMessages(data);
    if (error) console.error(error);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("messages").insert([
      {
        content: newMessage,
        user_id: user?.id || "anonymous",
        user_email: user?.email || "游客",
      },
    ]);

    if (!error) {
      setNewMessage("");
    }
  };

  return (
    <div className="bg-white h-full flex flex-col max-w-md mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg shadow ${
              message.user_id === user?.id ? "bg-blue-100 ml-auto" : "bg-white"
            }`}
          >
            <p>{message.content}</p>
            <small className="text-gray-500">
              {message.user_email} -{" "}
              {new Date(message.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-lg border p-2"
          placeholder="输入消息..."
        />
        <Button type="submit">发送</Button>
      </form>
    </div>
  );
}
