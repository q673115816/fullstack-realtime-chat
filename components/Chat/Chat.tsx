"use client";

import { useRef, useState } from "react";
import { useMount } from "react-use";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";
import { sleep } from "@/lib/utils";
import clsx from "clsx";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  content: string;
  user_id: string;
  user_email: string;
  created_at: string;
}

export default function ChatRoom() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const { user } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    const { data, error } = await supabase.from("messages").select("*");
    // .order("created_at", { ascending: true });

    if (data) setMessages(data);
    if (error) console.error(error);
  };

  const handleScrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useMount(async () => {
    // 移除 session 检查，让所有用户都能接收消息
    // const channel = supabase
    //   .channel("messages")
    //   .on(
    //     "postgres_changes",
    //     {
    //       event: "INSERT",
    //       schema: "public",
    //       table: "messages",
    //     },
    //     (payload) => {
    //       setMessages((prev) => [...prev, payload.new as Message]);
    //     }
    //   )
    //   .subscribe();

    // 获取历史消息
    await fetchMessages();
    await sleep(0);

    handleScrollToBottom();
    return () => {
      // supabase.removeChannel(channel);
    };
  }); // 移除 session 依赖

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const value = {
      content: newMessage,
      user_id: user?.id,
      user_email: user?.email || "游客",
    };

    const { data, error } = await supabase
      .from("messages")
      .insert([value])
      .select();

    if (!error) {
      setNewMessage("");
      setMessages((prev) => [...prev, ...data]);
      toast.success("消息发送成功");
      await sleep(0);
      handleScrollToBottom();
    }
  };

  return (
    <div className="bg-white h-full flex flex-col max-w-md mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4" ref={scrollRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              "p-2 rounded border max-w-[80%]",
              message.user_id === user?.id ? "bg-blue-100 ml-auto" : "bg-white"
            )}
          >
            <small className="text-gray-500">
              {message.user_email} -{" "}
              {new Date(message.created_at).toLocaleString()}
            </small>
            <p className="break-all">{message.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="输入消息..."
        />
        <Button type="submit">发送</Button>
      </form>
      <Toaster />
    </div>
  );
}
