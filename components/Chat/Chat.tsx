"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { useIntersection, useMount } from "react-use";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";
import { sleep } from "@/lib/utils";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { ArrowBigDownDash } from "lucide-react";

interface Message {
  id: number;
  content: string;
  user_id: string;
  user_email: string;
  created_at: string;
  fingerprint?: string;
}

export default function ChatRoom() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(
    intersectionRef as RefObject<HTMLElement>,
    {
      root: scrollRef.current,
      rootMargin: "0px",
      threshold: 1,
    }
  );
  const supabase = createClient();
  const { user, fingerprint } = useUserStore();
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
    // 设置实时订阅
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*", // 监听所有事件（INSERT, UPDATE, DELETE）
          schema: "public",
          table: "messages",
        },
        (payload) => {
          // 根据不同的事件类型处理消息
          switch (payload.eventType) {
            case "INSERT":
              setMessages((prev) => [...prev, payload.new as Message]);
              break;
            case "DELETE":
              setMessages((prev) =>
                prev.filter((msg) => msg.id !== payload.old.id)
              );
              break;
            case "UPDATE":
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === payload.new.id ? (payload.new as Message) : msg
                )
              );
              break;
          }
        }
      )
      .subscribe();

    // 获取历史消息
    await fetchMessages();

    // 清理函数
    return () => {
      supabase.removeChannel(channel);
    };
  });

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const value = {
      content: newMessage,
      fingerprint,
      user_id: user?.id,
      user_email: user?.email || "游客",
    };

    const { error } = await supabase.from("messages").insert([value]);

    if (!error) {
      setNewMessage("");
      toast.success("消息发送成功");
    }
  };

  useEffect(() => {
    (async () => {
      if (intersection?.isIntersecting || isSelf(messages.at(-1) as Message)) {
        await sleep(0);
        handleScrollToBottom();
      }
    })();
  }, [messages]);

  const isSelf = (message: Message) => {
    return (
      message?.user_id === user?.id || message?.fingerprint === fingerprint
    );
  };

  return (
    <div className="bg-white h-full flex flex-col max-w-md mx-auto p-4">
      <div className="flex-1 relative mb-4 h-0">
        <div className="h-full overflow-y-auto space-y-4" ref={scrollRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={clsx(
                "p-2 rounded border max-w-[80%]",
                isSelf(message) ? "bg-blue-100 ml-auto" : "bg-white"
              )}
            >
              <small className="text-gray-500">
                {message.user_email} -{" "}
                {new Date(message.created_at).toLocaleString()}
              </small>
              <p className="break-all">{message.content}</p>
            </div>
          ))}
          <div ref={intersectionRef} className="h-px w-px"></div>
        </div>
        <Button
          className={clsx(
            "absolute bottom-4 right-8 cursor-pointer",
            intersection?.isIntersecting ? "hidden" : ""
          )}
          variant="outline"
          size="icon"
          onClick={handleScrollToBottom}
        >
          <ArrowBigDownDash />
        </Button>
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
