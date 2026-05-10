export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  sentAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantIds: [string, string];
  lastMessage: Message | null;
  updatedAt: string;
}
