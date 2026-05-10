"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Message, Conversation } from "@/types/message";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/data/mockMessages";

const CONV_KEY = "kyomei_conversations";
const MSG_KEY  = "kyomei_messages";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
}

function save(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

interface MessagesContextValue {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  getUnreadCount: () => number;
  getConversationByUserId: (userId: string) => Conversation | undefined;
  sendMessage: (conversationId: string, content: string, senderId: string) => void;
  markAsRead: (conversationId: string) => void;
  getOrCreateConversation: (userId: string) => string;
}

const MessagesContext = createContext<MessagesContextValue | null>(null);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    load(CONV_KEY, MOCK_CONVERSATIONS)
  );
  const [messages, setMessages] = useState<Record<string, Message[]>>(() =>
    load(MSG_KEY, MOCK_MESSAGES)
  );

  const getUnreadCount = useCallback(() => {
    return conversations.reduce((count, conv) => {
      if (conv.lastMessage && !conv.lastMessage.isRead && conv.lastMessage.senderId !== "me") {
        return count + 1;
      }
      return count;
    }, 0);
  }, [conversations]);

  const getConversationByUserId = useCallback(
    (userId: string) => conversations.find((c) => c.participantIds.includes(userId as "me")),
    [conversations]
  );

  const sendMessage = useCallback(
    (conversationId: string, content: string, senderId: string) => {
      const newMsg: Message = {
        id: `msg_${Date.now()}`,
        conversationId,
        senderId,
        content,
        sentAt: new Date().toISOString(),
        isRead: false,
      };

      setMessages((prev) => {
        const next = { ...prev, [conversationId]: [...(prev[conversationId] ?? []), newMsg] };
        save(MSG_KEY, next);
        return next;
      });

      setConversations((prev) => {
        const next = prev.map((c) =>
          c.id === conversationId
            ? { ...c, lastMessage: newMsg, updatedAt: newMsg.sentAt }
            : c
        );
        save(CONV_KEY, next);
        return next;
      });
    },
    []
  );

  const markAsRead = useCallback((conversationId: string) => {
    setMessages((prev) => {
      const next = {
        ...prev,
        [conversationId]: (prev[conversationId] ?? []).map((m) => ({ ...m, isRead: true })),
      };
      save(MSG_KEY, next);
      return next;
    });

    setConversations((prev) => {
      const next = prev.map((c) => {
        if (c.id !== conversationId || !c.lastMessage) return c;
        return { ...c, lastMessage: { ...c.lastMessage, isRead: true } };
      });
      save(CONV_KEY, next);
      return next;
    });
  }, []);

  const getOrCreateConversation = useCallback(
    (userId: string): string => {
      const existing = conversations.find((c) => c.participantIds.includes(userId as "me"));
      if (existing) return existing.id;

      const newConvId = `conv_${userId}`;
      const newConv: Conversation = {
        id: newConvId,
        participantIds: ["me", userId] as [string, string],
        lastMessage: null,
        updatedAt: new Date().toISOString(),
      };

      setConversations((prev) => {
        const next = [newConv, ...prev];
        save(CONV_KEY, next);
        return next;
      });
      setMessages((prev) => {
        const next = { ...prev, [newConvId]: [] };
        save(MSG_KEY, next);
        return next;
      });

      return newConvId;
    },
    [conversations]
  );

  return (
    <MessagesContext.Provider
      value={{
        conversations,
        messages,
        getUnreadCount,
        getConversationByUserId,
        sendMessage,
        markAsRead,
        getOrCreateConversation,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error("useMessages must be used within MessagesProvider");
  return ctx;
}
